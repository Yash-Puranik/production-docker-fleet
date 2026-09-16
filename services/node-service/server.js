const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Health API endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    runtime: 'nodejs',
    uptime: Math.floor(process.uptime()),
    memoryUsage: process.memoryUsage()
  });
});

// Interactive Frontend UI
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Fleet Node Service Monitor</title>
      <style>
        body {
          font-family: system-ui, -apple-system, sans-serif;
          background: #0f172a;
          color: #f8fafc;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          margin: 0;
        }
        .card {
          background: #1e293b;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
          width: 380px;
          text-align: center;
          border: 1px solid #334155;
        }
        .status-badge {
          display: inline-block;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.85rem;
          background: #065f46;
          color: #34d399;
          margin-bottom: 1rem;
        }
        .metric {
          display: flex;
          justify-content: space-between;
          padding: 0.6rem 0;
          border-bottom: 1px solid #334155;
          font-size: 0.95rem;
        }
        .metric span:first-child { color: #94a3b8; }
        button {
          margin-top: 1.5rem;
          width: 100%;
          padding: 0.75rem;
          border: none;
          border-radius: 8px;
          background: #38bdf8;
          color: #0f172a;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
        }
        button:hover { background: #7dd3fc; }
      </style>
    </head>
    <body>
      <div class="card">
        <div id="badge" class="status-badge">Checking...</div>
        <h2 style="margin: 0 0 1.25rem 0;">Node Service Monitor</h2>
        <div class="metric"><span>Runtime</span><strong id="runtime">-</strong></div>
        <div class="metric"><span>Uptime</span><strong id="uptime">-</strong></div>
        <div class="metric"><span>Heap Used</span><strong id="heap">-</strong></div>
        <button onclick="fetchStatus()">Ping Server</button>
      </div>

      <script>
        async function fetchStatus() {
          try {
            const res = await fetch('/health');
            const data = await res.json();
            document.getElementById('badge').innerText = 'SYSTEM: ' + data.status.toUpperCase();
            document.getElementById('runtime').innerText = data.runtime;
            document.getElementById('uptime').innerText = data.uptime + 's';
            document.getElementById('heap').innerText = (data.memoryUsage.heapUsed / 1024 / 1024).toFixed(2) + ' MB';
          } catch (err) {
            document.getElementById('badge').innerText = 'OFFLINE';
            document.getElementById('badge').style.background = '#991b1b';
            document.getElementById('badge').style.color = '#fca5a5';
          }
        }
        fetchStatus();
        setInterval(fetchStatus, 3000);
      </script>
    </body>
    </html>
  `);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Node service active on port ${PORT}`);
});

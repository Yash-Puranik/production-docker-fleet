

# DevOps Production Fleet 🚀

[![Fleet CI](https://github.com/Yash-Puranik/production-docker-fleet/actions/workflows/ci.yml/badge.svg)](https://github.com/Yash-Puranik/production-docker-fleet/actions/workflows/ci.yml)
[![Docker Hub](https://img.shields.io/badge/Docker%20Hub-node--service-blue?logo=docker&logoColor=white)](https://hub.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Hardened Node.js status monitoring service and automated GitHub Actions CI/CD infrastructure designed for container security, low footprint, and automated delivery.

---

## 📌 Architecture Overview

* **Node Service Monitor (`services/node-service/`):** Express runtime serving an interactive frontend dashboard (`/`) and structured runtime diagnostics (`/health`).
* **Container Security:** Multi-stage build on Alpine Linux (`node:20-alpine`) executing under non-root system user `USER node`.
* **Host Interface Binding:** Bound explicitly to `0.0.0.0:3000` to ensure seamless WSL2, Docker Desktop, and host port forwarding.
* **Automated CI/CD:** Single-runner Ubuntu GitHub Action using Docker Buildx caching (`type=gha`), verifying builds on feature branches/PRs (`push: false`), and shipping to Docker Hub on merge to `main` (`push: true`).

---

## 📂 Repository Structure

```text
.
├── .github/
│   └── workflows/
│       └── ci.yml              # Single-runner Ubuntu build & delivery pipeline
├── services/
│   └── node-service/
│       ├── Dockerfile          # Hardened rootless Alpine container
│       ├── package.json        # Dependencies & start script
│       ├── package-lock.json
│       └── server.js           # Live monitor dashboard & diagnostics endpoint
├── .gitignore
├── LICENSE
└── README.md

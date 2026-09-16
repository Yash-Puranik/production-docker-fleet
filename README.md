# Production Docker Fleet

Hardened, multi-runtime container templates and CI/CD pipelines engineered for production environments. Focuses on minimal attack surfaces, unprivileged process isolation, and automated cache-optimized builds.

---

## Fleet Specifications

| Service | Runtime | Base Image | Security Context | Target Port | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **node-service** | Node.js 20 | `alpine` | Non-root (`UID 1000:node`) | `3000` | Operational |
| **python-service** | Python 3.12 | `slim/alpine` | Non-root | `8000` | Roadmap |
| **go-service** | Go 1.22 | `scratch` | Unprivileged binary | `8080` | Roadmap |

---

## Architectural Standards

* **Multi-Stage Builds:** Separates compile/build dependencies from execution artifacts to minimize final image footprint.
* **Non-Root Execution:** Explicit runtime users (`USER node`) eliminate container breakout vulnerabilities tied to root access.
* **Network Binding:** Binds explicitly to `0.0.0.0` to ensure proper routing across Docker internal bridge networks and reverse proxies.
* **Automated CI Plumbing:** GitHub Actions pipeline validates Docker layer construction and utilizes GitHub Actions Cache (`type=gha`) for fast builds.

---

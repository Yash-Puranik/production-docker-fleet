# DevOps Production Fleet 🚀

[![Fleet CI](https://github.com/Yash-Puranik/production-docker-fleet/actions/workflows/ci.yml/badge.svg)](https://github.com/Yash-Puranik/production-docker-fleet/actions/workflows/ci.yml)
[![Docker Hub](https://img.shields.io/badge/Docker%20Hub-node--service-blue?logo=docker&logoColor=white)](https://hub.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Production-grade microservice monorepo and CI/CD infrastructure boilerplate designed for lean container security, automated CI testing, and conditional registry distribution.

---

## 📌 Fleet Architecture

* **Service Core (`services/node-service/`):** Express.js runtime exposing an interactive live HTML status monitor (`/`) and structured JSON diagnostic metrics (`/health`).
* **Container Hardening:** Minimal Alpine base (`node:20-alpine`), rootless execution via system user `USER node`, and host interface binding on `0.0.0.0:3000`.
* **CI/CD Pipeline:** Single-runner Ubuntu GitHub Action executing Docker Buildx caching (`type=gha`), running validation builds on PRs (`push: false`), and shipping tested images to Docker Hub on merge to `main` (`push: true`).
* **Monorepo Expansion Ready:** Isolated directory structure under `services/` designed to plug in future microservices (e.g., Go/Python data workers) into the same fleet runner.

---

## 📂 Repository Structure

```text
.
├── .github/
│   └── workflows/
│       └── ci.yml              # Ubuntu CI/CD pipeline (Buildx + Hub push)
├── services/
│   └── node-service/
│       ├── Dockerfile          # Hardened non-root Alpine container
│       ├── package.json        # Service manifest & dependencies
│       ├── package-lock.json
│       └── server.js           # Express monitor dashboard & health endpoint
├── .gitignore
└── README.md

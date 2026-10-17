# DevLog — Multi-Tier Dockerized Log Management Application

A full-stack, multi-tier developer logging application containerized and orchestrated using **Docker Compose**. This project demonstrates microservices architecture, persistent volume storage, Alpine Linux optimization, and container networking.

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** Node.js, Express, HTML/CSS (Modern Dark-Mode UI)
- **Backend API:** Python, Flask
- **Database:** PostgreSQL
- **Orchestration & DevOps:** Docker, Docker Compose, Git

---

## 🚀 Key Infrastructure & DevOps Features

- **Microservices Isolation:** Decoupled into separate containers running within a shared Docker bridge network.
- **Persistent Data:** Configured PostgreSQL named volumes to retain data across container lifecycles.
- **Service Discovery:** Uses container names (`backend:5000`) for inter-service communication instead of hardcoded IPs.
- **Alpine Optimization:** Built lightweight, multi-stage Alpine images with required C-compiler development headers (`gcc`, `libpq-dev`).

---

## ⚡ Quickstart

### Prerequisites
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) installed.

### Run Locally

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/digambar-ratate/devlog-Docker-.git](https://github.com/digambar-ratate/devlog-Docker-.git)
   cd devlog-Docker-

2. **Build and start the application:**
   ```bash
   docker compose up --build -d

3. **Access the application:**
   Frontend Dashboard: http://localhost:3000
   Backend API: http://localhost:5000/logs

4. **Stop the environment:**
   ```bash
   docker compose down

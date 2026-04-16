# 🚀 JobTrackr

**JobTrackr** is a personal job application tracker designed to simplify the chaotic process of job hunting. It provides a clean dashboard to manage applications, track progress, and visualize your job search statistics.

Built with a modern tech stack and a focus on DevOps best practices, this repository serves as both a functional tool and a showcase of end-to-end cloud-native engineering.

![Workflow Diagram](workflow.png)

---

## ✨ Key Features

-   **Dashboard Analytics**: Visualize your success rates, application volume, and current status breakdown.
-   **Application Management**: Create, update, and delete job applications with details like company, role, status, and salary.
-   **Secure Authentication**: JWT-based user authentication system.
-   **Responsive Design**: A sleek, dark-mode focused UI built with Tailwind CSS v4.
-   **Infrastructure as Code**: Automated provisioning on AWS using Terraform.
-   **CI/CD Pipeline**: Automated testing and Docker image builds via GitHub Actions.

---

## 🛠️ Tech Stack

### Frontend
-   **Framework**: [React](https://reactjs.org/) (via [Vite](https://vitejs.dev/))
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Routing**: [React Router](https://reactrouter.com/)
-   **Client**: [Axios](https://axios-http.com/)

### Backend
-   **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.11+)
-   **ORM**: [SQLAlchemy](https://www.sqlalchemy.org/)
-   **Migrations**: [Alembic](https://alembic.sqlalchemy.org/)
-   **Authentication**: OAuth2 with Password Flow and JWT
-   **Testing**: [Pytest](https://docs.pytest.org/)

### DevOps & Infrastructure
-   **Database**: [PostgreSQL](https://www.postgresql.org/)
-   **Containerization**: [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
-   **IaC**: [Terraform](https://www.terraform.io/) (AWS)
-   **Configuration Management**: [Ansible](https://www.ansible.com/)
-   **CI/CD**: [GitHub Actions](https://github.com/features/actions)

---

## 🚀 Getting Started

### Prerequisites

-   [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
-   [Python 3.11+](https://www.python.org/downloads/) (for local backend development)
-   [Node.js 20+](https://nodejs.org/en/download/) (for local frontend development)

### Quick Start (Docker Compose)

The easiest way to get JobTrackr running locally is using Docker Compose:

1.  Clone the repository:
    ```bash
    git clone https://github.com/ibrahimelothmani/JobTrackr.git
    cd JobTrackr
    ```
2.  Start the services:
    ```bash
    docker-compose up --build
    ```
3.  Access the applications:
    -   **Frontend**: `http://localhost`
    -   **Backend API**: `http://localhost:8000`
    -   **API docs (Swagger)**: `http://localhost:8000/docs`

### Manual Development Setup

#### Backend
1.  Navigate to `backend/`:
    ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    pip install -r requirements.txt
    ```
2.  Set up environment variables in `.env`:
    ```env
    DATABASE_URL=postgresql://postgres:postgres@localhost:5432/jobtrackr
    SECRET_KEY=your_secret_key_here
    ALGORITHM=HS256
    ACCESS_TOKEN_EXPIRE_MINUTES=60
    ```
3.  Run migrations and start:
    ```bash
    alembic upgrade head
    uvicorn app.main:app --reload
    ```

#### Frontend
1.  Navigate to `frontend/`:
    ```bash
    cd frontend
    npm install
    ```
2.  Start the development server:
    ```bash
    npm run dev
    ```

---

## ☁️ Infrastructure & Deployment

### Terraform (Provisioning)
Infrastructure is managed in the `/terraform` directory.
```bash
cd terraform
terraform init
terraform plan
terraform apply
```

### Ansible (Configuration)
The EC2 instances are configured using Ansible playbooks located in `/ansible`.
```bash
cd ansible
ansible-playbook -i inventory.ini playbook.yml
```

### GitHub Actions (CI/CD)
The project uses GitHub Actions (`.github/workflows/ci.yml`) to:
1.  Run backend tests on every PR.
2.  Build and push Docker images to **GitHub Container Registry (GHCR)** upon merging to `master`.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

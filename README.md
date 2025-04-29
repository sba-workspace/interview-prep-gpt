# InterviewPrepGPT

**InterviewPrepGPT** is an AI-powered behavioral interview coach that helps users practice mock interview questions and receive real-time feedback. It features voice input support, and GPT-based feedback leveraging few-shot prompt chaining and memory components.

---

## Features

- **Voice Input**: Use your microphone to answer questions.
- **Conversational UI**: Chat-like interface for a natural interview feel.
- **AI Feedback**: GPT-generated feedback based on the STAR method.
- **Few-shot Prompting**: Context-aware coaching with sample-based learning.
- **LangChain Memory**: Progressive conversation memory using MongoDB.
- **Cloud Deployment Ready**: Dockerized and CI/CD enabled for production.

---

## Tech Stack

### Backend
- Python 3.10+
- FastAPI
- OpenAI API (ChatGPT / GPT-4)
- LangChain
- MongoDB Atlas
- Google Cloud Speech-to-Text

### Frontend
- React
- TypeScript
- Tailwind CSS
- Zustand (or React Context)

### DevOps
- GitHub Actions (CI/CD)
- Docker
- AWS ECS / GCP GKE (Deployment)

### Testing
- pytest (Backend)
- Playwright or Cypress (Frontend E2E)

---

## Installation

### Prerequisites
- Node.js >= 18
- Python >= 3.10
- Docker (optional for deployment)
- MongoDB Atlas account
- OpenAI API Key
- Google Cloud Speech-to-Text Key

### Clone Repository
```bash
git clone https://github.com/yourusername/InterviewPrepGPT.git
cd InterviewPrepGPT
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Running Tests

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npx playwright test  # or use Cypress
```

---

## 📚 Documentation

- [User Stories](./docs/user-stories.md)
- [API Reference](./docs/api.md)
- [System Architecture](./docs/architecture.md)
- [Deployment Guide](./docs/deployment.md)
- [Troubleshooting](./docs/troubleshooting.md)

---

## 📅 Development Timeline

Project is structured into a 9-week roadmap. See `docs/roadmap.md` for detailed weekly goals and deliverables.


---


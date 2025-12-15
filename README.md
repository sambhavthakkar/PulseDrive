# Pulse Drive
## Autonomous Agentic AI Platform for Predictive Automotive Maintenance

Pulse Drive is an agent-driven predictive maintenance platform designed for modern automotive ecosystems. It enables vehicles to self-monitor, self-diagnose, and proactively coordinate service actions using real-time telemetry, AI diagnostics, and closed-loop manufacturing feedback.

The platform demonstrates how Agentic AI can transform reactive aftersales systems into autonomous, intelligent vehicle health management workflows, improving uptime, safety, customer experience, and manufacturing quality.

## Why Pulse Drive Matters

India records lakhs of road accidents annually, many aggravated by poor vehicle health monitoring and delayed maintenance. Today’s automotive systems remain largely reactive — problems are detected only after failure.

Pulse Drive shifts this paradigm by:

*   Predicting failures **before** breakdowns occur
*   Proactively scheduling service actions
*   Closing the loop between aftersales and manufacturing teams
*   Enabling safer, smarter, and more reliable vehicles

## Core Concept: Agentic AI Architecture

Pulse Drive is built around a **Master Orchestrator Agent** that coordinates multiple specialized AI agents to autonomously execute end-to-end maintenance workflows.

Each agent has a clearly defined role and communicates via APIs and real-time events, enabling decision-making without manual intervention.

### Key AI Agents

*   **Data Analysis Agent** – Ingests and normalizes live vehicle telemetry
*   **Diagnosis Agent** – Predicts component failures and risk levels
*   **Digital Twin Agent** – Simulates component stress using telemetry-driven models
*   **Voice Engagement Agent** – Communicates with drivers using natural language
*   **Scheduling Agent** – Autonomously books optimal service appointments
*   **UEBA Security Agent** – Monitors agent behavior for anomalies and misuse
*   **Feedback Agent** – Captures post-service feedback and satisfaction
*   **Manufacturing Insights Agent** – Feeds RCA/CAPA insights back to OEM teams

## Key Features

*   **Real-time Vehicle Dashboard**: Live visualization of vehicle health, battery, mileage, and critical signals.
*   **Predictive Diagnostics**: AI models detect early warning patterns and estimate failure probabilities.
*   **Digital Twin Simulation**: Lightweight telemetry-driven simulations to validate predicted failures before action.
*   **Autonomous Service Scheduling**: AI recommends and confirms service slots based on urgency and availability.
*   **Voice-Based Customer Engagement**: Natural, persuasive voice interactions for maintenance alerts and approvals.
*   **UEBA Security Monitoring**: Trust scoring and anomaly detection for autonomous agent interactions.
*   **Manufacturing Feedback Loop**: Aggregated failure insights help reduce recurring defects and improve product quality.
*   **Dark / Light Theme Responsive UI**: Modern, production-style interface optimized for different screen sizes.

## Technology Stack

### Frontend

*   **React 19 + Vite** – High-performance modern frontend
*   **Tailwind CSS (v4)** – Scalable design system
*   **Framer Motion** – Smooth micro-interactions and animations
*   **Recharts** – Interactive telemetry and analytics charts
*   **Lucide React** – Consistent iconography

### Backend

*   **FastAPI (Python)** – High-speed, production-ready APIs
*   **WebSockets** – Real-time telemetry and agent event streaming
*   **Pandas** – Telemetry analysis and aggregation
*   **ElevenLabs** – Voice synthesis integration (backend-ready)

## End-to-End Workflow (Demo Flow)

1.  Vehicle telemetry is ingested in real time
2.  AI detects anomalies and predicts failures
3.  Digital Twin validates stress scenarios
4.  Voice Agent notifies the driver proactively
5.  Scheduling Agent books service autonomously
6.  UEBA monitors agent actions for security
7.  Feedback and RCA insights loop back to manufacturing

## Getting Started

### Prerequisites

*   Node.js (v18+)
*   Python (v3.10+)
*   npm or yarn

### Setup

```bash
git clone https://github.com/yourusername/pulse-drive.git
cd pulse-drive
```

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
# source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

*   📍 **Frontend**: http://localhost:5173
*   📍 **Backend API**: http://localhost:8000
*   📍 **Swagger Docs**: http://localhost:8000/docs

## 📂 Project Structure

```
Pulse Drive/
├── backend/            # FastAPI backend (Python)
│   ├── routers/        # API endpoints
│   ├── services/       # Agent orchestration & logic
│   └── main.py
├── src/                # React frontend
│   ├── pages/          # Dashboard, Diagnosis, Scheduling, etc.
│   ├── components/     # Reusable UI & agent widgets
│   └── services/       # API integration layer
└── README.md
```

## ⚠️ Notes

*   Uses synthetic telemetry data for demonstration purposes
*   Designed for scalable OEM deployment, not just a prototype UI
*   Architecture supports easy extension to real vehicle telematics APIs

## Hackathon Value Proposition

Pulse Drive demonstrates:

*   Practical Agentic AI orchestration
*   Real-world automotive workflows
*   Strong system thinking (not just UI or models)
*   Clear business and safety impact

It showcases how autonomous AI agents can move the automotive industry from reactive maintenance to intelligent, self-managing vehicles.

<p align="center">
  <img src="https://img.shields.io/badge/Project-TheraNova%20AI-1f75fe?style=for-the-badge&logo=ai" />
  <a href="https://unstop.com/competitions/ey-techathon-60-ey-1552002">
    <img src="https://img.shields.io/badge/Hackathon-EY%20Techathon%206.0-fdc500?style=for-the-badge&logo=ey" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Backend-Spring%20Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white" />
  <img src="https://img.shields.io/badge/Frontend-React-61DBFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/ML-FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/Database-MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-MVP%20Prototype-green?style=flat-square" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" />
</p>

### 👥 Contributors
<p align="center">
  <a href="https://github.com/Tanyajain2006/TheraNova-AI-What-If-Simulator-for-Drug-Repurposing/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=Tanyajain2006/TheraNova-AI-What-If-Simulator-for-Drug-Repurposing" />
  </a>
</p>

<p align="center">Made with ❤️ by our amazing team!</p>



# 🌟 TheraNova AI – What-If Drug Repurposing Simulator
<p align="center">
  Helping pharma teams make faster, evidence-driven clinical decisions
</p>

<p align="center">
  <img src="https://img.icons8.com/color/96/artificial-intelligence.png" width="120"/>
</p>

> **“Accelerating drug innovation with clinical intelligence.”**

TheraNova AI is a clinical intelligence platform that enables pharmaceutical companies to quickly assess whether an **existing drug molecule** can be **repurposed to treat a new disease**.  
Our What-If Simulator predicts **success probability**, shows **clinical evidence**, identifies **competitor activity**, and allows users to **save decision history**.

## 🚀 Problem We Solve

Drug discovery is:
- ⏳ Slow — 10–15 years
- 💰 Expensive — billions of dollars
- 🔎 High uncertainty — huge risk of failure

Meanwhile, **already-approved medicines** may help cure **other diseases**, but teams lack a **fast way to validate new use cases**.

✔ Our AI reduces decision time from **months → seconds**

## 🎯 What Our Solution Does

1️. User enters **drug molecule + target disease**  
2️. AI analyzes:
- Past clinical trials
- Biological evidence indicators
- Competitor involvement
  
3️. System generates:
- Repurposing Score (0–1)
- Overall verdict (Strong / Promising / Low)
- Trial evidence summary
- Competitor landscape
  
4️. Results can be **saved to history** for reuse

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Axios |
| Backend | Spring Boot (REST API) |
| ML Service | Python + FastAPI |
| Database | MySQL |
| Architecture | Microservices + REST |
| Deployment (Future) | Docker + Cloud |

## 📐 System Architecture
<img width="1182" height="349" alt="Screenshot 2025-12-05 105551" src="https://github.com/user-attachments/assets/5d5570e0-68fe-44e3-9bf1-86ee2135d7e5" />

<img width="1347" height="897" alt="diagram-export-05-12-2025-10_25_00" src="https://github.com/user-attachments/assets/77ba890e-19c2-4202-a80d-8cc8a9fab3dc" />

## ✨ Core Features

| Feature | Description |
|--------|-------------|
| What-If Simulator | Predict repurposing viability instantly |
| AI-driven scoring | Scientific & competitive logic applied |
| Evidence highlights | Trial results summarized |
| Competitor intelligence | Who else is working on it |
| History saving | Auto-persistent insights in DB |

## 📸 UI Preview (Wireframe)
<img width="1365" height="574" alt="image" src="https://github.com/user-attachments/assets/9f438046-b4ed-48b4-bcf5-8fd8da41a2aa" />

## 📡 API Endpoints

### Backend (Spring Boot)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /api/health | Backend check |
| POST | /api/analyze | Analyze molecule-disease pair |
| POST | /api/analyses | Save analysis record |
| GET | /api/analyses | Get saved history |

### ML Service (FastAPI)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /score | Predict success score & provide evidence |

---
## ▶ Running Instructions

1. Spring Boot Backend
```sh
mvn spring-boot:run
```
Server starts at:
```bash
http://localhost:8080/api/health
```

2. React Frontend
```sh
npm install
npm run dev
```
Runs at: 
```arduino
http://localhost:3000
```

3. ML Service
```sh
uvicorn main:app --reload --port 8000
```

### 👥 Team Contributions

| Member        | Role               | Responsibilities                                                                |
|-------------- |------------------- |---------------------------------------------------------------------------------|
| **Tanya**     | Backend Lead       | Designed REST APIs, implemented Spring Boot services, integrated MySQL database |
| **Sakshi**    | AI/ML Engineer     | Developed ML scoring engine, built FastAPI microservice, evidence extraction    |
| **Stuti**     | Frontend Developer | Designed UI screens, integrated backend APIs, results visualization dashboard   |
| **Dhananjay** | DevOps Engineer    | Local deployment setup, environment configuration, ensured service connectivity |

### 🔮 Future Enhancements

| Planned Feature             | Purpose                              |
| --------------------------- | ------------------------------------ |
| RepurposeBot                | Ask chat-based questions on evidence |
| Innovation Radar            | Competitive alerts via dashboards    |
| Regulatory data integration | Real-time approvals tracking         |
| Analytics dashboard         | Portfolio & pipeline insights        |

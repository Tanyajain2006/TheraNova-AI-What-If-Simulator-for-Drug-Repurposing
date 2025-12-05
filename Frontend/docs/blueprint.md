# **App Name**: Repurpose AI

## Core Features:

- Molecule "What-If" Simulator: Allows users to input a molecule and a disease to instantly pull mechanism of action, trial history, competitor filings, and market size using generative AI to generate a hypothetical innovation case.
- Patient-First RepurposeBot: Surfaces hidden off-label signals by analyzing anonymized patient forum posts, guideline updates, and observational studies using generative AI as a tool to discover what patients are already trying and create reports.
- Competitive Innovation Radar: Continuously scans ClinicalTrials.gov, patents, and journals, sending instant alerts on competitor activity. This uses generative AI to find important data.
- Data Integration Layer: Automated ingestion from ClinicalTrials.gov, PubMed, FDA databases, EMA filings, patent offices, and proprietary pharma databases via APIs and web scraping.
- AI Processing Engine: Employs large language models (GPT-4, Claude) fine-tuned on pharmaceutical literature; natural language processing for entity extraction; machine learning models for signal detection.
- Knowledge Graph Construction: Dynamic mapping of molecules, diseases, mechanisms, trials, and competitors for enabling semantic search and relationship discovery using Neo4j graph database.
- User Interface & Alerts: A React.js frontend application, build visualizations dashboards and alerts; exportable innovation dossiers in PDF format

## Style Guidelines:

- Primary color: Dark purple (#6246EA) to represent intelligence and focus.
- Background color: Very light purple (#F8F7FF).
- Accent color: Teal (#2EC4B6) to highlight actionable insights.
- Body font: 'Inter' (sans-serif) for a modern, neutral look.
- Headline font: 'Space Grotesk' (sans-serif) for a techy, scientific feel. It will be paired with Inter for the body.
- Use clear, informative icons to represent different data types and actions.
- Implement a clean, intuitive layout with clear sections for different types of information.
- Subtle animations for loading states and transitions to enhance user experience.
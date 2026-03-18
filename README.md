# FedMed

> Federated Learning Platform for Privacy-Preserving Healthcare AI

FedMed enables hospitals and healthcare institutions to collaboratively train AI models without sharing patient data. Orchestrate federated learning across a hospital network with differential privacy, compliance monitoring, and data quality controls.

## Features

- **Hospital Network** -- Visualize and manage participating institutions on an interactive map
- **Training Orchestrator** -- Configure and run federated learning rounds across sites
- **Privacy Analytics** -- Monitor differential privacy budgets and anonymization metrics
- **Site Performance** -- Compare training performance and contribution across hospitals
- **Data Quality Monitor** -- Detect and flag data quality issues at each participating site
- **Compliance Dashboard** -- HIPAA, GDPR, and institutional compliance tracking

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Charts:** Recharts
- **State Management:** Zustand
- **Icons:** Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your SUPABASE_URL and SUPABASE_ANON_KEY

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  app/
    page.tsx                    # Main application with header navigation
  components/
    HospitalNetwork.tsx         # Hospital network map and list
    TrainingOrchestrator.tsx    # Federated training controls
    PrivacyAnalytics.tsx        # Differential privacy metrics
    SitePerformanceView.tsx     # Per-site training performance
    DataQualityMonitor.tsx      # Data quality dashboards
    ComplianceDashboard.tsx     # Regulatory compliance tracking
  lib/
    store.ts                    # Zustand state management
    mock-data.ts                # Sample hospitals, runs, and metrics
```


# Navya — Post-Harvest Quality Claims & Dispute Redressal Protocol

<div align="center">

[![Deploy to GitHub Pages](https://github.com/sky-ruler/navya-dispute-protocol/actions/workflows/deploy.yml/badge.svg)](https://github.com/sky-ruler/navya-dispute-protocol/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-004d38.svg)](LICENSE)
[![React 19](https://img.shields.io/badge/React-19.2-61dafb.svg?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Hardware Sensors](https://img.shields.io/badge/Sensors-Sensirion%20SGP30%20%2B%20SHT31-059669.svg)](https://sensirion.com/)
[![SIH Context](https://img.shields.io/badge/Initiative-Smart%20India%20Hackathon-f59e0b.svg)](https://sih.gov.in/)

**An objective, sensor-grounded dispute resolution and telemetry calibration platform bridging Indian farmers and APMC Mandi aggregators.**

[🚀 **Launch Live Application**](https://sky-ruler.github.io/navya-dispute-protocol/) • [📖 **Architecture**](#-hardware--sensor-architecture) • [⚡ **Quickstart**](#-getting-started) • [🤝 **Contributing**](CONTRIBUTING.md)

</div>

---

## 📌 Problem Context & Executive Summary

In India's post-harvest agricultural supply chains, over **₹15,000+ Crores** worth of fresh fruits and vegetables spoil annually between farm packing gates and wholesale APMC Mandis.

### The Mandi Settlement Gridlock
When a consignment of mangoes, apples, or tomatoes arrives at a terminal mandi with spoilage:
1. **The Dealer** unilaterally claims the produce was poor quality upon dispatch and cuts payment deductions of **30% to 50%**.
2. **The Farmer** insists the crop was harvested Grade A and that spoilage was caused by transit thermal shock or broken cold-chain logistics.
3. **The Result**: With zero objective data, disputes descend into friction, delayed payments, or total claim rejection, with smallholder farmers bearing the entire financial loss.

**Navya solves this** by coupling **Sensirion hardware telemetry** (TVOC ethylene gas + temperature + humidity) with a **cryptographic smart crate passport** and an **intuitive bilateral redressal workflow**.

---

## 🌟 Key Capabilities

```
  ┌───────────────────────┐       ┌───────────────────────┐       ┌───────────────────────┐
  │   FARM GATE SENSING   │       │   TRANSIT TELEMETRY   │       │  MANDI VERIFICATION   │
  │  Sensirion SGP30 TVOC │ ────> │ Baseline Comparison & │ ────> │  Live QR Camera Scan  │
  │  Sensirion SHT31 Temp │       │ Storage Drift Audit   │       │  & Bilateral Settlement
  └───────────────────────┘       └───────────────────────┘       └───────────────────────┘
```

### 1. 📷 Smart Crate QR Passport & Live Camera Scanner
- **Direct Camera Access**: Uses `navigator.mediaDevices.getUserMedia` with automatic constraints fallback across mobile, tablet, and desktop webcams.
- **Dual Mode Viewfinder**: Real-time camera feed with corner target reticles and animated laser sweep, plus an animated 60 FPS Mandi crate canvas simulation for zero-camera dev testing.
- **Cryptographic Lot Matching**: Instantly parses lot codes (e.g. `NAV-2026-MNG-118`), matches the farm-gate certificate, and populates complaint forms in 1 tap.

### 2. 🔬 Sensirion Hardware Telemetry Audit
- **Sensirion SGP30 Gas Baseline**: Tracks Total Volatile Organic Compounds (TVOC) and Ethylene ($C_2H_4$) respiration spikes (e.g. baseline 280 ppb $\rightarrow$ 1,650 ppb upon decay).
- **Sensirion SHT31 Climate Audit**: Measures transit thermal shock ($\Delta T$) and relative humidity condensing thresholds ($>85\%$ RH).
- **Objective Root-Cause Verdict**: Distinguishes between farm-gate defect, transit heating, and rough crate handling.

### 3. 📝 Farmer-Centric 3-Step Complaint Filing
- Designed for simplicity and clarity:
  1. **Pick or Scan Crate**: 1-click batch selection or QR camera scan.
  2. **Select Defect**: Clear, visual category cards (*Spoiled Early*, *Carbide Smell*, *Transit Heat*, *Crate Damage*) with crate counts.
  3. **Photo Evidence & Submit**: Take or upload produce photos with 1-tap test samples.

### 4. 🤝 Bilateral Redressal Engine
- **Fair Settlement Actions**: Mandi aggregators can propose concrete remedies:
  - 🔄 **Replacement Batch**: Send replacement fresh crates from next dispatch.
  - 🏷️ **Price Discount**: Deduct agreed monetary loss (₹) from the invoice.
  - 🔬 **Mandi Kiosk Re-Check**: Request physical re-inspection at the nearest sensor kiosk.
  - 🛑 **Decline Claim**: Decline with sensor proof and written notes.
- **Bilateral Feedback & Trust Score**: Both parties submit 5-star feedback, updating the immutable Navya Trust Score.

### 5. 🪙 Mandi Rewards & Credit Wallet
- Farmers and aggregators earn credits for rating AI shelf-life accuracy and successfully closing bilateral settlements without escalation.
- Redeemable for mandi gate-pass discounts, kiosk vouchers, and packaging crates.

### 6. 🌐 Native Multilingual Support
- Real-time language switching:
  - **English**
  - **Hindi (हिंदी)**
  - **Odia (ଓଡ଼ିଆ)**
  - **Marathi (मराठी)**

---

## 🔬 Hardware & Sensor Architecture

| Sensor | Parameter | Measurement Range | Accuracy / Resolution | Target Produce Biomarker |
| :--- | :--- | :--- | :--- | :--- |
| **Sensirion SGP30** | TVOC (Total VOCs) | 0 – 60,000 ppb | 15% typ. / multi-pixel MOX | Ethylene ($C_2H_4$) respiration, ethanol, ester decay |
| **Sensirion SGP30** | $eCO_2$ (eq. $CO_2$) | 400 – 60,000 ppm | Calibrated from $H_2$ signal | Produce respiration rate in airtight reefer crates |
| **Sensirion SHT31** | Temperature | -40°C to +125°C | $\pm 0.2^\circ\text{C}$ typ. | Transit cooling break & solar exposure thermal shock |
| **Sensirion SHT31** | Relative Humidity | 0% to 100% RH | $\pm 2.0\%\text{ RH}$ typ. | Moisture condensation triggering fungal spores (*Botrytis*) |

---

## 📁 Repository Structure

```
navya-dispute-protocol/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions automated GitHub Pages CI/CD
├── public/                     # Static assets & icons
├── src/
│   ├── assets/
│   │   └── css/
│   │       └── navya-feedback.css # Unified responsive design system
│   ├── components/
│   │   ├── common/             # Navbar, Footer, LanguageModal, RewardsBalanceModal
│   │   ├── filing/             # QrScannerModal, ReportUploader, TelemetryComparison
│   │   └── redressal/          # ActionModal, FeedbackModal, RatePredictionModal
│   ├── pages/
│   │   ├── HomePage.jsx        # Dual-role hero, recent disputes, quick actions
│   │   ├── FileComplaintPage.jsx # Farmer 3-step filing workflow
│   │   ├── DisputeDetailsPage.jsx # Telemetry audit, timeline, bilateral actions
│   │   ├── DealerDashboardPage.jsx # Aggregator queue, metrics & settlement offers
│   │   └── BatchExplorerPage.jsx # Crate inventory & sensor passport inspector
│   ├── services/
│   │   ├── disputeService.js   # Dispute state, timeline & audit ledger store
│   │   ├── languageService.js  # Multilingual dictionary (EN, HI, OR, MR)
│   │   └── mockData.js         # Seed batches, crates, defect photos & telemetry
│   ├── App.jsx                 # App root & role-based view routing
│   └── main.jsx                # React DOM entrypoint
├── index.html                  # HTML5 shell
├── vite.config.js              # Vite bundler config with relative GitHub Pages base
├── package.json                # Project dependencies & metadata
├── LICENSE                     # MIT Open Source License
├── CONTRIBUTING.md             # Contribution guidelines
├── SECURITY.md                 # Security & vulnerability reporting policy
└── README.md                   # This documentation
```

---

## ⚡ Getting Started

### Prerequisites
- **Node.js**: v18.0 or higher (v20+ recommended)
- **npm**: v9.0 or higher

### 1. Clone & Install
```bash
git clone https://github.com/sky-ruler/navya-dispute-protocol.git
cd navya-dispute-protocol
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

### 3. Build for Production
```bash
npm run build
```
Compiled static assets will be output to `dist/` with relative asset links ready for any static web host or CDN.

---

## 🚀 Deployment to GitHub Pages

This repository is pre-configured with a **zero-config GitHub Actions workflow** located at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

### Automated Deployment
1. Push your changes to the `main` branch:
   ```bash
   git push origin main
   ```
2. The GitHub Action will automatically:
   - Check out the repository
   - Set up Node.js 20
   - Run `npm ci` and `npm run build`
   - Upload and publish the `dist/` bundle to GitHub Pages
3. Your live application will be available at:
   **`https://sky-ruler.github.io/navya-dispute-protocol/`**

### Repository Settings Note
If deploying to GitHub Pages for the first time:
1. Go to your repository **Settings** $\rightarrow$ **Pages**.
2. Under **Build and deployment** $\rightarrow$ **Source**, select **GitHub Actions**.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Developed with ❤️ for Indian Agriculture & APMC Mandi Communities</sub>
</div>

# Contributing to Navya

Thank you for your interest in contributing to the **Navya Dispute & Redressal Protocol**!

Navya is an open-source post-harvest produce quality verification, sensor telemetry calibration, and dispute resolution protocol designed to eliminate unfair financial deductions for Indian farmers and APMC Mandi aggregators.

---

## Code of Conduct

We are committed to providing a welcoming, inclusive, and harassment-free experience for everyone. Please treat all contributors and maintainers with respect, fairness, and constructive communication.

---

## How Can You Contribute?

1. **Reporting Bugs**: Open an issue describing the bug, reproduction steps, expected vs. actual behavior, and screenshots or logs.
2. **Suggesting Enhancements**: Propose new hardware sensor integrations (e.g. ethylene $C_2H_4$, $CO_2$ gas detectors), APMC Mandi workflow improvements, or UI/UX enhancements.
3. **Submitting Pull Requests**: Follow the workflow below.

---

## Development Workflow

### Prerequisites
- Node.js 18+ (Node 20 recommended)
- npm 9+
- Git

### Setup
```bash
# Fork & clone the repository
git clone https://github.com/<your-username>/navya-dispute-protocol.git
cd navya-dispute-protocol

# Install dependencies
npm install

# Start development server
npm run dev
```

### Pull Request Guidelines
1. Create a feature branch: `git checkout -b feat/your-feature-name`
2. Ensure code passes linting: `npm run lint`
3. Verify production build succeeds: `npm run build`
4. Commit your changes with descriptive messages:
   - `feat: ...` for new capabilities
   - `fix: ...` for bug fixes
   - `docs: ...` for documentation improvements
   - `style: ...` for design or CSS updates
5. Push to your fork and submit a PR to `main` with a clear description and screenshots where applicable.

---

## Architecture Principles
- **Sensory Ground Truth First**: Hardware telemetry (Sensirion SGP30, SHT31) takes precedence over subjective opinion.
- **Farmer Accessibility**: Keep user interactions simple, high-contrast, bilingual/multilingual, and low cognitive load.
- **Bilateral Fairness**: Ensure both farmers and mandi dealers have equal agency to propose, negotiate, and verify claims.

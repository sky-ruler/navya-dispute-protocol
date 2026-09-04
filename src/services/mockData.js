// =========================================================
// NAVYA POST-HARVEST MOCK REPOSITORY & SEED TELEMETRY
// Pre-loaded with realistic SGP30 gas curves, SHT31 data, and dispute logs
// =========================================================

export const SEED_BATCHES = [
  {
    id: "NAV-2026-APL-409",
    crop: "Apple",
    variety: "Royal Delicious",
    emoji: "🍎",
    farmer: {
      name: "Rajesh Kumar",
      fpo: "Shimla Agro Produce FPO",
      region: "Kotkhai, Himachal Pradesh",
      phone: "+91 98160 12480"
    },
    dealer: {
      name: "FreshRoots Mandi Logistics",
      hub: "Azadpur Mandi Hub #4, Delhi",
      contact: "Anil Mehra (+91 98711 00234)"
    },
    quantityCrates: 180,
    quantityKg: 3600,
    harvestDate: "2026-09-01",
    certifiedGrade: "Grade A",
    farmGateScore: 92,
    predictedShelfLifeDays: 12,
    initialTelemetry: {
      tvoc_ppb: 125,
      eco2_ppm: 440,
      temp_c: 16.5,
      humidity_rh: 68.2,
      dvoc_dt_slope: 0.12 // Normal gradual ripening slope
    },
    lastCheckpoint: "Warehouse Dispatch Gate 2",
    checkpointTimestamp: "2026-09-03 14:30 IST",
    status: "DISPATCHED"
  },
  {
    id: "NAV-2026-MNG-118",
    crop: "Mango",
    variety: "Ratnagiri Alphonso",
    emoji: "🥭",
    farmer: {
      name: "Ganesh Patil",
      fpo: "Konkan Mango Growers Cooperative",
      region: "Ratnagiri, Maharashtra",
      phone: "+91 94220 89112"
    },
    dealer: {
      name: "Apex Retail Marts & QuickCommerce",
      hub: "Vashi APMC Center, Navi Mumbai",
      contact: "Sunil Shinde (+91 98200 45678)"
    },
    quantityCrates: 120,
    quantityKg: 2400,
    harvestDate: "2026-08-31",
    certifiedGrade: "Grade A+",
    farmGateScore: 96,
    predictedShelfLifeDays: 7,
    initialTelemetry: {
      tvoc_ppb: 280,
      eco2_ppm: 510,
      temp_c: 22.0,
      humidity_rh: 60.5,
      dvoc_dt_slope: 0.85 // High slope — potential carbide suspicion
    },
    lastCheckpoint: "Warehouse Intake Bay 4",
    checkpointTimestamp: "2026-09-02 09:15 IST",
    status: "IN_TRANSIT"
  },
  {
    id: "NAV-2026-TOM-892",
    crop: "Tomato",
    variety: "Organic Roma",
    emoji: "🍅",
    farmer: {
      name: "Sita Devi",
      fpo: "Nashik Valley Kisan Cluster",
      region: "Pimpalgaon, Maharashtra",
      phone: "+91 97654 32109"
    },
    dealer: {
      name: "QuickFresh Dark Stores",
      hub: "Pune Western Distribution Hub",
      contact: "Pooja Deshmukh (+91 91580 98765)"
    },
    quantityCrates: 300,
    quantityKg: 6000,
    harvestDate: "2026-09-02",
    certifiedGrade: "Grade B+",
    farmGateScore: 84,
    predictedShelfLifeDays: 5,
    initialTelemetry: {
      tvoc_ppb: 140,
      eco2_ppm: 460,
      temp_c: 24.2,
      humidity_rh: 72.0,
      dvoc_dt_slope: 0.22
    },
    lastCheckpoint: "Cold Storage Dwell Stage",
    checkpointTimestamp: "2026-09-03 18:00 IST",
    status: "DELIVERED"
  },
  {
    id: "NAV-2026-BAN-554",
    crop: "Banana",
    variety: "Robusta Cavendish",
    emoji: "🍌",
    farmer: {
      name: "Venkatesh Rao",
      fpo: "Jalgaon Banana Producer Co.",
      region: "Raver, Maharashtra",
      phone: "+91 93700 65432"
    },
    dealer: {
      name: "Metro Fresh Aggregation",
      hub: "Kalyan Mandi Complex, Mumbai",
      contact: "Vikram Jadhav (+91 98900 11223)"
    },
    quantityCrates: 220,
    quantityKg: 4400,
    harvestDate: "2026-08-30",
    certifiedGrade: "Grade A",
    farmGateScore: 90,
    predictedShelfLifeDays: 4,
    initialTelemetry: {
      tvoc_ppb: 380,
      eco2_ppm: 620,
      temp_c: 19.8,
      humidity_rh: 75.0,
      dvoc_dt_slope: 0.45
    },
    lastCheckpoint: "Dispatch Bay 1",
    checkpointTimestamp: "2026-09-02 22:00 IST",
    status: "DELIVERED"
  }
];

export const SEED_DISPUTES = [
  {
    id: "DISP-8041",
    batchId: "NAV-2026-APL-409",
    crop: "Apple",
    variety: "Royal Delicious",
    emoji: "🍎",
    complainantRole: "DEALER",
    complainantName: "Anil Mehra (FreshRoots Mandi Logistics)",
    respondentName: "Rajesh Kumar (Shimla Orchards FPO)",
    filingDate: "2026-09-04 11:20 IST",
    defectCategory: "PREMATURE_DECAY",
    defectTitle: "Bottom Layer Fungal Condensation & Premature Softening",
    description: "Upon unloading crates 40 through 75 at Azadpur dock, bottom layer apples exhibited wet breakdown and fungal spotting. The surface scans at farm-gate indicated Grade A, but trapped condensation during dispatch accelerated decay.",
    severity: "MODERATE",
    affectedCrates: 35,
    affectedKg: 700,
    estimatedDisputeAmountInr: 12500,
    requestedRemedy: "CREDIT_NOTE",
    evidenceImages: [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579613832125-5d34a13ffe0a?w=600&auto=format&fit=crop&q=80"
    ],
    status: "ACTION_PROPOSED",
    telemetryComparison: {
      farmGateTvoc: 125,
      arrivalReportedTvoc: 410, // Accelerated VOC decay
      normalDecayTvoc: 195,
      tempDelta: "+4.5°C over optimal",
      verdict: "Accelerated ripening driven by transport humidity entrapment (84% RH recorded on arrival)."
    },
    timeline: [
      {
        time: "2026-09-04 11:20 IST",
        actor: "FreshRoots Mandi (Dealer)",
        action: "Filed Quality Claim #DISP-8041 with 2 photographic proofs."
      },
      {
        time: "2026-09-04 13:45 IST",
        actor: "Navya Automated Telemetry Matcher",
        action: "Correlated arrival TVOC delta (+215 ppb) vs. farm-gate baseline. Humidity abuse identified."
      },
      {
        time: "2026-09-04 15:10 IST",
        actor: "Rajesh Kumar (Farmer FPO)",
        action: "Reviewed claim. Proposed 25% Credit Note (₹12,500) and FEFO reroute for fast retail sale."
      }
    ],
    proposedAction: {
      type: "CREDIT_NOTE",
      amountInr: 12500,
      discountPercent: 25,
      note: "Authorized 25% credit adjustment against invoice #INV-9904. Farmer FPO will claim transport transit insurance for condensation flaw.",
      proposedBy: "Rajesh Kumar (Farmer)",
      proposedAt: "2026-09-04 15:10 IST"
    },
    feedback: null
  },
  {
    id: "DISP-7920",
    batchId: "NAV-2026-MNG-118",
    crop: "Mango",
    variety: "Ratnagiri Alphonso",
    emoji: "🥭",
    complainantRole: "DEALER",
    complainantName: "Sunil Shinde (Apex Retail Marts)",
    respondentName: "Ganesh Patil (Konkan Mango Coop)",
    filingDate: "2026-09-03 16:40 IST",
    defectCategory: "CARBIDE_SUSPICION",
    defectTitle: "Abnormal Acetylene Spike & Surface Pitting",
    description: "Retail intake kiosk flagged a sharp dVOC/dt slope. Visual color shows bright canary yellow, but pulp density remains raw-hard. Strong suspicion of post-harvest calcium carbide treatment by transit handler.",
    severity: "CRITICAL",
    affectedCrates: 60,
    affectedKg: 1200,
    estimatedDisputeAmountInr: 45000,
    requestedRemedy: "KIOSK_RESCAN",
    evidenceImages: [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80"
    ],
    status: "UNDER_INVESTIGATION",
    telemetryComparison: {
      farmGateTvoc: 280,
      arrivalReportedTvoc: 1850, // Massive spike
      normalDecayTvoc: 360,
      tempDelta: "+1.2°C",
      verdict: "Severe slope anomaly (dVOC/dt = 2.45). Consistent with acetylene gas presence rather than natural ethylene."
    },
    timeline: [
      {
        time: "2026-09-03 16:40 IST",
        actor: "Apex Retail Marts",
        action: "Flagged Batch NAV-2026-MNG-118 for suspicious chemical ripening signature."
      },
      {
        time: "2026-09-03 17:05 IST",
        actor: "Navya AI Fraud Engine",
        action: "High Fraud Likelihood (88%). Gas-vision mismatch detected: Skin chrominance indicates ripe, pulp texture indicates unripened."
      },
      {
        time: "2026-09-04 09:30 IST",
        actor: "System Administrator",
        action: "Batch placed on hold at Vashi APMC dock. Kiosk physical re-scan scheduled."
      }
    ],
    proposedAction: null,
    feedback: null
  },
  {
    id: "DISP-6511",
    batchId: "NAV-2026-TOM-892",
    crop: "Tomato",
    variety: "Organic Roma",
    emoji: "🍅",
    complainantRole: "FARMER",
    complainantName: "Sita Devi (Nashik Valley Kisan Cluster)",
    respondentName: "QuickFresh Dark Stores",
    filingDate: "2026-09-02 18:30 IST",
    defectCategory: "TRANSIT_HEAT_ABUSE",
    defectTitle: "Unrecorded 8-Hour Reefer Shutdown During Transit",
    description: "The dealer attempted to penalize the farmer for Grade C delivery at Pune hub. However, Navya GPS & SHT31 sensor log proves the logistics vehicle turned off cooling for 8 hours in transit (cabin reached 38°C), causing heat blanching.",
    severity: "CRITICAL",
    affectedCrates: 150,
    affectedKg: 3000,
    estimatedDisputeAmountInr: 32000,
    requestedRemedy: "REPLACEMENT_OR_PAYOUT",
    evidenceImages: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80"
    ],
    status: "RESOLVED",
    telemetryComparison: {
      farmGateTvoc: 140,
      arrivalReportedTvoc: 680,
      normalDecayTvoc: 180,
      tempDelta: "+13.8°C thermal excursion",
      verdict: "Telemetry exonerates farmer. Transit contractor logged 38°C thermal excursion between 11:00 and 19:00."
    },
    timeline: [
      {
        time: "2026-09-02 18:30 IST",
        actor: "Sita Devi (Farmer)",
        action: "Filed dispute against buyer's arbitrary quality deduction."
      },
      {
        time: "2026-09-02 19:00 IST",
        actor: "Navya IoT Telemetry Audit",
        action: "Immutable temperature log confirmed 8 hours above 35°C during highway haul."
      },
      {
        time: "2026-09-03 10:00 IST",
        actor: "QuickFresh Dark Stores (Dealer)",
        action: "Accepted fault. Transferred full payment of ₹32,000 to farmer and filed claim against logistics hauler."
      }
    ],
    proposedAction: {
      type: "FULL_PAYOUT",
      amountInr: 32000,
      discountPercent: 100,
      note: "Full compensation disbursed to farmer account via Escrow. Transit company penalized.",
      proposedBy: "QuickFresh Dark Stores",
      proposedAt: "2026-09-03 10:00 IST"
    },
    feedback: {
      farmerRating: 5,
      dealerRating: 5,
      farmerComment: "Navya's sensor log saved me from losing ₹32,000. Truth was clear.",
      dealerComment: "Telemetry made it easy to pinpoint carrier liability. Transparent resolution."
    }
  }
];

export const SAMPLE_DEFECT_PHOTOS = [
  {
    name: "Apple Bottom Rotting",
    url: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Skin Bruising & Pressure Marks",
    url: "https://images.unsplash.com/photo-1579613832125-5d34a13ffe0a?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Chemical Ripening Skin Texture",
    url: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Thermal Breakdown on Tomatoes",
    url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80"
  }
];

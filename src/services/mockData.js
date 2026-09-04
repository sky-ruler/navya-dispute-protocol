// =========================================================
// NAVYA MOCK REPOSITORY — SIMPLIFIED & REALISTIC
// Non-inflated, practical data suitable for hackathon evaluation
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
      hub: "Azadpur Mandi, Delhi",
      contact: "Anil Mehra (+91 98711 00234)"
    },
    quantityCrates: 120,
    quantityKg: 2400,
    harvestDate: "2026-09-01",
    certifiedGrade: "Grade A",
    farmGateScore: 92,
    predictedShelfLifeDays: 12,
    initialTelemetry: {
      tvoc_ppb: 125,
      eco2_ppm: 440,
      temp_c: 16.5,
      humidity_rh: 68.2
    },
    lastCheckpoint: "Warehouse Dispatch Gate",
    checkpointTimestamp: "2026-09-03 14:30",
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
      name: "Apex Retail Hub",
      hub: "Vashi APMC Market, Navi Mumbai",
      contact: "Sunil Shinde (+91 98200 45678)"
    },
    quantityCrates: 80,
    quantityKg: 1600,
    harvestDate: "2026-08-31",
    certifiedGrade: "Grade A",
    farmGateScore: 95,
    predictedShelfLifeDays: 7,
    initialTelemetry: {
      tvoc_ppb: 280,
      eco2_ppm: 510,
      temp_c: 22.0,
      humidity_rh: 60.5
    },
    lastCheckpoint: "Warehouse Intake Gate",
    checkpointTimestamp: "2026-09-02 09:15",
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
      name: "QuickFresh Local Center",
      hub: "Pune Western Mandi",
      contact: "Pooja Deshmukh (+91 91580 98765)"
    },
    quantityCrates: 150,
    quantityKg: 3000,
    harvestDate: "2026-09-02",
    certifiedGrade: "Grade B+",
    farmGateScore: 84,
    predictedShelfLifeDays: 5,
    initialTelemetry: {
      tvoc_ppb: 140,
      eco2_ppm: 460,
      temp_c: 24.2,
      humidity_rh: 72.0
    },
    lastCheckpoint: "Cold Storage Dock",
    checkpointTimestamp: "2026-09-03 18:00",
    status: "DELIVERED"
  },
  {
    id: "NAV-2026-BAN-554",
    crop: "Banana",
    variety: "Robusta",
    emoji: "🍌",
    farmer: {
      name: "Venkatesh Rao",
      fpo: "Jalgaon Banana Producer Co.",
      region: "Raver, Maharashtra",
      phone: "+91 93700 65432"
    },
    dealer: {
      name: "Metro Mandi Aggregators",
      hub: "Kalyan Mandi, Mumbai",
      contact: "Vikram Jadhav (+91 98900 11223)"
    },
    quantityCrates: 140,
    quantityKg: 2800,
    harvestDate: "2026-08-30",
    certifiedGrade: "Grade A",
    farmGateScore: 90,
    predictedShelfLifeDays: 4,
    initialTelemetry: {
      tvoc_ppb: 380,
      eco2_ppm: 620,
      temp_c: 19.8,
      humidity_rh: 75.0
    },
    lastCheckpoint: "Dispatch Gate",
    checkpointTimestamp: "2026-09-02 22:00",
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
    complainantName: "Anil Mehra (FreshRoots Mandi)",
    respondentName: "Rajesh Kumar (Shimla Orchards FPO)",
    filingDate: "Today, 11:20 AM",
    defectCategory: "PREMATURE_DECAY",
    defectTitle: "Bottom Layer Softening & Moisture Spoilage",
    description: "About 15 crates at the bottom of the truck had moisture condensation and were starting to soften. Top crates are fine.",
    severity: "MODERATE",
    affectedCrates: 15,
    affectedKg: 300,
    estimatedDisputeAmountInr: 1200, // Modest realistic adjustment
    requestedRemedy: "CREDIT_NOTE",
    evidenceImages: [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579613832125-5d34a13ffe0a?w=600&auto=format&fit=crop&q=80"
    ],
    status: "ACTION_PROPOSED",
    telemetryComparison: {
      farmGateTvoc: 125,
      arrivalReportedTvoc: 380,
      normalDecayTvoc: 180,
      simpleStatus: "EARLY_DECAY",
      simpleVerdict: "Sensor check confirms higher moisture & ripening gases than normal. Bottom crates experienced moisture entrapment during transport."
    },
    timeline: [
      {
        time: "11:20 AM",
        actor: "FreshRoots Mandi (Dealer)",
        action: "Reported 15 softened crates with 2 photos."
      },
      {
        time: "11:22 AM",
        actor: "Navya Sensor Check",
        action: "Confirmed early ripening gases in truck bottom."
      },
      {
        time: "02:15 PM",
        actor: "Rajesh Kumar (Farmer FPO)",
        action: "Offered ₹1,200 discount for the 15 damaged crates."
      }
    ],
    proposedAction: {
      type: "CREDIT_NOTE",
      amountInr: 1200,
      discountPercent: 15,
      note: "Offered ₹1,200 discount on invoice for the 15 damaged crates.",
      proposedBy: "Rajesh Kumar (Farmer)",
      proposedAt: "Today, 02:15 PM"
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
    complainantName: "Sunil Shinde (Apex Retail)",
    respondentName: "Ganesh Patil (Konkan Mango Coop)",
    filingDate: "Yesterday, 04:40 PM",
    defectCategory: "CARBIDE_SUSPICION",
    defectTitle: "Chemical Smell & Unnatural Yellowing",
    description: "Mangoes smell strongly like artificial carbide and skin is yellow but pulp is completely hard inside. Requesting sensor re-check.",
    severity: "CRITICAL",
    affectedCrates: 20,
    affectedKg: 400,
    estimatedDisputeAmountInr: 2500,
    requestedRemedy: "KIOSK_RESCAN",
    evidenceImages: [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80"
    ],
    status: "UNDER_INVESTIGATION",
    telemetryComparison: {
      farmGateTvoc: 280,
      arrivalReportedTvoc: 1650,
      normalDecayTvoc: 350,
      simpleStatus: "CHEMICAL_ALERT",
      simpleVerdict: "High gas spike detected. Chemistry signature indicates potential artificial ripening gas rather than natural ethylene."
    },
    timeline: [
      {
        time: "Yesterday, 04:40 PM",
        actor: "Sunil Shinde (Dealer)",
        action: "Reported chemical odor on 20 crates."
      },
      {
        time: "Yesterday, 04:45 PM",
        actor: "Navya Sensor Check",
        action: "Flagged abnormal gas spike. Scheduled kiosk re-scan."
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
    complainantName: "Sita Devi (Farmer)",
    respondentName: "QuickFresh Local Center",
    filingDate: "2 days ago",
    defectCategory: "TRANSIT_HEAT_ABUSE",
    defectTitle: "Tomatoes Overheated During Highway Haul",
    description: "Buyer wanted to cut price claiming Grade C. But truck temperature sensor showed truck sat in direct heat without cooling, which overheated the tomatoes.",
    severity: "CRITICAL",
    affectedCrates: 30,
    affectedKg: 600,
    estimatedDisputeAmountInr: 1800,
    requestedRemedy: "REPLACEMENT_OR_PAYOUT",
    evidenceImages: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80"
    ],
    status: "RESOLVED",
    telemetryComparison: {
      farmGateTvoc: 140,
      arrivalReportedTvoc: 580,
      normalDecayTvoc: 180,
      simpleStatus: "HEAT_EXCURSION",
      simpleVerdict: "Temperature log confirmed truck temperature exceeded 36°C for 6 hours. Overheating was during transit, not from the farm."
    },
    timeline: [
      {
        time: "2 days ago",
        actor: "Sita Devi (Farmer)",
        action: "Submitted proof showing transit overheating."
      },
      {
        time: "2 days ago",
        actor: "Navya Sensor Check",
        action: "Sensor history confirmed truck temperature went over 36°C."
      },
      {
        time: "Yesterday",
        actor: "QuickFresh (Dealer)",
        action: "Accepted transport fault. Cleared farmer payment without deduction."
      }
    ],
    proposedAction: {
      type: "FULL_PAYOUT",
      amountInr: 1800,
      discountPercent: 100,
      note: "Cleared full payment without any quality deduction. Transport carrier took responsibility.",
      proposedBy: "QuickFresh Local Center",
      proposedAt: "Yesterday, 10:00 AM"
    },
    feedback: {
      rating: 5,
      comment: "Sensor data made it very clear that tomatoes were fresh at harvest and ruined by truck heat. Fairly solved!"
    }
  }
];

export const SAMPLE_DEFECT_PHOTOS = [
  {
    name: "Softened / Bruised Produce",
    url: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Pressure Marks & Bruising",
    url: "https://images.unsplash.com/photo-1579613832125-5d34a13ffe0a?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Chemical Ripening Skin Signs",
    url: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Overripe / Heat Softening",
    url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80"
  }
];

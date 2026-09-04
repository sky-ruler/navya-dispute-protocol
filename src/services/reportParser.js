// =========================================================
// NAVYA REPORT PARSER SERVICE
// Extracts batch telemetry, farm gate grade, and metadata from uploaded reports
// =========================================================

import { SEED_BATCHES } from './mockData';

export const parseNavyaReportFile = async (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error("No file selected"));
    }

    const fileName = file.name.toLowerCase();
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const textContent = e.target.result;

        // 1. Try parsing as JSON first
        if (fileName.endsWith('.json')) {
          try {
            const parsedJson = JSON.parse(textContent);
            const batchId = parsedJson.batchId || parsedJson.id || parsedJson.BatchID;
            if (batchId) {
              const matchedSeed = SEED_BATCHES.find(b => b.id.toUpperCase() === batchId.toUpperCase());
              return resolve({
                batchId: batchId,
                crop: parsedJson.crop || matchedSeed?.crop || "Produce Lot",
                variety: parsedJson.variety || matchedSeed?.variety || "Standard",
                farmGateScore: parsedJson.farmGateScore || matchedSeed?.farmGateScore || 90,
                certifiedGrade: parsedJson.certifiedGrade || matchedSeed?.certifiedGrade || "Grade A",
                farmerName: parsedJson.farmerName || matchedSeed?.farmer.name || "Registered Farmer",
                harvestDate: parsedJson.harvestDate || matchedSeed?.harvestDate || "Recent",
                telemetry: parsedJson.telemetry || matchedSeed?.initialTelemetry,
                rawContent: parsedJson,
                source: "JSON_REPORT"
              });
            }
          } catch (jsonErr) {
            console.warn("Could not parse as standard JSON, falling back to text regex extraction", jsonErr);
          }
        }

        // 2. Text / PDF-text regex scanning
        // Search for Batch ID format: e.g. NAV-2026-APL-409 or BATCH-xxxx
        const batchIdMatch = textContent.match(/NAV-\d{4}-[A-Z]{3}-\d+/i) || textContent.match(/BATCH-[A-Z0-9-]+/i);
        const batchId = batchIdMatch ? batchIdMatch[0].toUpperCase() : null;

        if (batchId) {
          const matchedSeed = SEED_BATCHES.find(b => b.id.toUpperCase() === batchId.toUpperCase());
          return resolve({
            batchId: batchId,
            crop: matchedSeed?.crop || "Detected Crop",
            variety: matchedSeed?.variety || "Standard Variety",
            farmGateScore: matchedSeed?.farmGateScore || 88,
            certifiedGrade: matchedSeed?.certifiedGrade || "Grade A",
            farmerName: matchedSeed?.farmer.name || "Verified Grower",
            harvestDate: matchedSeed?.harvestDate || "2026-09-01",
            telemetry: matchedSeed?.initialTelemetry,
            rawContent: textContent.slice(0, 500),
            source: "REGEX_TEXT_REPORT"
          });
        }

        // Fallback: If no recognized ID, return first matching seed as fallback demo
        const defaultDemo = SEED_BATCHES[0];
        resolve({
          batchId: defaultDemo.id,
          crop: defaultDemo.crop,
          variety: defaultDemo.variety,
          farmGateScore: defaultDemo.farmGateScore,
          certifiedGrade: defaultDemo.certifiedGrade,
          farmerName: defaultDemo.farmer.name,
          harvestDate: defaultDemo.harvestDate,
          telemetry: defaultDemo.initialTelemetry,
          rawContent: "Sample generic inspection extract",
          source: "FALLBACK_PARSED"
        });

      } catch (err) {
        reject(new Error("Unable to parse file content: " + err.message));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read report file"));
    };

    reader.readAsText(file);
  });
};

export const SAMPLE_NAVYA_REPORTS = [
  {
    id: "sample_apple_report",
    label: "📄 Navya_Inspection_Apple_409.json",
    batchId: "NAV-2026-APL-409",
    crop: "Apple (Royal Delicious)",
    details: "Grade A • SGP30 TVOC: 125 ppb • SHT31: 16.5°C"
  },
  {
    id: "sample_mango_report",
    label: "📄 Navya_Inspection_Mango_118.json",
    batchId: "NAV-2026-MNG-118",
    crop: "Mango (Ratnagiri Alphonso)",
    details: "Grade A+ • Suspect dVOC/dt slope: 0.85 • Intake Gate"
  },
  {
    id: "sample_tomato_report",
    label: "📄 Navya_ColdChain_Tomato_892.txt",
    batchId: "NAV-2026-TOM-892",
    crop: "Tomato (Organic Roma)",
    details: "Grade B+ • Reefer Temp Log • High Dwell Time"
  }
];

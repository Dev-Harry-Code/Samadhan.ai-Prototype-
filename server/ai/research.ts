import type { CategoryId } from "@/lib/types";

import type { EvidenceItem, EvidenceKind, ResearchResult } from "./types";

interface CorpusEntry {
  kind: EvidenceKind;
  title: string;
  source: string;
  url: string;
  snippet: string;
}

const CORPUS: Record<CategoryId, CorpusEntry[]> = {
  water: [
    {
      kind: "scheme",
      title: "Jal Jeevan Mission — Har Ghar Jal (FHTC)",
      source: "Ministry of Jal Shakti, Government of India",
      url: "https://jalshakti-dowr.gov.in/schemes/jal-jeevan-mission",
      snippet:
        "Functional household tap connections for every rural home; supports pipeline replacement and community tap coverage in Jharkhand villages.",
    },
    {
      kind: "scheme",
      title: "AMRUT 2.0 — Urban Water Supply",
      source: "Ministry of Housing & Urban Affairs, Government of India",
      url: "https://mohua.gov.in",
      snippet:
        "Universal water supply coverage in 4,900+ towns with a focus on water quality monitoring and service-level improvements.",
    },
    {
      kind: "scheme",
      title: "Jal Shakti Abhiyan — Catch the Rain",
      source: "Ministry of Jal Shakti, Government of India",
      url: "https://jalshakti-dowr.gov.in",
      snippet:
        "Nationwide water conservation campaign covering renovation of water bodies, recharge structures and village water security plans in districts like Ranchi.",
    },
    {
      kind: "paper",
      title: "Groundwater Quality and Community Supply Reliability in the Chotanagpur Plateau",
      source: "Environmental Earth Sciences, 2024",
      url: "https://link.springer.com/journal/12665",
      snippet:
        "Sampled 140+ public taps across Ranchi and Pakur; found backflow-correlated E. coli spikes near fractured distribution pipework — matching untreated pond-water ingress patterns.",
    },
    {
      kind: "case-similar",
      title: "Community Water Kiosk Pilot — Kolhan Block (LOK-0902)",
      source: "Samadhan.ai case library",
      url: "https://samadhan.ai/cases/kiosk-kolhan",
      snippet:
        "Solar-chlorinated kiosk served 800 households; 210 post-install samples verified clean. Resident operator model sustained beyond handover.",
    },
    {
      kind: "solution",
      title: "Solar-Chlorinated Community Tap Scheme",
      source: "BIT Mesra, Environmental Engineering",
      url: "https://samadhan.ai/evidence/bit-mesra-kiosk",
      snippet:
        "HDPE pipe retrofit with flanged joints, a pressure gauge and solar chlorinator before the community tap; weekly chlorine log by a local operator.",
    },
  ],
  sanitation: [
    {
      kind: "scheme",
      title: "Swachh Bharat Mission–Grameen Phase II (ODF Plus)",
      source: "Ministry of Jal Shakti, Department of Drinking Water & Sanitation",
      url: "https://swachhbharatmission.gov.in",
      snippet:
        "From ODF to ODF-Plus: garbage-fee collection points, greywater/drainage management and solid waste segregation at the village level in Jharkhand.",
    },
    {
      kind: "scheme",
      title: "Swachh Bharat Mission–Urban 2.0",
      source: "Ministry of Housing & Urban Affairs, Government of India",
      url: "https://www.mohua.gov.in",
      snippet:
        "Safe sanitation in urban wards: nil-dumping of drains, septic tank/silt traps, and remediation of open drains along school corridors.",
    },
    {
      kind: "scheme",
      title: "AMRUT 2.0 — Septage & Sewerage Management",
      source: "Ministry of Housing & Urban Affairs, Government of India",
      url: "https://mohua.gov.in",
      snippet:
        "Underground drainage design grants and faecal-sludge treatment for smaller towns qualifying under urban infrastructure funding.",
    },
    {
      kind: "paper",
      title: "Drainage Gradient and Silt Load in Small-Town Corridors of Jharkhand",
      source: "Journal of Water, Sanitation & Hygiene for Development, 2023",
      url: "https://washdev.iwaponline.com",
      snippet:
        "Measured flat-gradient overflow at school-adjacent junctions; recommends periodic silt traps and vented manholes as the highest-leverage retrofit.",
    },
    {
      kind: "case-similar",
      title: "Open Drain Overflow Near Govt. Girls School (LOK-1026)",
      source: "Samadhan.ai case library",
      url: "https://samadhan.ai/cases/school-corridor-drain",
      snippet:
        "Corridor drain re-profiled with silt trap and a restored school-side footpath; monsoon overflow eliminated in the post-retrofit season.",
    },
    {
      kind: "solution",
      title: "Corridor Drain Re-profiling + Silt Trap Scheme",
      source: "IIT Jodhpur, Civil Engineering",
      url: "https://samadhan.ai/evidence/iitj-drainage",
      snippet:
        "Improved gradient, periodic silt traps and a rainwater-harvesting outfall; community clean-up drive and signage at the school gate.",
    },
  ],
  health: [
    {
      kind: "scheme",
      title: "Ayushman Bharat — Health & Wellness Centres",
      source: "Ministry of Health & Family Welfare, Government of India",
      url: "https://ab-hwc.nhp.gov.in",
      snippet:
        "Sub-centres upgraded to HWC providing primary, preventive and tele-health services — the natural home for a 6-village shared-clinic rota.",
    },
    {
      kind: "scheme",
      title: "PM-Ayushman Bharat Health Infrastructure Mission (PM-ABHIM)",
      source: "Ministry of Health & Family Welfare, Government of India",
      url: "https://main.mohfw.gov.in",
      snippet:
        "Strengthens district/block public-health infrastructure, diagnostics and referral pathways — funding lever for PHC block-level medicine capacity.",
    },
    {
      kind: "scheme",
      title: "National Health Mission (NHM)",
      source: "Ministry of Health & Family Welfare, Government of India",
      url: "https://nhm.gov.in",
      snippet:
        "ASHA/ANM coverage, free essential drugs and maternal-child programs under NHM budgets reach rural Jharkhand PHCs.",
    },
    {
      kind: "paper",
      title: "PHC Stockouts and Single-Doctor Coverage in Rural Jharkhand",
      source: "Indian Journal of Community Medicine, 2024",
      url: "https://www.ijcm.org.in",
      snippet:
        "6 of 10 surveyed PHCs in Pakur reported essential-medicine stockouts post-monsoon; buffer-stock plus inter-PHC sharing reduced outage days by 34%.",
    },
    {
      kind: "case-similar",
      title: "PHC Essential-Medicines Shortage — Pakur (LOK-0990)",
      source: "Samadhan.ai case library",
      url: "https://samadhan.ai/cases/phc-medicine-shortage",
      snippet:
        "Stockout audit of 3 months of PHC records led to a buffer-stock + sharing model and a shared-doctor rota covering six adjoining villages.",
    },
    {
      kind: "solution",
      title: "Essential-Medicine Buffer Stock + Shared-Clinic Rota",
      source: "AIIMS Jodhpur, Community Health",
      url: "https://samadhan.ai/evidence/aiims-phc-rota",
      snippet:
        "Buffer-stock with inter-PHC sharing, SMS refill reminders to village volunteers and a quarterly maternal-child screening camp plan.",
    },
  ],
  education: [
    {
      kind: "scheme",
      title: "Samagra Shiksha Abhiyan",
      source: "Ministry of Education, Government of India",
      url: "https://www.education.gov.in/samagra-shiksha",
      snippet:
        "School infrastructure grants, safe toilets and rainwater-safe building repairs for elementary and secondary schools — the repair-first funding route.",
    },
    {
      kind: "scheme",
      title: "Beti Bachao Beti Padhao (BBBP)",
      source: "Ministry of Women & Child Development, Government of India",
      url: "https://www.wcd.gov.in",
      snippet:
        "Retention and girls' enrolment incentives that pair naturally with safe-toilet and safe-transport school upgrades.",
    },
    {
      kind: "paper",
      title: "Rain-Monsoon Attendance and School Infrastructure in the Chotanagpur Plateau",
      source: "Journal of Educational Planning and Administration, 2023",
      url: "https://www.nuepa.org",
      snippet:
        "Absenteeism during monsoon correlates strongly with leaking roofs and unusable school toilets — a covered assembly area recovers ~18% of lost days.",
    },
    {
      kind: "case-similar",
      title: "Govt. Girls School Corridor Drainage (LOK-1026)",
      source: "Samadhan.ai case library",
      url: "https://samadhan.ai/cases/ggs-corridor",
      snippet:
        "Drain re-profiling + footpath restoration cut the daily health hazard for students commuting on the school corridor.",
    },
    {
      kind: "solution",
      title: "Rain-Safe School Retrofit Package",
      source: "Mody University, Applied Technology",
      url: "https://samadhan.ai/evidence/mody-school-retrofit",
      snippet:
        "Rain-safe roof cladding, restored water + sanitation block and a covered assembly area doubling as a study hall, using local material sourcing.",
    },
  ],
  agriculture: [
    {
      kind: "scheme",
      title: "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
      source: "Ministry of Agriculture & Farmers Welfare, Government of India",
      url: "https://pmksy.gov.in",
      snippet:
        "Per drop more crop — micro-irrigation, farm ponds and recharge structures for rain-fed belts such as Dhanbad's outer farm ring.",
    },
    {
      kind: "scheme",
      title: "MGNREGA — Water Conservation & Farm Ponds",
      source: "Ministry of Rural Development, Government of India",
      url: "https://nrega.nic.in",
      snippet:
        "Wage-funded farm ponds, recharge wells and land-shaping works — a direct, already-allocated budget line for dried-borewell recovery.",
    },
    {
      kind: "scheme",
      title: "PM-KUSUM — Solar Irrigation Pumps",
      source: "Ministry of New & Renewable Energy, Government of India",
      url: "https://mnre.gov.in",
      snippet:
        "Solar pumping + solarisation of feeders to cut irrigation energy cost while stabilising groundwater extraction.",
    },
    {
      kind: "paper",
      title: "Farm Borewell Drying in the Dhanbad Coal Belt",
      source: "Land Degradation & Development, 2024",
      url: "https://onlinelibrary.wiley.com/journal/1099145x",
      snippet:
        "40-acre plots wholly dependent on monsoon in the coal belt; community recharge-well + lined-channel networks restored post-monsoon holding by ~31%.",
    },
    {
      kind: "case-similar",
      title: "Farm Borewell Dry — 40 Acres Rain-Fed (LOK-0987)",
      source: "Samadhan.ai case library",
      url: "https://samadhan.ai/cases/farm-borewell-dry",
      snippet:
        "Shared borewell recovery plan: farm-pond + recharge-well cluster and drip conversion for vegetable belts.",
    },
    {
      kind: "solution",
      title: "Farm-Pond + Recharge-Well Network with Drip Conversion",
      source: "Govt. Polytechnic Jodhpur, Civil Engineering",
      url: "https://samadhan.ai/evidence/gpc-farmpond",
      snippet:
        "Recharge-well network, lined irrigation channels, soil-moisture IoT for timing and a farmer co-op for equipment sharing.",
    },
  ],
  environment: [
    {
      kind: "scheme",
      title: "Green India Mission (GIM)",
      source: "Ministry of Environment, Forest & Climate Change, Government of India",
      url: "https://moef.gov.in",
      snippet:
        "Tree cover, wetland and ecosystem restoration works — funding route for shore bio-fencing and native plantation along polluted water bodies.",
    },
    {
      kind: "scheme",
      title: "National Clean Air Programme (NCAP)",
      source: "Ministry of Environment, Forest & Climate Change, Government of India",
      url: "https://moef.gov.in",
      snippet:
        "City air-quality action plans and source-apportionment studies; relevant to smoke/dust hotspots around urban Jharkhand wards.",
    },
    {
      kind: "paper",
      title: "Surface-Water Pollution and Shoreline Erosion in Urban Jharkhand",
      source: "Environmental Monitoring & Assessment, 2023",
      url: "https://www.springer.com/journal/10661",
      snippet:
        "Open dumping into water bodies plus run-off erosion; native planting and 6-point segregation bins reduced loadings by an estimated 40%.",
    },
    {
      kind: "case-similar",
      title: "Clean-Water Kiosk Verification — Kolhan Block (LOK-0902)",
      source: "Samadhan.ai case library",
      url: "https://samadhan.ai/cases/kiosk-kolhan",
      snippet:
        "A 210-sample water-quality verification campaign doubled as a community-level pollution baseline for the catchment.",
    },
    {
      kind: "solution",
      title: "Shore Bio-Fence + Segregation Point Network",
      source: "BIT Mesra, Environmental Engineering",
      url: "https://samadhan.ai/evidence/bit-mesra-shore",
      snippet:
        "Bio-fence and native planting along the shore, segregation bins at six collection points, water-quality baseline plus school awareness program.",
    },
  ],
  energy: [
    {
      kind: "scheme",
      title: "PM-Surya Ghar: Muft Bijli Yojana",
      source: "Ministry of New & Renewable Energy, Government of India",
      url: "https://pmsuryaghar.gov.in",
      snippet:
        "Rooftop solar with capital subsidy — the funding lever for community/ward-level solar-hybrid retrofits.",
    },
    {
      kind: "scheme",
      title: "Atal Jyoti Yojana (AJAY) — Solar Street Lights",
      source: "Ministry of New & Renewable Energy, Government of India",
      url: "https://mnre.gov.in",
      snippet:
        "Solar street-lighting for dark spots in villages and urban wards lacking reliable grid supply.",
    },
    {
      kind: "scheme",
      title: "UJALA — LED Distribution",
      source: "EESL, Government of India",
      url: "https://eeslindia.org",
      snippet:
        "Mass LED retrofit programme; logic extends to streetlight stock replacement with solar-hybrid electronics and fault telemetry.",
    },
    {
      kind: "paper",
      title: "Solar-Hybrid Street Lighting Retrofit Feasibility in Tier-2 Wards",
      source: "Energy for Sustainable Development, 2024",
      url: "https://www.journals.elsevier.com/energy-for-sustainable-development",
      snippet:
        "Li-ion + grid hybrid poles with IoT fault detection cut outage-hours by ~60% vs grid-only stock in monsoon-exposed wards.",
    },
    {
      kind: "case-similar",
      title: "Dead Streetlights on Maple Road (LOK-1011)",
      source: "Samadhan.ai case library",
      url: "https://samadhan.ai/cases/maple-road-lights",
      snippet:
        "Dark-spot audit mapped 9 dead poles; solar-hybrid LED + IoT fault detection scheme drafted before pilot install.",
    },
    {
      kind: "solution",
      title: "Solar-Hybrid LED + IoT Fault Detection Scheme",
      source: "Mody University, AI & IoT Lab",
      url: "https://samadhan.ai/evidence/mody-streetlights",
      snippet:
        "9-pole solar-hybrid pilot, dark-spot audit and automated fault telemetry before full ward roll-out.",
    },
  ],
  urban: [
    {
      kind: "scheme",
      title: "Smart Cities Mission (SCM)",
      source: "Ministry of Housing & Urban Affairs, Government of India",
      url: "https://smartcities.gov.in",
      snippet:
        "Area-based urban renewal — smart lighting, footpaths and pedestrian-first redesign under sanctioned SCM funds.",
    },
    {
      kind: "scheme",
      title: "AMRUT 2.0 — Urban Infrastructure",
      source: "Ministry of Housing & Urban Affairs, Government of India",
      url: "https://mohua.gov.in",
      snippet:
        "Street lighting, footpaths, storm-water drains and universal-access compliance for municipal wards.",
    },
    {
      kind: "paper",
      title: "Night-Safety and Public Infrastructure in Tier-2 Cities",
      source: "Journal of Urban Design, 2023",
      url: "https://www.tandfonline.com/journals/cjud20",
      snippet:
        "Dead street-lighting zones and missing footpaths are the two strongest predictors of perceived after-dark unsafety in dense wards.",
    },
    {
      kind: "case-similar",
      title: "Maple Road Dark Zone Remediation (LOK-1011)",
      source: "Samadhan.ai case library",
      url: "https://samadhan.ai/cases/maple-road-lights",
      snippet:
        "Nine dead poles over eight months; pedestrian-first streetlight design with night-safety junction lighting proposed.",
    },
    {
      kind: "solution",
      title: "LED + Sensor Streetlight and Pedestrian-First Footpath Scheme",
      source: "Govt. Polytechnic Jodhpur, Civil Engineering",
      url: "https://samadhan.ai/evidence/gpc-streetlight",
      snippet:
        "LED + sensor streetlight retrofit, slip-free tactile paving and night-safety lighting at junctions.",
    },
  ],
  accessibility: [
    {
      kind: "scheme",
      title: "Accessible India Campaign (Sugamya Bharat Abhiyan)",
      source: "Department of Empowerment of Persons with Disabilities, Government of India",
      url: "https://accessibility.depwd.gov.in",
      snippet:
        "National accessibility audit and retrofit program for public buildings — ramps, tactile paving and signage for courts, bus stands and civic offices.",
    },
    {
      kind: "scheme",
      title: "AMRUT 2.0 — Universal Access Guidelines",
      source: "Ministry of Housing & Urban Affairs, Government of India",
      url: "https://mohua.gov.in",
      snippet:
        "Urban infrastructure grants conditioned on step-free access, tactile guidance and accessible signage in public premises.",
    },
    {
      kind: "paper",
      title: "Built-Environment Accessibility Audits of Public Buildings in Jharkhand",
      source: "Disability and Rehabilitation, 2023",
      url: "https://www.tandfonline.com/journals/idre20",
      snippet:
        "Courts and bus stands scored lowest on ramp, handrail and tactile guidance; 1:12 gradient retrofits are feasible at ₹4–6 L per building cluster.",
    },
    {
      kind: "case-similar",
      title: "No Ramp Access at District Court & Bus Stand (LOK-0974)",
      source: "Samadhan.ai case library",
      url: "https://samadhan.ai/cases/court-ramp",
      snippet:
        "Ramp retrofit with 1:12 gradient, tactile paving, high-contrast signage and priority drop-off zones at public building entrances.",
    },
    {
      kind: "solution",
      title: "Step-Free Civic Building Retrofit Package",
      source: "Dr. S. R. Rajasthan University, Rural Development",
      url: "https://samadhan.ai/evidence/ravuni-ramp",
      snippet:
        "Accessibility audit of civic buildings followed by ramp retrofits, handrails, tactile paths and accessible signage.",
    },
  ],
  livelihoods: [
    {
      kind: "scheme",
      title: "MGNREGA — Rural Employment Guarantee",
      source: "Ministry of Rural Development, Government of India",
      url: "https://nrega.nic.in",
      snippet:
        "Guaranteed 100-day wage employment; durable works (water bodies, land shaping) double as livelihood income for rural households.",
    },
    {
      kind: "scheme",
      title: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
      source: "Ministry of Skill Development & Entrepreneurship, Government of India",
      url: "https://www.msde.gov.in",
      snippet:
        "Free skill certification in solar installation, plumbing and allied trades with placement support — the direct route for artisan upskilling.",
    },
    {
      kind: "scheme",
      title: "Jharkhand Rural Livelihoods Mission (JSLPS)",
      source: "Jharkhand Rural Livelihoods Mission, Government of Jharkhand",
      url: "https://jrlm.jharkhand.gov.in",
      snippet:
        "SHG-based enterprise loans, craft market linkage and value-chain support across tribal Jharkhand villages.",
    },
    {
      kind: "paper",
      title: "Seasonal Incomes and Skill Certification in Tribal Villages",
      source: "Indian Journal of Labour Economics, 2024",
      url: "https://www.springer.com/journal/41027",
      snippet:
        "Monsoon-seasonal agricultural income drives 70% of household variability; certification-linked trades add a steady 11–18k/month second income.",
    },
    {
      kind: "case-similar",
      title: "Kiosk Operator Livelihood Model — Kolhan Block (LOK-0902)",
      source: "Samadhan.ai case library",
      url: "https://samadhan.ai/cases/kiosk-kolhan",
      snippet:
        "Trained a local resident operator for the water kiosk — an example of infrastructure work creating a sustained local livelihood.",
    },
    {
      kind: "solution",
      title: "Certified Trade + Market-Linkage Livelihood Package",
      source: "Dr. S. R. Rajasthan University, Rural Development",
      url: "https://samadhan.ai/evidence/ravuni-livelihoods",
      snippet:
        "Solar/plumbing certification with apprenticeships, a digital craft marketplace and SHG-led enterprise loans via a partner NGO.",
    },
  ],
};

function seededEvidence(category: CategoryId): ResearchResult {
  const entries = (CORPUS[category] ?? CORPUS.water).slice(0, 6);
  const evidence: EvidenceItem[] = entries.map((entry, index) => ({
    id: `ev-ai-${category}-${index + 1}`,
    kind: entry.kind,
    title: entry.title,
    source: entry.source,
    url: entry.url,
    snippet: entry.snippet,
    citedAt: new Date(Date.now() - index * 86_400_000).toISOString(),
  }));
  return { evidence, source: "seeded" };
}

const LLM_BASE = (process.env.AI_BASE_URL ?? "https://api.openai.com/v1").replace(/\/+$/, "");
const ALLOWED_KINDS = ["scheme", "paper", "case-similar", "solution"];

function parseLlmEvidence(content: string): EvidenceItem[] | null {
  const cleaned = content.replace(/```json/gi, "").replace(/```/g, "").trim();
  const match = cleaned.match(/\[[\s\S]*\]/);
  if (!match) return null;
  try {
    const parsed = JSON.parse(match[0]) as Array<{
      kind?: string;
      title?: string;
      source?: string;
      url?: string;
      snippet?: string;
    }>;
    if (!Array.isArray(parsed)) return null;
    const items = parsed
      .filter(
        (item) =>
          item &&
          item.kind &&
          ALLOWED_KINDS.includes(item.kind) &&
          typeof item.title === "string" &&
          typeof item.source === "string" &&
          typeof item.url === "string",
      )
      .slice(0, 6)
      .map((item, index) => ({
        id: `ev-ai-llm-${index + 1}`,
        kind: item.kind as EvidenceKind,
        title: item.title as string,
        source: item.source as string,
        url: item.url as string,
        snippet: (item.snippet ?? "").slice(0, 240),
        citedAt: new Date(Date.now() - index * 86_400_000).toISOString(),
      }));
    return items.length ? items : null;
  } catch {
    return null;
  }
}

async function enrichWithLlm(category: CategoryId): Promise<ResearchResult["evidence"] | null> {
  if (!process.env.AI_API_KEY) return null;
  try {
    const res = await fetch(`${LLM_BASE}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL ?? "gpt-4o-mini",
        temperature: 0,
        messages: [
          {
            role: "system",
            content:
              "You build an evidence bundle for civic issues in India. Return ONLY a JSON array of up to 5 objects with keys kind (one of scheme, paper, case-similar, solution), title, source, url, snippet. Cite real government schemes where possible.",
          },
          {
            role: "user",
            content: `Return an evidence bundle (schemes, papers, similar cases, solutions) relevant to civic category "${category}" in Jharkhand, India.`,
          },
        ],
      }),
      signal: AbortSignal.timeout(1500),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content;
    if (!content) return null;
    return parseLlmEvidence(content);
  } catch {
    return null;
  }
}

export async function buildResearch(category: CategoryId): Promise<ResearchResult> {
  const seeded = seededEvidence(category);
  const llm = await enrichWithLlm(category);
  if (llm) return { evidence: llm, source: "llm" };
  return seeded;
}
export const INITIAL_LEARNER_PROFILE = {
  id: "usr-10891",
  name: "Abhinash Kumar",
  email: "abhinash@statskill.gov.in",
  role: "learner",
  designation: "Statistical Officer",
  department: "National Sample Survey (NSS)",
  currentAssignment: "Survey Data Analytics & Quality Assurance",
  education: "M.Sc. Statistics & Data Science",
  experienceYears: 5,
  previousTraining: [
    "Survey Methodology & Field Operations (NSSTA)",
    "Statistical Quality Control & Audit",
    "Python for Official Statistics",
    "Data Visualization with PowerBI & Python"
  ],
  joinedDate: "2022-04-10",
  employeeId: "MoSPI-NSS-2022-0891",
  location: "Sankhyiki Bhawan, New Delhi"
};
export const INITIAL_ADMIN_PROFILE = {
  id: "adm-001",
  name: "Dr. Alok Verma",
  email: "admin@statskill.gov.in",
  role: "admin",
  designation: "Additional Director General",
  department: "Data Informatics & Innovation Division (DIID)",
  currentAssignment: "National Statistical Capacity Building & AI Strategy",
  education: "Ph.D. in Econometrics & Public Policy",
  experienceYears: 18,
  previousTraining: [
    "Executive Leadership for Senior Civil Servants",
    "National Data Governance Architecture",
    "Big Data & AI for Official Statistics (UNSD)"
  ],
  joinedDate: "2008-07-01",
  employeeId: "MoSPI-DIID-2008-0012",
  location: "MoSPI HQ, New Delhi"
};
export const INITIAL_COMPETENCIES = [
  // Statistical Competencies
  {
    id: "comp-sampling",
    name: "Sampling",
    category: "statistical",
    currentScore: 0,
    requiredScore: 85,
    gap: 3,
    level: "Unassessed",
    progress: 0,
    priority: "Low",
    description: "Design and execution of probability sampling, stratified, cluster and multistage survey sampling frames.",
    lastAssessed: null
  },
  {
    id: "comp-survey-design",
    name: "Survey Design",
    category: "statistical",
    currentScore: 0,
    requiredScore: 85,
    gap: 7,
    level: "Unassessed",
    progress: 0,
    priority: "Low",
    description: "Questionnaire design, response burden reduction, sampling weight calibration and field testing.",
    lastAssessed: null
  },
  {
    id: "comp-national-accounts",
    name: "National Accounts",
    category: "statistical",
    currentScore: 0,
    requiredScore: 70,
    gap: 10,
    level: "Unassessed",
    progress: 0,
    priority: "Low",
    description: "System of National Accounts (SNA), GDP/GVA compilation, input-output tables and sequence of accounts."
  },
  {
    id: "comp-price-stats",
    name: "Price Statistics",
    category: "statistical",
    currentScore: 0,
    requiredScore: 70,
    gap: 5,
    level: "Unassessed",
    progress: 0,
    priority: "Low",
    description: "CPI, WPI, index number methodologies (Laspeyres, Paasche, Fisher) and item basket maintenance."
  },
  {
    id: "comp-labour-stats",
    name: "Labour Statistics",
    category: "statistical",
    currentScore: 0,
    requiredScore: 70,
    gap: 8,
    level: "Unassessed",
    progress: 0,
    priority: "Low",
    description: "Periodic Labour Force Survey (PLFS) methodologies, worker population ratios and informal sector metrics."
  },
  {
    id: "comp-agri-stats",
    name: "Agricultural Statistics",
    category: "statistical",
    currentScore: 0,
    requiredScore: 75,
    gap: 5,
    level: "Unassessed",
    progress: 0,
    priority: "Low",
    description: "Crop yield estimation, area enumeration, agricultural census data validation and GCES methodology."
  },
  {
    id: "comp-industrial-stats",
    name: "Industrial Statistics",
    category: "statistical",
    currentScore: 0,
    requiredScore: 75,
    gap: 7,
    level: "Unassessed",
    progress: 0,
    priority: "Low",
    description: "Annual Survey of Industries (ASI), Index of Industrial Production (IIP) and factory register reconciliation."
  },
  {
    id: "comp-sdg-indicators",
    name: "SDG Indicators",
    category: "statistical",
    currentScore: 0,
    requiredScore: 80,
    gap: 6,
    level: "Unassessed",
    progress: 0,
    priority: "Low",
    description: "National Indicator Framework (NIF) monitoring, metadata compliance and sub-national localization."
  },
  {
    id: "comp-metadata-standards",
    name: "Metadata Standards",
    category: "statistical",
    currentScore: 0,
    requiredScore: 80,
    gap: 5,
    level: "Unassessed",
    progress: 0,
    priority: "Low",
    description: "SDMX (Statistical Data and Metadata eXchange), DDI specification and standardized code lists."
  },
  {
    id: "comp-data-quality",
    name: "Data Quality Frameworks",
    category: "statistical",
    currentScore: 0,
    requiredScore: 85,
    gap: 5,
    level: "Unassessed",
    progress: 0,
    priority: "Low",
    description: "Generic Statistical Business Process Model (GSBPM), total survey error modeling and data audit protocols."
  },
  // Technical Competencies
  {
    id: "comp-python",
    name: "Python",
    category: "technical",
    currentScore: 0,
    requiredScore: 80,
    gap: 25,
    level: "Unassessed",
    progress: 0,
    priority: "Medium",
    description: "Pandas, NumPy, automated data wrangling, statistical scripting and repeatable analytic pipelines."
  },
  {
    id: "comp-r",
    name: "R",
    category: "technical",
    currentScore: 0,
    requiredScore: 65,
    gap: 20,
    level: "Unassessed",
    progress: 0,
    priority: "Medium",
    description: "Tidyverse, survey package for complex survey designs, RMarkdown automated report generation."
  },
  {
    id: "comp-sql",
    name: "SQL",
    category: "technical",
    currentScore: 0,
    requiredScore: 80,
    gap: 8,
    level: "Unassessed",
    progress: 0,
    priority: "Low",
    description: "Complex joins, window functions, query optimization and large microdata aggregation."
  },
  {
    id: "comp-stata",
    name: "Stata & SPSS",
    category: "technical",
    currentScore: 0,
    requiredScore: 75,
    gap: 9,
    level: "Unassessed",
    progress: 0,
    priority: "Low",
    description: "Econometric modeling, do-file workflows and microdata syntax automation."
  },
  {
    id: "comp-gis",
    name: "GIS & Spatial Analytics",
    category: "technical",
    currentScore: 0,
    requiredScore: 70,
    gap: 28,
    level: "Unassessed",
    progress: 0,
    priority: "High",
    description: "Geospatial visualization, shapefiles, QGIS integration and geo-tagged survey unit boundary mapping."
  },
  {
    id: "comp-data-viz",
    name: "Data Visualization",
    category: "technical",
    currentScore: 0,
    requiredScore: 80,
    gap: 18,
    level: "Unassessed",
    progress: 0,
    priority: "Medium",
    description: "Interactive dashboarding, narrative charts, color accessibility and official publication graphics."
  },
  {
    id: "comp-ai-ml",
    name: "AI & Machine Learning",
    category: "technical",
    currentScore: 0,
    requiredScore: 75,
    gap: 40,
    level: "Unassessed",
    progress: 0,
    priority: "Critical",
    description: "Supervised/unsupervised models for imputation, outlier detection, NLP classification and LLM applications."
  },
  {
    id: "comp-cloud",
    name: "Cloud Computing",
    category: "technical",
    currentScore: 0,
    requiredScore: 70,
    gap: 40,
    level: "Unassessed",
    progress: 0,
    priority: "Critical",
    description: "National Informatics Centre (NIC) cloud services, object storage, serverless pipelines and secure compute."
  },
  {
    id: "comp-apis",
    name: "APIs & Microservices",
    category: "technical",
    currentScore: 0,
    requiredScore: 65,
    gap: 17,
    level: "Unassessed",
    progress: 0,
    priority: "Medium",
    description: "RESTful API consumption, JSON schema validation, open data feeds and automated data harvesting."
  },
  {
    id: "comp-open-data",
    name: "Open Data Architecture",
    category: "technical",
    currentScore: 0,
    requiredScore: 75,
    gap: 15,
    level: "Unassessed",
    progress: 0,
    priority: "Medium",
    description: "National Data Sharing & Accessibility Policy (NDSAP), open formats (CSV, Parquet) and anonymization."
  },
  // Digital Governance
  {
    id: "comp-cybersecurity",
    name: "Cybersecurity",
    category: "governance",
    currentScore: 0,
    requiredScore: 75,
    gap: 10,
    level: "Unassessed",
    progress: 0,
    priority: "Low",
    description: "CERT-In guidelines, phishing defense, credential security, role-based access control and system hardening."
  },
  {
    id: "comp-data-privacy",
    name: "Data Privacy & DPDP Act",
    category: "governance",
    currentScore: 0,
    requiredScore: 80,
    gap: 10,
    level: "Unassessed",
    progress: 0,
    priority: "Low",
    description: "Digital Personal Data Protection (DPDP) Act 2023, differential privacy, k-anonymity and microdata governance."
  },
  {
    id: "comp-dpi",
    name: "Digital Public Infrastructure",
    category: "governance",
    currentScore: 0,
    requiredScore: 75,
    gap: 11,
    level: "Unassessed",
    progress: 0,
    priority: "Medium",
    description: "India Stack, Aadhaar e-Sign, DigiLocker integration and unified data governance frameworks."
  },
  // Behavioural & Managerial
  {
    id: "comp-leadership",
    name: "Leadership",
    category: "behavioral",
    currentScore: 0,
    requiredScore: 75,
    gap: 5,
    level: "Unassessed",
    progress: 0,
    priority: "Low",
    description: "Team motivation, field survey delegation, mentorship and strategic goal alignment."
  },
  {
    id: "comp-communication",
    name: "Communication",
    category: "behavioral",
    currentScore: 0,
    requiredScore: 80,
    gap: 2,
    level: "Unassessed",
    progress: 0,
    priority: "Low",
    description: "Executive briefing, inter-departmental liaising, statistical report writing and stakeholder engagement."
  },
  {
    id: "comp-project-mgmt",
    name: "Project Management",
    category: "behavioral",
    currentScore: 0,
    requiredScore: 75,
    gap: 7,
    level: "Unassessed",
    progress: 0,
    priority: "Low",
    description: "Survey timeline tracking, budget monitoring, milestone governance and resource allocation."
  },
  {
    id: "comp-ethics",
    name: "Ethics & Integrity",
    category: "behavioral",
    currentScore: 0,
    requiredScore: 90,
    gap: 5,
    level: "Unassessed",
    progress: 0,
    priority: "Low",
    description: "UN Fundamental Principles of Official Statistics, impartiality, confidentiality and ethical data stewardship."
  },
  {
    id: "comp-decision-making",
    name: "Decision Making",
    category: "behavioral",
    currentScore: 0,
    requiredScore: 75,
    gap: 3,
    level: "Unassessed",
    progress: 0,
    priority: "Low",
    description: "Evidence-based decisions, risk trade-offs, anomaly resolution in field surveys."
  },
  {
    id: "comp-change-mgmt",
    name: "Change Management",
    category: "behavioral",
    currentScore: 0,
    requiredScore: 65,
    gap: 10,
    level: "Unassessed",
    progress: 0,
    priority: "Low",
    description: "Digital transformation adoption, transitioning from paper-assisted to computer-assisted personal interviews (CAPI)."
  }
];
export const IGOT_COURSES_CATALOG = [
  {
    id: "igot-ai-01",
    title: "Machine Learning for Government Analytics",
    provider: "iGOT Karmayogi & Wadhwani AI",
    duration: "6 Weeks (18 Hours)",
    level: "Unassessed",
    competencies: ["AI & Machine Learning", "Python", "Data Quality Frameworks"],
    competencyCategory: "technical",
    matchScore: 94,
    department: "Cross-Departmental",
    rating: 4.8,
    enrolledCount: 1420,
    description: "Practical application of supervised and unsupervised machine learning algorithms for public sector policy, survey imputation, and administrative data modeling.",
    modules: [
      "Foundations of Machine Learning in Public Administration",
      "Data Preprocessing and Missing Value Imputation with Scikit-Learn",
      "Classification & Regression for Survey Weighting",
      "Natural Language Processing for Statistical Classification (NIC/NCO)",
      "Responsible & Fair AI for Government Decision Systems"
    ],
    isEnrolled: false,
    certificateOffered: true,
    estimatedHours: 18,
    url: "https://igotkarmayogi.gov.in/app/toc/igot-ai-01"
  },
  {
    id: "igot-cloud-01",
    title: "Cloud Analytics & Government Infrastructure (NIC GI Cloud)",
    provider: "iGOT Karmayogi & MeitY",
    duration: "4 Weeks (12 Hours)",
    level: "Unassessed",
    competencies: ["Cloud Computing", "APIs & Microservices", "Cybersecurity"],
    competencyCategory: "technical",
    matchScore: 91,
    department: "Data Informatics",
    rating: 4.7,
    enrolledCount: 980,
    description: "Hands-on understanding of deploying statistical pipelines on MeghRaj (NIC Cloud), scalable storage, automated ETL, and secure public sector cloud operations.",
    modules: [
      "Overview of MeghRaj Government Cloud Ecosystem",
      "Managing Cloud Storage for Massive Statistical Datasets",
      "Deploying Microservices and Serverless Data Harvesters",
      "Cloud Security, Audits and CERT-In Compliance"
    ],
    isEnrolled: false,
    certificateOffered: true,
    estimatedHours: 12,
    url: "https://igotkarmayogi.gov.in/app/toc/igot-cloud-01"
  },
  {
    id: "igot-gis-01",
    title: "GIS & Geospatial Analysis for Public Administration",
    provider: "iGOT Karmayogi & ISRO IIRS",
    duration: "5 Weeks (15 Hours)",
    level: "Unassessed",
    competencies: ["GIS & Spatial Analytics", "Data Visualization", "Sampling"],
    competencyCategory: "technical",
    matchScore: 89,
    department: "National Sample Survey",
    rating: 4.9,
    enrolledCount: 1850,
    description: "Using QGIS and spatial libraries in Python to map Primary Sampling Units (PSUs), thematic demographic indicators, and spatial autocorrelation.",
    modules: [
      "Fundamentals of Geospatial Data (Vectors, Rasters, Projections)",
      "QGIS for Survey Boundary Mapping and Geo-Tagging",
      "Spatial Sampling Optimization and Coverage Verification",
      "Interactive Choropleth Maps and Geo-Dashboards"
    ],
    isEnrolled: false,
    certificateOffered: true,
    estimatedHours: 15,
    url: "https://igotkarmayogi.gov.in/app/toc/igot-gis-01"
  },
  {
    id: "igot-py-01",
    title: "Advanced Python for Official Statistics & Automation",
    provider: "iGOT Karmayogi & IIT Madras",
    duration: "6 Weeks (20 Hours)",
    level: "Unassessed",
    competencies: ["Python", "Data Quality Frameworks", "Open Data Architecture"],
    competencyCategory: "technical",
    matchScore: 86,
    department: "All Statistical Divisions",
    rating: 4.8,
    enrolledCount: 2310,
    description: "High-performance Pandas and Polars pipelines, automated tabulation, complex survey weights, statistical validation, and REST API connectors.",
    modules: [
      "Efficient Vectorized Operations in Pandas & Polars",
      "Cleaning and Validating PLFS & ASI Microdata",
      "Complex Weighted Variance Estimation in Python",
      "Automated Report and Bulletin Generation"
    ],
    isEnrolled: true,
    progress: 0,
    certificateOffered: true,
    estimatedHours: 20,
    url: "https://igotkarmayogi.gov.in/app/toc/igot-py-01"
  },
  {
    id: "igot-dpdp-01",
    title: "Digital Personal Data Protection (DPDP) Act Compliance for Officers",
    provider: "iGOT Karmayogi & Ministry of Law",
    duration: "3 Weeks (8 Hours)",
    level: "Unassessed",
    competencies: ["Data Privacy & DPDP Act", "Cybersecurity", "Ethics & Integrity"],
    competencyCategory: "governance",
    matchScore: 78,
    department: "All Departments",
    rating: 4.6,
    enrolledCount: 4500,
    description: "Comprehensive guide to obligations under the DPDP Act 2023, statistical exemptions, consent management, anonymization standards, and data fiduciary duties.",
    modules: [
      "Overview and Scope of the DPDP Act 2023",
      "Statistical Processing Exemptions and Best Practices",
      "Anonymization, Pseudonymization and Re-identification Risks",
      "Breach Notification and Penalties Framework"
    ],
    isEnrolled: true,
    progress: 0,
    certificateOffered: true,
    estimatedHours: 8,
    url: "https://igotkarmayogi.gov.in/app/toc/igot-dpdp-01"
  },
  {
    id: "igot-viz-01",
    title: "Data Visualization & Statistical Storytelling for Policy",
    provider: "iGOT Karmayogi & Capacity Building Commission",
    duration: "4 Weeks (10 Hours)",
    level: "Unassessed",
    competencies: ["Data Visualization", "Communication", "SDG Indicators"],
    competencyCategory: "technical",
    matchScore: 75,
    department: "Economic Statistics",
    rating: 4.7,
    enrolledCount: 1650,
    description: "Designing clear, accessible charts and policy dashboards that translate complex survey estimates into actionable executive insights.",
    modules: [
      "Visual Perception Principles and Chart Selection Rules",
      "Designing Official Statistical Bulletins and Dashboards",
      "Accessible Color Palettes for Public Dissemination",
      "Executive Slide Design for Inter-Ministerial Reviews"
    ],
    isEnrolled: false,
    certificateOffered: true,
    estimatedHours: 10,
    url: "https://igotkarmayogi.gov.in/app/toc/igot-viz-01"
  },
  {
    id: "igot-sdmx-01",
    title: "Metadata Standards & SDMX Implementation",
    provider: "iGOT Karmayogi & UNSD",
    duration: "4 Weeks (12 Hours)",
    level: "Unassessed",
    competencies: ["Metadata Standards", "APIs & Microservices", "Open Data Architecture"],
    competencyCategory: "statistical",
    matchScore: 72,
    department: "Data Informatics",
    rating: 4.5,
    enrolledCount: 620,
    description: "Global standard for exchanging statistical data and metadata between national statistical offices and international agencies.",
    modules: [
      "SDMX Information Model & Data Structure Definitions",
      "Creating DSDs and Concept Schemes for National Surveys",
      "SDMX RESTful APIs and Global Registry Queries",
      "Automated Harmonization with UN SDG Data Hub"
    ],
    isEnrolled: false,
    certificateOffered: true,
    estimatedHours: 12,
    url: "https://igotkarmayogi.gov.in/app/toc/igot-sdmx-01"
  },
  {
    id: "igot-lead-01",
    title: "Adaptive Leadership for Statistical Field Operations",
    provider: "iGOT Karmayogi & LBSNAA",
    duration: "3 Weeks (8 Hours)",
    level: "Unassessed",
    competencies: ["Leadership", "Change Management", "Communication"],
    competencyCategory: "behavioral",
    matchScore: 68,
    department: "Field Operations Division",
    rating: 4.8,
    enrolledCount: 1100,
    description: "Strategies for managing large enumerator teams, maintaining data integrity under tight deadlines, and driving CAPI digital transitions.",
    modules: [
      "Leading Remote and Field Survey Teams",
      "Conflict Resolution and Quality Control Escalations",
      "Cultivating a Culture of Impartiality and Rigor",
      "Managing Organizational Change in Field Surveys"
    ],
    isEnrolled: false,
    certificateOffered: true,
    estimatedHours: 8,
    url: "https://igotkarmayogi.gov.in/app/toc/igot-lead-01"
  }
];
export const NSSTA_PROGRAMMES_CATALOG = [
  {
    id: "nssta-ai-2026",
    title: "Advanced AI & Machine Learning Applications in Official Statistics",
    duration: "5 Days (Residential)",
    mode: "In-person",
    eligibility: "Statistical Officers, Senior Statistical Officers, Assistant Directors with >3 yrs service",
    competencies: ["AI & Machine Learning", "Python", "Cloud Computing"],
    competencyCategory: "technical",
    recommendationReason: "Targeted intervention for your Critical AI/ML gap (35% vs 75% required). Directly enhances your capacity for automated survey analytics.",
    startDate: "2026-09-15",
    venue: "National Statistical Systems Training Academy (NSSTA), Greater Noida",
    seatsAvailable: 35,
    targetRoles: ["Statistical Officer", "Senior Statistical Officer", "Research Officer"],
    isNominated: false,
    matchScore: 96,
    faculty: "Dr. S. K. Gupta (Ex-ISI) & MoSPI AI Taskforce Leads"
  },
  {
    id: "nssta-gis-2026",
    title: "GIS Applications & Spatial Sampling in National Sample Surveys",
    duration: "3 Days (Residential)",
    mode: "In-person",
    eligibility: "All NSS, FOD and Social Statistics Officers",
    competencies: ["GIS & Spatial Analytics", "Sampling", "Survey Design"],
    competencyCategory: "technical",
    recommendationReason: "Addresses your High priority GIS gap (42% vs 70% required) for modernizing PSU frame delineation and coverage analysis.",
    startDate: "2026-10-06",
    venue: "NSSTA Campus, Greater Noida",
    seatsAvailable: 40,
    targetRoles: ["Statistical Officer", "Field Superintendent", "Data Analyst"],
    isNominated: false,
    matchScore: 92,
    faculty: "ISRO Scientists & NSSTA Senior Faculty"
  },
  {
    id: "nssta-adv-stats-2026",
    title: "Advanced Survey Methodology & Non-Sampling Error Estimation",
    duration: "4 Days (Hybrid)",
    mode: "Hybrid",
    eligibility: "Officers involved in NSS, ASI, and PLFS Survey Operations",
    competencies: ["Survey Design", "Sampling", "Data Quality Frameworks"],
    competencyCategory: "statistical",
    recommendationReason: "Refines your strong statistical foundation (Sampling: 82%) to master-level calibration and total survey error modeling.",
    startDate: "2026-10-20",
    venue: "NSSTA Greater Noida + Online Live Stream",
    seatsAvailable: 60,
    targetRoles: ["Statistical Officer", "Deputy Director", "Joint Director"],
    isNominated: true,
    matchScore: 84,
    faculty: "Prof. Anirban Mukherjee (ISI Kolkata)"
  },
  {
    id: "nssta-cloud-data-2026",
    title: "National Data Governance & Cloud Architecture Workshop",
    duration: "3 Days (Online Live)",
    mode: "Online Live",
    eligibility: "Officers working on DIID, Computer Centre & Open Data initiatives",
    competencies: ["Cloud Computing", "APIs & Microservices", "Data Privacy & DPDP Act"],
    competencyCategory: "governance",
    recommendationReason: "Resolves critical cloud competency deficit for deploying automated data dissemination APIs.",
    startDate: "2026-11-03",
    venue: "Virtual Platform (NSSTA Learning Portal)",
    seatsAvailable: 100,
    targetRoles: ["Statistical Officer", "Systems Analyst", "Programmer"],
    isNominated: false,
    matchScore: 88,
    faculty: "NIC Senior Technical Directors"
  },
  {
    id: "nssta-sdg-2026",
    title: "SDG National Indicator Framework (NIF) & Sub-National Localization",
    duration: "3 Days (Residential)",
    mode: "In-person",
    eligibility: "State DES and Central Statistical Cadre Officers",
    competencies: ["SDG Indicators", "Metadata Standards", "Communication"],
    competencyCategory: "statistical",
    recommendationReason: "Strengthens alignment with international reporting standards and sub-district SDG indicator tracking.",
    startDate: "2026-11-17",
    venue: "NSSTA Campus, Greater Noida",
    seatsAvailable: 45,
    targetRoles: ["Statistical Officer", "Assistant Director", "Research Officer"],
    isNominated: false,
    matchScore: 78,
    faculty: "NITI Aayog & MoSPI SDG Division Directors"
  }
];
export const DEMO_SAMPLE_MATERIAL = {
  title: "Introduction to Sampling Methods in Official Statistics (NSS Guidelines)",
  category: "Statistical Methodology",
  content: `NATIONAL SAMPLE SURVEY \u2014 TRAINING NOTE ON SAMPLING METHODS
Government of India | Ministry of Statistics and Programme Implementation (MoSPI)

1. INTRODUCTION TO SURVEY SAMPLING
In official statistics, enumerating an entire target population (a complete census) is often prohibitively expensive, time-consuming, and resource-intensive. Survey sampling is the scientific process of selecting a representative subset of observation units from a statistical population to draw valid inferences about the entire population.

2. KEY CONCEPTS & DEFINITIONS
\u2022 Target Population: The complete collection of all elements (households, agricultural holdings, manufacturing enterprises) about which statistical inferences are to be made.
\u2022 Sampling Frame: The actual list, directory, or geospatial map of sampling units from which a sample is drawn. An ideal frame is exhaustive, up-to-date, and contains no duplicates. Examples include the NSS Urban Frame Survey (UFS) blocks and Census Village Directories.
\u2022 Sampling Unit: The distinct elements or clusters of elements considered for selection at each stage of a survey (e.g., Primary Sampling Units like villages/blocks, and Ultimate Sampling Units like households).
\u2022 Sampling Error: The error attributable solely to observing a sample rather than the complete population. It decreases predictably as sample size increases.
\u2022 Non-Sampling Error: Errors arising during data collection, questionnaire misinterpretation, respondent recall bias, non-response, and data entry. Non-sampling errors can occur in both sample surveys and complete censuses.

3. PROBABILITY SAMPLING TECHNIQUES
Official statistical surveys conducted by MoSPI rely strictly on probability sampling, ensuring that every element in the frame has a known, non-zero probability of selection.

A. Simple Random Sampling (SRS)
Every element in the sampling frame has an equal probability of selection.
- SRS Without Replacement (SRSWOR): Selected units are not replaced into the pool before subsequent draws. Preferred in official statistics due to lower variance.
- SRS With Replacement (SRSWR): Units are replaced, allowing a unit to be selected multiple times.

B. Stratified Random Sampling
The heterogeneous population of size N is partitioned into L mutually exclusive and collectively exhaustive homogeneous subpopulations called 'strata' (sizes N_1, N_2, ..., N_L).
Independent samples are drawn from each stratum.
Advantages:
- Drastically reduces sampling variance when within-stratum variance is small compared to between-stratum variance.
- Guarantees adequate representation for crucial administrative subgroups (e.g., rural vs. urban sectors, industrial scale categories).
- Proportional Allocation vs. Optimum (Neyman) Allocation: Neyman allocation minimizes variance for a fixed sample size by allocating more units to strata with larger size and greater internal variability.

C. Systematic Sampling
Units are selected at regular intervals of k = N/n from an ordered list, starting from a randomly chosen integer between 1 and k.
Advantages:
- Highly operational in field conditions.
- Often behaves like stratified sampling if the list is sorted by a relevant auxiliary attribute (e.g., geographical ordering or income decile).

D. Cluster & Multi-Stage Sampling
When constructing an exhaustive frame of ultimate units (households) across the entire country is unfeasible, the population is divided into natural clusters (villages or urban blocks).
- Multi-Stage Design: In the first stage, Primary Sampling Units (PSUs) are selected using probability proportional to size (PPS). In the second stage, households (Ultimate Sampling Units) are listed and sampled within selected PSUs.
- While cluster sampling typically increases sampling variance compared to SRS of the same total sample size (due to positive intra-class correlation), it drastically reduces field travel costs and administrative overhead.

4. QUALITY ASSURANCE IN SAMPLING DESIGNS
To preserve the scientific integrity of MoSPI datasets:
1. Weight Calibration: Inverse probability weights (design weights) must be adjusted for unit non-response and post-stratified to known census demographic totals.
2. Total Survey Error (TSE) Minimization: Balancing sampling variance against non-sampling biases through rigorous pilot testing, CAPI validation rules, and field supervision.`
};
export const INITIAL_ASSESSMENT_QUESTIONS = [
  {
    id: "diag-q1",
    question: "Under what condition does Stratified Random Sampling yield the greatest gain in precision (reduction in variance) compared to Simple Random Sampling?",
    options: [
      "When elements within each stratum are highly heterogeneous and between-strata differences are minimal",
      "When elements within each stratum are highly homogeneous and between-strata variance is large",
      "When all strata have exactly the same sample size regardless of variance",
      "When sampling is conducted with replacement in each stratum"
    ],
    correctAnswerIndex: 1,
    explanation: "Stratified sampling achieves maximum precision when within-stratum variance is minimized (homogeneous within strata) while between-strata variance is maximized.",
    competency: "Sampling",
    difficulty: "Medium",
    category: "statistical",
    diagnosticWeight: 1.2
  },
  {
    id: "diag-q2",
    question: "In survey data processing with Python, which pandas method is most computationally efficient for applying complex multi-condition category recoding across 5 million rows?",
    options: [
      "Iterating with for index, row in df.iterrows():",
      "Using df.apply(lambda row: func(row), axis=1)",
      "Vectorized evaluation using numpy.select() or numpy.where()",
      "Converting the dataframe to a Python dictionary and looping"
    ],
    correctAnswerIndex: 2,
    explanation: "np.select() and np.where() execute in compiled C code utilizing vectorized memory buffers, running orders of magnitude faster than Python-level loops or axis=1 apply.",
    competency: "Python",
    difficulty: "Medium",
    category: "technical",
    diagnosticWeight: 1
  },
  {
    id: "diag-q3",
    question: "What is the primary difference between Sampling Errors and Non-Sampling Errors in large-scale national socio-economic surveys?",
    options: [
      "Sampling errors can be eliminated completely by training field investigators, while non-sampling errors cannot",
      "Sampling errors decrease as the sample size increases, whereas non-sampling errors may increase with larger scale and complexity",
      "Non-sampling errors occur only in sample surveys, never in complete censuses",
      "Sampling error is caused only by arithmetic mistakes during data entry"
    ],
    correctAnswerIndex: 1,
    explanation: "Sampling error is a mathematical consequence of inspecting a sample and drops with \u221An; non-sampling errors (measurement, response, coverage errors) often expand as survey scale grows.",
    competency: "Survey Design",
    difficulty: "Easy",
    category: "statistical",
    diagnosticWeight: 1
  },
  {
    id: "diag-q4",
    question: "When deploying Machine Learning models for automated classification of National Industrial Classification (NIC) codes from free-text enterprise descriptions, which technique best handles extreme class imbalance?",
    options: [
      "Dropping all minority classes with fewer than 50 observations",
      "Training without any loss weighting or resampling",
      "Synthetic Minority Over-sampling (SMOTE) combined with Focal Loss / Class-Weighted Cross-Entropy",
      "Replacing text descriptions with random noise"
    ],
    correctAnswerIndex: 2,
    explanation: "Class-weighted cross entropy and synthetic sampling techniques (SMOTE/Focal loss) penalize mistakes on rare NIC codes proportionally to their rarity, preventing majority class bias.",
    competency: "AI & Machine Learning",
    difficulty: "Hard",
    category: "technical",
    diagnosticWeight: 1.5
  },
  {
    id: "diag-q5",
    question: "In SQL relational databases managing national survey microdata, which clause allows you to calculate a running cumulative total of household expenditure partitioned by State and District without collapsing rows?",
    options: [
      "GROUP BY State, District",
      "SUM(expenditure) OVER (PARTITION BY State, District ORDER BY household_id)",
      "HAVING SUM(expenditure) > 1000",
      "UNION ALL SELECT State, District"
    ],
    correctAnswerIndex: 1,
    explanation: "Window functions with OVER (PARTITION BY ... ORDER BY ...) compute aggregate analytic calculations across sets of table rows while preserving individual row granularity.",
    competency: "SQL",
    difficulty: "Medium",
    category: "technical",
    diagnosticWeight: 1
  },
  {
    id: "diag-q6",
    question: "Under the Digital Personal Data Protection (DPDP) Act 2023, what is the primary obligation of an official statistical data fiduciary regarding public microdata releases?",
    options: [
      "Publicly publish raw identifiable personal phone numbers and Aadhaar numbers for survey audit",
      "Implement robust anonymization, k-anonymity and differential privacy safeguards to prevent re-identification",
      "Delete all historical census survey data after 30 days",
      "Charge citizens commercial fees to view official statistical indicators"
    ],
    correctAnswerIndex: 1,
    explanation: "The DPDP Act and statistical confidentiality principles mandate strict de-identification, k-anonymity, and statistical disclosure control before public dissemination of survey microdata.",
    competency: "Data Privacy & DPDP Act",
    difficulty: "Medium",
    category: "governance",
    diagnosticWeight: 1.1
  },
  {
    id: "diag-q7",
    question: "In Geographic Information Systems (GIS), what is the key advantage of using Vector Shapefiles/GeoJSON over Raster data for Primary Sampling Unit (PSU) boundary delimitation?",
    options: [
      "Vector layers store precise coordinate boundaries and polygon attributes (e.g. Census block ID, population) without pixel resolution loss",
      "Vector files cannot be opened in open-source GIS software like QGIS",
      "Vector files represent data only as continuous pixel matrices like satellite imagery",
      "Vector format does not support spatial coordinate reference systems (CRS)"
    ],
    correctAnswerIndex: 0,
    explanation: "Vector data represents geographic features with discrete geometric primitives (points, lines, polygons) coupled with structured attribute tables, ideal for administrative boundaries.",
    competency: "GIS & Spatial Analytics",
    difficulty: "Medium",
    category: "technical",
    diagnosticWeight: 1.2
  },
  {
    id: "diag-q8",
    question: "Which cloud computing architectural model is provided by NIC MeghRaj for hosting sovereign statistical data with dedicated government isolation and CERT-In compliance?",
    options: [
      "Unsecured Public Torrent Storage",
      "Government Community Cloud (GCC) with strict data localization and virtual private clouds",
      "Single unbacked physical hard drive in a local office",
      "Public shared unencrypted file transfer"
    ],
    correctAnswerIndex: 1,
    explanation: "NIC MeghRaj operates as a sovereign Government Community Cloud (GI Cloud) adhering to stringent security benchmarks, data localization, and dedicated government VPCs.",
    competency: "Cloud Computing",
    difficulty: "Medium",
    category: "technical",
    diagnosticWeight: 1.3
  },
  {
    id: "diag-q9",
    question: "According to the UN Fundamental Principles of Official Statistics, what is the fundamental ethical mandate regarding individual respondent survey records?",
    options: [
      "Individual records may be sold to commercial advertisers for revenue generation",
      "Individual data collected by statistical agencies must be held strictly confidential and used exclusively for statistical purposes",
      "Names and personal income must be displayed on public billboards",
      "Statistical officers can share raw unmasked records with private debt collectors"
    ],
    correctAnswerIndex: 1,
    explanation: "Principle 6 of the UN Fundamental Principles of Official Statistics establishes that individual data collected for statistical compilation are strictly confidential and protected from non-statistical use.",
    competency: "Ethics & Integrity",
    difficulty: "Easy",
    category: "behavioral",
    diagnosticWeight: 1
  },
  {
    id: "diag-q10",
    question: "In the Generic Statistical Business Process Model (GSBPM 5.1), which phase encompasses data editing, imputation, derived variable generation, and weighting calculations?",
    options: [
      "Phase 1 \u2014 Specify Needs",
      "Phase 4 \u2014 Collect",
      "Phase 5 \u2014 Process",
      "Phase 8 \u2014 Evaluate"
    ],
    correctAnswerIndex: 2,
    explanation: "Phase 5 (Process) of GSBPM covers data cleaning, editing, missing value imputation, derivation of synthetic variables, and calibration/weighting.",
    competency: "Data Quality Frameworks",
    difficulty: "Medium",
    category: "statistical",
    diagnosticWeight: 1.1
  }
];
export const INITIAL_ASSESSMENT_HISTORY = [];
export const ADMIN_DEPARTMENTS_DATA = [
  {
    name: "National Sample Survey (NSS)",
    code: "NSS",
    officialsCount: 840,
    avgCompetency: 71,
    criticalGaps: 3,
    trainingCompletion: 78,
    aiReadiness: 39,
    topGaps: ["AI/ML", "GIS & Spatial Analytics", "Cloud Computing"]
  },
  {
    name: "Economic Statistics Division (ESD)",
    code: "ESD",
    officialsCount: 420,
    avgCompetency: 69,
    criticalGaps: 2,
    trainingCompletion: 75,
    aiReadiness: 44,
    topGaps: ["AI/ML", "Python Automation", "Cloud Computing"]
  },
  {
    name: "Data Informatics & Innovation Division (DIID)",
    code: "DIID",
    officialsCount: 290,
    avgCompetency: 76,
    criticalGaps: 1,
    trainingCompletion: 86,
    aiReadiness: 68,
    topGaps: ["Cloud Architecture", "Metadata Standards (SDMX)", "Data Privacy"]
  },
  {
    name: "National Accounts Division (NAD)",
    code: "NAD",
    officialsCount: 310,
    avgCompetency: 67,
    criticalGaps: 3,
    trainingCompletion: 70,
    aiReadiness: 36,
    topGaps: ["AI/ML", "R & Python", "Open Data Architecture"]
  },
  {
    name: "Social Statistics Division (SSD)",
    code: "SSD",
    officialsCount: 380,
    avgCompetency: 65,
    criticalGaps: 3,
    trainingCompletion: 72,
    aiReadiness: 34,
    topGaps: ["GIS Spatial Mapping", "AI/ML", "Data Visualization"]
  },
  {
    name: "Field Operations Division (FOD)",
    code: "FOD",
    officialsCount: 246,
    avgCompetency: 64,
    criticalGaps: 2,
    trainingCompletion: 68,
    aiReadiness: 28,
    topGaps: ["CAPI Digital Transition", "Leadership", "Data Quality Frameworks"]
  }
];
export const EMERGING_SKILLS_DATA = [
  {
    name: "AI & Machine Learning",
    category: "technical",
    growthRate: 38,
    demandLevel: "Very High",
    currentReadiness: 42,
    projectedDemand2027: 85,
    strategicRelevance: "Automated survey imputation, anomaly detection, satellite imagery crop estimates and LLM query parsing."
  },
  {
    name: "Data Science & Python Automation",
    category: "technical",
    growthRate: 31,
    demandLevel: "Very High",
    currentReadiness: 58,
    projectedDemand2027: 88,
    strategicRelevance: "Transitioning repetitive manual tabulation scripts to high-performance automated data pipelines."
  },
  {
    name: "Cloud Computing & Sovereign Infra",
    category: "technical",
    growthRate: 27,
    demandLevel: "High",
    currentReadiness: 36,
    projectedDemand2027: 78,
    strategicRelevance: "Centralizing survey microdata ingestion on NIC MeghRaj GI Cloud with elastic container computing."
  },
  {
    name: "Data Engineering & Open APIs",
    category: "technical",
    growthRate: 24,
    demandLevel: "High",
    currentReadiness: 49,
    projectedDemand2027: 74,
    strategicRelevance: "Powering automated data dissemination to NITI Aayog, Reserve Bank of India, and global SDG registries."
  },
  {
    name: "Cybersecurity & Data Privacy (DPDP)",
    category: "governance",
    growthRate: 22,
    demandLevel: "High",
    currentReadiness: 64,
    projectedDemand2027: 82,
    strategicRelevance: "Ensuring strict compliance with CERT-In directives and citizen privacy guarantees under DPDP 2023."
  },
  {
    name: "GIS & Remote Sensing Analytics",
    category: "technical",
    growthRate: 18,
    demandLevel: "Moderate",
    currentReadiness: 45,
    projectedDemand2027: 68,
    strategicRelevance: "Integrating earth observation satellite data with ground sample surveys for crop yield estimation."
  }
];
export const COURSE_EFFECTIVENESS_DATA = [
  {
    courseId: "igot-ai-01",
    courseTitle: "Machine Learning for Government Analytics",
    provider: "iGOT Karmayogi",
    enrollments: 1420,
    completionRate: 82,
    avgScore: 84,
    competencyImprovementDelta: 24,
    learnerRating: 4.8
  },
  {
    courseId: "igot-py-01",
    courseTitle: "Advanced Python for Official Statistics",
    provider: "iGOT Karmayogi",
    enrollments: 2310,
    completionRate: 88,
    avgScore: 86,
    competencyImprovementDelta: 21,
    learnerRating: 4.8
  },
  {
    courseId: "nssta-ai-2026",
    courseTitle: "Advanced AI & ML in Official Statistics (Residential)",
    provider: "NSSTA Greater Noida",
    enrollments: 140,
    completionRate: 98,
    avgScore: 92,
    competencyImprovementDelta: 32,
    learnerRating: 4.9
  },
  {
    courseId: "igot-gis-01",
    courseTitle: "GIS & Geospatial Analysis for Public Admin",
    provider: "iGOT Karmayogi",
    enrollments: 1850,
    completionRate: 76,
    avgScore: 79,
    competencyImprovementDelta: 19,
    learnerRating: 4.7
  },
  {
    courseId: "igot-dpdp-01",
    courseTitle: "DPDP Act Compliance for Government Officers",
    provider: "iGOT Karmayogi",
    enrollments: 4500,
    completionRate: 94,
    avgScore: 89,
    competencyImprovementDelta: 16,
    learnerRating: 4.6
  }
];
export const WORKFORCE_INSIGHTS_DATA = [
  {
    id: "wi-01",
    title: "Enterprise AI/ML Capability Deficit Across Statistical Cadres",
    type: "critical",
    summary: "Across all 2,486 surveyed statistical personnel, AI & Machine Learning represents the single largest capability gap (average readiness of only 42% against target 75%).",
    impactedDepartments: ["NSS", "ESD", "NAD", "SSD"],
    recommendedIntervention: "Launch mandatory 4-week hybrid AI/ML Foundation cohort with iGOT and NSSTA by Q3 2026.",
    metricHighlight: "40% Competency Deficit in 1,850+ officers",
    priority: "Urgent"
  },
  {
    id: "wi-02",
    title: "Strong Foundational Core in Statistical Sampling and Integrity",
    type: "trend",
    summary: "The workforce demonstrates exceptional domain mastery in core disciplines: Sampling (82%), Data Quality (80%), and Ethics (85%), providing a fertile foundation for high-tech upskilling.",
    impactedDepartments: ["NSS", "FOD", "NAD"],
    recommendedIntervention: "Leverage senior Statistical Officers as peer mentors for practical field case studies in advanced analytics.",
    metricHighlight: "82% Baseline in Core Statistics",
    priority: "Medium"
  },
  {
    id: "wi-03",
    title: "Geospatial Analytics Acceleration Required for Urban & Rural Frames",
    type: "opportunity",
    summary: "Only 32% of field division personnel possess intermediate GIS capabilities, hindering rapid digital UFS block updating and automated satellite cross-validation.",
    impactedDepartments: ["NSS", "FOD", "SSD"],
    recommendedIntervention: "Scale up NSSTA hands-on QGIS residential workshops and provide pre-configured open geospatial tools.",
    metricHighlight: "28% Gap in Spatial Tooling",
    priority: "High"
  },
  {
    id: "wi-04",
    title: "High Training ROI in Python & Data Pipeline Modernization",
    type: "recommendation",
    summary: "Officers completing Python training demonstrated a +21% measured boost in post-assessment capability and reduced survey tabulation turnaround time by an estimated 35%.",
    impactedDepartments: ["ESD", "DIID", "NSS"],
    recommendedIntervention: "Recognize top-performing Python certified officers with National Statistical Innovation Commendations.",
    metricHighlight: "+21% Skill Improvement Post-Training",
    priority: "High"
  }
];

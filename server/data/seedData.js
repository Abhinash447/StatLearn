export const SEED_USERS = [
  {
    name: 'Abhinash Kumar',
    email: 'abhinash@statskill.gov.in',
    password: 'password123',
    role: 'learner',
    designation: 'Statistical Officer',
    department: 'National Sample Survey (NSS)',
    currentAssignment: 'Survey Data Analytics & Quality Assurance',
    education: 'M.Sc. Statistics & Data Science',
    experienceYears: 5,
    previousTraining: [
      'Survey Methodology & Field Operations (NSSTA)',
      'Statistical Quality Control & Audit',
      'Python for Official Statistics',
      'Data Visualization & Analytics'
    ],
    employeeId: 'MoSPI-NSS-2022-0891',
    location: 'Sankhyiki Bhawan, New Delhi'
  },
  {
    name: 'Priya Sharma',
    email: 'official@statskill.gov.in',
    password: 'demo123',
    role: 'learner',
    designation: 'Statistical Officer',
    department: 'National Sample Survey (NSS)',
    currentAssignment: 'Survey Data Analytics & Quality Assurance',
    education: 'M.Sc. Statistics (University of Delhi)',
    experienceYears: 6,
    previousTraining: [
      'Survey Methodology & Field Operations (NSSTA)',
      'Statistical Quality Control & Audit',
      'SQL Fundamentals for Relational Databases',
      'Data Visualization with PowerBI & Excel'
    ],
    employeeId: 'MoSPI-NSS-2020-0492',
    location: 'Sankhyiki Bhawan, New Delhi'
  },
  {
    name: 'Dr. Alok Verma',
    email: 'admin@statskill.gov.in',
    password: 'admin123',
    role: 'admin',
    designation: 'Additional Director General',
    department: 'Data Informatics & Innovation Division (DIID)',
    currentAssignment: 'National Statistical Capacity Building & AI Strategy',
    education: 'Ph.D. in Econometrics & Public Policy',
    experienceYears: 18,
    previousTraining: [
      'Executive Leadership for Senior Civil Servants',
      'National Data Governance Architecture',
      'Big Data & AI for Official Statistics (UNSD)'
    ],
    employeeId: 'MoSPI-DIID-2008-0012',
    location: 'MoSPI HQ, New Delhi'
  }
];

export const SEED_COMPETENCIES = [
  { id: 'comp-sampling', name: 'Sampling', category: 'statistical', currentScore: 0, requiredScore: 85, gap: 0, level: 'Unassessed', progress: 0, priority: 'Low', description: 'Design and execution of probability sampling, stratified, cluster and multistage survey sampling frames.' },
  { id: 'comp-survey-design', name: 'Survey Design', category: 'statistical', currentScore: 0, requiredScore: 85, gap: 0, level: 'Unassessed', progress: 0, priority: 'Low', description: 'Questionnaire design, response burden reduction, sampling weight calibration and field testing.' },
  { id: 'comp-national-accounts', name: 'National Accounts', category: 'statistical', currentScore: 0, requiredScore: 70, gap: 0, level: 'Unassessed', progress: 0, priority: 'Low', description: 'System of National Accounts (SNA), GDP/GVA compilation, input-output tables.' },
  { id: 'comp-price-stats', name: 'Price Statistics', category: 'statistical', currentScore: 0, requiredScore: 70, gap: 0, level: 'Unassessed', progress: 0, priority: 'Low', description: 'CPI, WPI, index number methodologies (Laspeyres, Paasche, Fisher).' },
  { id: 'comp-labour-stats', name: 'Labour Statistics', category: 'statistical', currentScore: 0, requiredScore: 70, gap: 0, level: 'Unassessed', progress: 0, priority: 'Low', description: 'Periodic Labour Force Survey (PLFS) methodologies.' },
  { id: 'comp-agri-stats', name: 'Agricultural Statistics', category: 'statistical', currentScore: 0, requiredScore: 75, gap: 0, level: 'Unassessed', progress: 0, priority: 'Low', description: 'Crop yield estimation, GCES methodology.' },
  { id: 'comp-industrial-stats', name: 'Industrial Statistics', category: 'statistical', currentScore: 0, requiredScore: 75, gap: 0, level: 'Unassessed', progress: 0, priority: 'Low', description: 'Annual Survey of Industries (ASI), IIP index.' },
  { id: 'comp-sdg-indicators', name: 'SDG Indicators', category: 'statistical', currentScore: 0, requiredScore: 80, gap: 0, level: 'Unassessed', progress: 0, priority: 'Low', description: 'National Indicator Framework (NIF) monitoring.' },
  { id: 'comp-metadata-standards', name: 'Metadata Standards', category: 'statistical', currentScore: 0, requiredScore: 80, gap: 0, level: 'Unassessed', progress: 0, priority: 'Low', description: 'SDMX specifications and standardized code lists.' },
  { id: 'comp-data-quality', name: 'Data Quality Frameworks', category: 'statistical', currentScore: 0, requiredScore: 85, gap: 0, level: 'Unassessed', progress: 0, priority: 'Low', description: 'Generic Statistical Business Process Model (GSBPM).' },
  { id: 'comp-python', name: 'Python', category: 'technical', currentScore: 0, requiredScore: 80, gap: 0, level: 'Unassessed', progress: 0, priority: 'Low', description: 'Pandas, NumPy, automated data wrangling, statistical pipelines.' },
  { id: 'comp-r', name: 'R', category: 'technical', currentScore: 0, requiredScore: 65, gap: 0, level: 'Unassessed', progress: 0, priority: 'Low', description: 'Tidyverse, complex survey packages.' },
  { id: 'comp-sql', name: 'SQL', category: 'technical', currentScore: 0, requiredScore: 80, gap: 0, level: 'Unassessed', progress: 0, priority: 'Low', description: 'Complex joins, window functions, microdata queries.' },
  { id: 'comp-stata', name: 'Stata & SPSS', category: 'technical', currentScore: 0, requiredScore: 75, gap: 0, level: 'Unassessed', progress: 0, priority: 'Low', description: 'Econometric modeling, do-file syntax.' },
  { id: 'comp-gis', name: 'GIS & Spatial Analytics', category: 'technical', currentScore: 0, requiredScore: 70, gap: 0, level: 'Unassessed', progress: 0, priority: 'Low', description: 'Geospatial visualization, QGIS, UFS block mapping.' },
  { id: 'comp-data-viz', name: 'Data Visualization', category: 'technical', currentScore: 0, requiredScore: 80, gap: 0, level: 'Unassessed', progress: 0, priority: 'Low', description: 'Interactive dashboards, narrative charts.' },
  { id: 'comp-ai-ml', name: 'AI & Machine Learning', category: 'technical', currentScore: 0, requiredScore: 75, gap: 0, level: 'Unassessed', progress: 0, priority: 'Low', description: 'Supervised models for survey imputation, outlier detection, NLP classification.' },
  { id: 'comp-cloud', name: 'Cloud Computing', category: 'technical', currentScore: 0, requiredScore: 70, gap: 0, level: 'Unassessed', progress: 0, priority: 'Low', description: 'NIC MeghRaj GI Cloud services, object storage, secure pipelines.' },
  { id: 'comp-apis', name: 'APIs & Microservices', category: 'technical', currentScore: 0, requiredScore: 65, gap: 0, level: 'Unassessed', progress: 0, priority: 'Low', description: 'RESTful API consumption, JSON schema validation.' },
  { id: 'comp-open-data', name: 'Open Data Architecture', category: 'technical', currentScore: 0, requiredScore: 75, gap: 0, level: 'Unassessed', progress: 0, priority: 'Low', description: 'NDSAP policy, open formats, anonymization.' },
  { id: 'comp-cybersecurity', name: 'Cybersecurity', category: 'governance', currentScore: 0, requiredScore: 75, gap: 0, level: 'Unassessed', progress: 0, priority: 'Low', description: 'CERT-In guidelines, phishing defense, access control.' },
  { id: 'comp-data-privacy', name: 'Data Privacy & DPDP Act', category: 'governance', currentScore: 0, requiredScore: 80, gap: 0, level: 'Unassessed', progress: 0, priority: 'Low', description: 'DPDP Act 2023 compliance, differential privacy, k-anonymity.' },
  { id: 'comp-ethics', name: 'Ethics & Integrity', category: 'behavioral', currentScore: 0, requiredScore: 90, gap: 0, level: 'Unassessed', progress: 0, priority: 'Low', description: 'UN Fundamental Principles of Official Statistics.' }
];

export const SEED_DEPARTMENTS = [
  { name: 'National Sample Survey (NSS)', code: 'NSS', officialsCount: 840, avgCompetency: 71, criticalGaps: 3, trainingCompletion: 78, aiReadiness: 39, topGaps: ['AI/ML', 'GIS & Spatial Analytics', 'Cloud Computing'] },
  { name: 'Economic Statistics Division (ESD)', code: 'ESD', officialsCount: 420, avgCompetency: 69, criticalGaps: 2, trainingCompletion: 75, aiReadiness: 44, topGaps: ['AI/ML', 'Python Automation', 'Cloud Computing'] },
  { name: 'Data Informatics & Innovation Division (DIID)', code: 'DIID', officialsCount: 290, avgCompetency: 76, criticalGaps: 1, trainingCompletion: 86, aiReadiness: 68, topGaps: ['Cloud Architecture', 'Metadata Standards (SDMX)', 'Data Privacy'] },
  { name: 'National Accounts Division (NAD)', code: 'NAD', officialsCount: 310, avgCompetency: 67, criticalGaps: 3, trainingCompletion: 70, aiReadiness: 36, topGaps: ['AI/ML', 'R & Python', 'Open Data Architecture'] },
  { name: 'Social Statistics Division (SSD)', code: 'SSD', officialsCount: 380, avgCompetency: 65, criticalGaps: 3, trainingCompletion: 72, aiReadiness: 34, topGaps: ['GIS Spatial Mapping', 'AI/ML', 'Data Visualization'] },
  { name: 'Field Operations Division (FOD)', code: 'FOD', officialsCount: 246, avgCompetency: 64, criticalGaps: 2, trainingCompletion: 68, aiReadiness: 28, topGaps: ['CAPI Digital Transition', 'Leadership', 'Data Quality Frameworks'] }
];

export const SEED_IGOT_COURSES = [
  {
    id: 'igot-ai-01',
    title: 'Machine Learning for Government Analytics',
    provider: 'iGOT Karmayogi & Wadhwani AI',
    duration: '6 Weeks (18 Hours)',
    level: 'Unassessed',
    competencies: ['AI & Machine Learning', 'Python', 'Data Quality Frameworks'],
    competencyCategory: 'technical',
    matchScore: 94,
    department: 'Cross-Departmental',
    rating: 4.8,
    enrolledCount: 1420,
    description: 'Practical application of supervised and unsupervised machine learning algorithms for public sector policy and survey imputation.',
    modules: ['Foundations in Public Admin', 'Imputation with Scikit-Learn', 'Survey Weighting Models', 'NLP for Industrial Codes', 'Responsible AI'],
    isEnrolled: false
  },
  {
    id: 'igot-cloud-01',
    title: 'Cloud Analytics & Government Infrastructure (NIC GI Cloud)',
    provider: 'iGOT Karmayogi & MeitY',
    duration: '4 Weeks (12 Hours)',
    level: 'Unassessed',
    competencies: ['Cloud Computing', 'APIs & Microservices', 'Cybersecurity'],
    competencyCategory: 'technical',
    matchScore: 91,
    department: 'Data Informatics',
    rating: 4.7,
    enrolledCount: 980,
    description: 'Deploying statistical pipelines on MeghRaj (NIC Cloud), scalable storage, automated ETL, and secure cloud operations.',
    modules: ['MeghRaj Ecosystem', 'Managing Cloud Storage', 'Deploying Microservices', 'Cloud Security & CERT-In'],
    isEnrolled: false
  },
  {
    id: 'igot-py-01',
    title: 'Advanced Python for Official Statistics & Automation',
    provider: 'iGOT Karmayogi & IIT Madras',
    duration: '6 Weeks (20 Hours)',
    level: 'Unassessed',
    competencies: ['Python', 'Data Quality Frameworks', 'Open Data Architecture'],
    competencyCategory: 'technical',
    matchScore: 86,
    department: 'All Statistical Divisions',
    rating: 4.8,
    enrolledCount: 2310,
    description: 'High-performance Pandas and Polars pipelines, automated tabulation, and complex survey weights.',
    modules: ['Vectorized Operations', 'Cleaning PLFS & ASI Microdata', 'Weighted Variance Estimation', 'Automated Report Generation'],
    isEnrolled: true,
    progress: 0
  }
];

export const SEED_NSSTA_PROGRAMMES = [
  {
    id: 'nssta-ai-2026',
    title: 'Advanced AI & Machine Learning Applications in Official Statistics',
    duration: '5 Days (Residential)',
    mode: 'In-person',
    eligibility: 'Statistical Officers with >3 yrs service',
    competencies: ['AI & Machine Learning', 'Python', 'Cloud Computing'],
    competencyCategory: 'technical',
    recommendationReason: 'Targeted intervention for your Critical AI/ML gap (35% vs 75% required).',
    startDate: '2026-09-15',
    venue: 'NSSTA Campus, Greater Noida',
    seatsAvailable: 35,
    targetRoles: ['Statistical Officer', 'Senior Statistical Officer'],
    isNominated: false,
    matchScore: 96,
    faculty: 'Dr. S. K. Gupta (Ex-ISI) & MoSPI AI Taskforce Leads'
  },
  {
    id: 'nssta-gis-2026',
    title: 'GIS Applications & Spatial Sampling in National Sample Surveys',
    duration: '3 Days (Residential)',
    mode: 'In-person',
    eligibility: 'All NSS, FOD and Social Statistics Officers',
    competencies: ['GIS & Spatial Analytics', 'Sampling', 'Survey Design'],
    competencyCategory: 'technical',
    recommendationReason: 'Addresses your High priority GIS gap for modernizing PSU frame delineation.',
    startDate: '2026-10-06',
    venue: 'NSSTA Campus, Greater Noida',
    seatsAvailable: 40,
    targetRoles: ['Statistical Officer', 'Field Superintendent'],
    isNominated: false,
    matchScore: 92,
    faculty: 'ISRO Scientists & NSSTA Senior Faculty'
  }
];

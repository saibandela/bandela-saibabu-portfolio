export interface Project {
  id: string;
  title: string;
  category: 'Software Development' | 'Quality Assurance' | 'Data & Analytics';
  shortDescription: string;
  problemSolved: string;
  implementationDetails: string[];
  techStack: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  status: 'Completed' | 'Active';
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; context: string }[];
}

export const PROFILE = {
  name: "Bandela Saibabu",
  role: "Python Developer & Software Engineer",
  subRole: "Specializing in Python, REST APIs, QA Testing & Data Analytics",
  location: "Hyderabad, India",
  email: "bandelasai245@gmail.com",
  github: "https://github.com/saibandela",
  linkedin: "https://www.linkedin.com/in/saibabu-bandela",
  education: {
    degree: "B.Tech in Computer Science and Engineering - Artificial Intelligence",
    graduationYear: 2026,
    cgpa: "7.79 / 10.0",
    institution: "Computer Science and Engineering (AI)",
  },
  headline: "Building Practical Solutions with Technology.",
  heroSummary: "Computer Science undergraduate (Class of 2026) focused on Python development, backend services, and test-driven validation. Combining core programming skills with data analytics and quality assurance to create clean, dependable software solutions.",
  aboutText: [
    "I am an undergraduate in Computer Science and Engineering specializing in Artificial Intelligence (Class of 2026) based in Hyderabad, India, maintaining a CGPA of 7.79.",
    "My focus centers on practical software engineering with Python, REST API development, and relational database management using SQL and PostgreSQL. Alongside development, I apply systematic quality assurance practices including API endpoint testing, structured validation, and debugging to ensure reliability.",
    "I have also built data pipelines and exploratory analytics solutions using Pandas, NumPy, and Power BI. I am passionate about learning continuously, understanding system internals, and delivering maintainable code for entry-level engineering and technical problem-solving roles."
  ],
  verifiedCoreSkills: [
    "Python",
    "SQL / PostgreSQL",
    "REST APIs",
    "Git & GitHub",
    "Pandas & NumPy",
    "API Testing & QA"
  ]
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming",
    description: "Core language foundation for software development, automation, and algorithmic problem-solving.",
    skills: [
      { name: "Python", context: "Object-oriented programming, data structures, script automation, and backend logic" }
    ]
  },
  {
    title: "Databases",
    description: "Structured relational data persistence, schema design, and querying.",
    skills: [
      { name: "SQL", context: "Complex relational queries, aggregations, joins, constraints, and data retrieval" },
      { name: "PostgreSQL", context: "Relational database setup, schema modeling, table relationships, and indexing" }
    ]
  },
  {
    title: "Development & Tools",
    description: "Backend architecture, interface protocols, and version control workflows.",
    skills: [
      { name: "REST APIs", context: "HTTP request methods (GET, POST, PUT, DELETE), JSON formatting, and status codes" },
      { name: "Git", context: "Branching, committing, staging, conflict resolution, and version tracking" },
      { name: "GitHub", context: "Repository hosting, documentation, commit history, and code reviews" },
      { name: "Backend Architecture", context: "Modular routing, separation of concerns, and error handling patterns" }
    ]
  },
  {
    title: "Data Analytics",
    description: "Data manipulation, transformation, statistical analysis, and reporting.",
    skills: [
      { name: "Pandas", context: "DataFrame operations, data transformation, cleansing, and missing value imputation" },
      { name: "NumPy", context: "Numerical arrays, matrix operations, and vectorized computations" },
      { name: "Microsoft Excel", context: "Tabular data structuring, formula modeling, pivot tables, and review" },
      { name: "Power BI", context: "Interactive dashboards, DAX measures, data relationships, and visual metrics" }
    ]
  },
  {
    title: "Quality Assurance",
    description: "Validation methodologies to maintain functional correctness and prevent regressions.",
    skills: [
      { name: "API Testing", context: "Endpoint verification, payload validation, status code checks, and boundary testing" },
      { name: "Test Case Design", context: "Writing structured test scenarios, expected vs. actual results, and edge cases" },
      { name: "Validation & Debugging", context: "Traceback inspection, root cause diagnosis, and log analysis" }
    ]
  },
  {
    title: "Technical Support",
    description: "System troubleshooting, analytical breakdown, and issue resolution.",
    skills: [
      { name: "System Troubleshooting", context: "Environment configuration, runtime dependency resolution, and OS diagnostics" },
      { name: "Problem Solving", context: "Methodical hypothesis testing, error replication, and technical documentation" }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "qualityhub",
    title: "QualityHub",
    category: "Quality Assurance",
    shortDescription: "A structured QA framework and testing workspace for systematic test case organization and API validation.",
    problemSolved: "Simplifies manual and automated test tracking by establishing standardized test case structures, test execution logging, and API response validation routines.",
    implementationDetails: [
      "Designed structured test schemas covering test scenarios, preconditions, steps, and expected assertions.",
      "Implemented API endpoint validation checks targeting response structure, status codes, and error payloads.",
      "Structured testing repository architecture following modular QA best practices for traceability."
    ],
    techStack: ["Python", "API Testing", "Test Case Management", "QA Validation", "Debugging"],
    githubUrl: "https://github.com/saibandela/QualityHub",
    status: "Active"
  },
  {
    id: "rest-api-project",
    title: "REST API Project",
    category: "Software Development",
    shortDescription: "Modular Python RESTful API demonstrating standard HTTP routing, request parsing, and structured responses.",
    problemSolved: "Demonstrates practical backend service construction with clean separation between request routing, input validation, and business logic.",
    implementationDetails: [
      "Configured REST endpoints supporting core CRUD operations with standard HTTP status code conventions.",
      "Implemented input sanitization and JSON payload validation to handle bad requests gracefully.",
      "Organized codebase into maintainable controllers and service modules for clear readability."
    ],
    techStack: ["Python", "REST API", "JSON", "HTTP Methods", "Git"],
    githubUrl: "https://github.com/saibandela/REST-API-project",
    status: "Completed"
  },
  {
    id: "retail-data-pipeline",
    title: "Retail Data Pipeline",
    category: "Data & Analytics",
    shortDescription: "Automated ETL data pipeline extracting retail transaction data and loading it into PostgreSQL.",
    problemSolved: "Solves unstructured retail data ingestion challenges by cleansing raw transaction records and loading them into relational tables with strict referential integrity.",
    implementationDetails: [
      "Built Python ETL scripts to extract tabular sales files, normalize column formats, and handle null records.",
      "Designed relational schema in PostgreSQL with primary/foreign keys and indexing for query performance.",
      "Implemented automated batch insertion with transaction rollback on error to preserve database consistency."
    ],
    techStack: ["Python", "PostgreSQL", "SQL", "Pandas", "ETL Pipeline"],
    githubUrl: "https://github.com/saibandela/data-pipeline-development-postgresql-python",
    status: "Completed"
  },
  {
    id: "customer-churn-prediction",
    title: "Customer Churn Prediction",
    category: "Data & Analytics",
    shortDescription: "Exploratory data analysis and predictive modeling assessing customer attrition risk factors.",
    problemSolved: "Helps identify key behavioral markers and service factors associated with churn, translating raw data into interpretable risk indicators.",
    implementationDetails: [
      "Conducted comprehensive Exploratory Data Analysis (EDA) on customer records using Pandas and NumPy.",
      "Preprocessed numerical and categorical attributes including scaling, one-hot encoding, and feature correlation.",
      "Formulated actionable business conclusions regarding tenure, payment method, and service contract stability."
    ],
    techStack: ["Python", "Pandas", "NumPy", "Data Analytics", "EDA", "Jupyter"],
    githubUrl: "https://github.com/saibandela/customer-churn-prediction-with-business-insights",
    status: "Completed"
  },
  {
    id: "chocolate-sales-dashboard",
    title: "Chocolate Sales & Profitability Dashboard",
    category: "Data & Analytics",
    shortDescription: "Interactive Power BI dashboard delivering multi-dimensional sales, cost, and profit margin analysis.",
    problemSolved: "Transforms multi-region transaction logs into an executive-level interactive report to track product profit margins, salesperson productivity, and seasonal sales shifts.",
    implementationDetails: [
      "Constructed a clean data model establishing relationships across calendar dates, products, and geographical zones.",
      "Authored custom DAX calculated measures for Gross Profit, Net Revenue, and Profit Margins.",
      "Configured cross-filtering visuals, dynamic slicers, and key performance summary indicators for rapid decision-making."
    ],
    techStack: ["Power BI", "Excel", "Data Modeling", "DAX", "Business Intelligence"],
    githubUrl: "https://github.com/saibandela/chocolate-sales-dashboard-powerbi-",
    status: "Completed"
  }
];

export const EDUCATION_DATA = {
  degree: "Bachelor of Technology (B.Tech)",
  major: "Computer Science and Engineering - Artificial Intelligence",
  institution: "Computer Science & Engineering (Artificial Intelligence)",
  duration: "2022 – 2026",
  currentStatus: "Final Year Undergraduate (Class of 2026)",
  cgpa: "7.79 / 10.0",
  location: "Hyderabad, India",
  relevantCoursework: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming (Python)",
    "Database Management Systems (SQL)",
    "Artificial Intelligence Foundations",
    "Software Engineering & Testing",
    "Operating Systems & Computer Networks"
  ]
};

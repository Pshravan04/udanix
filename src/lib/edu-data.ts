export const UNIVERSITIES = [
    // --- INDIA (IITs) ---
    "IIT Delhi", "IIT Bombay", "IIT Kanpur", "IIT Madras", "IIT Kharagpur", "IIT Roorkee", "IIT Guwahati", "IIT Hyderabad",
    "IIT BHU Varanasi", "IIT Indore", "IIT Gandhinagar", "IIT Ropar", "IIT Patna", "IIT Bhubaneswar", "IIT Mandi", "IIT Jodhpur",
    "IIT Tirupati", "IIT Palakkad", "IIT Goa", "IIT Dharwad", "IIT Bhilai", "IIT Jammu",

    // --- INDIA (NITs) ---
    "NIT Trichy", "NIT Karnataka (Surathkal)", "NIT Rourkela", "NIT Warangal", "NIT Calicut", "NIT Nagpur", "NIT Durgapur",
    "NIT Silchar", "NIT Jaipur", "NIT Allahabad", "NIT Kurukshetra", "NIT Jalandhar", "NIT Surat", "NIT Meghalaya", "NIT Patna",
    "NIT Raipur", "NIT Srinagar", "NIT Agartala", "NIT Goa", "NIT Jamshedpur", "NIT Hamirpur", "NIT Uttarakhand", "NIT Manipur",
    "NIT Mizoram", "NIT Nagaland", "NIT Sikkim", "NIT Arunachal Pradesh", "NIT Delhi", "NIT Puducherry", "NIT Andhra Pradesh",

    // --- INDIA (IIITs & Central Universities) ---
    "IIIT Hyderabad", "IIIT Bangalore", "IIIT Delhi", "IIIT Allahabad", "IIIT Gwalior", "IIIT Jabalpur", "IIIT Kancheepuram",
    "Delhi University (DU)", "Jawaharlal Nehru University (JNU)", "Banaras Hindu University (BHU)", "Aligarh Muslim University (AMU)",
    "Jamia Millia Islamia (JMI)", "Anna University", "Jadavpur University", "University of Mumbai", "University of Calcutta",

    // --- INDIA (Private & State) ---
    "BITS Pilani", "BITS Goa", "BITS Hyderabad", "SRM Institute of Science and Technology", "VIT Vellore", "VIT Chennai",
    "Manipal Academy of Higher Education", "Thapar Institute of Engineering and Technology", "DTU (Delhi Technological University)",
    "NSUT (Netaji Subhas University of Technology)", "IGDTUW", "VJTI Mumbai", "COEP Pune", "RVCE Bangalore", "MSRIT Bangalore",
    "PES University", "Amity University", "Lovely Professional University (LPU)", "Chandigarh University", "Shiv Nadar University",
    "Ashoka University", "Flame University", "Symbiosis International University", "Christ University", "NMIMS", "SPJIMR", "IIM Ahmedabad",
    "IIM Bangalore", "IIM Calcutta", "IIM Lucknow", "IIM Indore", "IIM Kozhikode", "ISB Hyderabad", "FMS Delhi", "XLRI Jamshedpur",

    // --- UNITED STATES ---
    "Harvard University", "Stanford University", "Massachusetts Institute of Technology (MIT)", "Princeton University",
    "Yale University", "Columbia University", "University of Chicago", "California Institute of Technology (Caltech)",
    "University of Pennsylvania (UPenn)", "Johns Hopkins University", "UC Berkeley", "UCLA", "Cornell University",
    "Northwestern University", "University of Michigan", "Carnegie Mellon University", "Duke University", "New York University (NYU)",
    "University of Texas at Austin", "Georgia Tech", "University of Washington", "UC San Diego", "Purdue University",

    // --- UK & EUROPE ---
    "University of Oxford", "University of Cambridge", "Imperial College London", "University College London (UCL)",
    "University of Edinburgh", "King's College London", "LSE (London School of Economics)", "University of Manchester",
    "ETH Zurich", "EPFL Lausanne", "Sorbonne University", "University of Paris-Saclay", "PSL University", "TU Munich",
    "Heidelberg University", "LMU Munich", "Delft University of Technology (TU Delft)", "University of Amsterdam",
    "KU Leuven", "Karolinska Institute", "University of Copenhagen", "TU Berlin", "IE University", "INSEAD",

    // --- ASIA & OCEANIA ---
    "National University of Singapore (NUS)", "Nanyang Technological University (NTU)", "Tsinghua University", "Peking University",
    "Fudan University", "Zhejiang University", "Shanghai Jiao Tong University", "University of Hong Kong (HKU)",
    "Hong Kong University of Science and Technology (HKUST)", "University of Tokyo", "Kyoto University", "Osaka University",
    "Seoul National University", "KAIST", "Yonsei University", "University of Melbourne", "University of Sydney",
    "University of Queensland", "UNSW Sydney", "Monash University", "Australian National University (ANU)", "University of Auckland",

    // --- CANADA ---
    "University of Toronto", "McGill University", "University of British Columbia (UBC)", "University of Waterloo",
    "University of Montreal", "University of Alberta", "Western University", "Queen's University"
].sort();

export const DEGREES = [
    "B.Tech", "B.E.", "B.Sc.", "B.A.", "B.Com.", "BBA", "BMS", "B.Arch", "BFA", "B.Des",
    "MBBS", "BDS", "BPT", "B.Pharm", "LLB", "BA LLB", "BBA LLB",
    "M.Tech", "M.Sc.", "M.A.", "M.Com.", "MBA", "PGDM", "MCA", "M.Arch", "M.Des", "LLM",
    "Ph.D.", "M.Phil", "Doctorate", "Post Doctorate",
    "Diploma", "Advanced Diploma", "Certificate Course", "Associate Degree"
];

export const COURSES = [
    // Engineering & Tech
    "Computer Science & Engineering", "Data Science", "Artificial Intelligence", "Machine Learning", "Information Technology",
    "Software Engineering", "Cybersecurity", "Blockchain Technology", "Cloud Computing", "Electronics & Communication",
    "Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Chemical Engineering", "Aerospace Engineering",
    "Biotechnology", "Robotics & Automation", "Mechatronics", "Environmental Engineering", "Industrial Design",

    // Sciences
    "Physics", "Chemistry", "Mathematics", "Statistics", "Biology", "Biochemistry", "Microbiology", "Environmental Science",
    "Geology", "Astronomy", "Marine Science",

    // Business & Commerce
    "Business Administration", "Finance", "Marketing", "Human Resource Management", "Accounting", "International Business",
    "Supply Chain Management", "Entrepreneurship", "Operations Management", "Economics", "Econometrics", "Actuarial Science",

    // Humanities & Social Sciences
    "Psychology", "Clinical Psychology", "Sociology", "Political Science", "International Relations", "History", "Geography",
    "Philosophy", "Anthropology", "Literature", "Linguistics", "Journalism & Mass Communication", "Public Administration",

    // Design, Arts & Media
    "Graphic Design", "Interior Design", "Fashion Design", "Product Design", "UI/UX Design", "Animation & VFX", "Fine Arts",
    "Performing Arts", "Music", "Photography", "Film Studies", "Architecture",

    // Medical & Healthcare
    "Medicine (MBBS)", "Dentistry", "Pharmacy", "Nursing", "Physiotherapy", "Nutrition & Dietetics", "Public Health",
    "Hospital Administration", "Veterinary Science",

    // Law & Others
    "Corporate Law", "Criminal Law", "Intellectual Property Law", "International Law", "Education (B.Ed)", "Physical Education",
    "Library Science", "Social Work", "Hospitality & Tourism Management", "Culinary Arts"
].sort();

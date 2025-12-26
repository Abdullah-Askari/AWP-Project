const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDD4V0vLy5PRoI6nSsHJEyN0Z3CdW0Gu_Q",
  authDomain: "ucpportalclone-b264a.firebaseapp.com",
  projectId: "ucpportalclone-b264a",
  storageBucket: "ucpportalclone-b264a.firebasestorage.app",
  messagingSenderId: "339496645684",
  appId: "1:339496645684:android:916e98b95f1f4d6df54661",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Parse command line arguments
const args = process.argv.slice(2);
let USER_ID = "xFawukKB3daO3JIScrpzcbbRKww1"; // Default user ID
let USER_EMAIL = ""; // Will be set from args or empty

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--uid' && args[i + 1]) {
    USER_ID = args[i + 1];
    i++;
  } else if (args[i] === '--email' && args[i + 1]) {
    USER_EMAIL = args[i + 1];
    i++;
  } else if (args[i] === '--help' || args[i] === '-h') {
    console.log(`
Usage: node scripts/seedFirestore.js [options]

Options:
  --uid <userId>    Firebase user UID (required for new users)
  --email <email>   User's email address
  --help, -h        Show this help message

Examples:
  node scripts/seedFirestore.js --uid ABC123XYZ --email student@ucp.edu.pk
  node scripts/seedFirestore.js --uid ABC123XYZ
`);
    process.exit(0);
  }
}

// ===================== DATA TO SEED =====================

const subjects = [
  { icon: "cpu-outline", name: "Operating Systems", time: "Mon, Wed 10:00 AM", code: "CS-301", credits: 4 },
  { icon: "terminal-outline", name: "Web Engineering", time: "Tue, Thu 12:00 PM", code: "SE-322", credits: 3 },
  { icon: "database-outline", name: "Database Systems", time: "Mon, Fri 1:00 PM", code: "CS-210", credits: 3 },
  { icon: "hardware-chip-outline", name: "Computer Organization", time: "Wed 3:00 PM", code: "CS-220", credits: 3 },
  { icon: "shield-outline", name: "Information Security", time: "Tue, Thu 9:00 AM", code: "CS-405", credits: 3 },
];

const notifications = [
  { id: 1, sender: "Dept. Head", message: "Orientation session on Monday", time: "1 hour ago", icon: "megaphone-outline", color: "#8B5CF6" },
  { id: 2, sender: "Prof. Khan", message: "Project submission extended to Feb 10", time: "3 hours ago", icon: "alert-circle-outline", color: "#EC4899" },
  { id: 3, sender: "Library", message: "Books due reminder", time: "5 hours ago", icon: "book-outline", color: "#D97706" },
  { id: 4, sender: "Admissions", message: "Scholarship documents approved", time: "12 hours ago", icon: "checkmark-circle-outline", color: "#059669" },
];

const gradebook = {
  "Fall 2025": [
    { name: "Operating Systems", code: "CS-301", credits: 4, grade: "A-", gpa: 3.7, color: "#7C3AED" },
    { name: "Web Engineering", code: "SE-322", credits: 3, grade: "B+", gpa: 3.3, color: "#0891B2" },
    { name: "Database Systems", code: "CS-210", credits: 3, grade: "A", gpa: 4.0, color: "#059669" },
  ],
  "Spring 2025": [
    { name: "Computer Organization", code: "CS-220", credits: 3, grade: "B", gpa: 3.0, color: "#EA580C" },
    { name: "Information Security", code: "CS-405", credits: 3, grade: "A", gpa: 4.0, color: "#DC2626" },
  ],
};

const attendance = {
  "December 2025": [
    { subject: "Operating Systems", total: 16, present: 14, absent: 2, percentage: 87, color: "#7C3AED" },
    { subject: "Web Engineering", total: 14, present: 13, absent: 1, percentage: 93, color: "#0891B2" },
    { subject: "Database Systems", total: 12, present: 12, absent: 0, percentage: 100, color: "#059669" },
  ],
  "November 2025": [
    { subject: "Computer Organization", total: 10, present: 9, absent: 1, percentage: 90, color: "#EA580C" },
    { subject: "Information Security", total: 11, present: 11, absent: 0, percentage: 100, color: "#DC2626" },
  ],
};

const invoices = {
  "2025": [
    { id: "INV-2025-201", semester: "Fall 2025", amountUSD: 500, amountPKR: 150000, status: "Pending", statusColor: "#EF4444", dueDate: "Jan 20, 2026", issueDate: "Dec 1, 2025", description: "Tuition Fee + Lab Charges" },
    { id: "INV-2025-202", semester: "Spring 2026", amountUSD: 480, amountPKR: 144000, status: "Paid", statusColor: "#10B981", dueDate: "Jun 15, 2026", issueDate: "May 1, 2026", description: "Spring Semester Fee" },
  ],
};

const schedule = [
  {
    day: "Monday",
    classes: [
      { subject: "Operating Systems", time: "10:00 AM - 11:30 AM", room: "Room 101", professor: "Dr. Kamran Siddiq", color: "#7C3AED", icon: "cpu-outline" },
    ],
  },
  {
    day: "Tuesday",
    classes: [
      { subject: "Web Engineering", time: "12:00 PM - 1:30 PM", room: "Lab 2", professor: "Prof. Ahsan", color: "#0891B2", icon: "terminal-outline" },
    ],
  },
  {
    day: "Wednesday",
    classes: [
      { subject: "Database Systems", time: "1:00 PM - 2:30 PM", room: "Room 202", professor: "Dr. Imran Ali", color: "#059669", icon: "database-outline" },
    ],
  },
  {
    day: "Thursday",
    classes: [
      { subject: "Information Security", time: "9:00 AM - 10:30 AM", room: "Lab 3", professor: "Prof. Sana Ahmed", color: "#DC2626", icon: "shield-outline" },
    ],
  },
  {
    day: "Friday",
    classes: [
      { subject: "Computer Organization", time: "3:00 PM - 4:30 PM", room: "Room 303", professor: "Dr. Usman Khan", color: "#EA580C", icon: "hardware-chip-outline" },
    ],
  },
];

const profile = {
  name: "Abdullah Askari",
  email: USER_EMAIL,
  phone: "+92 321 7654321",
  address: "456 University Avenue, Lahore, Pakistan",
  dob: "1998-03-22",
  studentId: "UCP567890",
  department: "Information Technology",
  semester: "6th",
  profilePicture: ""
};

const dashboard = {
  grades: "88%",
  attendance: "94%",
  pendingFees: "PKR 156,000",
  dueDate: "Jan 20, 2026"
};

// User document path
const userDocPath = `users/${USER_ID}`;

async function seedFirestore() {
  try {
    console.log("========================================");
    console.log("Seed Firestore for New User");
    console.log("========================================\n");
    console.log(`User ID: ${USER_ID}`);
    console.log(`Email: ${USER_EMAIL || '(not provided)'}`);
    console.log(`Writing data to: ${userDocPath}\n`);

    await setDoc(doc(db, userDocPath), {
      profile: profile,
      dashboard: dashboard,
      subjects: subjects,
      notifications: notifications,
      submittedFeedback: [],
      gradebook: gradebook,
      attendance: attendance,
      invoices: invoices,
      schedule: schedule,
    }, { merge: true });
    
    console.log("✓ Profile seeded successfully");
    console.log("✓ Dashboard seeded successfully");
    console.log("✓ Subjects seeded successfully");
    console.log("✓ Notifications seeded successfully");
    console.log("✓ Gradebook seeded successfully");
    console.log("✓ Attendance seeded successfully");
    console.log("✓ Invoices seeded successfully");
    console.log("✓ Schedule seeded successfully\n");

    console.log("========================================");
    console.log("All data seeded successfully!");
    console.log("========================================");
    
    process.exit(0);
  } catch (error) {
    console.error("Error seeding Firestore:", error);
    process.exit(1);
  }
}

// Run the seeding function
seedFirestore();

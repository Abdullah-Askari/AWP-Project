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

// ===================== NEW DATA TO SEED =====================

const subjects = [
  { icon: "book-open-outline", name: "Artificial Intelligence", time: "Mon, Wed 11:00 AM", code: "CS-401", credits: 4 },
  { icon: "laptop-outline", name: "Mobile App Development", time: "Tue, Thu 2:00 PM", code: "SE-330", credits: 3 },
  { icon: "database-outline", name: "Big Data Analytics", time: "Mon, Fri 3:00 PM", code: "CS-415", credits: 3 },
  { icon: "server-outline", name: "Cloud Computing", time: "Wed 10:00 AM", code: "CS-420", credits: 3 },
  { icon: "shield-outline", name: "Cybersecurity", time: "Tue, Thu 9:00 AM", code: "CS-430", credits: 3 },
];

const notifications = [
  { id: 1, sender: "Dean Office", message: "New semester registration opens tomorrow", time: "30 minutes ago", icon: "calendar-outline", color: "#2563EB" },
  { id: 2, sender: "Prof. Ahmed", message: "Midterm exam schedule released", time: "2 hours ago", icon: "clipboard-outline", color: "#D97706" },
  { id: 3, sender: "Library", message: "New AI books available", time: "4 hours ago", icon: "book-outline", color: "#10B981" },
  { id: 4, sender: "Finance", message: "Scholarship disbursement completed", time: "1 day ago", icon: "cash-outline", color: "#F59E0B" },
];

const gradebook = {
  "Fall 2025": [
    { name: "Artificial Intelligence", code: "CS-401", credits: 4, grade: "A", gpa: 4.0, color: "#2563EB" },
    { name: "Mobile App Development", code: "SE-330", credits: 3, grade: "B+", gpa: 3.3, color: "#D97706" },
  ],
  "Spring 2025": [
    { name: "Big Data Analytics", code: "CS-415", credits: 3, grade: "A-", gpa: 3.7, color: "#10B981" },
    { name: "Cloud Computing", code: "CS-420", credits: 3, grade: "B", gpa: 3.0, color: "#F59E0B" },
    { name: "Cybersecurity", code: "CS-430", credits: 3, grade: "A", gpa: 4.0, color: "#DC2626" },
  ],
};

const attendance = {
  "December 2025": [
    { subject: "Artificial Intelligence", total: 15, present: 14, absent: 1, percentage: 93, color: "#2563EB" },
    { subject: "Mobile App Development", total: 14, present: 13, absent: 1, percentage: 93, color: "#D97706" },
  ],
  "November 2025": [
    { subject: "Big Data Analytics", total: 12, present: 11, absent: 1, percentage: 92, color: "#10B981" },
    { subject: "Cloud Computing", total: 10, present: 9, absent: 1, percentage: 90, color: "#F59E0B" },
    { subject: "Cybersecurity", total: 11, present: 11, absent: 0, percentage: 100, color: "#DC2626" },
  ],
};

const invoices = {
  "2025": [
    { id: "INV-2025-301", semester: "Fall 2025", amountUSD: 520, amountPKR: 156000, status: "Paid", statusColor: "#10B981", dueDate: "Jan 15, 2026", issueDate: "Dec 1, 2025", description: "Tuition + Lab Fees" },
    { id: "INV-2025-302", semester: "Spring 2026", amountUSD: 500, amountPKR: 150000, status: "Pending", statusColor: "#EF4444", dueDate: "Jun 10, 2026", issueDate: "May 1, 2026", description: "Spring Semester Fees" },
  ],
};

const schedule = [
  {
    day: "Monday",
    classes: [
      { subject: "Artificial Intelligence", time: "11:00 AM - 12:30 PM", room: "Room 201", professor: "Dr. Saad Malik", color: "#2563EB", icon: "book-open-outline" },
    ],
  },
  {
    day: "Tuesday",
    classes: [
      { subject: "Mobile App Development", time: "2:00 PM - 3:30 PM", room: "Lab 4", professor: "Prof. Fatima", color: "#D97706", icon: "laptop-outline" },
      { subject: "Cybersecurity", time: "9:00 AM - 10:30 AM", room: "Lab 5", professor: "Dr. Ali", color: "#DC2626", icon: "shield-outline" },
    ],
  },
  {
    day: "Wednesday",
    classes: [
      { subject: "Cloud Computing", time: "10:00 AM - 11:30 AM", room: "Room 303", professor: "Dr. Noor", color: "#F59E0B", icon: "server-outline" },
    ],
  },
  {
    day: "Thursday",
    classes: [
      { subject: "Mobile App Development", time: "2:00 PM - 3:30 PM", room: "Lab 4", professor: "Prof. Fatima", color: "#D97706", icon: "laptop-outline" },
    ],
  },
  {
    day: "Friday",
    classes: [
      { subject: "Big Data Analytics", time: "3:00 PM - 4:30 PM", room: "Room 101", professor: "Dr. Ahmed", color: "#10B981", icon: "database-outline" },
    ],
  },
];

const profile = {
  name: "Ali Raza",
  email: USER_EMAIL,
  phone: "+92 300 1234567",
  address: "123 Tech Avenue, Lahore, Pakistan",
  dob: "2000-07-15",
  studentId: "UCP789012",
  department: "Computer Science",
  semester: "7th",
  profilePicture: ""
};

const dashboard = {
  grades: "90%",
  attendance: "95%",
  pendingFees: "PKR 150,000",
  dueDate: "Jun 10, 2026"
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

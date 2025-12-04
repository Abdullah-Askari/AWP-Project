const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, deleteDoc, collection } = require('firebase/firestore');

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

// Data to seed
const subjects = [
  { icon: "code-slash", name: "Data Structures", time: "Mon, Wed 9:00 AM", code: "CS-201", credits: 3 },
  { icon: "server", name: "Database Systems", time: "Tue, Thu 11:00 AM", code: "CS-301", credits: 3 },
  { icon: "globe", name: "Web Development", time: "Mon, Wed 2:00 PM", code: "CS-305", credits: 3 },
  { icon: "bulb", name: "Artificial Intelligence", time: "Fri 10:00 AM", code: "CS-401", credits: 3 },
];

const notifications = [
  { id: 1, sender: "Admin Office", message: "Fee submission deadline extended to Dec 20, 2024", time: "2 hours ago", icon: "cash-outline", color: "#EF4444" },
  { id: 2, sender: "Dr. Ahmed Khan", message: "Data Structures assignment due tomorrow", time: "5 hours ago", icon: "document-text-outline", color: "#4F46E5" },
  { id: 3, sender: "Exam Cell", message: "Mid-term datesheet has been uploaded", time: "1 day ago", icon: "calendar-outline", color: "#10B981" },
  { id: 4, sender: "Library", message: "Book return reminder - 2 books overdue", time: "2 days ago", icon: "book-outline", color: "#F59E0B" },
];

const feedback = [
  { id: 1, subject: "Data Structures", instructor: "Dr. Ahmed Khan", date: "Nov 28, 2024", type: "Submitted", rating: 5, message: "Excellent teaching methodology and clear explanations", color: "#4F46E5" },
  { id: 2, subject: "Database Systems", instructor: "Dr. Usman Malik", date: "Nov 25, 2024", type: "Submitted", rating: 4, message: "Good practical sessions, could improve theory lectures", color: "#10B981" },
  { id: 3, subject: "Web Development", instructor: "Ms. Sara Ali", date: "", type: "Pending", rating: 0, message: "", color: "#F59E0B" },
  { id: 4, subject: "Artificial Intelligence", instructor: "Dr. Fatima Hassan", date: "", type: "Pending", rating: 0, message: "", color: "#8B5CF6" },
];

const gradebook = {
  "Fall 2024": [
    { name: "Data Structures", code: "CS-201", credits: 3, grade: "A", gpa: 4.0, color: "#4F46E5" },
    { name: "Database Systems", code: "CS-301", credits: 3, grade: "A-", gpa: 3.7, color: "#10B981" },
    { name: "Web Development", code: "CS-305", credits: 3, grade: "B+", gpa: 3.3, color: "#F59E0B" },
    { name: "Artificial Intelligence", code: "CS-401", credits: 3, grade: "A", gpa: 4.0, color: "#8B5CF6" },
  ],
  "Spring 2024": [
    { name: "Operating Systems", code: "CS-202", credits: 3, grade: "B+", gpa: 3.3, color: "#EF4444" },
    { name: "Computer Networks", code: "CS-302", credits: 3, grade: "A-", gpa: 3.7, color: "#06B6D4" },
  ],
};

const attendance = {
  "December 2024": [
    { subject: "Data Structures", total: 12, present: 11, absent: 1, percentage: 92, color: "#4F46E5" },
    { subject: "Database Systems", total: 10, present: 8, absent: 2, percentage: 80, color: "#10B981" },
    { subject: "Web Development", total: 12, present: 10, absent: 2, percentage: 83, color: "#F59E0B" },
    { subject: "Artificial Intelligence", total: 6, present: 6, absent: 0, percentage: 100, color: "#8B5CF6" },
  ],
  "November 2024": [
    { subject: "Data Structures", total: 10, present: 9, absent: 1, percentage: 90, color: "#4F46E5" },
    { subject: "Database Systems", total: 8, present: 7, absent: 1, percentage: 88, color: "#10B981" },
  ],
};

const invoices = {
  "2024": [
    { id: "INV-2024-001", semester: "Fall 2024", amountUSD: 450, amountPKR: 125000, status: "Pending", statusColor: "#EF4444", dueDate: "Dec 15, 2024", issueDate: "Nov 1, 2024", description: "Tuition Fee - Fall Semester 2024" },
    { id: "INV-2024-002", semester: "Spring 2024", amountUSD: 430, amountPKR: 120000, status: "Paid", statusColor: "#10B981", dueDate: "Jun 15, 2024", issueDate: "May 1, 2024", description: "Tuition Fee - Spring Semester 2024" },
  ],
  "2023": [
    { id: "INV-2023-001", semester: "Fall 2023", amountUSD: 400, amountPKR: 110000, status: "Paid", statusColor: "#10B981", dueDate: "Dec 15, 2023", issueDate: "Nov 1, 2023", description: "Tuition Fee - Fall Semester 2023" },
  ],
};

const schedule = [
  {
    day: "Monday",
    classes: [
      { subject: "Data Structures", time: "9:00 AM - 10:30 AM", room: "Room 301", professor: "Dr. Ahmed Khan", color: "#4F46E5", icon: "code-slash" },
      { subject: "Web Development", time: "2:00 PM - 3:30 PM", room: "Lab 102", professor: "Ms. Sara Ali", color: "#10B981", icon: "globe" },
    ],
  },
  {
    day: "Tuesday",
    classes: [
      { subject: "Database Systems", time: "11:00 AM - 12:30 PM", room: "Room 205", professor: "Dr. Usman Malik", color: "#F59E0B", icon: "server" },
    ],
  },
  {
    day: "Wednesday",
    classes: [
      { subject: "Data Structures", time: "9:00 AM - 10:30 AM", room: "Room 301", professor: "Dr. Ahmed Khan", color: "#4F46E5", icon: "code-slash" },
      { subject: "Web Development", time: "2:00 PM - 3:30 PM", room: "Lab 102", professor: "Ms. Sara Ali", color: "#10B981", icon: "globe" },
    ],
  },
  {
    day: "Thursday",
    classes: [
      { subject: "Data Structures", time: "9:00 AM - 10:30 AM", room: "Room 301", professor: "Dr. Ahmed Khan", color: "#4F46E5", icon: "code-slash" },
      { subject: "Database Systems", time: "11:00 AM - 12:30 PM", room: "Room 205", professor: "Dr. Usman Malik", color: "#F59E0B", icon: "server" },
      { subject: "Web Development", time: "2:00 PM - 3:30 PM", room: "Lab 102", professor: "Ms. Sara Ali", color: "#10B981", icon: "globe" },
      { subject: "Artificial Intelligence", time: "4:00 PM - 5:30 PM", room: "Room 401", professor: "Dr. Fatima Hassan", color: "#8B5CF6", icon: "bulb" },
    ],
  },
  {
    day: "Friday",
    classes: [
      { subject: "Artificial Intelligence", time: "10:00 AM - 12:30 PM", room: "Room 401", professor: "Dr. Fatima Hassan", color: "#8B5CF6", icon: "bulb" },
    ],
  },
];

const profile = {
  name: "Abdullah Askari",
  email: "syed.m.abdullahaskari@gmail.com",
  phone: "+92 300 1234567",
  address: "123 Main Street, Lahore, Pakistan",
  dob: "January 15, 2002",
  studentId: "L1F21BSCS0001",
  department: "Computer Science",
  semester: "7th",
};

const dashboard = {
  grades: "88%",
  attendance: "92%",
  pendingFees: "PKR 125,000",
  dueDate: "Dec 15, 2024"
};

// User document path
const USER_ID = "yRS0HjxXOSVU6xlSqpMKy25nWx02";
const userDocPath = `users/${USER_ID}`;

async function seedFirestore() {
  try {
    console.log("Starting Firestore seeding...\n");
    console.log(`Writing data to: ${userDocPath}\n`);

    // Update user document with all the data
    console.log("Seeding all data to user document...");
    await setDoc(doc(db, userDocPath), {
      profile: profile,
      dashboard: dashboard,
      subjects: subjects,
      notifications: notifications,
      feedback: feedback,
      gradebook: gradebook,
      attendance: attendance,
      invoices: invoices,
      schedule: schedule,
    }, { merge: true });
    
    console.log("✓ Dashboard seeded successfully");
    console.log("✓ Subjects seeded successfully");
    console.log("✓ Notifications seeded successfully");
    console.log("✓ Feedback seeded successfully");
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

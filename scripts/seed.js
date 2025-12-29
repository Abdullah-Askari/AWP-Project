const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDD4V0vLy5PRoI6nSsHJEyN0Z3CdW0Gu_Q",
  authDomain: "ucpportalclone-b264a.firebaseapp.com",
  projectId: "ucpportalclone-b264a",
  storageBucket: "ucpportalclone-b264a.firebasestorage.app",
  messagingSenderId: "339496645684",
  appId: "1:339496645684:android:916e98b95f1f4d6df54661",
};

// Init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// CLI args
const args = process.argv.slice(2);
let USER_ID = "xFawukKB3daO3JIScrpzcbbRKww1";
let USER_EMAIL = "";

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--uid" && args[i + 1]) {
    USER_ID = args[i + 1];
    i++;
  } else if (args[i] === "--email" && args[i + 1]) {
    USER_EMAIL = args[i + 1];
    i++;
  }
}

// ================= ALL APP DATA =================

const profile = {
  name: "University Student",
  email: USER_EMAIL,
  phone: "+92 311 1111111",
  address: "UCP Main Campus, Lahore",
  dob: "2001-05-10",
  studentId: "UCP-STD-1001",
  department: "Computer Science",
  semester: "5th",
  profilePicture: ""
};

const dashboard = {
  grades: "87%",
  attendance: "93%",
  pendingFees: "PKR 98,000",
  dueDate: "Mar 10, 2026"
};

const subjects = [
  { icon: "hardware-chip-outline", name: "Operating Systems", time: "Mon Wed 9:00 AM", code: "CS-301", credits: 4 },
  { icon: "layers-outline", name: "Data Structures", time: "Tue Thu 11:00 AM", code: "CS-201", credits: 4 },
  { icon: "code-working-outline", name: "Android Development", time: "Mon Wed 2:00 PM", code: "MAD-402", credits: 4 },
  { icon: "shield-checkmark-outline", name: "Information Security", time: "Tue Thu 3:30 PM", code: "SEC-401", credits: 3 },
  { icon: "book-outline", name: "Software Engineering", time: "Fri 10:00 AM", code: "SE-301", credits: 3 },
];

const notifications = [
  { id: 1, sender: "Admin", message: "Spring 2025 classes have started", time: "30 mins ago", icon: "megaphone-outline", color: "#2563EB" },
  { id: 2, sender: "Exam Cell", message: "Midterm schedule uploaded", time: "5 hours ago", icon: "alert-circle-outline", color: "#DC2626" },
  { id: 3, sender: "Finance", message: "Outstanding fee reminder", time: "1 day ago", icon: "cash-outline", color: "#16A34A" },
];

const gradebook = {
  "Fall 2025": [
    { name: "Operating Systems", code: "CS-301", credits: 4, grade: "A", gpa: 4.0, color: "#4F46E5" },
    { name: "Data Structures", code: "CS-201", credits: 4, grade: "B+", gpa: 3.3, color: "#F97316" },
    { name: "Software Engineering", code: "SE-301", credits: 3, grade: "A-", gpa: 3.7, color: "#16A34A" },
  ],
  "Spring 2026": [
    { name: "Android Development", code: "MAD-402", credits: 4, grade: "A-", gpa: 3.7, color: "#7C3AED" },
    { name: "Information Security", code: "SEC-401", credits: 3, grade: "B", gpa: 3.0, color: "#DC2626" },
  ],
};

// =================================================

const userDocPath = `users/${USER_ID}`;

async function seedFirestore() {
  try {
    await setDoc(
      doc(db, userDocPath),
      {
        profile,
        dashboard,
        subjects,
        notifications,
        gradebook,
        submittedFeedback: [],
      },
      { merge: true }
    );

    console.log("✅ ALL DATA UPDATED FOR USER:", USER_ID);
    process.exit(0);
  } catch (err) {
    console.error("❌ ERROR:", err);
    process.exit(1);
  }
}

seedFirestore();

# 🔐 Environment Setup Guide

This project uses environment variables and configuration files to manage sensitive credentials. Follow these steps to set up your local development environment.

## 📋 Prerequisites

- Node.js and npm installed
- Android Studio (for Android development)
- Firebase project created
- Cloudinary account (if using image uploads)

## 🚀 Quick Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd UPortal
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then edit `.env` and fill in your actual values:

```env
# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

# Google Sign-In
WEB_CLIENT_ID=your_web_client_id.apps.googleusercontent.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### 3. Set Up Configuration Files

#### Firebase Config
```bash
cp firebaseConfig.js.example firebaseConfig.js
```
Edit `firebaseConfig.js` with your Firebase credentials.

#### Cloudinary Config
```bash
cp cloudinaryConfig.js.example cloudinaryConfig.js
```
Edit `cloudinaryConfig.js` with your Cloudinary credentials.

#### Google Sign-In Config
```bash
cp googleSignInConfig.js.example googleSignInConfig.js
```
Edit `googleSignInConfig.js` with your Google OAuth credentials.

### 4. Set Up Firebase for Android

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings → Your Apps → Android App
4. Download `google-services.json`
5. Place it in `android/app/google-services.json`

### 5. Configure Release Keystore (for production builds)

1. Generate or obtain your release keystore (`UcpPortal.jks`)
2. Place it in `android/app/`
3. Get your SHA-1 and SHA-256 fingerprints:
   ```bash
   keytool -list -v -keystore android/app/UcpPortal.jks -alias <your-alias>
   ```
4. Add these fingerprints to Firebase Console → Project Settings → Your Android App

## ⚠️ Security Notes

### Never Commit These Files:
- ❌ `.env`
- ❌ `firebaseConfig.js`
- ❌ `cloudinaryConfig.js`
- ❌ `googleSignInConfig.js`
- ❌ `android/app/google-services.json`
- ❌ `*.jks` (keystore files)
- ❌ `*.pem` (private keys)

These files are already in `.gitignore` and should **never** be committed to version control.

### What's Safe to Commit:
- ✅ `.env.example` (template with placeholder values)
- ✅ `*.example` files (templates)
- ✅ `app.config.js` (uses environment variables, no hardcoded secrets)

## 🔧 Troubleshooting

### "google-services.json not found"
Make sure you've downloaded the file from Firebase Console and placed it in `android/app/`.

### "Firebase initialization failed"
Check that your `firebaseConfig.js` has the correct credentials from Firebase Console.

### "Google Sign-In not working"
1. Verify your SHA-1/SHA-256 fingerprints are added to Firebase Console
2. Ensure `WEB_CLIENT_ID` in `.env` matches your OAuth client ID
3. Check that your package name matches in `app.config.js` and Firebase Console

## 📚 Additional Resources

- [Firebase Setup Guide](https://firebase.google.com/docs/android/setup)
- [Expo Environment Variables](https://docs.expo.dev/guides/environment-variables/)
- [React Native Firebase](https://rnfirebase.io/)

## 🆘 Need Help?

If you encounter issues, check:
1. All configuration files are created from templates
2. All values in `.env` are filled in correctly
3. `google-services.json` is in the correct location
4. Your Firebase project has the correct package name and SHA fingerprints

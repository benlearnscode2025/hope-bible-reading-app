// Firebase configuration. 
// Replace with your real Firebase Project credentials to activate live database cloud sync.
const firebaseConfig = {
  apiKey: "AIzaSyAVFosnX_OisW-Deecar8IyB1Ck1kiRTAg",
  authDomain: "hope-toledo-bible-tracker.firebaseapp.com",
  projectId: "hope-toledo-bible-tracker",
  storageBucket: "hope-toledo-bible-tracker.firebasestorage.app",
  messagingSenderId: "20855341120",
  appId: "1:20855341120:web:5dad92b25503dabf94dfa5",
  measurementId: "G-E0EB841BPK"
};

// Check if credentials are set (not starting with "YOUR_" and not blank)
const isMock = !firebaseConfig.apiKey || firebaseConfig.apiKey.startsWith("YOUR_") || firebaseConfig.apiKey === "";

if (isMock) {
  console.log("Hope Toledo Bible Tracker: Running in local Sandbox Mock Mode.");

  const MOCK_USERS_KEY = "hope_mock_users_db";
  const MOCK_CURRENT_USER_KEY = "hope_mock_current_user";

  const getMockUsers = () => JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || "{}");
  const saveMockUsers = (users) => localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));

  window.HopeFirebase = {
    isMock: true,
    signIn: async (email, password) => {
      // Simulate network latency
      await new Promise(resolve => setTimeout(resolve, 600));
      const users = getMockUsers();
      const user = users[email];
      if (user && user.password === password) {
        const currentUser = { uid: email, email: email, displayName: email.split('@')[0] };
        localStorage.setItem(MOCK_CURRENT_USER_KEY, JSON.stringify(currentUser));
        if (window.HopeFirebase._authCallback) window.HopeFirebase._authCallback(currentUser);
        return { user: currentUser };
      }
      throw new Error("Invalid email or password.");
    },
    signUp: async (email, password) => {
      await new Promise(resolve => setTimeout(resolve, 600));
      if (email.length < 5 || !email.includes('@')) {
        throw new Error("Please enter a valid email address.");
      }
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long.");
      }
      const users = getMockUsers();
      if (users[email]) {
        throw new Error("Email address already registered.");
      }
      users[email] = { password: password, progress: null };
      saveMockUsers(users);
      const currentUser = { uid: email, email: email, displayName: email.split('@')[0] };
      localStorage.setItem(MOCK_CURRENT_USER_KEY, JSON.stringify(currentUser));
      if (window.HopeFirebase._authCallback) window.HopeFirebase._authCallback(currentUser);
      return { user: currentUser };
    },
    signOut: async () => {
      await new Promise(resolve => setTimeout(resolve, 200));
      localStorage.removeItem(MOCK_CURRENT_USER_KEY);
      if (window.HopeFirebase._authCallback) window.HopeFirebase._authCallback(null);
    },
    signInWithGoogle: async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      const email = "googleuser@hope.org";
      const users = getMockUsers();
      if (!users[email]) {
        users[email] = { password: "google-mock-password", progress: null };
        saveMockUsers(users);
      }
      const currentUser = { uid: email, email: email, displayName: "Google User" };
      localStorage.setItem(MOCK_CURRENT_USER_KEY, JSON.stringify(currentUser));
      if (window.HopeFirebase._authCallback) window.HopeFirebase._authCallback(currentUser);
      return { user: currentUser };
    },
    onAuthChange: (callback) => {
      window.HopeFirebase._authCallback = callback;
      const currentUser = JSON.parse(localStorage.getItem(MOCK_CURRENT_USER_KEY) || "null");
      // Trigger callback asynchronously
      setTimeout(() => {
        if (window.HopeFirebase._authCallback) {
          window.HopeFirebase._authCallback(currentUser);
        }
      }, 100);
    },
    saveProgress: async (uid, data) => {
      const users = getMockUsers();
      if (users[uid]) {
        users[uid].progress = data;
        saveMockUsers(users);
      }
    },
    getProgress: async (uid) => {
      await new Promise(resolve => setTimeout(resolve, 400));
      const users = getMockUsers();
      const user = users[uid];
      return {
        exists: () => !!(user && user.progress),
        data: () => user ? user.progress : null
      };
    }
  };
} else {
  console.log("Hope Toledo Bible Tracker: Connecting to Cloud Firebase instance.");
  
  // Dynamic modular imports inside a module script
  Promise.all([
    import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"),
    import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"),
    import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js")
  ]).then(([firebaseAppModule, firebaseAuthModule, firebaseFirestoreModule]) => {
    
    const { initializeApp } = firebaseAppModule;
    const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithRedirect } = firebaseAuthModule;
    const { getFirestore, doc, getDoc, setDoc } = firebaseFirestoreModule;
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    
    window.HopeFirebase = {
      isMock: false,
      signIn: (email, password) => signInWithEmailAndPassword(auth, email, password),
      signUp: (email, password) => createUserWithEmailAndPassword(auth, email, password),
      signOut: () => signOut(auth),
      signInWithGoogle: () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider).catch(error => {
          if (error.code === 'auth/popup-blocked') {
            console.log("Popup blocked. Falling back to signInWithRedirect...");
            return signInWithRedirect(auth, provider);
          }
          throw error;
        });
      },
      onAuthChange: (callback) => onAuthStateChanged(auth, callback),
      saveProgress: (uid, data) => setDoc(doc(db, "users", uid), data),
      getProgress: (uid) => getDoc(doc(db, "users", uid))
    };
    
    // Dispatch custom event to let app.js know Firebase is initialized
    window.dispatchEvent(new CustomEvent('firebase-ready'));
  }).catch(e => {
    console.error("Failed to load Firebase modular CDN libraries", e);
  });
}

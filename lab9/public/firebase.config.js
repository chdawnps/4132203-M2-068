// firebase.config.js
const firebaseConfig = {
  apiKey: "AIzaSyBWAswZqdAu4Ai1c0ip2Bp0CqtiYznM7Vg",
  authDomain: "namfonchada-068-02.firebaseapp.com",
  databaseURL: "https://namfonchada-068-02-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "namfonchada-068-02",
  storageBucket: "namfonchada-068-02.firebasestorage.app",
  messagingSenderId: "229333537502",
  appId: "1:229333537502:web:cfbb1065299646ec04284f",
  measurementId: "G-71VQW2M1C4"
};

// For service worker (firebase-messaging-sw.js)
// This ensures the config is available in both module and non-module contexts
if (typeof self !== 'undefined') {
    self.firebaseConfig = firebaseConfig;
}
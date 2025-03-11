// firebase-messaging-sw.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";

self.addEventListener("notificationclick", function (event) {
  var redirectUrl = event.notification.data.FCM_MSG.notification.click_action;

  event.waitUntil(
    self.clients
      .claim()
      .then(() => self.clients.matchAll({ type: "window" }))
      .then((clients) => {
        return clients.map((client) => {
          const url = new URL(client.url);

          if (url.pathname != redirectUrl && "navigate" in client) {
            return client.navigate(redirectUrl);
          }
        });
      })
  );
});

firebase.initializeApp({
  apiKey: "AIzaSyBWAswZqdAu4Ai1c0ip2Bp0CqtiYznM7Vg",
  authDomain: "namfonchada-068-02.firebaseapp.com",
  databaseURL: "https://namfonchada-068-02-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "namfonchada-068-02",
  storageBucket: "namfonchada-068-02.firebasestorage.app",
  messagingSenderId: "229333537502",
  appId: "1:229333537502:web:cfbb1065299646ec04284f",
  measurementId: "G-71VQW2M1C4"
});

const messaging = firebase.messaging();

// This will be called only once when the service worker is installed for first time.
self.addEventListener("activate", async (event) => {
  event.waitUntil(
    self.clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then((windowClients) => {
        const client = windowClients[0];

        messaging
          .getToken()
          .then((currentToken) => {
            console.log("Recovered token from messaging: ", currentToken);

            client.postMessage({
              source: "firebase-messaging-sw",
              currentToken: currentToken,
            });
          })
          .catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
          });
      })
  );
});

// index.js

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register(`${process.env.PUBLIC_URL}/firebase-messaging-sw.js`)
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.addEventListener("message", (message) => {
    if (message.data.source === "firebase-messaging-sw") {
      API.post("/user_devices", {
        token: message.data.currentToken,
        os: navigator.userAgent,
        bundle_name: packageJson.name,
        bundle_short_version: gitLastCommitJson.tags[0],
        bundle_version: gitLastCommitJson.hash,
      });
    }
  });
}
// v8/namespaced style service worker
// eslint-disable-next-line no-undef
importScripts(
  "https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js"
);
// eslint-disable-next-line no-undef
importScripts(
  "https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyB_rVEn4ImOdNFGoUPNCj-UrXE3tygWIEY",
  authDomain: "golden-bee-651eb.firebaseapp.com",
  databaseURL:
    "https://golden-bee-651eb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "golden-bee-651eb",
  storageBucket: "golden-bee-651eb.appspot.com",
  messagingSenderId: "616914078130",
  appId: "1:616914078130:web:602db051750307802ebcab",
  measurementId: "G-NWK8EZ7GQX",
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/favicon.ico",
  };

  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle, notificationOptions);
});

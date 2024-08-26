import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

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
function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const app = initializeApp(firebaseConfig);

      const messaging = getMessaging(app);
      getToken(messaging, {
        vapidKey:
          "BOe6ILkdmHPX-IbeMt2ddI5PUYPuwuEmHuCsgZnAXIYogbKwTNV_wzOgDSybTB-tSLS_OsPIjnAQDDEZF6pcGvw",
      }).then((currentToken) => {
        if (currentToken) {
          console.log("currentToken: ", currentToken);
        } else {
          console.log("Can not get token");
        }
      });
    } else {
      console.log("Do not have permission!");
    }
  });
}

requestPermission();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

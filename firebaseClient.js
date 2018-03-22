const firebase = require('firebase')

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBMVK9UlGntEMEqKA7_ky5hk9J5Ezl4OIQ",
    authDomain: "lineclone-2dcd7.firebaseapp.com",
    databaseURL: "https://lineclone-2dcd7.firebaseio.com",
    projectId: "lineclone-2dcd7",
    storageBucket: "lineclone-2dcd7.appspot.com",
    messagingSenderId: "979175370322"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp

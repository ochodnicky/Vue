import firebase from 'firebase/app'
import 'firebase/firestore'

// Get a Firestore instance
const db = firebase
	.initializeApp({
        apiKey: "AIzaSyC2jFX5Fni-y37er47h_Q1Bmtf9-urtBIM",
        authDomain: "todolist-32489.firebaseapp.com",
        databaseURL: "https://todolist-32489.firebaseio.com",
        projectId: "todolist-32489",
        storageBucket: "todolist-32489.appspot.com",
        messagingSenderId: "618468488722",
        appId: "1:618468488722:web:97a71cbcd8afce32eecacb",
        measurementId: "G-2KS9YY2FZV"
	})
	.firestore()
export default db
import admin = require('firebase-admin')

admin.initializeApp()

const store = admin.firestore()

export { store }

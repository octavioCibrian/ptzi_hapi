'use strict'


var admin = require("firebase-admin");

var serviceAccount = require("../config/firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://platzi-hapi-f72fb.firebaseio.com"
});

const db = admin.database()

const Users = require('./users')
const Question = require('./question')
module.exports = {
    users: new Users(db),
    question:new Question(db)

}
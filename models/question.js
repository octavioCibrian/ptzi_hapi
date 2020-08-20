


'use strict'

class Question{
    constructor(db){
        this.db = db;
        this.ref = this.db.ref('/')
        this.collection = this.ref.child('questions')
    }

    async create(data,user){
        const pregunta = {
            ...data,
            owner:user
        }
        //data.owner = user
        const question = this.collection.push()
        question.set(pregunta)

        return question.key
    }

    async getLast(amount){
        const query = await this.collection.limitToLast(amount).once('value')
        const data = query.val()
        return data
    }
}

module.exports = Question
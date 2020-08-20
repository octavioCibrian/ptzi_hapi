

'use strict'


class Users{
    constructor(db){
        this.db = db;
        this.ref = this.db.ref('/')
        this.collection = this.ref.child('users')
    }

    async create(data){
        const usuario = {
            ...data
        } 
        console.log(usuario)
        const newUser = this.collection.push(usuario)
        //this.collection.set(data)

        return newUser.key
    }

    async validateUser(data){
        const queryUser = await this.collection.orderByChild("email").equalTo(data.email).once("value")

        const userFound = queryUser.val()
        if(userFound){
            const userId = Object.keys(userFound)[0]
            const passwordRight = data.password == userFound[userId].password

            return (passwordRight) ? userFound[userId] : false;
        }

        return false;
    }
}

module.exports = Users;
'use strict'
const site = require('./controllers/site')
const user = require('./controllers/user')
const question = require('./controllers/question')
const Joi = require('@hapi/joi')
const { users } = require('./models')

module.exports= [
    {
        method: 'GET',
        path: '/',
        handler: site.home
    },
    {
        method: 'GET',
        path: '/home',
        handler: site.home
    },

    {
        method: 'GET',
        path: '/register', 
        handler: site.register
    },
    {
        method: 'GET',
        path: '/login',
        handler: site.login
    },
    {
        method: 'GET',
        path: '/ask',
        handler: site.ask
    },
    {
        method: 'GET',
        path: '/logout',
        handler: user.logout
    },

    {
        method: 'POST',
        path: '/create-user',
        handler: user.createUser,
        options:{
            validate:{
                payload:Joi.object({
                    name:Joi.string().required().min(3),
                    email:Joi.string().required().email(),
                    password:Joi.string().required().min(3)
                }),
                failAction:user.failValidation
            }
        }
    },
    {
        method:'POST',
        path:'/login-user',
        handler:user.loginUser,
        options:{
            validate:{
                payload:Joi.object({
                    email:Joi.string().required().email(),
                    password:Joi.string().required().min(3)
                }),
                failAction:user.failValidation
            }
        }
    },
    {
        method:'POST',
        path:'/create-question',
        handler:question.createQuestion,
        options:{
            validate:{
                payload:Joi.object({
                    title:Joi.string().required().min(3),
                    description:Joi.string().required().min(3)
                }),
                failAction:user.failValidation
            }
        }
    },
    {
        method: 'GET',
        path: '/assets/{param*}',
        handler: {
            directory: {
                path: '.',
                index: ['index.html']
            }
        }
    },
    {
        method:['GET','POST'],
        path:'/{any*}',
        handler:site.notFound
    }


]
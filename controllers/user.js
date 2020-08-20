'use strict'
const users = require('../models').users
const Boom = require('@hapi/boom')

function createUser(req, h){
    users.create(req.payload)
   //console.log(req.payload)
    return 'Correcto';
}

async function loginUser(req,h){
    let userLogin 
    try{
        userLogin = await users.validateUser(req.payload)
        if(!userLogin){
            //return h.response('Email y/o password incorrecto').code(401)
            return h.view('login',{
                title:'Login',
                error:'Incorrecto el email y/o password'
            })
        }

    }catch(e){
        console.log(e);
        //return h.response('Problemas al logear usuario').code(500)
        return h.view('login',{
            title:'Login',
            error:'Incorrecto el email y/o password'
        })
    }

    return h.redirect('/home').state('user',{
        name:userLogin.name,
        email: userLogin.email
    })
}


function logout(req,h){
    return h.redirect('/login').unstate('user')
}

function failValidation(req,h,error){
    const templates = {
        '/create-user':'register',
        '/login-user':'login',
        '/create-question':'ask'
    }
    console.log(templates[req.path]);
    return h.view(templates[req.path],{
        title:'Error de validación',
        error:'Por favor complete los campos requeridos'
    }).code(400).takeover()

    return Boom.badRequest('Falló la validación',req.payload)
}

module.exports = {
    createUser,
    loginUser,
    logout,
    failValidation
}
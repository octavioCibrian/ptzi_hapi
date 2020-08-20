'use strict'

const question = require('../models/index').question

async function home(req, h){
    let data
    try{
        data = await question.getLast(10)
    }catch(error){
        console.error(error);
    }

    return h.view('index', {
        title: 'home',
        user:req.state.user,
        question:data
    })
}

function ask(req, h){
    if(!req.state.user){
        return h.redirect('/login')
    }

    return h.view('ask', {
        title: 'Ask',
        user:req.state.user
    })
}

function register (req, h) {
    return h.view('register', {
        title: 'Register',
        user:req.state.user
    })
}



function login (req, h) {
    return h.view('login', {
        title: 'Login',
        user:req.state.user
    })
}

function notFound(req,h){
    console.log('sdfsdf');
    return h.view('404',{},{layout:'layout-error'}).code(404)
}

function fileNotFound(req,h){
    const response = req.response
    if(response.isBoom && response.output.statusCode === 404){
        return h.view('404',{},{layout:'layout-error'}).code(404)
    }

    return h.continue
}



module.exports = {
    home,
    register,
    login,
    notFound,
    fileNotFound,
    ask
}
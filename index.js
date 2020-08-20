'use strict'

const Hapi = require('@hapi/hapi')
const inert = require('inert')
const handlebars = require('handlebars');
const vision = require('vision')
const path = require('path')
const routes = require('./routes')
const site = require('./controllers/site')
const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: 'localhost',
  routes: {
    files: {
      relativeTo: path.join(__dirname, 'public')
    }
  }
})

async function init() {
  try {
    await server.register(inert)
    await server.register(vision)
    server.state('user',{
      ttl:1000 * 60 * 60 * 24 * 7,
      isSecure:process.env.NODE_ENV === 'prod',
      encoding:'base64json',
      path:'/'
    })

    server.views({
      engines: {
        hbs: handlebars
      },
      relativeTo: __dirname,
      path: 'views',
      layout: true,
      layoutPath: 'views'
    })

   

    server.ext('onPreResponse',site.fileNotFound)//No me esta funcionando
    server.route(routes);
    await server.start()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

  process.on('unhandleException',error=>{
    console.error('unhandleException',error.message,error);
  })

  process.on('unhandledRejection',error=>{
    console.error('unhandleRejection',error.message,error);
  })

  console.log(`Servidor lanzado en: ${server.info.uri}`)
}

init()

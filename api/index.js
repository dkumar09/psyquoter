import Fastify from 'fastify'
const app = Fastify({ logger: true, })
import cookie from 'fastify-cookie';

// app plugins
app.register(cookie)
// database connection
app.register(require('@fastify/postgres'), {
  connectionString: process.env.POSTGRES_URL
})
//routes plugins
const daily = require('./routes/daily')
app.route({
  method: 'GET',
  url: '/',
  // this function is executed for every request before the handler is executed
  preHandler: (request, reply, done) => {
    // E.g. check authentication
    done()
  },
  handler: (request, reply) => {
    reply.send({ status: 'success' })
  }
})
app.register(daily, { prefix: '/daily' })

export default async function handler(req, reply) {
  await app.ready()
  app.server.emit('request', req, reply)
}

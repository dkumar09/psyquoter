module.exports = function(fastify, options, done) {
    fastify.get('/', (req, res) => {
        fastify.pg.query(
            'SELECT * from quotes', [],
            function onResult(err, result) {
                const rows = result?.rows;
                res.send(err || rows)
            }
        )
        // res.send({ hello: 'oni: chan' })
    })
    done();
}

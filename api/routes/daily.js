export default function(fastify, options, done) {
    fastify.get('/', (req, res) => {
        fastify.pg.query(
            'SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1', [],
            function onResult(err, result) {
                const rows = result?.rows;
                res.send(err || rows)
            }
        )
    })
    done();
}

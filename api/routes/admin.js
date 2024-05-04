export default function(fastify, _, done) {
    fastify.post('/add', (_, res) => {
        fastify.pg.query(
            'SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1', [],
            function onResult(err, result) {
                const rows = result?.rows;
                res.send(err || rows)
            }
        )
    })

    const opt = {
        schema: {
            querystring: {
                pageNumber: { type: 'integer' },
            },
        }
    };

    fastify.get('/list', opt, (req, res) => {
        let pageNumber = req.query.pageNumber || 1;
        if (pageNumber <= 0 || pageNumber > 1000) return res.status(400).send({ status: 'failed', message: 'bad page number' })
        fastify.pg.query(
            'SELECT * FROM quotes offset $1 fetch next $2 rows only', [10 * (pageNumber - 1), 10],
            function onResult(err, result) {
                const rows = result?.rows;
                res.send(err || rows)
            }
        )
    })

    fastify.delete('/delete', (_, res) => {
        fastify.pg.query(
            'SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1', [],
            function onResult(err, result) {
                const rows = result?.rows;
                res.send(err || rows)
            }
        )
    })
    fastify.put('/update', (_, res) => {
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

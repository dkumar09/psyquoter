export default function(fastify, _, done) {
    fastify.get('/health', (_, res) => {
        res.send({
            message: 'success'
        })
    })
    done();
}

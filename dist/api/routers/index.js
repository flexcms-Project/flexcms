const router = require('express')();

router.use('/users', require('./users'));

router.use('/articles', require('./article'));

router.use('/404', require('./notFound'));

router.use('/', require('./home'));

router.use('/*', (req, res, next) => {
    res.status(404).render('./public/404')
})

module.exports = router;
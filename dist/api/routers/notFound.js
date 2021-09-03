const router = require('express')();
const NotFoundError = require('../../exceptions/NotFoundError');

router.get('/', (req, res, next)=>{
    throw new NotFoundError('the content did not found');
});

module.exports = router;
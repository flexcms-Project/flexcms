const router = require('express')();
const { articleController } = require('../controllers');

router.get('/search', articleController.getArticleSearch);

router.get('/:url', articleController.getAnArticleByUrl);

router.get('/', articleController.getHome);

module.exports = router;
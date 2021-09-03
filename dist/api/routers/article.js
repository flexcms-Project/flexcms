router = require('express')();
const { articleController } = require('../controllers');

router.get('/create', articleController.getArticleCreate);

router.post('/create', articleController.postArticleCreate);

router.get('/edit/:url', articleController.getEditArticle);

router.post('/edit/:url', articleController.postEditArticle);

router.get('/mainArticle/:url', articleController.getSelectAMainArticle);

module.exports = router;
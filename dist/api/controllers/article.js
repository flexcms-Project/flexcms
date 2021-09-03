const lib = require('../../config/lib/utils');

class ArticleController {
    constructor(validator, ArticleService ){
        this._articleService = ArticleService;
        this._validator = validator;

        this._lib = lib;

        this.postArticleCreate = this.postArticleCreate.bind(this);
        this.getAnArticleByUrl = this.getAnArticleByUrl.bind(this);
        this.getHome = this.getHome.bind(this);
        this.getEditArticle = this.getEditArticle.bind(this);
        this.postEditArticle = this.postEditArticle.bind(this);
        this.getArticleSearch = this.getArticleSearch.bind(this);
        this.getSelectAMainArticle = this.getSelectAMainArticle.bind(this);
    }

    async getArticleCreate(req, res, next){
        try{
            if(!req.user){
                return res.status(400).redirect('/users/logout');
            }

            res.status(200).render('./public/writeArticle');
        }catch(error){
            next(error);
        }
    }

    async postArticleCreate(req, res, next){
        try{
            if(!req.user){
                return res.status(400).redirect('/users/logout');
            }

            const filteredPost = await this._lib.createPostFilter(req.body.content);

            this._validator.validateArticleCreate(filteredPost)

            const article = await this._articleService.createArticle(filteredPost, req.user.sub);

            
            res.status(200).redirect(`/${article.url}`)
        }catch(error){
            req.dt = {article: req.body};
            req.pg = './public/writeArticle';
            req.sts = 'create';
            next(error);
        }
    }

    async getEditArticle(req, res, next){
        try{
            if(!req.user){
                return res.status(400).redirect('/users/logout');
            }

            const article = await this._articleService.getArticleByUrl(req.params.url);
   
            res.status(200).render('./public/writeArticle', { data: { article } });
        }catch(err){
            next(err);
        }
    }

    async postEditArticle(req, res, next){
        try{
            const { url } = req.params

            if(!req.user){
                return res.status(400).redirect('/users/logout');
            }

            await this._articleService.verifyArticleByUrl(url);

            const filteredPost = await this._lib.createPostFilter(req.body.content);

            this._validator.validateArticleCreate(filteredPost)

            await this._articleService.editArticle(filteredPost, url);

            res.status(200).redirect(`/${filteredPost.url}`);
        }catch(err){
            req.dt = {article: req.body};
            req.pg = './public/writeArticle';
            next(err);
        }
    }

    async getHome(req, res, next){
        try{
            const page = parseInt(req.query.pg) || 1;
            const { sub } = req.user || {sub: null};

            const mainArticle = await this._articleService.getMainArticle();

            const mostViewedArticles = await this._articleService.getMostViewedArticles();

            const articlesPaginate = await this._articleService.getAllArticlesPaginate(page)

            res.status(200);
            if(page == 1){
                res.render('./public/home', {articles: {mainArticle, mostViewedArticles, articlesPaginate}, sub});
            }else{
                res.render('./public/homePaginate', {articles: {articlesPaginate}, sub});
            }
        }catch(err){
            next(err);
        }
    }

    async getAnArticleByUrl(req, res, next){
        try{
            const { sub } = req.user || {sub: null};

            const article = await this._articleService.getAnArticleByUrl(req.params.url);

            this._articleService.addViewToTotalViewedArticle(article.url);

            res.status(200).render('./public/article', {post: article, sub});
        }catch(error){
            next(error);
        }
    }

    async getArticleSearch(req, res, next){
        try{
            const page = parseInt(req.query.pg) || 1;
            const { sub } = req.user || {sub: null};

            const query = req.query.srch || '';

            const articlesPaginate = await this._articleService.getArticlesByQuery(query, page);
console.log(articlesPaginate);
            res.status(200).render('./public/search', {data: { articlesPaginate }, sub, query});
        }catch(err){
            next(err);
        }
    }

    async getSelectAMainArticle(req, res, next){
        try{
            const { url } = req.params;

            await this._articleService.verifyArticleByUrl(url);

            await this._articleService.selectAMainArticle(url);

            res.status(200).redirect('/');
        }catch(err){
            next(err);
        }

    }
}

module.exports = ArticleController;
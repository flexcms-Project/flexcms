const { UserModel, ArticleModel } = require('../../models');
const NotFoundError = require('../../exceptions/NotFoundError');
const InvariantError = require('../../exceptions/InvariantError');
const { nanoid } = require('nanoid');
const { Op } =require('sequelize');

class PostsService {
    constructor(usersService){
        this._usersService = usersService;
        this._Article = ArticleModel;
        this._User = UserModel;

        this.createArticle = this.createArticle.bind(this);
    }

    async createArticle({thumbnail, title, titleToLowerCase, description, content, url}, userUuid){
        const uuid = nanoid(16);

        const creator = await this._usersService.getUserById(userUuid);

        const article = await this._Article.create({
            uuid: uuid,
            thumbnail: thumbnail,
            title: title,
            creatorId: creator.id,
            titleToLowerCase: titleToLowerCase, 
            description: description, 
            content: content, 
            url: url
        })

        if(!article){
            throw new InvariantError('sistem gagal menyimpan artikel');
        }

        return article;
    }

    async editArticle({thumbnail, title, titleToLowerCase, description, content, url}, beforeUrl){
        let article = await this._Article.findOne({
            where: {url: beforeUrl},
        })

        article.thumbnail = thumbnail;
        article.title = title;
        article.titleToLowerCase = titleToLowerCase;
        article.description = description;
        article.content = content;
        article.url = url;

        await article.save();
    }

    async getPostsByCreatorId(uuid){
        const user = await this._usersService.getUserById(uuid);

        const articles = await this._Article.findAll({
            where: { creatorId: user.id },
            order: [['createdAt', 'DESC']],
            raw: true
        });

        return {...user, articles};
    }

    async getMainArticle(){
        const mainArticle = await this._Article.findOne({
            where: {mainView: true},
            raw: true
        })

        return mainArticle;
    }

    async addViewToTotalViewedArticle(url){
        let article = await this._Article.findOne({
            where: {url},
        })

        article.totalViewed += 1;

        article.save();
    }

    async getMostViewedArticles(){
        const mostViewedArticles = await this._Article.findAll({ 
            limit: 2, 
            order: [['totalViewed', 'DESC']],
            include: [{
                model: this._User,
                as: 'creator',
                required: true,
                right: false,
            }],
            raw: true
        })

        return mostViewedArticles;
    }

    async getAllArticlesPaginate(page){
        const limit = page==1? 4: 6;
        const offset = page==1? 0: 4 + (( page - 2 ) * 6);
        const articles = await this._Article.findAndCountAll({
            order: [['createdAt', 'DESC']],
            include: [{
                model: this._User,
                as: 'creator',
                required: true,
                right: false,
            }],
            limit,
            offset,
            raw: true
        });

        const previousPage = page == 1? false: true;
        const nextPage =  4 + ((page-1)*6) < articles.count? true: false;

        const totalPages = articles.count <= 4? 1: (Math.ceil((articles.count-4)/6))+1;

        const articlesPaginate = {...articles, page, previousPage, nextPage, totalPages};

        return articlesPaginate;
    }

    async getAnArticleByUrl(url){
        const article = await this._Article.findOne({
            where: {url},
            include: [{
                model: this._User,
                as: 'creator',
                required: true,
                right: false,
            }],
            raw: true
        });

        if(!article){
            throw new NotFoundError('the article did not found');
        }

        return article;
    }

    async getArticlesByQuery(query, page){
        const limit = 6;
        const offset = (page-1) * limit;

        const articles =await this._Article.findAndCountAll({
            where: {
                content: {
                    [Op.iLike]: '%' + query + '%',
                }
            },
            include: [{ 
                model: this._User, 
                as: 'creator',
                required: false,
            }],
            limit,
            offset,
            raw: true,
        });

        const previousPage = page == 1? false: true;
        const nextPage =  offset < articles.count? true: false;

        const totalPages = articles.count <= 4? 1: Math.ceil(articles.count/6);

        const articlesPaginate = {...articles, page, previousPage, nextPage, totalPages};

        return articlesPaginate;
    }

    async verifyArticleByUrl(url){
        const article = await this._Article.findOne({
            where: {url},
        })

        if(!article){
            throw new NotFoundError('article did not found');
        }
    }
    
    async getArticleByUrl(url){
        const article = await this._Article.findOne({
            where: {url},
            raw: true,
        })

        if(!article){
            throw new NotFoundError('article did not found');
        }

        return article;
    }

    async selectAMainArticle(url){
        console.log(url)
        const article = await this._Article.findOne({
            where: {url}
        })
        console.log('what')
console.log(article)
        article.mainView = true;

        await article.save()
    }
}

module.exports = PostsService;
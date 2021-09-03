const { 
    UsersValidator,
    ArticlesValidator
 } = require('../../validator');
const { 
    UsersService, 
    AuthorizationService, 
    ArticlesService,
    StorageService
} = require('../../services/postgres');

// services class initialization
const storageService = new StorageService();
const usersService = new UsersService(storageService);
const authorizationService = new AuthorizationService(usersService);
const articlesService = new ArticlesService(usersService);

// controllers class initialization
const UsersController = require('./users');
const usersController = new UsersController(usersService, UsersValidator, authorizationService, articlesService, storageService);

const ArticleController = require('./article');
const articleController = new ArticleController(ArticlesValidator, articlesService);

module.exports = { usersController, articleController };
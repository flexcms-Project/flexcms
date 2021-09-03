const TokenManager = require('../../config/lib/tokenize/TokenManager');

class UsersHandler {
    constructor (service, validator, authorizationService, articlesService, storageService) {
        this._service = service;
        this._validator = validator;
        this._TokenManager = TokenManager;
        this._authorizationService = authorizationService;
        this._articlesService = articlesService;
        this._storageService = storageService;

        this.postCreateUser = this.postCreateUser.bind(this);
        this.postUserLogin = this.postUserLogin.bind(this);
        this.getUserDashboard = this.getUserDashboard.bind(this);
        this.getUserSetting = this.getUserSetting.bind(this);
        this.postUserSetting = this.postUserSetting.bind(this);
    }

    async postCreateUser (req, res, next) {
        try{
            this._validator.validateUserRegister(req.body)

            const data = await this._service.createUser(req.body);
    
            return res.status(201).json(data);
        }catch(error){
            next(error);
        }
    }
    
    async getUserLogin (req, res, next) {
        if(req.user){
            return res.status(200).redirect('/users');
        }
    
        return res.status(200).render('./public/loginPage');
    }
    
  async postUserLogin (req, res, next) {
    try{
      if(req.user){
        return res.status(200).redirect('/users');
      }

      this._validator.validateUserLogin(req.body);

      const user = await this._service.userLogin(req.body);

      const tokenData = await this._TokenManager.generateJwtToken(user.uuid)

      res.setHeader('Set-Cookie', [`token=${tokenData.token}; path=/; expires= ${tokenData.date};Secure; HttpOnly`]);
      res.status(200)
        .redirect('/users');
    }catch(error){
        req.pg = './public/loginPage';
        next(error)
    }
  }
    
    async getUserDashboard (req, res, next) {
        try{
            if(!req.user){
                return res.status(400).redirect('/users/logout');
            }
    
            const user = await this._articlesService.getPostsByCreatorId(req.user.sub);

            res.status(200).render('./public/usersDashboard', {user});
        }catch(err){
            next(err);
        }
    }
    
    async getUserSetting (req, res, next) {
        try{
            if(!req.user){
                return res.status(400).redirect('/users/logout');
            }
        
            const user = await this._service.getUserById(req.user.sub);
        
            return res.status(200).render('./public/usersSetting', { data: { user } });
        }catch(err){
            next(err);
        }
    }

    async postUserSetting(req, res, next){
        // const filename = typeof req.file == 'undefined' || null;
        const { filename } = req.file || {filename: null};

        try{
            if(!req.user){
                return res.status(400).redirect('/users/logout');
            }

            await this._service.verifyUserByUuid(req.user.sub);
            
            await this._service.verifyUserByUuidAndPass(req.user.sub, req.body.password);

            this._validator.validateUserUpdate(req.body);

            await this._service.updateUser(req.body, filename, req.user.sub);

            res.status(200).redirect('/users/setting');
        }catch(err){
            this._storageService.deleteProfilePictureByFileName(filename);

            const user = await this._service.getUserById(req.user.sub);

            req.dt = { user } ;
            req.pg = './public/usersSetting';

            next(err);
        }
    }
    
    async getUserLogout (req, res, next) {
        res.setHeader('Set-Cookie', [`token= ; path=/`]);
        res.status(200).redirect('/users/login');
    }
}

module.exports = UsersHandler;
const AuthorizationError = require('../../exceptions/AuthorizationError');

class AuthorizationService {
    constructor(usersService){
        this._usersService = usersService;
    }

    async verifyAuthorization(userId, role){
        const user = await this._usersService.getUserById(userId);

        if(user.role != role){
            throw new AuthorizationError('your are not authorized');
        }
    }
}

module.exports = AuthorizationService;
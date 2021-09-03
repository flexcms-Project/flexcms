const NotFoundError = require('../exceptions/NotFoundError');
const AuthenticationError = require('../exceptions/AuthenticationError');
const InvariantError = require('../exceptions/InvariantError');

const errorHandler = (err, req, res, next) => {
    if(err){
        const statusCode = err.statusCode || 401;
        const message = err.message || 'terjadi masalah di server';
        const page = req.pg || null;
        const data = req.dt || {};
        const status = req.sts || null;

        if(err instanceof NotFoundError){
            res.status(statusCode).render('./public/404', {});
        }else{
            res.status(statusCode);
            if(page != null){
                res.render(page, {data, message, status});
            }else{
                res.json(message);
            }
        }
    }
    next();
}

module.exports = errorHandler;
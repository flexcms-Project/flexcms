const InvariantError = require('../../exceptions/InvariantError');
const { ArticleSchema } = require('./schema');

const ArticlesValidator = {
  validateArticleCreate: (payload) => {
    const validationResult = ArticleSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  
};

module.exports = ArticlesValidator;
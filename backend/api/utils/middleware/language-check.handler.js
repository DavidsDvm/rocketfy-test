const i18n = require('../../../config/i18n.config');

function checkLanguage(req, res, next) {
  const language = req.headers['accept-language']
  if (language && i18n.getLocales().includes(language)) {
    i18n.setLocale(language);
  }
  next();
}

module.exports = { checkLanguage };

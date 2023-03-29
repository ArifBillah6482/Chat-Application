const decorateHtmlResponse = (page_title) => {
  return function (req, res, next) {
    res.locals = {
      html: true,
      title: `${page_title} - ${process.env.APP_NAME}`,
      data: {},
      loggedInUser: {},
      errors: {},
    };

    next();
  };
};

///-------------------///
module.exports = decorateHtmlResponse;

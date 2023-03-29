const { getInbox } = require("../controller/inboxController");
const checkLogin = require("../middlewares/common/checkLogin");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const inboxRouter = require("express").Router();

inboxRouter.get("/", decorateHtmlResponse("Inbox"), checkLogin, getInbox);

///-------------------///
module.exports = inboxRouter;

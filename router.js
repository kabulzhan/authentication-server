const Authentication = require("./controllers/authentication");
const NewsControl = require("./controllers/newsControl");
const passportService = require("./services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function (app) {
  app.get("/", requireAuth, function (req, res, next) {
    res.send({ access: "authorized" });
  });
  app.get("/test", function (req, res, next) {
    res.send({ hello: "world" });
  });

  app.post("/signin", requireSignin, Authentication.signin);
  app.post("/signup", Authentication.signup);

  app.get("/news", NewsControl.getApprovedNews);
  app.post("/news", requireAuth, NewsControl.newsPost);
  app.get("/news/unapproved", requireAuth, NewsControl.getUnapprovedNews);
  app.post("/news/unapproved", requireAuth, NewsControl.approveNews);
  app.delete("/news/unapproved", requireAuth, NewsControl.deleteNews);
  app.get("/news/mynews", requireAuth, NewsControl.getMyNews);
};

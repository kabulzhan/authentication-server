const News = require("../models/news");

exports.newsPost = function (req, res, next) {
  console.log(req.user);
  console.log(req.body);

  const news = new News({
    newsHeader: req.body.header,
    newsBody: req.body.body,
    submittedDate: req.body.submittedDate,
    approved: false,
    createdBy: req.user._id,
  });

  news.save(function (err) {
    if (err) return next(err);
    res.json(news);
  });
};

exports.getUnapprovedNews = function (req, res, next) {
  if (req.user.admin) {
    News.find({ approved: false }, function (err, docs) {
      if (err) return next(err);
      res.json(docs);
    });
  } else return res.send("Phony attempt");
};

exports.approveNews = function (req, res, next) {
  if (req.user.admin) {
    News.findByIdAndUpdate(
      req.body.id,
      { approved: true },
      function (err, doc) {
        if (err) return next(err);
        else res.redirect("/news/unapproved");
      }
    );
  } else return res.send("Phony attempt");
};

exports.deleteNews = function (req, res, next) {
  if (req.user.admin) {
    News.findByIdAndDelete(req.body.id, function (err) {
      if (err) return next(err);
      else res.redirect("/news/unapproved");
    });
  } else return res.send("Phony attempt");
};

exports.getApprovedNews = function (req, res, next) {
  News.find({ approved: true }, function (err, docs) {
    if (err) return next(err);
    res.json(docs);
  });
};

exports.getMyNews = function (req, res, next) {
  console.log(req.user._id);
  News.find({ createdBy: req.user._id }, function (err, docs) {
    if (err) return next(err);
    res.json(docs);
  });
};

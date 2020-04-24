module.exports = function (req, res, next) {
    if (req.session.currenUser) {
        next();
    } else {
        res.redirect("/signin")
    }
}
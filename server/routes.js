var exp = require("express");
var router = exp.Router();
router.get("/", function (req, res) {
    res.send("Server says hello");
});
module.exports = router;

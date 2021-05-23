const exp = require("express");
const router = exp.Router();

router.get("/", (req, res) => {
    res.send("Server says hello");
});

module.exports = router;

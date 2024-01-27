var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/err", function(req, res, next) {
	const err = new Error('my error');
  next(err);
});

const failing = async (bool, next) => {
  try {
    if(bool) throw new Error("failing failure");
    else return "success";
  } catch(e) {
    return e;
  }
}


router.get("/async_err", async function(req, res, next) {
  let value = await failing(true, next);
  if(value !== 'success') next(value);
  else res.render("index", { title: "Express Async "  + value});
});

module.exports = router;

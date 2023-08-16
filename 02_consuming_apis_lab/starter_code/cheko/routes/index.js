var express = require("express");
var router = express.Router();

const request = require("request");

const url = "https://api.chucknorris.io/jokes/random";
const categoriesUrl = "https://api.chucknorris.io/jokes/categories";

router.get("/", (req, res) => {
  request(categoriesUrl, (error, response, body) => {
    const categories = JSON.parse(body);

    if (error) {
      console.log(error);
      res.render("index", { categories });
    } else {
      request(url, (error, response, body) => {
        const joke = JSON.parse(body).value;

        if (error) {
          console.log(error);
          res.render("index", { categories });
        } else {
          res.render("index", { categories, joke });
        }
      });
    }
  });
});
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;

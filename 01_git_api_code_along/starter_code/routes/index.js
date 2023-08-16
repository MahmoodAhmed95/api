const { Octokit } = require("@octokit/rest");

var express = require("express");
var router = express.Router();

const token = process.env.GITHUB_TOKEN;
const ROOT_URL = "https://api.github.com";

router.get("/", async function (req, res, next) {
  const username = req.query.username;
  if (!username) return res.render("index", { userData: null });
  // Define an object that will also come in handy later
  const options = {
    headers: {
      Authorization: `token ${token}`,
    },
  };

  const octokit = new Octokit({ auth: token });

  const userData = await octokit.request(`${ROOT_URL}/users/:username`, {
    username: username,
  });
  const repos = await octokit.request(`${userData.data.repos_url}`, {});

  // console.log(`repos ==> ${JSON.stringify(repos.data[0])}`);
  res.render("index", { userData: userData.data, userRepos: repos.data });
});

module.exports = router;

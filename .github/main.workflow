workflow "deployPage" {
  on = "push"
  resolves = ["Deploy"]
}

action "Master" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Deploy" {
  uses = "JamesIves/github-pages-deploy-action@master"
  needs = ["Master"]
  env = {
    BUILD_SCRIPT = "npm install && npm run prerender"
    BRANCH = "gh-pages"
    FOLDER = "public"
    COMMIT_EMAIL = "45808948@qq.com"
    COMMIT_NAME = "ycjcl868"
  }
  secrets = ["ACCESS_TOKEN"]
}

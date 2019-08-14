workflow "deployPage" {
  on = "push"
  resolves = ["build & deploy"]
}

action "install" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

action "Master" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "gitInit" {
  uses = "gitInit"
  needs = ["install"]
  secrets = ["GITHUB_TOKEN"]
  runs = "[\"sh\", \"-c\", \"git init && git config user.name ycjcl868 && git config user.email 45808948@qq.com\"]"
}

action "build & deploy" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Master", "install", "gitInit"]
  args = "run gh-pages"
  secrets = ["GITHUB_TOKEN"]
}

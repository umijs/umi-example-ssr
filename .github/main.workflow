workflow "deployPage" {
  on = "push"
  resolves = ["Deploy"]
}

action "Master" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Deploy" {
  uses = "docker://node:10"
  needs = ["Master"]
  runs = [
    "sh",
    "-c",
    "git init && git config user.name antd-actions-bot && git config --local user.email support+actions@github.com && git remote set-url origin https://${DEPLOY_TOKEN}@github.com/umijs/umi-example-ssr.git && npm install && npm run gh-pages"
  ],
  secrets = ["DEPLOY_TOKEN"]
}

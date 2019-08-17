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
    "git init && git config user.name ycjcl868 && git config --local user.email 45808948@qq.com && git remote set-url origin https://${GITHUB_TOKEN}@github.com/umijs/umi-example-ssr.git && npm install && npm run gh-pages"
  ],
  secrets = ["GITHUB_TOKEN"]
}

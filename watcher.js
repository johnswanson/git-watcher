#! /usr/local/bin/node

var fs = require("fs");
var child = require("child_process");
var path = require("path");

var watchPath = process.argv[2] || process.cwd();
watchPath = path.join(watchPath, ".git");

fs.watch(watchPath, showLog);
process.stdout.on("resize", showLog);

function showLog() {
  var cols = process.stdout.columns,
      rows = process.stdout.rows,
      command = [
        "git",
        "--no-pager",
        "log",
        "--no-color",
        "--graph",
        "--pretty=format:'%h -%d %s (%cr) <%an>'",
        // "--pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset'",
        "--abbrev-commit",
        "--branches"
      ].join(" ");

  child.exec(command, {cwd: watchPath}, function(err, stdout, stderr) {
    if (err !== null) return;

    process.stdout.write("\u001B[2J\u001B[0;0f");
    stdout = stdout.split("\n").slice(0, rows - 2).map(function (l) {
      return l.substring(0, cols);
    }).join("\n");
    process.stdout.write(stdout);
  });
}

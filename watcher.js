#! /usr/bin/env node

var fs = require("fs");
var child = require("child_process");
var path = require("path");

var LOG_CACHE = "";

var watchPath = getPath(process.argv[2] || process.cwd());

fs.watch(watchPath, function () {
  getLog(showLog);
});

process.stdout.on("resize", function () {
  if (LOG_CACHE !== "") showLog(null, LOG_CACHE);
  else getLog(showLog);
});

getLog(showLog);

function getPath(dir) {
  if (dir === "/") throw new Error("ERROR: The specified directory is not a git repository!");
  if (path.basename(dir) === ".git") return path;
  if (fs.existsSync(path.join(dir, ".git"))) return path.join(dir, ".git");

  return getPath(path.dirname(dir));
}

function showLog(err, log) {
  if (err !== null) return;
  var cols = process.stdout.columns,
      rows = process.stdout.rows;
  process.stdout.write(formatTTY(log, cols, rows));
}

function formatTTY(string, cols, rows) {
  var out = "\u001B[2J\u001B[0;0f";
  return out + string.split("\n").slice(0, rows).map(function (l) {
    return l.substring(0, cols);
  }).join("\n");
}

function getLog(callback) {
  var command = [
        "git",
        "--no-pager",
        "log",
        "--no-color",
        "--graph",
        "--pretty=format:'%h -%d %s (%cr) <%an>'",
        "--abbrev-commit",
        "--branches"
      ].join(" ");

  child.exec(command, {cwd: watchPath}, function(err, stdout, stderr) {
    if (err !== null) callback(err);
    else callback(null, stdout);
  });
}

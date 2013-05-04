# Git-Watcher #

Git-Watcher is just a Node.js script that watches a repository for updates (using Node's fs.watch) and then calls "git log" with some prettifying arguments.

It's a tiny tool I built because I wanted to be able to see exactly how I was changing the commit tree when I called git, without needing to repeatedly call "git log".

## Usage ##

Pretty simple: `npm install git-watcher` to install, `watcher` to run.

Run `watcher` from your git repo (or any sub-directories), or from anywhere else with `watcher /path/to/repo`.

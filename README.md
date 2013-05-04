# Git-Watcher #

Git-Watcher is just a Node.js script that watches a repository for updates (using Node's fs.watch) and then calls "git log" with some prettifying arguments.

It's a tiny tool I built because I wanted to be able to see exactly how I was changing the commit tree when I called git, without needing to repeatedly call "git log".

## Usage ##

Pretty simple. 

To install, just `sudo cp watcher.js /your/PATH/here/watcher`.
To run, just `cd /dir/to/watch`, then `watcher`!

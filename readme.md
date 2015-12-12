##Why this project

If you want to run [phaser](https://github.com/photonstorm/phaser-examplesr) locally.
As its [index.html](https://github.com/photonstorm/phaser-examples/blob/master/examples/index.htmlr) says that we need to install php and some web container.

But I don't like php, so I want to write a simple server with `node.js` to host the example locally.

##How to use

1. clone the project
2. change the `config.example.json ` to `config.json`, edit to specify the path of exmaples
3. install the dependencies by `npm install`
3. start the server `./bin/www`
4. vist <http://localhost:3000>


## Plan
* write a `CLI` so that can start the server by specify the path of example
* Any bugs, write a issue

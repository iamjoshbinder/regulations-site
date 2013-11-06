regulations-site
================

[![Build Status](https://travis-ci.org/eregs/regulations-core.png)](https://travis-ci.org/eregs/regulations-core)

An interface for viewing regulations data.

This repository is part of a larger project. To read about it, please see 
[http://eregs.github.io/eregulations/](http://eregs.github.io/eregulations/).

## Buildout

Buildout is a simple tool for building and distributing python applications
quickly. We use it to get a version of the API up and running without
needing all of the fuss usually associated with setting up Django. Just run

```bash
$ pip install zc.buildout
$ buildout
```

After downloading the internet, you'll notice that some helpful scripts are
located in ```bin```, including ```bin/django``` and ```bin/test```. The
latter will run our test suite while the former is equivalent to running
manage.py in a traditional Django environment.

With that, you can start the development server:
```bash
$ ./bin/django runserver
```

## JavaScript Application Environment
The front end of the site uses a number of JavaScript libraries and frameworks to create the unique experience of navigating and reading a regulation, as you can see at http://consumerfinance.gov/eregulations. If you'd like to modify the JavaScript layer, you should set up the build and testing environment.

If you run the application with ```env = "built"``` in your ```local_settings.py``` and would like to use the UI as it ships with this project, you can skip this.

The application's UI itself uses a number of dependencies that you can see in package.json and bower.json. To start, we are going to be concerned with the foundations of the environment:

- npm, a package manager to install dependencies in the development environment: https://npmjs.org/
- Grunt, a task runner that modules to build and run tests depend on: http://gruntjs.com/
- Bower, a utility to fetch dependencies for the: UI http://bower.io/
- Phantom, a headless browser to run unit and functional tests in: http://phantomjs.org/
- Casper, a utility to execute functional tests: http://casperjs.org/

### Environment setup
#### Node/npm
First we will need npm. npm ships with Node.js. If you don't already have it installed, there are a few ways to get it.
- You can grab and install a binary or installer from http://nodejs.org/download/
- If you're on OS X, you can use [Homebrew](http://brew.sh/) if that's your thing
- If you are using Ubuntu, the default apt-get package is out of date. Do:

```
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
```

If you receive an error about ```add-apt-repository``` not being found, do:

```
sudo apt-get install python-software-properties
```

#### PhantomJS

Executables and binaries can be found for most OSes here: http://phantomjs.org/download.html.
Instructions for Homebrew are also found there.
For Debian-based Linux folk, the apt-get package is often just fine:
```
sudo apt-get install phantomjs
```
However, if you run into problems with a library called "icui18n" when you attempt to run tests, try installing via one of the binaries provided on the PhantomJS site.

#### Global npm packages
You will need to install the Grunt command line interface, Bower, Casper and a Mocha + PhantomJS cli globally using npm. 
If you already have different versions of Casper and Mocha-PhantomJS installed, its probably ok. The version specified is known to work with this codebase, though.
```
cd regulations-site
npm install -g grunt-cli bower casper@0.1.1 mocha-phantomjs@3.1.4
```

#### Installing dependencies
The rest of the dependencies you will need are managed by Bower and npm. Do:
```
npm install
bower install
```

#### Create RequireJS module configuration files
The UI uses [RequireJS](http://requirejs.org/) for script loading and modularity in the UI code. The configuration for RequireJS modules is needed in a couple of different locations for testing and codebase compression. There is a script in the repository that takes care of most of this for you.

Run ```./require.sh``` from the root of the repository.
If you need to make changes to modules in your instance of the application, edit [require.paths.json](https://github.com/eregs/regulations-site/blob/master/require.paths.json) and [require.shim.json](https://github.com/eregs/regulations-site/blob/master/require.shim.json) accordingly. These files map to the ```paths``` and ```shim``` objects in the RequireJS configuration object. For more information: http://requirejs.org/docs/api.html#config

#### Configuration JSON
In the root of the repository, copy ```example-config.json``` to ```config.json``` and edit as necessary. Grunt depends on these settings to carry out tasks.
- ```testURL``` is an environment that Mocha tests can run off of, typically a local development environment.
- ```frontEndPath``` is the path to the root of your codebase where the ```css/``` and ```js/``` directories are.

#### Running Grunt tasks
There are a number of tasks configured in [Gruntfile.js](https://github.com/eregs/regulations-site/blob/master/Gruntfile.js). On the last lines, you will find tasks that group subtasks into common goals. Running ```grunt build``` will run unit, functional and lint tests, compress static assets and output some information about code complexity and maintainability. Its recommended that you run this task before deploying changes. 

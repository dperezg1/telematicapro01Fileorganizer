var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'fileOrganizer'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/articulosem-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'fileOrganizer'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/articulosem-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'fileOrganizer'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/articulos-production'
  }
};

module.exports = config[env];

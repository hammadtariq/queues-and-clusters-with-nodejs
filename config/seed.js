'use strict';
var DRModel = require('./../models/DRModel');
//var DRModel = require('mongoose').model('DR');

//exports.seedCategories = function seedCategories() {
 
 DRModel.find({}).remove()
  .then( function() {
    DRModel.create({
      name: 'Development Tools',
      provider: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      provider: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      provider: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      provider: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      provider: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      provider: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    });
  });

    // DRModel.find({}).exec(function (err, collection) {
    //     if (collection.length === 0) {
    //         DRModel.create({ name: 'Display record 1', provider:'hammad' });
    //         DRModel.create({ name: 'Display record 2', provider:'asad' });
    //         DRModel.create({ name: 'Display record 3', provider:'ahsan' });
    //     }
    // });
//}
var Express = require('express');
var Routes = require('./routes');

// TODO: Uncomment when we have internet
// var TryCatch = require('./trycatch');

var App = module.exports = Express.createServer();

// Configuration

App.configure(function(){
  App.set('views', __dirname + '/views');
  App.set('view engine', 'jade');
  // This gives us scoped errors with long stack traces
  // TODO: Uncomment when we have internet
  // App.use(function (req, res, next) {
  //   TryCatch(next, next);
  // });
  App.use(Express.bodyParser());
  App.use(Express.methodOverride());
  App.use(App.router);
  App.use(Express.static(__dirname + '/public'));
});

App.configure('development', function(){
  App.use(Express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

App.configure('production', function(){
  App.use(Express.errorHandler()); 
});

// Routes
App.get('/', Routes.index);
App.get('/:name', Routes.view);
App.get('/:name/edit', Routes.edit);
App.post('/:name', Routes.save);

App.listen(process.env.PORT || 3000);
console.log("Express server listening on port %d in %s mode", App.address().port, App.settings.env);

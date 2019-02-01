var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(80, function(){
<<<<<<< HEAD
    console.log('Server running on 8080...');
=======
    console.log('Server running on 80...');
>>>>>>> 8f40c034ee79542bef94b86347cc21c6dfede2da
});

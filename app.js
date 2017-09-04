var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var nev = require('email-verification') (mongoose);


mongoose.connect('mongodb://jd:triforceindia@ds013579.mlab.com:13579/bbp');
// mongoose.connect('mongodb://localhost:27017/bbp')
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var server   = require('http').Server(app);
var client       = require('socket.io')(server);
var nicknames = [];

// Mongo Chat
const mongo = require('mongodb').MongoClient;

// mongo.connect('mongodb://127.0.0.1/bbp', function(err, db){
mongo.connect('mongodb://jd:triforceindia@ds013579.mlab.com:13579/bbp', function(err, db){
    if(err){
        throw err;
    }

    console.log('MongoDB connected...');



    client.on('connection', function(socket){

        var actualusername;
        // https://www.youtube.com/watch?v=dOSIqJWQkXM
        socket.on('usernames', function(data){
            actualusername = data.name;
            if( nicknames.indexOf(actualusername)!= -1){
                updateNicknames();
            } else {

                nicknames.push(actualusername);
                updateNicknames();
                console.log(nicknames)
            }

        });

        function updateNicknames(){
            client.emit('nicknames', nicknames);
        }

        socket.on('disconnect', function(){
            console.log('disconnect!')
            console.log('ciao' + actualusername);
            if( nicknames.indexOf(actualusername)!= -1){
                nicknames.splice(nicknames.indexOf(actualusername), 1);
                updateNicknames();
                console.log(nicknames);
            } else {
                updateNicknames();
                console.log(nicknames);
            }

        })

        let chat = db.collection('chats');

        // Create function to send status
        sendStatus = function(s){
            socket.emit('status', s);
        }

        // Get chats from mongo collection
        chat.find().limit(100).sort({_id:1}).toArray(function(err, res){
            if(err){
                throw err;
            }

            // Emit the messages
            socket.emit('output', res);
        });

        // Handle input events
        socket.on('input', function(data){

            let name = data.name;
            let message = data.message;

            // Check for name and message
            if(name == '' || message == ''){
                // Send error status
                sendStatus('Please enter a name and message');
            } else {
                // Insert message
                chat.insert({name: name, message: message}, function(){
                    client.emit('output', [data]);

                    // Send status object
                    sendStatus({
                        message: 'Message sent',
                        clear: true
                    });
                });
            }
        });

        // Handle clear
        socket.on('clear', function(data){
            // Remove all chats from collection
            chat.remove({}, function(){
                // Emit cleared
                socket.emit('cleared');
            });
        });
    });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// set static, public stuff assesible to the browser
app.use(express.static(path.join(__dirname + '/public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


app.use('/', routes);
app.use('/users', users);



// Set Port
app.set('port', (process.env.PORT || 3000));

server.listen(app.get('port'), function(){
    console.log('Server started on port ' + app.get('port'));
});

module.exports = app;

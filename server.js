let express = require('express');
let app = express();
let server = require('http').Server(app);
let bodyParser = require('body-parser');
let io = require('socket.io')(server);

let port = 8080;
let online_users = [];
let messages = [];
let current_user = {};

app.set('port', port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendFile('index.html');
});


io.sockets.on('connection', function(socket){
	// Push users to the logged in users list`
	socket.on('new:user', function(data){
		if(online_users.indexOf(data) !== -1) {
			
		} else {
			socket.fullname = data.fullname;

			console.log(socket.fullname);

			online_users.push(data);

			io.sockets.emit('online_users',online_users);
		}
	});

	// List different of logged in users
	socket.on('load:user',function(data){
		
		console.log(socket.fullname);

		io.sockets.emit('online_users',online_users);
	});

	// Emit when new message was sent
	socket.on('send:message', function(data){
		messages.push(data);
		io.sockets.emit('new:message', { message: data, fullname: socket.fullname });
	});

	// List message
	socket.on('list:message', function(data){
		io.sockets.emit('new:message', messages);
	});
});
server.listen(port, function(){
    console.log('Server run!');
});
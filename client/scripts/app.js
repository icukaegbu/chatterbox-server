// YOUR CODE HERE:
var app = {
	//appUser: app.getUser(),

	chatUsers: {},
	//variables
	//$body: $('.messages'),

	//config object
	config: {
				POST: 'POST',
				GET: 'GET',
				URL: 'https://127.0.0.1:3000/1/classes/chatterbox',
				CONTENT_TYPE: 'application/json'
			},

	//methods
	init: function(){
		app.showUser();
		app.fetch();
		//app.refreshMessages();
	},

	//retrieve from the server
	fetch: function(){
		//fetch the list of chats and display in the central message area
		//in the success function, display all the retrieved messages
		$.ajax({
			url: app.config.URL,
			type: app.config.GET,
			contentType: app.config.CONTENT_TYPE,
			data: { order: '-createdAt' },

			//success function
			success: function(data){
				//iterate over the returned dataset and append data in the display area
				// for ( var i = 0; i < data.results.length; i++ ){
				// 	var item = data.results[i];
				// 	console.log(item.username);
				// 	//app.buildMessageDisplay(item.username, item.text, item.roomname);
				// 	//widget.appendTo(app.$body);
				// 	//
				// 	var str = "<span>" + item.username + "</span>"+ "<br/>" + item.text + "<br/>" +  "<span>" + item.roomname + "</span>";
				// 	var $message = $("<div></div>").addClass('alert alert-info');
				// 	$message.html(str);

				// 	$message.appendTo(app.$body);
				// }
				//alert(data.toString());
				app.buildMessageDisplay(data.results);
				app.addUsersToSidebar();   //add users to sidebar
				app.stopSpinner();
				app.getUser();

				//console.log(data.results);
			},

			error: function(data){
				//console.log('chatterbox: Failed to retrieve messages')
				alert("chatterbox: Failed to retrieve messages");
			}
		});
	},

	//send to the server
	send: function(message){
		//retrieve chat message from the server
		$.ajax({
			url: app.config.URL,
			type: app.config.POST,
			contentType: app.config.CONTENT_TYPE,
			data: JSON.stringify(message),

			//success function
			success: function(data){
				//console.log('chatterbox: Message sent');
				alert("chatterbox: Message sent");
			},

			error: function(data){
				console.log('chatterbox: Failed to send message');
				alert("chatterbox: Failed to send message");
			}
		});
		
	},

	buildMessage: function(username, text, roomname){
		return {
			'username': username,
			'text': text,
			'roomname': roomname
		}
	},

	buildMessageDisplay: function(results){
		var str, $message;
		var $body = $('.messages');
		$body.html('');

		for ( var rLoop = 0; rLoop < results.length; rLoop++ ){
			// var un = JSON.stringify(results[rLoop].username);
			// var text = JSON.stringify(results[rLoop].text);
			// var room = JSON.stringify(results[rLoop].roomname);
			// 
			// str = "<span>" + un + "</span>"+ "<br/>" + text 
			//	 + "<br/>" +  "<span>" + room + "</span>";

			var un = $('<span></span>').text(results[rLoop].username);
			var text = $('<span></span>').text(results[rLoop].text);
			var room = $('<span></span>').text(results[rLoop].roomname);

			
			str = un.text() + "<br/>" + text.text() + "<br/>" + room.text();
		    //console.log(str);
			$message = $('<div></div>').addClass('alert alert-info');
			$message.html(str);
			$message.appendTo($body);

			//add to chatUsers
			app.populateUsers(results[rLoop]);
		}
		//return $message.text(str);
		//console.log("Chat Users: "+app.chatUsers);
	},

	postMessage: function(){
	    var chat = $('#message').val();
	    var message = app.buildMessage(app.getUser(), chat, 'new');
	    app.send(message);
	    $('#message').val("");
	    app.refreshMessages();
	},

	populateUsers: function(chat){
		//if user exists in the object, add his chat to the arra, else create a new user with a new array
		if ( app.chatUsers.hasOwnProperty(chat.username) ){
			app.chatUsers[chat.username].push(chat.text);
		}
		else{
			app.chatUsers[chat.username]= [];
			app.chatUsers[chat.username].push(chat.text);
		}
	},

	addUsersToSidebar: function(){
		//all users as a list
		var $container = $('.hashtags');
		$container.html('');

		for( var key in app.chatUsers ){
			var str = key + ": ("+ app.chatUsers[key].length + ") chats"+ "<br/>";
			var user = $('<span></span>').html(str);
			user.appendTo($container);
			//console.log(str);
		}
	},

	refreshMessages: function (){
	   setInterval(app.fetch, 3000);
	},

	startSpinner: function(){
		$('.spinner img').show();
		// $('form input[type=submit').attr('disabled', "true");
		$('#btnSendMessage').attr('disabled', "true");
	},

	stopSpinner: function(){
		$('.spinner img').fadeOut('fast');
		// $('form input[type=submit').attr('disabled', null);
		$('#btnSendMessage').attr('disabled', null);
	},

	getUser: function(){
		var queryString = window.location.search;
		var user = queryString.substring( queryString.indexOf('?') + 10 );

		return user;
		//alert(queryString);
	}, 

	showUser: function(){
		$('.username').html("User: "+ app.getUser());
	}

}


//function to build the message

//function to add message to body
// app.buildMessageDisplay = function(username, text, roomname){
// 	var str = "<span>" + username + "</span>"+ "<br/>" + text + "<br/>" +  "<span>" + roomname + "</span>";
// 	var $message = $("<div></div>").addClass('alert alert-info');
// 	$message.html(str);

// 	$message.appendTo(app.$body);
// 	//return $message.text(str);
// }


//app.init();



// $(document).ready(function(){
	


// 	//define an ajax object
// 	//$.ajax();
// 	//
// 	//
// 	//add click events to buttons
// 	$("btnGetMessages").click(app.fetch());
// });


var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    // socket.emit('createMessage', {
    //     from: 'Shawn Client',
    //     text: 'Text from client'
    // });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('New message', message);
    var formattedTime = moment(message.createdAt).format("h:mm a");
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`)
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
    console.log('newLocationMessage', message);
    var formattedTime = moment(message.createdAt).format("h:mm a");
    var li = jQuery(`<li></li>`);
    var a = jQuery('<a target="_blank">Location</a>')
    li.text(`${message.from} ${formattedTime}: `);
    // li.text(`<a href="${message.text}">Location</a>`)
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
})

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(e) {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled');
    locationButton.text('Sending...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled');
        locationButton.text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function () {
        locationButton.removeAttr('disabled');
        locationButton.text('Send Location');
        alert('Unable to fetch location.');
    });
});
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
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`)
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
    console.log('newLocationMessage', message);
    var li = jQuery(`<li></li>`);
    let a = jQuery('<a target="_blank">Location</a>')
    li.text(`${message.from}: `);
    // li.text(`<a href="${message.text}">Location</a>`)
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
})

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {

    });
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function(e) {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function () {
        alert('Unable to fetch location.');
    });
});
var socket = io();

function scrollToBottom() {
    // Selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child')
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

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
    var formattedTime = moment(message.createdAt).format("h:mm a");
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        text: message.text
    });

    $('#messages').append(html);
    scrollToBottom();
    // console.log('New message', message);
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`)
    // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
    console.log('newLocationMessage', message);
    var formattedTime = moment(message.createdAt).format("h:mm a");
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
    // var li = jQuery(`<li></li>`);
    // var a = jQuery('<a target="_blank">Location</a>')
    // li.text(`${message.from} ${formattedTime}: `);
    // // li.text(`<a href="${message.text}">Location</a>`)
    // a.attr('href', message.url);
    // li.append(a);
    // $('#messages').append(li);
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
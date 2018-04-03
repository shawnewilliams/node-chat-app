const expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'Shawn';
        let text = 'Hello;'
        let message = generateMessage(from, text);
        // expect(message.from).toBe(from);
        // expect(message.text).toBe(text);
        expect(message).toInclude({
            from,
            text
        });
        expect(message.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct message object', () => {
        let from = 'Shawn';
        let lat = 123;
        let long = 456;
        let url = 'https://www.google.com/maps?q=123,456';
        let message = generateLocationMessage(from, lat, long);
        expect(message).toInclude({
            from,
            url
        });
        expect(message.createdAt).toBeA('number');
    });
});
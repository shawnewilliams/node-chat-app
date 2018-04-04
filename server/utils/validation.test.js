const expect = require('expect');
const {isRealString} = require('./validation')

describe('isRealString', () => {
    it('should reject non-string values', () => {
        let string = isRealString('');
        expect(string).toBe(false);
    });

    it('should reject string with only spaces', () => {
        let string = isRealString('    ');
        expect(string).toBe(false);
    });

    it('should allow string with non-space characters', () => {
        let string = isRealString('   123!@#   ');
        expect(string).toBe(true);

    });
})
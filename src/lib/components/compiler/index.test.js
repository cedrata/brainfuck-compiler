import { describe, it, expect } from "vitest";
import { parse } from ".";

describe('Parser: single comment string', () => {
    it('Provide a comment string and return true', () => {
        expect(parse('#this is a comment string')).toStrictEqual({success: true, description:''})
    });
});

describe('Parser: block comment string', () => {
    it('Provide a comment string and return true', () => {
        expect(parse('#this is a comment block\n#with more than two lines\n#three actually!!!')).toStrictEqual({success: true, description:''})
    });
});

describe('Parser: invalid chars test', () => {
    it('Provide a string filled with valid chars only to throw a ValidationError', () => {
        expect(parse('-++-[]foo.,')).toStrictEqual({success: false, description: 'Unexpected char at row 1 column 7'})
    });
});

describe('Parser: invalid closing "]"', () => {
    it('Provide a string filled with valid chars only to throw a ValidationError', () => {
        expect(parse('-++-[]]foo.,')).toStrictEqual({success: false, description: 'Unexpected closing "]" at row 1 column 7'})
    });
});

describe('Parser: valid string actual code', () => {
    it('Provide a string filled with valid chars only to throw a ValidationError', () => {
        expect(parse('-++-[],.\n.[++>>-]#just some comment to try')).toStrictEqual({success: true, description: ''})
    });
});
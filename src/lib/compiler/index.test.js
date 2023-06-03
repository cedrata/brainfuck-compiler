import { describe, it, expect } from "vitest";
import { compile, parse } from ".";

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

describe('Translator: valid string conversion', () => {
    it('Provide `+` and should return some c code', () => {
        expect(compile('+>,<.[->]')).toStrictEqual({success: true, description:
`#include<malloc.h>
#define LEN 1000
int main(void)
{
    unsigned char *tape;
    size_t head = 0;

    tape = (unsigned char*) malloc(LEN * sizeof(unsigned char));

    ++ *(tape + head);
    ++head;
    *(tape + head) = getchar();
    --head;
    putchar( *(tape + head));
    while ( *(tape + head))
    {
        -- *(tape + head);
        ++head;
    }

    free(tape);

    return 0;
}
`
        })
    });
});
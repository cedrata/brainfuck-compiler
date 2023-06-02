const COMMENT = '#'
const VALID_CHARS = '<>,.+-[] '

/**
 * This function parses a brainf*ck string in the linux format.
 * 
 * IMPORTANT!!! The convedrsion from dos to linux file must be done separately.
 * @param {string} content 
 * @returns 
 */
export function parse(content) {
    /** 
     * Emulation of a push down automata used to check if each '[' is closed correctly.
     * @type {number} */
    let pda = 0;

    /**
     * @type {{success: boolean, description: string}}
     */
    let res = {
        success: true,
        description: ''
    }

    const rows = content.split('\n');
    for (let row = 0; row < rows.length; row++) {
        for (let col = 0; col < rows[row].length; col++) {
            if (rows[row][col] === COMMENT)
                break;

            if (VALID_CHARS.indexOf(rows[row][col]) < 0) {
                res.success = false;
                res.description = 'Unexpected char at row ' + (row + 1) + ' column ' + (col + 1)
                break;
            }

            if (pda === 0 && rows[row][col] === ']') {
                res.success = false;
                res.description = 'Unexpected closing "]" at row ' + (row + 1) + ' column ' + (col + 1)
                break;
            }

            if (rows[row][col] === ']') {
                pda--;
            } else if (rows[row][col] === '[') {
                pda++;
            }

        }
        if (res.success === false) break;
    }

    return res;
}

/**
 * This function translates the brainf*ck code to actual c code.
 * @param {string} content 
 * @returns
 */
export function compile(content) {
    // Validate the content string with the parser.
    // If the `success` attribute of the parser return obj is `false`
    // terminate the execution.
    let res = parse(content)
    if (res.success === false) return res;

    // %code% is to replace with the actual code translation.
    const template =
`#include<malloc.h>
#define LEN 1000
int main(void)
{
    unsigned char *tape;
    size_t head = 0;

    tape = (unsigned char*) malloc(LEN * sizeof(unsigned char));

%code%
    free(tape);

    return 0;
}
`

    let code = '%code%';

    // Each indentation unit is 4 white spaces to put before
    let indent = 1;
    const spaces = 4;

    for (let i = 0; i < content.length; i++) {
        switch (content[i]) {
            case '+':
                code = code.replace('%code%', ' '.repeat(indent * spaces) + '++ *(tape + head);\n%code%');
                break;

            case '-':
                code = code.replace('%code%', ' '.repeat(indent * spaces) + '-- *(tape + head);\n%code%');
                break;

            case '>':
                code = code.replace('%code%', ' '.repeat(indent * spaces) + '++head;\n%code%');
                break;

            case '<':
                code = code.replace('%code%', ' '.repeat(indent * spaces) + '--head;\n%code%');
                break;

            case '.':
                code = code.replace('%code%', ' '.repeat(indent * spaces) + 'putchar( *(tape + head));\n%code%');
                break;

            case ',':
                code = code.replace('%code%', ' '.repeat(indent * spaces) + '*(tape + head) = getchar();\n%code%');
                break;

            case '[':
                code = code.replace(
                    '%code%', 
                    ' '.repeat(indent * spaces) + 'while ( *(tape + head))\n' 
                    + ' '.repeat(indent * spaces) + '{\n'
                    + '%code%'
                    + ' '.repeat(indent * spaces) + '}\n%code%'
                ); 

                indent++;
                break;

            case ']':
                code = code.replace('%code%', '')

                indent--;
                break;

            case '#':
                let temp = code.indexOf('\n');
                i = temp >= 0 ? temp : i;
                break;

            default:
                code = code.replace('%code%', '')
                break;
        }
    }

    res.description = template.replace('%code%', code).replace('%code%', '');

    return res;
}
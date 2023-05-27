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
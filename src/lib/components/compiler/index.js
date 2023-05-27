class ValidationError extends Error {
    /**
     * @param {string} message 
     */
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

const COMMENT = '#'
const VALID_CHARS = '<>,.+-[]'

/**
 * This function parses a brainf*ck string in the linux format.
 * 
 * IMPORTANT!!! The convedrsion from dos to linux file must be done separately.
 * @param {string} content 
 * @throws {ValidationError}
 * @returns {boolean}
 */
export function parse(content) {
    /** 
     * Emulation of a push down automata used to check if each '[' is closed correctly.
     * @type {number} */
    let pda = 0;

    // Isolate each line to 
    content.split('\n').forEach(function (row, index) {
        for (let col = 0; col < row.length; col++) {
            if (row[col] === COMMENT) 
                return;

            if (VALID_CHARS.indexOf(row[col]) < 0) 
                throw new ValidationError('Unexpected char at row ' + (index + 1) + ' column ' + (col + 1))

            if (pda === 0 && row[col] === ']') 
                throw new ValidationError('Unexpected closing "]" at row ' + (index + 1) + ' columt ' + (col + 1))

            pda++;
        }
    })

    return true;
}
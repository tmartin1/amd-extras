/**
 * Angular filter to transform text from a type case to standard case (words separated by spaces).
 * @param  {String} input - String of text to transform.
 * @param  {String} [origin] - Style of the input string: 'camel', 'snake', kebab'
 *                           'camel' - standardCamelCase
 *                           'snake' - separated_by_underscores
 *                           'kebab' - separated-by-hyphens
 * @return {String} The input text as standard case.
 *
 * @example
 * // Displays 'standard case'
 * vm.word = 'standard-case';
 * <div>{{ vm.word | standardCase: 'kebab' }}</div>
 */

function standardCaseFilter () {
    return (input, origin) => {
        if (!angular.isString(input) || !angular.isString(origin)) {
            return input;
        }

        if (origin === 'camel') {
            let result = '';
            let word = '';
            for (let i = 0, n = input.length; i < n; i++) {
                let letter = input[i];
                if (letter.match(/[A-Z]/)) {
                    // Start of new word.
                    result += ' ' + word;
                    word = letter;
                } else {
                    word += letter;
                }
            }
            result += ' ' + word;
            return result.toLowerCase();
        }

        // else
        let target = {
            snake: /_/g,
            kebab: /-/g
        }[origin];

        return input.replace(target, ' ');
    };

}

export default standardCaseFilter;

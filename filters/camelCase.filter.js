/**
 * Angular filter to transform text to camel case.
 * @param  {String} input - String of text to transform.
 * @param  {String} [origin] - Style of the input string: snake', kebab'
 *                           'snake' - separated_by_underscores
 *                           'kebab' - separated-by-hyphens
 * @return {String} The input text as camel case.
 *
 * @example
 * // Displays 'camelCase'
 * vm.word = 'camel_case';
 * <div>{{ vm.word | camelCase: 'snake' }}</div>
 */

function camelCaseFilter (standardCaseFilter) {
    return (input, origin) => {
        if (angular.isString(origin)) {
            input = standardCaseFilter(input, origin);
        }

        // Transform to camel case.
        input = input.toLowerCase().split(' ');
        return input.reduce((result, word) => {
            return result += word[0].toUpperCase() + word.substring(1, word.length);
        }, input.shift());
    };
}

export default camelCaseFilter;

/**
 * Angular filter to transform text to title case.
 * @param  {String} input - String of text to transform.
 * @param  {String} [origin] - Style of the input string: 'camel', 'snake', kebab'
 *                           'camel' - standardCamelCase
 *                           'snake' - separated_by_underscores
 *                           'kebab' - separated-by-hyphens
 * @return {String} The input text as title case.
 *
 * @example
 * // Displays 'Title Case'
 * vm.word = 'titleCase';
 * <div>{{ vm.word | titleCase: 'camel' }}</div>
 */

function titleCaseFilter (standardCaseFilter) {
    return (input, origin) => {
        let smallWords = /^(a|an|and|as|at|but|by|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

        // If origin is provided, transform from origin to normal case.
        if (angular.isString(origin)) {
            input = standardCaseFilter(input, origin);
        }

        // Transform to title case.
        input = input.toLowerCase();
        return input.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, (match, index, title) => {
            if (index > 0 && index + match.length !== title.length &&
                match.search(smallWords) > -1 && title.charAt(index - 2) !== ':' &&
                (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
                title.charAt(index - 1).search(/[^\s-]/) < 0) {
                return match.toLowerCase();
            }

            if (match.substring(1).search(/[A-Z]|\../) > -1) {
                return match;
            }

            return match.charAt(0).toUpperCase() + match.substring(1);
        });
    };
}

export default titleCaseFilter;

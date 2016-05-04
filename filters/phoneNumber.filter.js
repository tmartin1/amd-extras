/**
 * Angular filter to transform text to a properly formatted phone number.
 * @param  {String | Number} input - String of text to transform.
 * @return {String} The input text as a formatted phone number.
 *
 * @example
 * // Displays '(800) 867-5309'
 * vm.word = 8008675309;
 * <div>{{ vm.word | phoneNumber }}</div>
 */

function phoneNumberFilter () {
    return (input) => {
        if (!angular.isString(input) && !angular.isNumber(input)) {
            return '';
        }

        // Ensure input is a string and remove non-number characters.
        input = String(input).replace(/[^0-9]/g, '');

        // Build properly formatted phone number.
        let result = '';
        angular.forEach(input, (char, index) => {
            if (index === 0) {
                result = '(';
            }
            result += char;
            if (index === 2) {
                result += ') ';
            } else if (index === 5) {
                result += '-';
            }
        });

        result += (result && result.match(/\)/)) ? '' : ')';
        return result;
    };
}

export default phoneNumberFilter;

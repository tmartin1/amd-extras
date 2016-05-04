/**
 * Angular filter for amdDatatable directive to sort results by column.
 */
function sortFilter () {
    return (input, first, reverse, second) => {
        if (!first) {
            return input;
        }

        let compare = (a, b) => reverse ? a > b : a < b;

        return input.slice().sort((a, b) => {
            if (angular.isDefined(second) && a[first] === b[first]) {
                return compare(a[second], b[second]) ? 1 : -1;
            }
            return compare(a[first], b[first]) ? 1 : -1;
        });
    };
}

export default sortFilter;

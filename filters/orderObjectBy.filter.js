/**
 * Angular filter to orgnaize a collection of objects.
 */

function orderObjectByFilter () {
    return (items, field, reverse) => {
        var filtered = [];

        angular.forEach(items, (item) => {
            filtered.push(item);
        });

        filtered.sort((a, b) => a[field] > b[field] ? 1 : -1);

        return reverse ? filtered.reverse() : filtered;
    };

}

export default orderObjectByFilter;

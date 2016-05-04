/**
 * Angular filter for amdDatatable directive pagination.
 */
function startFromFilter () {
    return (input, start) => {
        if (input && input.slice) {
            return input.slice(parseInt(start));
        }
    };
}

export default startFromFilter;

export function sortByAttribute(a, b, attribute, asc = true) {
    if (a[attribute] > b[attribute]) {
        return asc ? 1 : -1;
    } else if (a[attribute] < b[attribute]) {
        return asc ? -1 : 1;
    }
    return 0;
}

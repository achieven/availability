export function unshiftArray (array, offset) {
    let arrayCopy = array.slice();
    for (let i = 0; i < offset; i++) {
        const lastElement = arrayCopy.pop();
        arrayCopy.unshift(lastElement);
    }

    return arrayCopy;
}

export function averageArray (array) {
    if (0 === array.length) {
        return 0;
    }
    const sum = array.reduce(
        (elem1, elem2) => {
            return elem1 + elem2
        }
        , 0
    );

    return sum / array.length;
}
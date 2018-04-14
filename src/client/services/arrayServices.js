export function unshiftArray (array, lastUpdateDay) {
    let arrayCopy = array.slice();
    for (let i = 0; i < lastUpdateDay; i++) {
        const lastElement = arrayCopy.pop();
        arrayCopy.unshift(lastElement);
    }

    return arrayCopy;
}

export function averageArray (array) {
    const sum = array.reduce(
        (elem1, elem2) => {
            return elem1 + elem2
        }
        , 0
    );

    return sum / array.length;
}
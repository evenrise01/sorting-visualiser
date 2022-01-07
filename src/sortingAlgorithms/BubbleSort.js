function swap(arr, val1, val2) {
    let temp = arr[val2];
    arr[val2] = arr[val1];
    arr[val1] = temp;
}

export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    let size = array.length;
    doBubbleSort(array, size, animations);
    return animations;
}
function doBubbleSort(array, size, animations) {
    for (let i = 0; i < size - 1; i++) {
        for (let k = 0; k < size - (i + 1); k++) {
            animations.push([i, k, false]);
            animations.push([i, k, false]);
            if (array[k] > array[k + 1]) {
                animations.push([k, array[k + 1], true]);
                animations.push([k + 1, array[k], true]);
                swap(array, k, k + 1);
            }
        }
    }
}
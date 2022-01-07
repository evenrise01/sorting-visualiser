function swap(arr, val1, val2) {
    let temp = arr[val2];
    arr[val2] = arr[val1];
    arr[val1] = temp;
}

export function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    let size = array.length;
    doHeapSort(array, size, animations);
    return animations;
}
//Recursive heapify function. We call until we find the root of the array
function heapify(array, size, i, animations) {
    let root = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    if (left < size && array[left] > array[root]) {
        animations.push([root, left, false]);
        animations.push([root, left, false]);
        root = left;
    }
    if (right < size && array[right] > array[root]) {
        animations.push([root, right, false]);
        animations.push([root, right, false]);
        root = right;
    }
    //Root has changed because i was not the root
    if (root !== i) {
        animations.push([root, array[i], true]);
        animations.push([i, array[root], true]);
        //If root is not i, then swap the values, call heapify recursively
        swap(array, root, i);
        heapify(array, size, root, animations);
    }
}
function doHeapSort(array, size, animations) {
    // Create max heap
    for (let i = (size / 2) - 1; i >= 0; i--) {
        heapify(array, size, i, animations);
    }
    // Now do the actual heap sort
    for (let i = size - 1; i >= 0; i--) {
        animations.push([i, array[0], true]);
        animations.push([0, array[i], true]);
        swap(array, i, 0);
        heapify(array, i, 0, animations);
    }
}

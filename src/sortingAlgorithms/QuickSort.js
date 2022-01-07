function swap(arr, val1, val2) {
    let temp = arr[val2];
    arr[val2] = arr[val1];
    arr[val1] = temp;
}
export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    doQuickSort(array, 0, array.length - 1, animations);
    return animations;
}
function doQuickSort(array, lowIndex, highIndex, animations) {
    if (lowIndex >= highIndex) return;
    let pivot = getPivot(array, lowIndex, highIndex, animations);
    doQuickSort(array, lowIndex, pivot - 1, animations);
    doQuickSort(array, pivot + 1, highIndex, animations);
}
//This is the function to find the partition the array through pivot points
function getPivot(array, lowIndex, highIndex, animations) {
    // Standard quicksort, we set our last element to be our pivot value
    // Pivot index is where the pivot value belongs in the array once sorted
    let pivotIdx = lowIndex
    let pivotVal = array[highIndex];
    // Iterate through the list, note we use lowIndex as the starting index (For recursive calls)
    for (let i = lowIndex; i < highIndex; i++) {
        //Push the animation twice, Once to highlight it, second to reset color
        animations.push([pivotIdx, i, false]);
        animations.push([pivotIdx, i, false]);
        //If the current value is less than the pivot value, than we increment pivot index
        if (array[i] < pivotVal) {
            //Push two animations to swap bar heights (Use true to indicate a change)
            animations.push([pivotIdx, array[i], true]);
            animations.push([i, array[pivotIdx], true]);
            swap(array, i, pivotIdx);
            pivotIdx++;
        }
    }
    //Once we reach the end, we highlight the pivot values determined index and the original index
    //Reset the colors and commit the swap in bar heights
    animations.push([pivotIdx, highIndex, false]);
    animations.push([pivotIdx, highIndex, false]);
    animations.push([pivotIdx, array[highIndex], true]);
    animations.push([highIndex, array[pivotIdx], true]);
    swap(array, pivotIdx, highIndex);
    return pivotIdx;
}
/**
 * Divide and conquer. Divide the array in two parts recursively until only individual elements are left. Then start merging them from ground up while sorting the merges and keep returning the merges and keep sorting the merges.
 */

function merge(arr1: number[], arr2: number[]) {
    let tempArr: number[] = [];

    while (arr1.length && arr2.length) {
        if (arr1[0] > arr2[0]) {
            // Array.shift() removes and returns the first element
            tempArr.push(arr2.shift());
        } else {
            tempArr.push(arr1.shift());
        }
    }

    if (arr1.length) {
        tempArr = tempArr.concat(arr1);
    }

    if (arr2.length) {
        tempArr = tempArr.concat(arr2);
    }

    return tempArr;
}

function mergeSort(arr: number[]): number[] {
    if (arr.length === 1) return arr;

    const half = arr.length / 2;
    let leftPart = arr.slice(0, half);
    let rightPart = arr.slice(half, arr.length);

    leftPart = mergeSort(leftPart);
    rightPart = mergeSort(rightPart);

    return merge(leftPart, rightPart);
}

const unsortedArray_merge = [10, -1, 3, 100, 30];

console.log(mergeSort(unsortedArray_merge));

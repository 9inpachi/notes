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

function mergeSort(arr: number[]) {
    if (arr.length === 1) {
        return arr;
    }

    let leftPart = arr.slice(0, arr.length / 2);
    let rightPart = arr.slice(arr.length / 2, arr.length);

    leftPart = mergeSort(leftPart);
    rightPart = mergeSort(rightPart);

    return merge(leftPart, rightPart);
}

const unsortedArray_merge = [10, -1, 3, 100, 30];

console.log(mergeSort(unsortedArray_merge));

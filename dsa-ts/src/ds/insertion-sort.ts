/**
 * Insertion sort is a simple sorting algorithm that works similar to the way you sort playing cards in your hands. The array is virtually split into a sorted and an unsorted part. Values from the unsorted part are picked and placed at the correct position in the sorted part.
 * To sort an array of size n in ascending order:
 * 1: Iterate from arr[1] to arr[n] over the array.
 * 2: Compare the current element (key) to its predecessor.
 * 3: If the key element is smaller than its predecessor, compare it to the elements before. Move the greater elements one position up to make space for the swapped element.
 * @param arr Array to be sorted.
 */
function insertionSort(arr: number[]) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    // Compare to all previous elements
    while (j >= 0 && key < arr[j]) {
      arr[j + 1] = arr[j];
      j--;
    }
    // Place it before the one greater element on left side
    arr[j + 1] = key;
  }
  return arr;
}

const testArr = [2, 3, -4, 10, 200];

insertionSort(testArr)

console.assert(testArr[0] === -4 && testArr[testArr.length - 1] === 200, 'Wrong implementation');
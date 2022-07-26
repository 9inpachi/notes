/**
 * Given a list, take the current element and exchange it with the smallest element on the right hand side of the current element.
 */
function selectionSort(arr: number[]) {
  for (let i = 0; i < arr.length; i++) {
    let min = arr[i];
    let minIndex = i;
    // Check all elements on the right for the minimum one
    for (let j = i; j < arr.length; j++) {
      if (arr[j] < min) {
        min = arr[j];
        minIndex = j;
      }
    }
    // Swap the two numbers
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}

const testArray = [10, 20, -4, 5, 3];

console.log(selectionSort(testArray));

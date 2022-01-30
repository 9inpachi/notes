const quickSort = (arr: number[], left: number, right: number) => {
  if (left >= right) {
    return;
  }

  const part = partition(arr, left, right);
  // Sort all values around the pivot.
  quickSort(arr, left, part - 1);
  quickSort(arr, part + 1, right);
};

const partition = (arr: number[], left: number, right: number) => {
  const pivot = arr[right];
  let i = left - 1;

  // Make all the values before the pivot less than the pivot.
  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr, i, j);
    }
  }

  const newPivotPoint = i + 1;
  // Swap the pivot so all values to the left are less than it.
  swap(arr, newPivotPoint, right);

  return newPivotPoint;
};

const swap = (arr: number[], i: number, j: number) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

const arrToTest = [-1, 10, -3, 1, 20, 2];
quickSort(arrToTest, 0, arrToTest.length - 1);
console.log(arrToTest);

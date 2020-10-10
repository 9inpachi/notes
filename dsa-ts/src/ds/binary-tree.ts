interface bNode {
  value: number,
  left?: bNode,
  right?: bNode
}

const node13: bNode = { value: 13, left: undefined, right: undefined };
const node14: bNode = { value: 14, left: node13, right: undefined };
const node10: bNode = { value: 10, left: undefined, right: node14 };

const node4: bNode = { value: 4, left: undefined, right: undefined };
const node7: bNode = { value: 7, left: undefined, right: undefined };
const node6: bNode = { value: 6, left: node4, right: node7 };
const node1: bNode = { value: 1, left: undefined, right: undefined };
const node3: bNode = { value: 3, left: node1, right: node6 };

const root: bNode = { value: 8, left: node3, right: node10 };

const findPath = (root: bNode, value: number, path?: number[]): number[] => {
  if (!root) return [];

  path = path || [];

  path.push(root.value);

  if (value !== root.value) {
    if (value < root.value) return findPath(root.left, value, path);
    else if (value > root.value) return findPath(root.right, value, path);
  }

  return path;
}

const find = (root: bNode, value: number): bNode => {
  if (!root) return;

  if (root.value !== value) {
    if (value < root.value) {
      return find(root.left, value);
    } else {
      return find(root.right, value);
    }
  }

  return root;
}

// console.log(findPath(root, 4));

const insert = (root: bNode, value: number) => {
  if (value < root.value) {
    if (root.left) {
      insert(root.left, value);
    } else {
      root.left = { value, left: undefined, right: undefined };
    }
  } else { // equal goes to right
    if (root.right) {
      insert(root.right, value);
    } else {
      root.right = { value, left: undefined, right: undefined };
    }
  }
}

// let rootInsert: bNode = { value: 3 };

// insert(rootInsert, 20);
// insert(rootInsert, 10);
// insert(rootInsert, 12);
// insert(rootInsert, 23);
// insert(rootInsert, 10);

// console.log(JSON.stringify(rootInsert));

const traverse = (root: bNode, cb: (node: bNode) => void) => {
  if (root && root.value) {
    cb(root);
    traverse(root.left, cb);
    traverse(root.right, cb);
  }
}

const findMin = (root: bNode): number => {
  if (root.left) {
    return findMin(root.left);
  } else {
    return root.value;
  }
}

const findMax = (root: bNode): number => {
  if (root.right) {
    return findMax(root.right);
  } else {
    return root.value;
  }
}

const findParentOfToBeDeleted = (root: bNode, value: number): bNode => {
  if (!root) return;

  if (root.left?.value === value || root.right?.value === value) {
    return root;
  } else {
    if (value < root.value) {
      return findParentOfToBeDeleted(root.left, value);
    } else {
      return findParentOfToBeDeleted(root.right, value);
    }
  }
}

const mostLeftNode = (root: bNode): bNode => {
  if (root.left) {
    return mostLeftNode(root.left)
  } else {
    return root;
  }
}

const deleteNode = (root: bNode, value: number): bNode => {
  if (value < root.value) {
    root.left = deleteNode(root.left, value);
  } else if (value > root.value) {
    root.right = deleteNode(root.right, value);
  } else {
    if (root.left && !root.right) {
      root = root.left;
    } else if (root.right && !root.left) {
      root = root.right;
    } else if (root.left && root.right) {
      const node = mostLeftNode(root.right);
      const temp = node.value;
      root.value = temp;
      root.right = deleteNode(root.right, temp);
    } else {
      root = undefined;
    }
  }
  return root;
}

deleteNode(root, 14);

console.log(JSON.stringify(root, undefined, 2));

package tree;

public class BalancedBinaryTree {
  Boolean isTreeBalanced(TreeNode root, int height) {
    int leftTreeHeight = getTreeHeight(root.left, height + 1);
    int rightTreeHeight = getTreeHeight(root.right, height + 1);

    int difference = Math.abs(leftTreeHeight - rightTreeHeight);
    if (difference > 1) {
      return false;
    }

    return true;
  }

  int getTreeHeight(TreeNode node, int height) {
    if (node == null) {
      return height;
    }

    int leftTreeHeight = getTreeHeight(node.left, height + 1);
    int rightTreeHeight = getTreeHeight(node.right, height + 1);

    return leftTreeHeight > rightTreeHeight ? leftTreeHeight : rightTreeHeight;
  }

  public static void main(String[] args) {
    BalancedBinaryTree balancedTree = new BalancedBinaryTree();

    TreeNode root = new TreeNode(1);
    TreeNode left = root.addLeft(2);
    root.addRight(3);
    left.addLeft(4);
    left.addRight(5);

    Boolean isTreeBalanced = balancedTree.isTreeBalanced(root, 0);
    System.out.println(isTreeBalanced);
  }
}

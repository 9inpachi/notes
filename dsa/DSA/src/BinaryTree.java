class TreeNode {
  int data;
  TreeNode left;
  TreeNode right;

  TreeNode() {
  }

  TreeNode(int data) {
    this.data = data;
  }

  TreeNode addLeft(int value) {
    left = new TreeNode(value);
    return left;
  }

  TreeNode addRight(int value) {
    right = new TreeNode(value);
    return right;
  }
}

public class BinaryTree {
  TreeNode root = new TreeNode();

  /**
   * Root traversed "between" left and right nodes..
   * @param node
   */
  void inorder(TreeNode node) {
    if (node != null) {
      inorder(node.left);
      System.out.println(node.data);
      inorder(node.right);
    }
  }

  /**
   * Root traversed "before" left and right nodes.
   * @param node
   */
  void preorder(TreeNode node) {
    if (node != null) {
      System.out.println(node.data);
      preorder(node.left);
      preorder(node.right);
    }
  }

  /**
   * Root traversed "after" left and right nodes.
   * @param node
   */
  void postorder(TreeNode node) {
    if (node != null) {
      postorder(node.left);
      postorder(node.right);
      System.out.println(node.data);
    }
  }

  public static void main(String[] args) {
    BinaryTree tree = new BinaryTree();
    tree.root.data = 1;
    tree.root.addLeft(2).addRight(3);
    tree.root.addRight(4).addLeft(5);

    System.out.println("Inorder");
    tree.inorder(tree.root);
    System.out.println("Preorder");
    tree.preorder(tree.root);
    System.out.println("Postorder");
    tree.postorder(tree.root);
  }
}

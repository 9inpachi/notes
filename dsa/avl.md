# AVL Tree

AVL tree is a balanced binary tree where each node has a balance factor either -1, 0 or 1.

```
balance factor = height of left node - height of right node
```

This is to keep the height of the tree minimum to increase efficiency because a binary tree could end up having only left nodes and then it would take linear time to delete or insert a node.

Video: https://youtu.be/jDM6_TnYIqE

## Rotations

To convert an imbalanced binary tree (balance factor not in [-1, 0, 1]), we do rotations of the tree. The rotations are done on 3 nodes.

### Left To Left or LL Rotation

This rotation is done when all nodes are on the left side. It makes the tree balanced by moving the middle left node to top and making it a parent of the root node so that the root node becomes right node.

Similar concept for RR rotation.

### Left To Right or LR Rotation

This rotation is done when the root node has left child and the left child has right node making it a linear tree (the nodes in question don't have any other children). What we do is that we make a left rotation on the left node and its right child and then make a right rotation like we do in LL rotation.

Similar concept for RL rotation.

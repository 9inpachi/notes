# Algorithms

https://www.programiz.com/dsa\
https://youtu.be/SUCNWiJUaKs - recurrence relation\
https://youtu.be/A03oI0znAoc - asymptotic notation

## Linearly Scalable Algorithms

The solution size grows linearly with the problem. If we increase the input size, the longer it takes to execute the program. For example, sum of 10^11 with for loop.

## Constant Time Algorithms

An algorithm that can solve a problem or input of larger scale in the same time. For example, using the formula `N * (N + 1) / 2` to get sum of 10^11.

## Asymptotic Analysis

The analysis of change in performance of an algorithm with the change in the size/order of input.

### Asymptotic Notations

Notations used to describe the running time of an algorithm when the input is worst-case, best-case or average.

#### Big-O Notation

Big-O notation gives the upper bound of the running of an algorithm aka it gives the worst-case complexity of an algorithm.

```
f(n) = O(g(n))
0 <= f(n) <= cg(n) for constants c and n for sufficiently large n.
```

#### Omega Notation

Omega notation gives the lower bound of the running time of an algorithm aka it gives the best-case complexity of an algorithm.

```
f(n) = Ω(g(n))
0 <= cg(n) <= f(n)
```

#### Theta Notation

Theta notation encloses the function betweent the lower and upper bounds aka it gives the average-case complexity of an algorithm.


## Master Theorem

The master theorem is used to calculate the time complexity of recurrence relations (recursive functions — like divide and conquer algorithms) in a simple and quick way.

Used to solve recurrence relations of the form:

```
T(n) = aT(n/b) + f(n),
where,
n = size of input
a = number of subproblems in the recursion
n/b = size of each subproblem. All subproblems are assumed 
     to have the same size.
f(n) = cost of the work done outside the recursive call, 
      which includes the cost of dividing the problem and
      cost of merging the solutions

Here, a ≥ 1 and b > 1 are constants, and f(n) is an asymptotically positive function.
```

### Example

```
T(n) = 3T(n/2) + n2
Here,
a = 3
n/b = n/2
f(n) = n2

logb a = log2 3 ≈ 1.58 < 2

ie. f(n) < nlogb a+ϵ , where, ϵ is a constant.

Case 3 implies here.

Thus, T(n) = f(n) = Θ(n2)
```

## Time Complexities

Time complexities in order of increasing complexity. Complexity here is the work required to solve a problem.

1. 1  
   Linearly running some statements.
2. log(n)  
   We divide the problem into smaller parts and solve them and the complexity decreases each time we divide the problem. For example, binary search.
3. sqrt(n)  
4. n  
   As we increase the input, the time to solve it linearly increases in the middle of x and y coordinates.
5. nlog(n)  
   The complexity increases linearly solving subparts of the problem in addition to the problem itself.
6. n^2 or n^k  
   We call the same size of problem multiple times nested inside so it takes the problem twice the time to solve. For example nested for loops.
7. 2^n  
   The complexity increases exponentially with time.
8. n!  
   The complexity increases like a mad dog.

## Divide and Conquer

A strategy to divide a problem into smaller; solve the smaller parts and then combine them to get the result. It uses recursion.

1. Breaking the problem into smaller sub-problems
2. Solving the sub-problems, and
3. Combining them to get the desired output

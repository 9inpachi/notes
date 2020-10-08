__kernel void add(__global int* a, __global int* b, __global int* c) {
	size_t globalId = get_global_id(0);
	a[globalId] += (b[globalId] + c[globalId]);
}
__kernel void VectorAddThree(__global int* a, __global int* b, __global int* c, __global int* d, const unsigned int size) {
    size_t gid = get_global_id(0);
    if (gid < size) {
        d[gid] = a[gid] + b[gid] + c[gid];
    }
}
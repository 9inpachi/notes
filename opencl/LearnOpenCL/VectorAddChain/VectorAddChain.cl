__kernel void VectorAddChain(__global float* a, __global float* b, __global float* c, const unsigned int count) {
    int gid = get_global_id(0);
    if (gid < count) {
        c[gid] = a[gid] + b[gid];
    }
}

__kernel void loc_mmul(
    const int N,
    __global float* A,
    __global float* B,
    __global float* C,
	__local float* Awrk)
{
    int k, j;
    int i = get_global_id(0);
    float tmp;
	size_t localId = get_local_id(0);
	if (localId == 0 && i < N) {
		barrier(CLK_LOCAL_MEM_FENCE);
        for (k = 0; k < N; k++)
            Awrk[k] = A[i*N+k];
	}
    if (i < N) {
        for (j = 0; j < N; j++) {
            tmp = 0.0f;
            for (k = 0; k < N; k++)
                tmp += Awrk[k] * B[k*N+j];
            C[i*N+j] = tmp;
        }
    }
}

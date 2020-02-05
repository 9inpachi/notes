
__kernel void loc_mmul(
    const int N,
    __global float* A,
    __global float* B,
    __global float* C,
	__local float* Bwrk)
{
    int k, j;
    int i = get_global_id(0);
	int localId = get_local_id(0);
	int localSize = get_local_size(0);
    float tmp;
	float Awrk[1024];
    if (i < N) {
		for (k = 0; k < N; k++)
			Awrk[k] = A[i*N+k]; // We get the A in private memory
	
        for (j = 0; j < N; j++) {
	
            barrier(CLK_LOCAL_MEM_FENCE);
			// Put B in local memory
			for (k = localId; k < N; k += localSize) {
				Bwrk[k] = B[k*N+j];
			}
			
			barrier(CLK_LOCAL_MEM_FENCE);
            
			tmp = 0.0f;
            for (k = 0; k < N; k++)
                tmp += Awrk[k] * Bwrk[k];
            C[i*N+j] = tmp;

			barrier(CLK_LOCAL_MEM_FENCE);
        }
    }
}

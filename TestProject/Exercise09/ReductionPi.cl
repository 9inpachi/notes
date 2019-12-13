__kernel void ReductionPi(float *step, __global float *data, __local float *localData, __global float *outData) {
	size_t globalId = get_global_id(0);
	size_t localId = get_local_id(0);
	size_t localSize = get_local_size(0);
	
	localData[localId] = (data[globalId] + 0.5) * step;
	
	barrier(CLK_LOCAL_MEM_FENCE);
	
	for (int i=0; i<localSize/2; i++) {
		if (localId < i) {
			localData[localId] += 4.0 / (1.0 + localData[localId + i] * localData[localId + i]);
		}
		barrier(CLK_LOCAL_MEM_FENCE);
	}
	
	if (localId == 0) {
		outData[get_group_id(0)] = localData[0];
	}
}
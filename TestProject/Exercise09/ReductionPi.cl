__kernel void ReductionPi(const float step, __global float *data, __local float *localData, __global float *outData) {
	int globalId = get_global_id(0);
	int localId = get_local_id(0);
	int localSize = get_local_size(0);

	localData[localId] = (data[globalId] + 0.5f) * step;

	barrier(CLK_LOCAL_MEM_FENCE);

	int groupId = get_group_id(0);

	for (int i = 0; i < localSize; i++) {
		outData[groupId] += 4.0f / (1.0f + localData[i] * localData[i]);
	}

}
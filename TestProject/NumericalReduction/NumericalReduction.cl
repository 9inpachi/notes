__kernel void NumericalReduction(__global int* inData, __local int* localData, __global int* outData) {
	size_t globalId = get_global_id(0); // ID of work item relative to all work items in all work groups
	size_t localId = get_local_id(0); // ID of work item relative to current work group
	size_t localSize = get_local_size(0);

	// Set local data equal to the input data at global id
	localData[localId] = inData[globalId];

	// Creating a barrier so that the above code executes first and synchronizes before moving on
	barrier(CLK_LOCAL_MEM_FENCE);

	for (int i = localSize >> 1; i > 0; i >>= 1) {
		if (localId < i) {
			localData[localId] += localData[localId + i];
		}
		barrier(CLK_LOCAL_MEM_FENCE);
	}

	if (localId == 0) { // When a single work group finishes executing
		outData[get_group_id(0)] = localData[0]; // The data has moved to 0th location in local work group as in numerical reduction diagram
	}
}

// EXTRA //

__kernel void PostAddition(__global int* data, __global int* outData, int size) {
	size_t globalId = get_global_id(0);
	size_t globalSize = get_global_size(0);

	int i;
	for (i = globalId; i < size; i += globalSize) {
		outData[0] += data[i];
	}

	/*localData[get_group_id(0)] += data[get_global_id(0)];
	barrier(CLK_GLOBAL_MEM_FENCE);
	outData[]*/
}
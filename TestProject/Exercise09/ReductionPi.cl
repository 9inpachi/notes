__kernel void ReductionPi(const float step, __local float *localData, __global float *outData) {
	int globalId = get_global_id(0);
	int localId = get_local_id(0);

	localData[localId] = (globalId + 0.5f) * step;

	barrier(CLK_LOCAL_MEM_FENCE);

	int groupId = get_group_id(0);
	int localSize = get_local_size(0);
	
	if (localId == 0)
		for (int i = 0; i < localSize; i++) {
			outData[groupId] += 4.0f / (1.0f + localData[i] * localData[i]);
		}

}

// Solution

void reduce(
	__local  float*,
	__global float*);


__kernel void ReductionPiSolution(
	const int          niters,
	const float        step_size,
	__local  float* local_sums,
	__global float* partial_sums)
{
	int num_wrk_items = get_local_size(0);
	int local_id = get_local_id(0);
	int group_id = get_group_id(0);

	float x, accum = 0.0f;
	int i, istart, iend;

	istart = (group_id * num_wrk_items + local_id) * niters;
	iend = istart + niters;

	for (i = istart; i < iend; i++) {
		x = (i + 0.5f) * step_size;
		accum += 4.0f / (1.0f + x * x);
	}

	local_sums[local_id] = accum;
	barrier(CLK_LOCAL_MEM_FENCE);

	reduce(local_sums, partial_sums);
}

//------------------------------------------------------------------------------
//
// OpenCL function:  reduction    
//
// Purpose: reduce across all the work-items in a work-group
// 
// input: local float* an array to hold sums from each work item
//
// output: global float* partial_sums   float vector of partial sums
//

void reduce(
	__local  float* local_sums,
	__global float* partial_sums)
{
	int num_wrk_items = get_local_size(0);
	int local_id = get_local_id(0);
	int group_id = get_group_id(0);

	float sum;
	int i;

	if (local_id == 0) {
		sum = 0.0f;

		for (i = 0; i < num_wrk_items; i++) {
			sum += local_sums[i];
		}

		partial_sums[group_id] = sum;
	}
}
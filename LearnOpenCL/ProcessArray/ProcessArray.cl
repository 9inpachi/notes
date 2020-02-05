__kernel void ProcessArray(__global int* inData, __global int* outData) {
	size_t globalId = get_global_id(0);
	outData[globalId] = inData[globalId] * 2;
}
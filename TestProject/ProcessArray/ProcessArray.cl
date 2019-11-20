__kernel void ProcessArray(__global int* inData, __global int* outData) {
	outData[get_global_id(0)] = inData[get_global_id(0)] * 2;
}
__kernel void ProcessArray(__global int* outData) {
	outData[get_global_id(0)] = 2;
}
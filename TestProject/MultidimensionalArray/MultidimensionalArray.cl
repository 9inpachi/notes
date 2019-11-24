kernel void MultidimensionalArray(global int* data) {
	int id = (get_global_id(1) * get_global_size(0)) + get_global_id(0);
	data[id] = data[id] * 2;
}
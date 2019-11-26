#define CL_USE_DEPRECATED_OPENCL_1_2_APIS

#include <OpenCLHelper.h>
#include <iostream>
#include <array>

int main()
{
	auto program = createProgram("MultidimensionalArray.cl");
	auto context = program.getInfo<CL_PROGRAM_CONTEXT>();
	auto devices = context.getInfo<CL_CONTEXT_DEVICES>();
	if (devices.size() == 0) {
		std::cout << "NO DEVICES";
		return -1;
	}

	auto device = devices.front();

	const int rows = 3;
	const int cols = 2;
	const int count = rows * cols;

	//int arr[rows][cols] = { {1, 1}, {2, 2}, {3, 3} };
	// OR
	std::array<std::array<int, cols>, rows> arr = { { {1, 1}, {2, 2}, {3, 3} } };

	// Print array
	std::cout << "Array before: " << std::endl;
	for (int i = 0; i < arr.size(); i++) {
		for (int j = 0; j < arr[i].size(); j++) {
			std::cout << arr[i][j] << " ";
		}
		std::cout << std::endl;
	}

	// Memory flags: device access | host (pc) access | how to transfer memory across
	cl::Buffer buf(context, CL_MEM_READ_WRITE | CL_MEM_HOST_READ_ONLY | CL_MEM_COPY_HOST_PTR, sizeof(int) * count, arr.data());
	
	cl::Kernel kernel(program, "MultidimensionalArray");
	kernel.setArg(0, buf);

	cl::CommandQueue queue(context, device);
	queue.enqueueNDRangeKernel(kernel, cl::NullRange, cl::NDRange(cols, rows));
	queue.enqueueReadBuffer(buf, CL_TRUE, 0, sizeof(int) * count, arr.data());

	cl::finish;

	// Print array
	std::cout << "Array after: " << std::endl;
	for (int i = 0; i < arr.size(); i++) {
		for (int j = 0; j < arr[i].size(); j++) {
			std::cout << arr[i][j] << " ";
		}
		std::cout << std::endl;
	}

    std::cin.get();
}

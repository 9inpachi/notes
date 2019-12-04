#define CL_USE_DEPRECATED_OPENCL_1_2_APIS

#include "OpenCLHelper.h"
#include <iostream>

int main()
{
	cl::Program program = createProgram("VectorAddThree.cl");
	cl::Context context = program.getInfo<CL_PROGRAM_CONTEXT>();
	std::vector<cl::Device> devices = context.getInfo<CL_CONTEXT_DEVICES>();
	if (devices.size() == 0) {
		std::cout << "NO DEVICES";
		return -1;
	}

	cl::Device device = devices.front();

	int size = 4096;

	std::vector<int> a(size);
	std::vector<int> b(size);
	std::vector<int> c(size);
	std::vector<int> d(size);

	for (int i = 0; i < size; i++) {
		a[i] = rand();
		b[i] = rand();
		c[i] = rand();
	}

	// TOTAL D
	int totalSum = 0;
	for (int i = 0; i < size; i++) {
		totalSum += a[i] + b[i] + c[i];
	}
	std::cout << "Total Sum: " << totalSum;

	cl::Buffer buf_a(context, a.begin(), a.end(), true);
	cl::Buffer buf_b(context, b.begin(), b.end(), true);
	cl::Buffer buf_c(context, c.begin(), c.end(), true);
	cl::Buffer buf_d(context, CL_MEM_READ_WRITE, sizeof(int) * size);

	cl::Kernel kernel(program, "VectorAddThree");
	kernel.setArg(0, buf_a);
	kernel.setArg(1, buf_b);
	kernel.setArg(2, buf_c);
	kernel.setArg(3, buf_d);
	kernel.setArg(4, size);

	cl::CommandQueue queue(context, device);
	queue.enqueueNDRangeKernel(kernel, cl::NullRange, cl::NDRange(size));
	queue.enqueueReadBuffer(buf_d, CL_TRUE, 0, sizeof(int) * size, d.data());

	totalSum = 0;
	for (int i = 0; i < size; i++) {
		totalSum += d[i];
	}
	std::cout << "\nTotal Sum Using OpenCL Kernel: " << totalSum;

	std::cin.get();
}

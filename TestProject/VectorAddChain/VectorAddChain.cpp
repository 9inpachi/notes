#define CL_USE_DEPRECATED_OPENCL_1_2_APIS

#include "OpenCLHelper.h"
#include <iostream>

#define LENGTH 20

int main()
{
	cl::Program program = createProgram("VectorAddChain.cl");
	cl::Context context = program.getInfo<CL_PROGRAM_CONTEXT>();
	std::vector<cl::Device> devices = context.getInfo<CL_CONTEXT_DEVICES>();
	if (devices.size() == 0) {
		std::cout << "NO DEVICES";
		return -1;
	}

	cl::Device device = devices.front();

	int count = LENGTH;

	// c = a + b; d = c + e; f = d + g

	std::vector<float> a(LENGTH);
	std::vector<float> b(LENGTH);
	std::vector<float> c(LENGTH);
	std::vector<float> d(LENGTH);
	std::vector<float> e(LENGTH);
	std::vector<float> f(LENGTH);
	std::vector<float> g(LENGTH);

	for (int i = 0; i < LENGTH; i++) {
		a[i] = rand() / (float)RAND_MAX;
		b[i] = rand() / (float)RAND_MAX;
		e[i] = rand() / (float)RAND_MAX;
		g[i] = rand() / (float)RAND_MAX;
	}

	// Buffers for read only
	cl::Buffer buf_a(context, a.begin(), a.end(), true);
	cl::Buffer buf_b(context, b.begin(), b.end(), true);
	cl::Buffer buf_e(context, e.begin(), e.end(), true);
	cl::Buffer buf_g(context, g.begin(), g.end(), true);

	// Buffers for storing the processed value
	cl::Buffer buf_c(context, CL_MEM_READ_WRITE, sizeof(float) * LENGTH);
	cl::Buffer buf_d(context, CL_MEM_READ_WRITE, sizeof(float) * LENGTH);
	cl::Buffer buf_f(context, CL_MEM_WRITE_ONLY, sizeof(float) * LENGTH); // Write only since this is the last value and we won't pass it to another kernel

	// First getting c data -> c = a + b
	cl::Kernel kernel(program, "VectorAddChain");
	kernel.setArg(0, buf_a);
	kernel.setArg(1, buf_b);
	kernel.setArg(2, buf_c);
	kernel.setArg(3, count);

	cl::CommandQueue queue(context, device);
	queue.enqueueNDRangeKernel(kernel, cl::NullRange, cl::NDRange(count));
	queue.enqueueReadBuffer(buf_c, CL_TRUE, 0, sizeof(float) * count, c.data());

	// Getting d data -> d = c + e
	kernel.setArg(0, buf_c);
	kernel.setArg(1, buf_e);
	kernel.setArg(2, buf_d);
	kernel.setArg(3, count);

	queue.enqueueNDRangeKernel(kernel, cl::NullRange, cl::NDRange(count));
	queue.enqueueReadBuffer(buf_d, CL_TRUE, 0, sizeof(float) * count, d.data());

	std::vector<float> f_before = f;

	// Getting c data -> f = d + g
	kernel.setArg(0, buf_d);
	kernel.setArg(1, buf_g);
	kernel.setArg(2, buf_f);
	kernel.setArg(3, count);

	queue.enqueueNDRangeKernel(kernel, cl::NullRange, cl::NDRange(count));
	queue.enqueueReadBuffer(buf_f, CL_TRUE, 0, sizeof(float) * count, f.data());

	std::cin.get();

}

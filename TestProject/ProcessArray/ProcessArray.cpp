#define CL_USE_DEPRECATED_OPENCL_1_2_APIS
#include "OpenCLHelper.h"
#include <iostream>

int main()
{
	auto program = createProgram("ProcessArray.cl");
	auto context = program.getInfo<CL_PROGRAM_CONTEXT>();
	auto devices = context.getInfo<CL_CONTEXT_DEVICES>();
	if (devices.size() == 0) {
		std::cout << "NO DEVICES";
		return -1;
	}
	auto device = devices.front();

	std::vector<int> vec(1024);
	//std::fill(vec.begin(), vec.end(), 1);

	auto err = CL_SUCCESS;

	cl::Buffer inBuf(context, CL_MEM_READ_ONLY | CL_MEM_HOST_NO_ACCESS | CL_MEM_COPY_HOST_PTR, sizeof(int) * vec.size(), vec.data(), &err);
	cl::Buffer outBuf(context, CL_MEM_WRITE_ONLY | CL_MEM_HOST_READ_ONLY, sizeof(int) * vec.size(), &err);

	cl::Kernel kernel(program, "ProcessArray");
	err = kernel.setArg(0, inBuf); // These are the arguments in the .cl file function
	err = kernel.setArg(1, outBuf);

	cl::CommandQueue queue(context, device);
	err = queue.enqueueFillBuffer(inBuf, 1, 0, sizeof(int) * vec.size());
	err = queue.enqueueNDRangeKernel(kernel, cl::NullRange, cl::NDRange(vec.size()));
	err = queue.enqueueReadBuffer(outBuf, CL_FALSE, 0, sizeof(int) * vec.size(), vec.data());

	cl::finish();

	std::cin.get();
}
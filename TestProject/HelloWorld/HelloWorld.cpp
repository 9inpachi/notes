#define CL_USE_DEPRECATED_OPENCL_1_2_APIS // Use deprecated OpenCL 1.2 APIs which work with NVIDIA

#include <CL/cl.hpp>
#include <fstream>
#include <iostream>
#include "OpenCLHelper.h"

int main()
{
	cl::Program program = createProgram("HelloWorld.cl");
	auto context = program.getInfo<CL_PROGRAM_CONTEXT>();
	auto devices = context.getInfo<CL_CONTEXT_DEVICES>();
	auto device = devices.front();

	char buf[13];
	cl::Buffer memBuf(context, CL_MEM_WRITE_ONLY | CL_MEM_HOST_READ_ONLY, sizeof(buf));
	cl::Kernel kernel(program, "HelloWorld");
	kernel.setArg(0, memBuf);

	cl::CommandQueue queue(context, device);
	queue.enqueueTask(kernel);
	queue.enqueueReadBuffer(memBuf, CL_TRUE, 0, sizeof(buf), buf);

	std::cout << buf;
	std::cin.get();

}

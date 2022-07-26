#define CL_USE_DEPRECATED_OPENCL_1_2_APIS

#include <CL/cl.hpp>
#include <OpenCLModule.h>
#include <iostream>

int main()
{
	std::vector<cl::Event> events;

	// Create the event
	cl::Event e;
	cl_ulong start, end;

	OpenCLModule::OpenCLProgram oclProgram("../kernel.cl", 1);

	events.push_back(e);

	cl_int err = CL_SUCCESS;

	std::vector<cl_uint> a(1024);
	std::vector<cl_uint> b(1024);
	std::vector<cl_uint> c(1024);

	for (int i = 0; i < 1024; i++) {
		a[i] = 0;
		b[i] = 1;
		c[i] = 1;
	}

	cl::Buffer aBuf(oclProgram.context, a.begin(), a.end(), true);
	cl::Buffer bBuf(oclProgram.context, b.begin(), b.end(), true);
	cl::Buffer cBuf(oclProgram.context, c.begin(), c.end(), true);

	cl::Kernel kernel(oclProgram.program, "add");
	kernel.setArg(0, aBuf);
	kernel.setArg(1, bBuf);
	kernel.setArg(2, cBuf);

	// Enable queue profiling by adding an option as the last argument
	cl::CommandQueue queue(oclProgram.context, oclProgram.device, CL_QUEUE_PROFILING_ENABLE);
	// Pass the event to the queue being executed
	err = queue.enqueueNDRangeKernel(kernel, cl::NullRange, cl::NDRange(a.size()), cl::NullRange, NULL, &e);

	queue.enqueueReadBuffer(aBuf, CL_TRUE, 0, a.size() * sizeof(cl_uint), a.data());

	// Wait for the event to finish (or may be get event back)
	e.wait();

	// Get profiling info from the event
	start = e.getProfilingInfo<CL_PROFILING_COMMAND_START>();
	end = e.getProfilingInfo<CL_PROFILING_COMMAND_END>();

	std::cout << "Global kernel time: " << (end - start) * 1.0e-6f << "(ms)" << std::endl;

	queue.finish();
}

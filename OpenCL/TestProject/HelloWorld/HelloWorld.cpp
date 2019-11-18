#define CL_USE_DEPRECATED_OPENCL_1_2_APIS // Use deprecated OpenCL 1.2 APIs which work with NVIDIA

#include <CL/cl.hpp>
#include <fstream>
#include <iostream>

int main()
{
	std::vector<cl::Platform> platforms;

	cl::Platform::get(&platforms); // Gets all the platforms

	// FOR PLATFORM [0]
	auto platform = platforms.front();

	_ASSERT(platforms.size() > 0);

	std::vector<cl::Device> devices;
	platform.getDevices(CL_DEVICE_TYPE_ALL, &devices);

	_ASSERT(devices.size() > 0);

	auto device = devices.front(); // We will perform our operations using this device

	std::ifstream HelloWorldFile("HelloWorld.cl");
	std::string srcString(std::istreambuf_iterator<char>(HelloWorldFile), (std::istreambuf_iterator<char>()));

	cl::Program::Sources programSources(1, std::make_pair(srcString.c_str(), srcString.length() + 1));

	cl::Context context(device);
	cl::Program program(context, programSources);

	auto err = program.build("-cl-std=CL1.2");

	char buf[13];
	cl::Buffer memBuf(context, CL_MEM_WRITE_ONLY | CL_MEM_HOST_READ_ONLY, sizeof(buf));
	cl::Kernel kernel(program, "HelloWorld", &err);
	kernel.setArg(0, memBuf);

	cl::CommandQueue queue(context, device);
	queue.enqueueTask(kernel);
	queue.enqueueReadBuffer(memBuf, CL_TRUE, 0, sizeof(buf), buf);

	std::cout << buf;
	std::cin.get();

}

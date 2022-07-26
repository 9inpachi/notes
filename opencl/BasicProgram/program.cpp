#define CL_USE_DEPRECATED_OPENCL_1_2_APIS
#include <iostream>
#include <CL/cl.hpp>
#include <fstream>

#define DEVICE_INDEX 1

int main()
{
	std::vector<cl::Platform> platforms;
	cl::Platform::get(&platforms);

	std::vector<cl::Device> devices;
	for (int i = 0; i < platforms.size(); i++) {
		std::vector<cl::Device> platformDevices;
		platforms[i].getDevices(CL_DEVICE_TYPE_GPU, &platformDevices);
		devices.insert(devices.end(), platformDevices.begin(), platformDevices.end());
	}

	cl::Device selectedDevice = devices[DEVICE_INDEX];

	std::cout << "Using device: " << selectedDevice.getInfo<CL_DEVICE_NAME>() << std::endl;

	std::ifstream openCLFile("kernel.cl");

	std::string srcString(std::istreambuf_iterator<char>(openCLFile), (std::istreambuf_iterator<char>()));

	cl::Program::Sources sources(1, std::make_pair(srcString.c_str(), srcString.length() + 1));

	cl::Context context(selectedDevice);
	cl::Program program(context, sources);

	program.build("-cl-std=CL1.2");

	// Main program starts
	cl_int err = CL_SUCCESS;
	
	std::vector<cl_uint> a(1024);
	std::vector<cl_uint> b(1024);
	std::vector<cl_uint> c(1024);

	for (int i = 0; i < 1024; i++) {
		a[i] = 0;
		b[i] = 1;
		c[i] = 1;
	}


	cl::Buffer aBuf(context, a.begin(), a.end(), true);
	cl::Buffer bBuf(context, b.begin(), b.end(), true);
	cl::Buffer cBuf(context, c.begin(), c.end(), true);

	cl::Kernel kernel(program, "add");
	err = kernel.setArg(0, aBuf);
	err = kernel.setArg(1, bBuf);
	err = kernel.setArg(2, cBuf);

	cl::CommandQueue queue(context, selectedDevice);
	err = queue.enqueueNDRangeKernel(kernel, cl::NullRange, cl::NDRange(a.size()));
	err = queue.enqueueReadBuffer(aBuf, CL_TRUE, 0, sizeof(int) * a.size(), a.data());

	cl::finish();


    std::cout << "Hello World!\n";
}

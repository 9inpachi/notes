#define CL_USE_DEPRECATED_OPENCL_1_2_APIS

#include "OpenCLHelper.h"
#include <iostream>
#include <fstream>

#define DEVICE_INDEX 0
#define KERNEL_FILE_NAME "ProcessArray.cl"

int main()
{
	// For multiple devices

	std::vector<cl::Platform> platforms;
	cl::Platform::get(&platforms);

	std::vector<cl::Device> devices;

	for (int i = 0; i < platforms.size(); i++) {
		std::vector<cl::Device> platformDevices;
		platforms[i].getDevices(CL_DEVICE_TYPE_ALL, &platformDevices);
		devices.insert(devices.end(), platformDevices.begin(), platformDevices.end());
	}

	for (int i = 0; i < devices.size(); i++) {
		std::cout << "Device " << i << ": " << devices[i].getInfo<CL_DEVICE_NAME>() << std::endl;
	}

	// We have all the devices now. Moving on to creating the context and program

	std::ifstream kernelFile(KERNEL_FILE_NAME);
	std::string kernelString(std::istreambuf_iterator<char>(kernelFile), (std::istreambuf_iterator<char>()));

	cl::Program::Sources programSources(1, std::make_pair(kernelString.c_str(), kernelString.length() + 1));

	cl::Context context(devices[DEVICE_INDEX]);
	cl::Program program(context, programSources);

	program.build("-cl-std=CL1.2");

	std::vector<int> vec(1024);
	std::vector<int> vec1(512), vec2(1024);
	//std::fill(vec.begin(), vec.end(), 1);

	auto err = 0;

	cl::Buffer inBuf(context, CL_MEM_READ_ONLY | CL_MEM_HOST_NO_ACCESS | CL_MEM_COPY_HOST_PTR, sizeof(int) * vec.size(), vec.data(), &err);
	cl::Buffer outBuf(context, CL_MEM_WRITE_ONLY | CL_MEM_HOST_READ_ONLY, sizeof(int) * vec.size(), &err);

	cl::Kernel kernel(program, "ProcessArray");
	err = kernel.setArg(0, inBuf); // These are the arguments in the .cl file function
	err = kernel.setArg(1, outBuf);

	cl::CommandQueue queue(context, devices[DEVICE_INDEX]);
	err = queue.enqueueFillBuffer(inBuf, 1, 0, sizeof(int) * vec.size() / 2);
	err = queue.enqueueNDRangeKernel(kernel, cl::NullRange, cl::NDRange(vec.size() / 2));
	err = queue.enqueueReadBuffer(outBuf, CL_TRUE, 0, sizeof(int) * vec.size() / 2, vec1.data());
	queue.finish();

	cl::CommandQueue queue1(context, devices[DEVICE_INDEX]);
	err = queue1.enqueueFillBuffer(inBuf, 2, 0, sizeof(int) * vec.size() / 2);
	err = queue1.enqueueNDRangeKernel(kernel, cl::NDRange(0), cl::NDRange(vec.size() / 2));
	err = queue1.enqueueReadBuffer(outBuf, CL_TRUE, 0, sizeof(int) * vec.size() / 2, vec2.data());
	queue1.finish();

	cl::finish();

	std::string errStr = getCLError(err);

	std::cin.get();
}
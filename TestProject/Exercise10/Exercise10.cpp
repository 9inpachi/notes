#define CL_USE_DEPRECATED_OPENCL_1_2_APIS

#include "cl/cl.hpp"
#include <iostream>

int main()
{
	// For multiple devices
	std::vector<cl::Platform> platforms;
	cl::Platform::get(&platforms);
	std::vector<cl::Device> devices;
	std::vector<std::string> devicesNames;

	for (int i = 0; i < platforms.size(); i++) {
		std::vector<cl::Device> platformDevices;
		platforms[i].getDevices(CL_DEVICE_TYPE_ALL, &platformDevices);
		for (int j = 0; j < platformDevices.size(); j++) {
			std::string deviceName = platformDevices[j].getInfo<CL_DEVICE_NAME>();
			if (std::find(devicesNames.begin(), devicesNames.end(), deviceName) == devicesNames.end()) {
				devicesNames.push_back(deviceName);
				devices.push_back(platformDevices[j]);
			}
		}
	}

	for (int i = 0; i < devices.size(); i++) {
		std::cout << "Device: " << devices[i].getInfo<CL_DEVICE_NAME>() << std::endl;
	}
	/*
	std::vector<int> vec(1024);
	//std::fill(vec.begin(), vec.end(), 1);

	auto err = 0;

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

	std::cin.get();*/
}
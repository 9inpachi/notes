#include "OpenCLModule.h"

OpenCLModule::OpenCLProgram::OpenCLProgram() {}
OpenCLModule::OpenCLProgram::OpenCLProgram(const std::string& kernelFile, const int deviceIndex) {
	this->createProgram(kernelFile, program, context, allDevices, device, deviceIndex);
}
void OpenCLModule::OpenCLProgram::createProgram(const std::string& filename, cl::Program& program, cl::Context& context, std::vector<cl::Device>& devices, cl::Device& device, const int deviceIndex)
{

	// Getting all platforms to gather devices from
	std::vector<cl::Platform> platforms;
	cl::Platform::get(&platforms); // Gets all the platforms

	_ASSERT(platforms.size() > 0);

	// Getting all devices and putting them into a single vector
	for (int i = 0; i < platforms.size(); i++) {
		std::vector<cl::Device> platformDevices;
		platforms[i].getDevices(CL_DEVICE_TYPE_ALL, &platformDevices);
		devices.insert(devices.end(), platformDevices.begin(), platformDevices.end());
	}

	_ASSERT(devices.size() > 0);

	// Check if the device exists at the given index
	if (deviceIndex >= devices.size()) {
		_ASSERT(deviceIndex >= devices.size());
		device = devices.front();
	}
	else {
		device = devices[deviceIndex]; // We will perform our operations using this device
	}

	// Reading the kernel file for execution
	std::ifstream kernelFile(filename);
	std::string srcString(std::istreambuf_iterator<char>(kernelFile), (std::istreambuf_iterator<char>()));


	cl::Program::Sources programSources(1, std::make_pair(srcString.c_str(), srcString.length() + 1));

	context = cl::Context(device);
	program = cl::Program(context, programSources);

	program.build("-cl-std=CL1.2");

}

void OpenCLModule::OpenCLProgram::runKernel(const char* kernelName, std::vector<std::vector<int>>& valueVec)
{
	std::vector<cl::Buffer> bufVec(valueVec.size());
	for (int i = 0; i < bufVec.size(); i++) {
		bufVec[i] = cl::Buffer(context, valueVec[i].begin(), valueVec[i].end(), true);
	}

	cl::Kernel kernel(program, kernelName);
	for (int i = 0; i < bufVec.size(); i++) {
		kernel.setArg(i, bufVec[i]);
	}

	cl::CommandQueue queue(context, device);
	queue.enqueueNDRangeKernel(kernel, cl::NullRange, cl::NDRange(valueVec[0].size()));
	queue.enqueueReadBuffer(bufVec[0], CL_TRUE, 0, sizeof(int) * valueVec[0].size(), valueVec[0].data());

	queue.finish();
}
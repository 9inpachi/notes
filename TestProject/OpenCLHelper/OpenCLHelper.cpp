#define CL_USE_DEPRECATED_OPENCL_1_2_APIS

#include <CL/cl.hpp>
#include <fstream>
#include <string>

cl::Program createProgram(const std::string& filename) {
	std::vector<cl::Platform> platforms;

	cl::Platform::get(&platforms); // Gets all the platforms

	// FOR PLATFORM [0]
	auto platform = platforms.front();

	_ASSERT(platforms.size() > 0);

	std::vector<cl::Device> devices;
	platform.getDevices(CL_DEVICE_TYPE_ALL, &devices);

	_ASSERT(devices.size() > 0);

	auto device = devices.front(); // We will perform our operations using this device

	std::ifstream openCLFile(filename);
	std::string srcString(std::istreambuf_iterator<char>(openCLFile), (std::istreambuf_iterator<char>()));

	cl::Program::Sources programSources(1, std::make_pair(srcString.c_str(), srcString.length() + 1));

	cl::Context context(device);
	cl::Program program(context, programSources);

	program.build("-cl-std=CL1.2");

	return program;
	
}
#define CL_USE_DEPRECATED_OPENCL_2_0_APIS
#define CL_HPP_TARGET_OPENCL_VERSION 200

#include <CL/cl2.hpp>

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

	auto device = devices.front();
	auto vendor = device.getInfo<CL_DEVICE_VENDOR>();
	auto version = device.getInfo<CL_DEVICE_VERSION>();

	// FOR PLATFORM [1]
	auto platform1 = platforms[1];

	std::vector<cl::Device> devices1;
	platform1.getDevices(CL_DEVICE_TYPE_ALL, &devices1);

	_ASSERT(devices1.size() > 0);

	auto device1 = devices1.front();
	auto vendor1 = device1.getInfo<CL_DEVICE_VENDOR>();
	auto version1 = device1.getInfo<CL_DEVICE_VERSION>();

	// FOR PLATFORM [2]
	auto platform2 = platforms[2];

	std::vector<cl::Device> devices2;
	platform2.getDevices(CL_DEVICE_TYPE_ALL, &devices2);

	_ASSERT(devices2.size() > 0);

	auto device2 = devices2.front();
	auto vendor2 = device2.getInfo<CL_DEVICE_VENDOR>();
	auto version2 = device2.getInfo<CL_DEVICE_VERSION>();

	auto test = NULL;
}
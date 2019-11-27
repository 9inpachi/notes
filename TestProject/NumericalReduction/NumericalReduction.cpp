#define CL_USE_DEPRECATED_OPENCL_1_2_APIS

#include <OpenCLHelper.h>
#include <iostream>
#include <array>

int main()
{
	auto program = createProgram("NumericalReduction.cl");
	auto context = program.getInfo<CL_PROGRAM_CONTEXT>();
	auto devices = context.getInfo<CL_CONTEXT_DEVICES>();
	if (devices.size() == 0) {
		std::cout << "NO DEVICES";
		return -1;
	}

	auto device = devices.front();

	// Declare a vector that is a multiple of work size so numerical reduction can be easily processed
	std::vector<int> vec(1024);

	for (int i = 0; i < vec.size(); ++i) {
		vec[i] = i;
	}

	// Create a kernel to get the work group size
	cl_int err = CL_SUCCESS;
	cl::Kernel kernel(program, "NumericalReduction");

	auto workGroupSize = kernel.getWorkGroupInfo<CL_KERNEL_WORK_GROUP_SIZE>(device);

	// Calculating number of workgroups that will be created for the amount of data we have
	auto numOfWorkGroups = vec.size() / workGroupSize;

	std::cout << "Number of workgroups: " << numOfWorkGroups;

	cl::Buffer inBuf(context, CL_MEM_READ_ONLY | CL_MEM_HOST_NO_ACCESS | CL_MEM_COPY_HOST_PTR, sizeof(int) * vec.size(), vec.data());
	cl::Buffer outBuf(context, CL_MEM_WRITE_ONLY | CL_MEM_HOST_READ_ONLY, sizeof(int) * numOfWorkGroups);

	kernel.setArg(0, inBuf);
	kernel.setArg(1, sizeof(int) * workGroupSize, nullptr);
	kernel.setArg(2, outBuf);

	std::vector<int> outVec(numOfWorkGroups);

	cl::CommandQueue queue(context, device);
	queue.enqueueNDRangeKernel(kernel, cl::NullRange, cl::NDRange(vec.size()), cl::NDRange(workGroupSize));
	queue.enqueueReadBuffer(outBuf, CL_TRUE, 0, sizeof(int) * outVec.size(), outVec.data());

	std::cin.get();
}
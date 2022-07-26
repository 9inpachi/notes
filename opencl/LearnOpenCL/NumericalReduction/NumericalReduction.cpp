#define CL_USE_DEPRECATED_OPENCL_1_2_APIS

#include <OpenCLHelper.h>
#include <iostream>
#include <array>

int main()
{
	auto program = createProgram("NumericalReduction.cl", 0);
	cl::Context context = program.getInfo<CL_PROGRAM_CONTEXT>();
	std::vector<cl::Device> devices = context.getInfo<CL_CONTEXT_DEVICES>();
	cl::Device device = devices.front();

	// Declare a vector that is a multiple of work size so numerical reduction can be easily processed
	std::vector<int> vec(1024);

	for (int i = 0; i < vec.size(); ++i) {
		vec[i] = i;
	}

	// Create a kernel to get the work group size
	cl_int err = CL_SUCCESS;
	cl::Kernel kernel(program, "NumericalReduction");

	auto workGroupSize = kernel.getWorkGroupInfo<CL_KERNEL_WORK_GROUP_SIZE>(device, &err);

	// Calculating number of workgroups that will be created for the amount of data we have
	cl_int numOfWorkGroups = vec.size() / workGroupSize;

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

	// EXTRA //
	// Adding the results

	//auto resultVec = outVec;

	//cl_int err1 = CL_SUCCESS;
	//cl::Kernel kernelAdd(program, "PostAddition", &err1);

	//std::vector<int> vecAdd(4);
	//int sum;

	//int arraySize = outVec.size();
	//std::cout << arraySize;
	//cl::Buffer bufAdd(context, CL_MEM_READ_WRITE | CL_MEM_HOST_READ_ONLY | CL_MEM_COPY_HOST_PTR, sizeof(int) * outVec.size(), outVec.data(), &err1);
	////cl::Buffer bufSize(context, CL_MEM_READ_ONLY | CL_MEM_HOST_NO_ACCESS, sizeof(int) * sizeof(arraySize), &arraySize, &err1);
	//cl::Buffer bufSum(context, CL_MEM_WRITE_ONLY | CL_MEM_HOST_READ_ONLY, sizeof(int) * vecAdd.size(), &err1);

	//kernelAdd.setArg(0, bufAdd);
	//kernelAdd.setArg(1, bufSum);
	//kernelAdd.setArg(2, arraySize);
	////kernelAdd.setArg(2, bufSum);

	//cl::CommandQueue queueAdd(context, device);
	//queueAdd.enqueueNDRangeKernel(kernelAdd, cl::NullRange, cl::NDRange(outVec.size()));
	////queueAdd.enqueueTask(kernelAdd);
	//queueAdd.enqueueReadBuffer(bufAdd, CL_TRUE, 0, sizeof(int) * outVec.size(), outVec.data());
	//queueAdd.enqueueReadBuffer(bufSum, CL_TRUE, 0, sizeof(int) * vecAdd.size(), vecAdd.data());

	//// Normal sum
	//int normalSum = 0;
	//for (int i = 0; i < outVec.size(); i++) {
	//	normalSum += outVec[i];
	//}

	//auto errName = getCLError(err);

	std::cin.get();
}
#define CL_USE_DEPRECATED_OPENCL_1_2_APIS
#include <iostream>
#include "OpenCLHelper.h"
#include <string>
#include <ctime>
#include <chrono>

static long n_steps = 512 * 512 * 512;

#define DEVICE_INDEX 2

void main()
{
	std::chrono::system_clock::time_point start, end;

	printf("Starting sequential ------\n");

	start = std::chrono::system_clock::now();

	int i; double pi, sum = 0.0, x = 0.0;

	float step = 1.0 / (float)n_steps;

	for (i = 0; i < n_steps; i++) {
		x = (i + 0.5) * step;
		sum += 4.0 / (1.0 + x * x);
	}

	pi = step * sum;

	end = std::chrono::system_clock::now();

    printf("Using sequential: %f\n", pi);

	std::chrono::duration<double> timeTakenSeq = end - start;
	std::cout << "Time for sequential: " << timeTakenSeq.count() << "s" << std::endl;

	printf("\nStarting OpenCL ------\n");

	// OPENCL WAY OF FINDING PI
	cl::Program program;
	cl::Context context;
	std::vector<cl::Device> devices;
	cl::Device device;
	createProgramForAll("ReductionPi.cl", program, context, devices, device, DEVICE_INDEX);

	cl::Kernel kernel(program, "ReductionPi");

	cl_int err = 0;

	size_t workgroupSize = kernel.getWorkGroupInfo<CL_KERNEL_WORK_GROUP_SIZE>(device, &err);

	int n_workgroups = n_steps / (int)workgroupSize;

	printf("No of workgroups: %d \nWorkgroup size: %zu\n", n_workgroups, workgroupSize);

	std::vector<float> outVals(n_workgroups);

	cl::Buffer outBuf(context, CL_MEM_WRITE_ONLY, sizeof(float) * n_workgroups);

	kernel.setArg(0, step);
	kernel.setArg(1, sizeof(float) * workgroupSize, nullptr);
	kernel.setArg(2, outBuf);

	start = std::chrono::system_clock::now();

	cl::CommandQueue queue(context, device);
	cl::NDRange global(n_steps);
	cl::NDRange local(workgroupSize);
	queue.enqueueNDRangeKernel(kernel, cl::NullRange, global, local);
	queue.enqueueReadBuffer(outBuf, CL_TRUE, 0, sizeof(float) * n_workgroups, outVals.data());

	cl::finish();

	float piOpenCLSum = 0.0f;

	for (int i = 0; i < outVals.size(); i++) {
		piOpenCLSum += outVals[i];
	}

	end = std::chrono::system_clock::now();

	std::cout << "Using OpenCL: " << (step * piOpenCLSum)<<std::endl;

	std::chrono::duration<double> timeTakenOCL = end - start;
	std::cout << "Time for OpenCL: " << timeTakenOCL.count() << "s" << std::endl;

	std::string errCode = getCLError(err);

	std::cin.get();

}
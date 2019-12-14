#define CL_USE_DEPRECATED_OPENCL_1_2_APIS
#include <iostream>
#include "OpenCLHelper.h"
#include<string>

static long n_steps = 1024;

#define DEVICE_INDEX 0

int main()
{
	printf("Using sequential ------\n");
	int i; double pi, sum = 0.0, x = 0.0;

	double step = 1.0 / (double)n_steps;

	for (i = 0; i < n_steps; i++) {
		x = (i + 0.5) * step;
		sum += 4.0 / (1.0 + x * x);
	}

	pi = step * sum;

    printf("%f\n", pi);

	// OPENCL
	cl::Program program = createProgram("ReductionPi.cl");
	cl::Context context = program.getInfo<CL_PROGRAM_CONTEXT>();
	std::vector<cl::Device> devices = context.getInfo<CL_CONTEXT_DEVICES>();
	devices = getAllDevices(devices);

	if (devices.size() == 0) {
		printf("NO DEVICES");
		return -1;
	}

	cl::Device device = devices[DEVICE_INDEX];

	cl::Kernel kernel(program, "ReductionPi");

	cl_int err = 0;

	cl_uint workgroupSize = kernel.getWorkGroupInfo<CL_KERNEL_WORK_GROUP_SIZE>(device, &err);

	int n_workgroups = n_steps / workgroupSize;

	std::vector<float> outVals(n_workgroups);
	std::vector<float> data(n_steps);
	for (int i = 0; i < data.size(); i++) {
		data[i] = i;
	}

	cl::Buffer outBuf(context, CL_MEM_WRITE_ONLY, sizeof(int) * n_workgroups);
	cl::Buffer dataBuf(context, data.begin(), data.end(), true);

	/*kernel.setArg(0, step);
	kernel.setArg(1, dataBuf);
	kernel.setArg(2, sizeof(float) * workgroupSize, nullptr);
	kernel.setArg(3, outBuf);*/
	kernel.setArg(0, n_steps);
	kernel.setArg(1, step);
	kernel.setArg(2, sizeof(int) * workgroupSize, nullptr);
	kernel.setArg(3, outBuf);

	cl::CommandQueue queue(context, device);
	cl::NDRange global(n_steps);
	cl::NDRange local(workgroupSize);
	queue.enqueueNDRangeKernel(kernel, cl::NullRange, global, local);
	queue.enqueueReadBuffer(outBuf, CL_TRUE, 0, sizeof(int) * n_workgroups, outVals.data());

	std::string errCode = getCLError(err);

	std::cin.get();

}
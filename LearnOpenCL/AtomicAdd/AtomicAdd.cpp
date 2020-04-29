#define CL_USE_DEPRECATED_OPENCL_1_2_APIS

#include "OpenCLHelper.h"
#include <iostream>

int main()
{
    cl::Program program; // Only works with GPU
    cl::Context context;
    std::vector<cl::Device> devices;
    cl::Device device;

    createProgramForAll("AtomicAdd.cl", program, context, devices, device, 2);

    auto deviceName = device.getInfo<CL_DEVICE_NAME>();

    std::vector<float> vec(1024);
    //std::fill(vec.begin(), vec.end(), 1);

    auto err = 0;

    cl::Buffer buf(context, CL_MEM_READ_WRITE | CL_MEM_COPY_HOST_PTR, sizeof(int) * vec.size(), vec.data(), &err);

    cl::Kernel kernel(program, "AtomicAdd");
    err = kernel.setArg(0, buf);

    cl::CommandQueue queue(context, device);
    err = queue.enqueueFillBuffer(buf, 1.2f, 0, sizeof(int) * vec.size());
    err = queue.enqueueNDRangeKernel(kernel, cl::NullRange, cl::NDRange(vec.size()));
    err = queue.enqueueReadBuffer(buf, CL_TRUE, 0, sizeof(int) * vec.size(), vec.data());

    cl::finish();

    std::cin.get();
}
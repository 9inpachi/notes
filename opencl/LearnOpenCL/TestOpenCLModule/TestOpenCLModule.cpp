#include <OpenCLModule.h>
#include <iostream>

int main()
{
	//Creating OpenCL progran
	OpenCLModule::OpenCLProgram oclProgram("kernel.cl", 1);

	std::vector<int> a(1024);
	std::vector<int> b(1024);
	std::vector<int> c(1024);

	for (int i = 0; i < 1024; i++) {
		a[i] = 1;
		b[i] = 1;
		c[i] = 1;
	}

	std::vector<std::vector<int>> valueVec = { a, b, c };


	//TEST PART
	cl_int err = CL_SUCCESS;

	int size = 10;
	int* aptr = (int*)malloc(size * sizeof(int));
	int* bptr = (int*)malloc(size * sizeof(int));
	int* cptr = (int*)malloc(size * sizeof(int));

	for (int i = 0; i < size; i++) {
		aptr[i] = 0;
		bptr[i] = 1;
		cptr[i] = 1;
	}

	cl::Buffer aBuf(oclProgram.context, CL_MEM_READ_WRITE | CL_MEM_USE_HOST_PTR, size * sizeof(aptr), aptr);
	cl::Buffer bBuf(oclProgram.context, CL_MEM_READ_WRITE | CL_MEM_USE_HOST_PTR, size * sizeof(bptr), bptr);
	cl::Buffer cBuf(oclProgram.context, CL_MEM_READ_WRITE | CL_MEM_USE_HOST_PTR, size * sizeof(cptr), cptr);

	cl::Kernel kernel(oclProgram.program, "add");
	kernel.setArg(0, aBuf);
	kernel.setArg(1, bBuf);
	kernel.setArg(2, cBuf);

	cl::CommandQueue queue(oclProgram.context, oclProgram.device);
	queue.enqueueNDRangeKernel(kernel, cl::NullRange, cl::NDRange(size));

	queue.enqueueReadBuffer(aBuf, CL_TRUE, 0, size * sizeof(int), aptr);

	for (int i = 0; i < size; i++) {
		std::cout << aptr[i] << std::endl;
	}

	//TEST PART


	/*oclProgram.runKernel("add", valueVec);
	oclProgram.runKernel("add", valueVec);
	oclProgram.runKernel("add", valueVec);
	std::vector<int> out = valueVec[0];*/

	std::cout << "DOMO";
    std::cout << "Hello World!\n";
}
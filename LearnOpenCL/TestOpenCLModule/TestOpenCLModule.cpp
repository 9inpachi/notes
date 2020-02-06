#define CL_USE_DEPRECATED_OPENCL_1_2_APIS

#include <OpenCLModule.h>
#include <iostream>

int main()
{
	//Creating OpenCL progran
	const std::string kernelFile = "kernel.cl";
	OpenCLModule::OpenCLProgram oclProgram(kernelFile, 1);

	std::vector<int> a(1024);
	std::vector<int> b(1024);
	std::vector<int> c(1024);

	for (int i = 0; i < 1024; i++) {
		a[i] = 0;
		b[i] = 1;
		c[i] = 1;
	}

	std::vector<std::vector<int>> valueVec = { a, b, c };

	oclProgram.runKernel<std::vector<int>>("kernel.cl", valueVec);

    std::cout << "Hello World!\n";
}
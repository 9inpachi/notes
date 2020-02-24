#define CL_USE_DEPRECATED_OPENCL_1_2_APIS
#include<CL/cl.hpp>
#include<fstream>

namespace OpenCLModule {
	class OpenCLProgram {
	private:
		void createProgram(const std::string& filename, cl::Program& program, cl::Context& context, std::vector<cl::Device>& devices, cl::Device& device, const int deviceIndex);

	public:
		cl::Program program;
		cl::Context context;
		cl::Device device;
		int deviceIndex;
		std::vector<cl::Device> allDevices;

		OpenCLProgram();
		OpenCLProgram(const std::string& kernelFile, const int deviceIndex);

		void runKernel(const char* kernelName, std::vector<std::vector<int>>& valueVec);

	};
}
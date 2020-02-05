#define CL_USE_DEPRECATED_OPENCL_1_2_APIS

#include<CL/cl.hpp>
#include<fstream>

namespace OpenCLModule {
	class OpenCLProgram {
	public:
		cl::Program program;
		cl::Context context;
		cl::Device device;
		cl_uint deviceIndex;
		std::vector<cl::Device> allDevices;

		OpenCLProgram(const std::string& kernelFile, const cl_uint deviceIndex);

	private:
		void createProgram(const std::string& filename, cl::Program& program, cl::Context& context, std::vector<cl::Device>& devices, cl::Device& device, const int deviceIndex);

	};
}
#include<CL/cl.hpp>
#include<fstream>

namespace OpenCLFramework {
	class OpenCLProgram{
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
#include <CL/cl.hpp>

cl::Program createProgram(const std::string& filename, const int deviceIndex);
void createProgramForAll(const std::string& filename, cl::Program& program, cl::Context& context, std::vector<cl::Device>& devices, cl::Device& device, const int deviceIndex);
std::string getCLError(cl_int errorCode);
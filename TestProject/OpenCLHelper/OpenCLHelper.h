#include <CL/cl.hpp>

cl::Program createProgram(const std::string& filename);
cl::Device getDevice(int deviceIndex);
std::string getCLError(cl_int errorCode);
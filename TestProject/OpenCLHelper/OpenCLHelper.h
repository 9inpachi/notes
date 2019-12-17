#include <CL/cl.hpp>

cl::Program createProgram(const std::string& filename, const int deviceIndex);
std::string getCLError(cl_int errorCode);
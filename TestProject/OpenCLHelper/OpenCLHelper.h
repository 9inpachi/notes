#include <CL/cl.hpp>

cl::Program createProgram(const std::string& filename);
std::string getCLError(cl_int errorCode);
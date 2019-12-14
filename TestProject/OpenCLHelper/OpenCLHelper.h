#include <CL/cl.hpp>

cl::Program createProgram(const std::string& filename);
std::vector<cl::Device> getAllDevices(std::vector<cl::Device>& devices);
std::string getCLError(cl_int errorCode);
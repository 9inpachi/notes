#include "matmul.hpp"
#include "matrix_lib.hpp"
#include "../Common/util.hpp"
#include "../Common/err_code.h"
#include "../Common/device_picker.hpp"

int main(int argc, char* argv[])
{

	int N;   // A[N][N], B[N][N], C[N][N]
	int size;      // Number of elements in each matrix


	double start_time;      // Starting time
	double run_time;        // Timing data
	util::Timer timer;      // timing

	N = ORDER;

	size = N * N;

	std::vector<float> h_A(size); // Host memory for Matrix A
	std::vector<float> h_B(size); // Host memory for Matrix B
	std::vector<float> h_C(size); // Host memory for Matrix C

	cl::Buffer d_a, d_b, d_c;   // Matrices in device memory

//--------------------------------------------------------------------------------
// Create a context and queue
//--------------------------------------------------------------------------------

	try
	{

		cl_uint deviceIndex = 2;
		parseArguments(argc, argv, &deviceIndex);

		// Get list of devices
		std::vector<cl::Device> devices;
		unsigned numDevices = getDeviceList(devices);

		// Check device index in range
		if (deviceIndex >= numDevices)
		{
			std::cout << "Invalid device index (try '--list')\n";
			return EXIT_FAILURE;
		}

		cl::Device device = devices[deviceIndex];

		std::string name;
		getDeviceName(device, name);
		std::cout << "\nUsing OpenCL device: " << name << "\n";

		std::vector<cl::Device> chosen_device;
		chosen_device.push_back(device);
		cl::Context context(chosen_device);
		cl::CommandQueue queue(context, device);

		//--------------------------------------------------------------------------------
		// Run sequential matmul
		//--------------------------------------------------------------------------------

		initmat(N, h_A, h_B, h_C);

		if (SEQUENTIAL) {
			printf("\n===== Sequential, matrix mult (dot prod), order %d on host CPU ======\n", ORDER);
			for (int i = 0; i < COUNT; i++)
			{
				zero_mat(N, h_C);
				start_time = static_cast<double>(timer.getTimeMilliseconds()) / 1000.0;

				seq_mat_mul_sdot(N, h_A, h_B, h_C);

				run_time = static_cast<double>(timer.getTimeMilliseconds()) / 1000.0 - start_time;
				results(N, h_C, run_time);
			}
		}

		//--------------------------------------------------------------------------------
		// Setup the buffers, initialize matrices, and write them into global memory
		//--------------------------------------------------------------------------------

		//  Reset A, B and C matrices (just to play it safe)
		initmat(N, h_A, h_B, h_C);

		d_a = cl::Buffer(context, h_A.begin(), h_A.end(), true);

		d_b = cl::Buffer(context, h_B.begin(), h_B.end(), true);

		d_c = cl::Buffer(context, CL_MEM_WRITE_ONLY, sizeof(float) * size);

		cl::Program program(context, util::loadProgram("kernels/C_loc_mem.cl"), true);

		cl::Kernel kernel(program, "loc_mmul");

		//cl::make_kernel<int, cl::Buffer, cl::Buffer, cl::Buffer, cl::LocalSpaceArg> loc_mmul(program, "loc_mmul");

		int workgroupSize = kernel.getWorkGroupInfo<CL_KERNEL_WORK_GROUP_SIZE>(device);
		if (workgroupSize % 8 != 0) {
			workgroupSize = 64;
		}
		int n_workgroups = ORDER / workgroupSize;

		printf("\n===== OpenCL, mat mult, C row, priv A, B cols loc, order %d, work groups %d, work group size %d ======\n", N, n_workgroups, workgroupSize);

		for (int i = 0; i < COUNT; i++) {
			zero_mat(N, h_C);
			start_time = static_cast<double>(timer.getTimeMilliseconds()) / 1000.0;
			cl::LocalSpaceArg localmem = cl::Local(sizeof(float) * N); // Size for local memory

			kernel.setArg(0, N);
			kernel.setArg(1, d_a);
			kernel.setArg(2, d_b);
			kernel.setArg(3, d_c);
			kernel.setArg(4, sizeof(float) * N, nullptr);

			cl::CommandQueue queue(context, device);

			cl::NDRange global(N);
			cl::NDRange local(workgroupSize);
			queue.enqueueNDRangeKernel(kernel, cl::NullRange, global, local);
			queue.enqueueReadBuffer(d_c, CL_TRUE, 0, sizeof(float) * h_C.size(), h_C.data());

			queue.finish();

			run_time = static_cast<double>(timer.getTimeMilliseconds()) / 1000.0 - start_time;
			
			cl::copy(queue, d_c, h_C.begin(), h_C.end());

			results(N, h_C, run_time);
		}

		// OLD CODE
		
//--------------------------------------------------------------------------------
// OpenCL matrix multiplication ... C row per work item, A row pivate, B col local
//--------------------------------------------------------------------------------

		//// Create the compute program from the source buffer
		//cl::Program program = cl::Program(context, util::loadProgram("kernels/C_loc_mem.cl"), true);

		//// Create the compute kernel from the program
		//cl::make_kernel<int, cl::Buffer, cl::Buffer, cl::Buffer, cl::LocalSpaceArg> browloc_mmul(program, "loc_mmul");

		//printf("\n===== OpenCL, mat mult, C row, priv A, B cols loc, order %d ======\n", N);

		//// Do the multiplication COUNT times
		//for (int i = 0; i < COUNT; i++)
		//{
		//	zero_mat(N, h_C);

		//	start_time = static_cast<double>(timer.getTimeMilliseconds()) / 1000.0;

		//	cl::NDRange global(N);
		//	cl::NDRange local(ORDER);

		//	cl::LocalSpaceArg localmem = cl::Local(sizeof(float) * N);

		//	browloc_mmul(cl::EnqueueArgs(queue, global, local),
		//		N, d_a, d_b, d_c, localmem);

		//	queue.finish();

		//	run_time = static_cast<double>(timer.getTimeMilliseconds()) / 1000.0 - start_time;

		//	cl::copy(queue, d_c, h_C.begin(), h_C.end());

		//	results(N, h_C, run_time);

		//} // end for 

		// OLD CODE END
	}
	catch (cl::Error err)
	{
		std::cout << "Exception\n";
		std::cerr << "ERROR: "
			<< err.what()
			<< "("
			<< err_code(err.err())
			<< ")"
			<< std::endl;
	}

	return EXIT_SUCCESS;
}
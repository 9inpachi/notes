void atomic_add_f(volatile __local float* source, const float operand) {
    union {
        unsigned int intVal;
        float floatVal;
    } newVal;
    union {
        unsigned int intVal;
        float floatVal;
    } prevVal;
    do {
        prevVal.floatVal = *source;
        newVal.floatVal = prevVal.floatVal + operand;
    } while (atomic_cmpxchg((volatile __local unsigned int*)source, prevVal.intVal, newVal.intVal) != prevVal.intVal);
}

__kernel void AtomicAdd(__global float* data) {
    size_t globalId = get_global_id(0);
    size_t localId = get_local_id(0);
    volatile __local float shLg[32];
    if (localId < 4) {
        shLg[localId] = 1.0f;
    }

    barrier(CLK_LOCAL_MEM_FENCE);

    atomic_add_f(&shLg[0], 2.1f);
    data[globalId] = shLg[0];
}
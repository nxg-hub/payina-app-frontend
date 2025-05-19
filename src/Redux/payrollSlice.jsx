import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async action to fetch employees & payroll, then merge them
export const fetchPayrollData = createAsyncThunk(
  'payroll/fetchPayrollData',
  async (customerId, { rejectWithValue }) => {
    try {
      const employeesEndpoint = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_GET_ALL_EMPLOYEE_ENDPOINT}`.replace(
        '{customerId}',
        customerId
      );
      const payrollEndpoint = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_GET_ALL_PAYROLL_ENDPOINT}`.replace(
        '{customerId}',
        customerId
      );

      // Fetch both employees & payroll simultaneously
      const [employeeResponse, payrollResponse] = await Promise.all([
        fetch(employeesEndpoint),
        fetch(payrollEndpoint),
      ]);

      if (!employeeResponse.ok || !payrollResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const [employeeData, payrollData] = await Promise.all([
        employeeResponse.json(),
        payrollResponse.json(),
      ]);

      // Merge employees with their payroll details
      const combinedData = employeeData.map((employee) => {
        const payrollDetails = payrollData.find((payroll) => employee.id === payroll.id);
        return {
          ...employee,
          jobRoleTitle: payrollDetails?.jobRoleTitle || '',
          basicSalary: payrollDetails?.basicSalary || '',
          allowances: payrollDetails?.allowances || [],
          deductions: payrollDetails?.deductions || [],
        };
      });

      return combinedData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const payrollSlice = createSlice({
  name: 'payroll',
  initialState: {
    payrollData: [],
    loading: true,
    error: null,
  },
  reducers: {
    resetPayroll(state) {
      state.payrollData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayrollData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayrollData.fulfilled, (state, action) => {
        state.loading = false;
        state.payrollData = action.payload;
      })
      .addCase(fetchPayrollData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { resetPayroll } = payrollSlice.actions;
export default payrollSlice.reducer;

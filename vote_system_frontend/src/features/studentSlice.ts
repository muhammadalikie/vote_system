import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {EditStudentForm, StudentForm, StudentState} from "../types/student.ts";
import {
  createStudentService,
  deleteStudentService,
  editStudentService,
  getStudentsService
} from "../services/student.ts";

export const getStudents = createAsyncThunk(
  'student/getStudents',
  async (_, thunkAPI) => {
    try {
      return await getStudentsService();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.detail);
    }
  }
);

export const createStudent = createAsyncThunk(
  'student/createStudent',
  async (formData: StudentForm, thunkAPI) => {
    try {
      return await createStudentService(formData);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.detail);
    }
  }
);

export const editStudent = createAsyncThunk(
  'student/editStudent',
  async (formData: EditStudentForm, thunkAPI) => {
    try {
      return await editStudentService(formData);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.detail);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'student/deleteStudent',
  async (studentId: number, thunkAPI) => {
    try {
      await deleteStudentService(studentId);
      return studentId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.detail);
    }
  }
);


const studentSlice = createSlice({
  name: 'student',
  initialState: {
    studentStatus: 'idle',
    students: [],
  } as StudentState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudents.pending, state => {
        state.studentStatus = 'loading';
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        if (action.payload) {
          state.students = action.payload
          state.studentStatus = 'succeeded';
        }
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.studentStatus = 'failed';
        action.payload ? toast.error(action.payload.toString()) : toast.error('عملیات ناموفق بود');
      })
      .addCase(createStudent.pending, state => {
        state.studentStatus = 'loading';
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        if (action.payload) {
          state.students = [...state.students, action.payload];
          toast.success("دانشجو اضافه شد.");
          state.studentStatus = 'succeeded';
        }
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.studentStatus = 'failed';
        action.payload ? toast.error(action.payload.toString()) : toast.error('عملیات ناموفق بود');
      })
      .addCase(editStudent.pending, state => {
        state.studentStatus = 'loading';
      })
      .addCase(editStudent.fulfilled, (state, action) => {
        if (action.payload) {
          state.students = state.students.map((student) => {
            if (student.id === action.payload.id) {
              student = action.payload;
            }
            return student;
          })
          toast.success('دانشجو ویرایش شد.')
          state.studentStatus = 'succeeded';
        }
      })
      .addCase(editStudent.rejected, (state, action) => {
        state.studentStatus = 'failed';
        action.payload ? toast.error(action.payload.toString()) : toast.error('عملیات ناموفق بود');
      })
      .addCase(deleteStudent.pending, state => {
        state.studentStatus = 'loading';
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        if (action.payload) {
          state.students = state.students.filter((student) => student.id !== action.payload)
          toast.success('دانشجو حذف شد.')
          state.studentStatus = 'succeeded';
        }
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.studentStatus = 'failed';
        action.payload ? toast.error(action.payload.toString()) : toast.error('عملیات ناموفق بود');
      })
  }
});

export default studentSlice.reducer;
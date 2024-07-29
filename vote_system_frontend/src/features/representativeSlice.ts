import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {
  EditRepresentativeForm,
  Representative,
  RepresentativeForm,
  RepresentativeState
} from "../types/representative.ts";
import {
  createRepresentativeService, deleteRepresentativeService,
  editRepresentativeService,
  getRepresentativesService
} from "../services/representative.ts";
import {getStudentService} from "../services/student.ts";
import {getVoteCartService} from "../services/vote.ts";
import {Student} from "../types/student.ts";
import {VoteCartType} from "../types/vote.ts";

export const getRepresentatives = createAsyncThunk(
  'representative/getRepresentatives',
  async (_, thunkAPI) => {
    try {
      return await getRepresentativesService();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.detail);
    }
  }
);

export const createRepresentative = createAsyncThunk(
  'representative/createRepresentative',
  async (formData: RepresentativeForm, thunkAPI) => {
    try {
      const student: Student = await getStudentService(formData.student);
      const voteCart: VoteCartType = await getVoteCartService(formData.vote_cart);
      const newRepresentative: Representative = await createRepresentativeService(formData);
      return {...newRepresentative, vote_cart_name: voteCart.name, username: student.username, number_of_votes: 0}
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.detail);
    }
  }
);

export const editRepresentative = createAsyncThunk(
  'representative/editRepresentative',
  async (formData: EditRepresentativeForm, thunkAPI) => {
    try {
      return await editRepresentativeService(formData);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.detail);
    }
  }
);

export const deleteRepresentative = createAsyncThunk(
  'representative/deleteRepresentative',
  async (representativeId: number, thunkAPI) => {
    try {
      await deleteRepresentativeService(representativeId);
      return representativeId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.detail);
    }
  }
);

const representativeSlice = createSlice({
  name: 'representative',
  initialState: {
    representativeStatus: 'idle',
    representatives: [],
  } as RepresentativeState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRepresentatives.pending, state => {
        state.representativeStatus = 'loading';
      })
      .addCase(getRepresentatives.fulfilled, (state, action) => {
        if (action.payload) {
          state.representatives = action.payload;
          state.representativeStatus = 'succeeded';
        }
      })
      .addCase(getRepresentatives.rejected, (state, action) => {
        state.representativeStatus = 'failed';
        action.payload ? toast.error(action.payload.toString()) : toast.error('عملیات ناموفق بود');
      })
      .addCase(createRepresentative.pending, state => {
        state.representativeStatus = 'loading';
      })
      .addCase(createRepresentative.fulfilled, (state, action) => {
        if (action.payload) {
          state.representatives = [...state.representatives, action.payload];
          toast.success("نماینده اضافه شد.");
          state.representativeStatus = 'succeeded';
        }
      })
      .addCase(createRepresentative.rejected, (state, action) => {
        state.representativeStatus = 'failed';
        action.payload ? toast.error(action.payload.toString()) : toast.error('عملیات ناموفق بود');
      })
      .addCase(editRepresentative.pending, state => {
        state.representativeStatus = 'loading';
      })
      .addCase(editRepresentative.fulfilled, (state, action) => {
        if (action.payload) {
          state.representatives = state.representatives.map((representative) => {
            if (representative.id === action.payload.id) {
              representative = action.payload;
            }
            return representative;
          })
          toast.success('نماینده ویرایش شد.')
          state.representativeStatus = 'succeeded';
        }
      })
      .addCase(editRepresentative.rejected, (state, action) => {
        state.representativeStatus = 'failed';
        action.payload ? toast.error(action.payload.toString()) : toast.error('عملیات ناموفق بود');
      })
      .addCase(deleteRepresentative.pending, state => {
        state.representativeStatus = 'loading';
      })
      .addCase(deleteRepresentative.fulfilled, (state, action) => {
        if (action.payload) {
          state.representatives = state.representatives.filter((representative) => representative.id !== action.payload)
          toast.success('نماینده حذف شد.')
          state.representativeStatus = 'succeeded';
        }
      })
      .addCase(deleteRepresentative.rejected, (state, action) => {
        state.representativeStatus = 'failed';
        action.payload ? toast.error(action.payload.toString()) : toast.error('عملیات ناموفق بود');
      })
  }
});

export default representativeSlice.reducer;

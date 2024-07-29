import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {UpdateVoteCartForm, VoteCartForm, VoteCartType, VoteCartVote, VoteState} from "../types/vote.ts";
import {
  deleteVoteCartVoteService,
  getVoteCartService,
  getVoteCartsService,
  getVoteCartVotesService,
  createVoteCartVotesService, createVoteCartService, updateVoteCartService, deleteVoteCartService
} from "../services/vote.ts";
import {toast} from "react-toastify";
import {dateGregorianToJalali} from "../utils.ts";

export const getVoteCarts = createAsyncThunk(
  'vote/getVoteCarts',
  async (_, thunkAPI) => {
    try {
      return await getVoteCartsService();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.detail);
    }
  }
);

export const getVoteCart = createAsyncThunk(
  'vote/getVoteCart',
  async (voteCartId: number, thunkAPI) => {
    try {
      return await getVoteCartService(voteCartId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.detail);
    }
  }
);

export const createVoteCart = createAsyncThunk(
  'vote/createVoteCart',
  async (formData: VoteCartForm, thunkAPI) => {
    try {
      return await createVoteCartService(formData);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.detail);
    }
  }
);

export const updateVoteCart = createAsyncThunk(
  'vote/updateVoteCart',
  async (formData: UpdateVoteCartForm, thunkAPI) => {
    try {
      return await updateVoteCartService(formData);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.detail);
    }
  }
);

export const deleteVoteCart = createAsyncThunk(
  'vote/deleteVoteCart',
  async (voteCartId: number, thunkAPI) => {
    try {
      await deleteVoteCartService(voteCartId);
      return voteCartId
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.detail);
    }
  }
);

export const getVoteCartVotes = createAsyncThunk(
  'vote/getVoteCartVotes',
  async (voteCartId: number, thunkAPI) => {
    try {
      return await getVoteCartVotesService(voteCartId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.detail);
    }
  }
);

export const createVoteCartVotes = createAsyncThunk(
  'vote/createVoteCartVotes',
  async ({voteCartId, representative}: { voteCartId: number, representative: string }, thunkAPI) => {
    try {
      return await createVoteCartVotesService(voteCartId, representative);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.detail);
    }
  }
);

export const deleteVoteCartVote = createAsyncThunk(
  'vote/deleteVoteCartVote',
  async ({voteCartId, voteId}: { voteCartId: number, voteId: number }, thunkAPI) => {
    try {
      return await deleteVoteCartVoteService(voteCartId, voteId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.detail);
    }
  }
);

const voteSlice = createSlice({
  name: 'vote',
  initialState: {
    voteStatus: 'idle',
    voteCarts: [],
    currentVoteCart: {} as VoteCartType,
    currentVoteCartVotes: []
  } as VoteState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVoteCarts.pending, state => {
        state.voteStatus = 'loading';
      })
      .addCase(getVoteCarts.fulfilled, (state, action) => {
        if (action.payload) {
          state.voteCarts = action.payload
          state.voteStatus = 'succeeded';
        }
      })
      .addCase(getVoteCarts.rejected, (state, action) => {
        state.voteStatus = 'failed';
        action.payload ? toast.error(action.payload.toString()) : toast.error('عملیات ناموفق بود');
      })
      .addCase(getVoteCart.pending, state => {
        state.voteStatus = 'loading';
      })
      .addCase(getVoteCart.fulfilled, (state, action) => {
        if (action.payload) {
          state.currentVoteCart = action.payload;
          state.voteStatus = 'succeeded';
        }
      })
      .addCase(getVoteCart.rejected, (state, action) => {
        state.voteStatus = 'failed';
        action.payload ? toast.error(action.payload.toString()) : toast.error('عملیات ناموفق بود');
      })
      .addCase(createVoteCart.pending, state => {
        state.voteStatus = 'loading';
      })
      .addCase(createVoteCart.fulfilled, (state, action) => {
        if (action.payload) {
          state.voteCarts = [...state.voteCarts, action.payload];
          toast.success('نظرسنجی ایجاد شد.')
          state.voteStatus = 'succeeded';
        }
      })
      .addCase(createVoteCart.rejected, (state, action) => {
        state.voteStatus = 'failed';
        action.payload ? toast.error(action.payload.toString()) : toast.error('عملیات ناموفق بود');
      })
      .addCase(updateVoteCart.pending, state => {
        state.voteStatus = 'loading';
      })
      .addCase(updateVoteCart.fulfilled, (state, action) => {
        if (action.payload) {
          state.voteCarts = state.voteCarts.map((voteCart) => {
            if (voteCart.id === action.payload.id) {
              voteCart = action.payload;
            }
            return voteCart;
          })
          toast.success('نظرسنجی ویرایش شد.')
          state.voteStatus = 'succeeded';
        }
      })
      .addCase(updateVoteCart.rejected, (state, action) => {
        state.voteStatus = 'failed';
        action.payload ? toast.error(action.payload.toString()) : toast.error('عملیات ناموفق بود');
      })
      .addCase(deleteVoteCart.pending, state => {
        state.voteStatus = 'loading';
      })
      .addCase(deleteVoteCart.fulfilled, (state, action) => {
        if (action.payload) {
          state.voteCarts = state.voteCarts.filter((voteCart) => voteCart.id !== action.payload)
          toast.success('نظرسنجی حذف شد.')
          state.voteStatus = 'succeeded';
        }
      })
      .addCase(deleteVoteCart.rejected, (state, action) => {
        state.voteStatus = 'failed';
        action.payload ? toast.error(action.payload.toString()) : toast.error('عملیات ناموفق بود');
      })
      .addCase(getVoteCartVotes.pending, state => {
        state.voteStatus = 'loading';
      })
      .addCase(getVoteCartVotes.fulfilled, (state, action) => {
        if (action.payload) {
          state.currentVoteCartVotes = action.payload.map((voteCartVote: VoteCartVote) => {
            voteCartVote.date = dateGregorianToJalali(voteCartVote.date);
            return voteCartVote;
          });
          state.voteStatus = 'succeeded';
        }
      })
      .addCase(getVoteCartVotes.rejected, (state, action) => {
        state.voteStatus = 'failed';
        action.payload ? toast.error(action.payload.toString()) : toast.error('عملیات ناموفق بود');
      })
      .addCase(createVoteCartVotes.pending, state => {
        state.voteStatus = 'loading';
      })
      .addCase(createVoteCartVotes.fulfilled, state => {
        toast.success('رای شما ثبت شد.')
        state.voteStatus = 'succeeded';
      })
      .addCase(createVoteCartVotes.rejected, (state, action) => {
        state.voteStatus = 'failed';
        action.payload ? toast.error(action.payload.toString()) : toast.error('عملیات ناموفق بود');
      })
      .addCase(deleteVoteCartVote.pending, state => {
        state.voteStatus = 'loading';
      })
      .addCase(deleteVoteCartVote.fulfilled, state => {
        state.voteStatus = 'succeeded';
      })
      .addCase(deleteVoteCartVote.rejected, state => {
        state.voteStatus = 'failed';
      })
  }
});

export default voteSlice.reducer;
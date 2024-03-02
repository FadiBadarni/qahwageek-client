import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileState } from './userState';
import {
  getUserProfile,
  updateUserDetails,
  uploadProfilePicture,
} from './userActions';
import { SocialMediaHandle, UserProfileType } from 'models/user';
import { LoadingStatus } from 'store/shared/commonState';
const initialState: ProfileState = {
  data: null,
  status: LoadingStatus.Idle,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.data = null;
      state.status = LoadingStatus.Idle;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.status = LoadingStatus.Loading;
      })
      .addCase(
        getUserProfile.fulfilled,
        (state, action: PayloadAction<UserProfileType>) => {
          state.status = LoadingStatus.Succeeded;
          state.data = action.payload;
          state.error = null;
        }
      )
      .addCase(getUserProfile.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message ?? 'Failed to fetch user profile';
      })
      .addCase(
        uploadProfilePicture.fulfilled,
        (state, action: PayloadAction<string>) => {
          if (state.data) {
            state.data.profilePicture = action.payload;
          }
        }
      )
      .addCase(updateUserDetails.pending, (state) => {
        state.status = LoadingStatus.Loading;
      })
      .addCase(
        updateUserDetails.fulfilled,
        (
          state,
          action: PayloadAction<{
            bio: string;
            socialMediaHandles: SocialMediaHandle[];
          }>
        ) => {
          state.status = LoadingStatus.Succeeded;
          if (state.data) {
            state.data.bio = action.payload.bio;
            state.data.socialMediaHandles = action.payload.socialMediaHandles;
          }
          state.error = null;
        }
      )
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.payload as string;
      });
  },
});

export const { clearProfile } = profileSlice.actions;

export default profileSlice.reducer;

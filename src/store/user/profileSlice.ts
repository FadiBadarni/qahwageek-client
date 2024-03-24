import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileState } from './userState';
import {
  getUserProfile,
  updateUserDetails,
  uploadProfilePicture,
  getUserPosts,
} from './userActions';
import { SocialMediaHandle, UserProfileType } from 'models/user';
import { LoadingStatus } from 'store/shared/commonState';

const initialState: ProfileState = {
  userProfile: {
    data: null,
    status: LoadingStatus.Idle,
    error: null,
  },
  userPosts: {
    data: {
      items: [],
      totalCount: 0,
      currentPage: 0,
      totalPages: 0,
    },
    status: LoadingStatus.Idle,
    error: null,
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.userProfile.status = LoadingStatus.Loading;
      })
      .addCase(
        getUserProfile.fulfilled,
        (state, action: PayloadAction<UserProfileType>) => {
          state.userProfile.status = LoadingStatus.Succeeded;
          state.userProfile.data = action.payload;
          state.userProfile.error = null;
        }
      )
      .addCase(getUserProfile.rejected, (state, action) => {
        state.userProfile.status = LoadingStatus.Failed;
        state.userProfile.error =
          action.error.message ?? 'Failed to fetch user profile';
      })
      .addCase(
        uploadProfilePicture.fulfilled,
        (state, action: PayloadAction<string>) => {
          if (state.userProfile.data) {
            state.userProfile.data.profilePicture = action.payload;
          }
        }
      )
      .addCase(updateUserDetails.pending, (state) => {
        state.userProfile.status = LoadingStatus.Loading;
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
          state.userProfile.status = LoadingStatus.Succeeded;
          if (state.userProfile.data) {
            state.userProfile.data.bio = action.payload.bio;
            state.userProfile.data.socialMediaHandles =
              action.payload.socialMediaHandles;
          }
          state.userProfile.error = null;
        }
      )
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.userProfile.status = LoadingStatus.Failed;
        state.userProfile.error = action.payload as string;
      })

      .addCase(getUserPosts.pending, (state) => {
        state.userPosts.status = LoadingStatus.Loading;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.userPosts.status = LoadingStatus.Succeeded;
        state.userPosts.data = {
          items: action.payload.content,
          totalCount: action.payload.totalElements,
          currentPage: action.payload.pageable.pageNumber,
          totalPages: action.payload.totalPages,
        };
        state.userPosts.error = null;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.userPosts.status = LoadingStatus.Failed;
        state.userPosts.error =
          action.error.message ?? 'Failed to fetch user posts';
      });
  },
});

export default profileSlice.reducer;

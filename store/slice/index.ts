import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getProfile } from "@/services"
import type { RootState } from "@/store"
import { ProfileResponseData } from "@/types"
import { getErrorMessage } from "@/utils"

type AppState = {
    profile: ProfileResponseData | null
    isLoadingProfile: boolean
    profileError: string | null
}

const initialState: AppState = {
    profile: null,
    isLoadingProfile: false,
    profileError: null,
}

export const fetchProfile = createAsyncThunk(
    "app/fetchProfile",
    async (_, { rejectWithValue }) => {
        try {
            return await getProfile()
        } catch (error: unknown) {
            return rejectWithValue(getErrorMessage(error))
        }
    }
)

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        clearProfile: (state) => {
            state.profile = null
            state.profileError = null
            state.isLoadingProfile = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.isLoadingProfile = true
                state.profileError = null
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.isLoadingProfile = false
                state.profile = action.payload
                state.profileError = null
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.isLoadingProfile = false
                state.profileError = action.payload as string
            })
    },
})

export const { clearProfile } = appSlice.actions
export const selectProfile = (state: RootState): ProfileResponseData | null => state.app.profile

export default appSlice.reducer

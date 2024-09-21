import {
    createSlice
} from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: 'job',
    initialState: {
        allJobs: [],
        singleJob: null,
        allAdminJob: [],
        searchJobByText: '',
        allAppliedJobs: [],
        searchJobByQuery: '',
        selectedValueFilter: {}
    },
    reducers: {
        //actions
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAdminJob: (state, action) => {
            state.allAdminJob = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchJobByQuery: (state, action) => {
            state.searchJobByQuery = action.payload;
        },
        setSelectedValueFilter: (state, action) => {
            state.selectedValueFilter = action.payload;
        },
    }
})

export const {
    setAllJobs,
    setSingleJob,
    setSearchJobByText,
    setAllAdminJob,
    setAllAppliedJobs,
    setSearchJobByQuery,
    setSelectedValueFilter
} = jobSlice.actions;
export default jobSlice.reducer;
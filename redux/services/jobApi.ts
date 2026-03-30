import { baseApis } from "../base";

export const jobApi = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        getAllJobs: builder.query({
            query: (params) => ({
                url: "/job/get-all",
                method: "GET",
                params: {
                    searchTerm: params?.searchTerm || '',
                    lat: params?.lat,
                    lng: params?.lng,
                    maxDistance: params?.maxDistance || 10,
                    page: params?.page || 1,
                    limit: params?.limit || 10,
                },
            }),
            transformResponse: (response: any) => response.data,
        }),
        // get single job
        getSingleJob: builder.query({
            query: (jobId) => `/job/get-single/${jobId}`,
            transformResponse: (response: any) => {
                // console.log("Single Job Response:", response);
                return response.data;
            },
        }),
        // Job apply
        applyForJob: builder.mutation({
            query: (jobId) => ({
                url: `/job-application/apply/${jobId}`,
                method: "POST"
            })
        })
    }),
    overrideExisting: true,
});

export const { useGetAllJobsQuery, useGetSingleJobQuery,useApplyForJobMutation } = jobApi;
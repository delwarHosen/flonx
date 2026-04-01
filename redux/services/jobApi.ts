import { baseApis } from "../base";

export const jobApi = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        // job create (customer)
        createJob: builder.mutation({
            query: (jobData) => ({
                url: "/job/create",
                method: "POST",
                body: jobData,
            }),
            transformResponse: (respons: any) => respons.data,
        }),
        // update job
        updateJob: builder.mutation({
            query: ({ jobId, ...jobData }) => {
                console.log("Update URL:", `/job/update/${jobId}`);
                console.log("Body:", jobData);
                return {
                    url: `/job/update/${jobId}`,
                    method: "PATCH",
                    body: jobData,
                };
            },
            transformResponse: (response: any) => response.data,
        }),
        // get my job by (customers)
        getMyJobs: builder.query({
            query: (params) => ({
                url: "/job/my-jobs",
                method: "GET",
                params: {
                    page: params?.page || 1,
                    limit: params?.limit || 10,
                    searchTerm: params?.searchTerm || '',
                    type: params?.type || "open"
                },
            }),
            transformResponse: (respons: any) => respons.data,
        }),
        // get All job
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

        // get job applicants
        getJobApplicants: builder.query({
            query: (jobId) => `/job-application/job/${jobId}`,
            transformResponse: (response: any) => response.data,
        }),

        // get single applicants details
        getSingleApplication: builder.query({
            query: (applicationId) => `/job-application/get-single/${applicationId}`,
            transformResponse: (respons: any) => respons.data,
        }),

        // Accept application — POST → PATCH
        acceptApplication: builder.mutation({
            query: (applicationId) => ({
                url: `/job-application/accept/${applicationId}`,
                method: "PATCH",
            }),
            transformResponse: (respons: any) => respons.data,
        }),

        // Job apply — PATCH → POST
        applyForJob: builder.mutation({
            query: (jobId) => ({
                url: `/job-application/apply/${jobId}`,
                method: "POST",
            })
        }),


    }),
    overrideExisting: true,
});

export const {
    useCreateJobMutation,
    useUpdateJobMutation,
    useGetAllJobsQuery,
    useGetSingleJobQuery,
    useApplyForJobMutation,
    useGetMyJobsQuery,
    useGetJobApplicantsQuery,
    useGetSingleApplicationQuery,
    useAcceptApplicationMutation
} = jobApi;
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
            invalidatesTags: [{ type: 'Jobs', id: 'LIST' }],
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
            providesTags: ['Jobs'],
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
            invalidatesTags: (result, error, { jobId }) => [
                { type: 'Jobs', id: jobId },
                { type: 'Jobs', id: 'LIST' },
            ],
        }),
        // Delete job
        deleteJob: builder.mutation({
            query: (jobId) => ({
                url: `/job/delete/${jobId}`,
                method: "DELETE",
            }),
            transformResponse: (respons: any) => respons.data,
            invalidatesTags: (result, error, jobId) => [
                { type: 'Jobs', id: jobId },
                { type: 'Jobs', id: 'LIST' },
            ],
        }),

        // Mark as comolete job
        markJobAsComplete: builder.mutation({
            query: (jobId) => ({
                url: `/job/mark-as-complete/${jobId}`,
                method: "PATCH",
            }),
            transformResponse: (respons: any) => respons.data,
            invalidatesTags: (result, error, jobId) => [
                { type: 'Jobs', id: jobId },
                { type: 'Jobs', id: 'LIST' },
            ],
        }),

        // add rating
        addRating: builder.mutation({
            query: (ratingData) => ({
                url: '/rating/add-rating',
                method: 'POST',
                body: ratingData,
            }),
            transformResponse: (response: any) => response.data,
            invalidatesTags: (result, error, { job }) => [
                { type: 'Jobs', id: job },  
            ],
        }),

        // cancle job assisment
        cancelJob: builder.mutation({
            query: (jobId) => ({
                url: `/job/cancel/${jobId}`,
                method: "PATCH",
            }),
            transformResponse: (response: any) => response.data,
            invalidatesTags: (result, error, jobId) => [
                { type: 'Jobs', id: jobId },
                { type: 'Jobs', id: 'LIST' },
            ],
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
            providesTags: (result) =>
                result?.result
                    ? [
                        ...result.result.map((job: any) => ({ type: 'Jobs' as const, id: job._id })),
                        { type: 'Jobs', id: 'LIST' },
                    ]
                    : [{ type: 'Jobs', id: 'LIST' }],
        }),



        // get single job
        getSingleJob: builder.query({
            query: (jobId) => `/job/get-single/${jobId}`,
            transformResponse: (response: any) => response.data,
            providesTags: (result, error, jobId) => [{ type: 'Jobs', id: jobId }],
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
            }),
            invalidatesTags: [{ type: 'Jobs', id: 'LIST' }],
        }),

        // get bartender job apply  api
        getMyApplications: builder.query({
            query: () => '/job-application/my',
            transformResponse: (response: any) => response.data,
            providesTags: ['Jobs'],
        }),

    }),
    overrideExisting: true,
});

export const {
    useCreateJobMutation,
    useGetAllJobsQuery,
    useUpdateJobMutation,
    useGetSingleJobQuery,
    useApplyForJobMutation,
    useGetMyJobsQuery,
    useGetJobApplicantsQuery,
    useGetSingleApplicationQuery,
    useAcceptApplicationMutation,
    useDeleteJobMutation,
    useMarkJobAsCompleteMutation,
    useAddRatingMutation,
    useGetMyApplicationsQuery,
    useCancelJobMutation,
} = jobApi;
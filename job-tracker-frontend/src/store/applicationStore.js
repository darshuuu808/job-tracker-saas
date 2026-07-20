import { create } from "zustand";
import { devtools } from "zustand/middleware";

import {
    getApplications,
    createApplication
} from "../services/applicationService";

const useApplicationStore = create(

    devtools(

        (set) => ({

            applications: [],

            loading: false,

            error: null,

            filter: "All",

            page: 1,

            perPage: 10,

            // NEW
            selectedJob: null,

            fetchApplications: async () => {

                set({

                    loading: true,

                    error: null

                });

                try {

                    const response = await getApplications();

                    set({

                        applications:
                            response.applications || [],

                        loading: false

                    });

                }

                catch (error) {

                    set({

                        loading: false,

                        error:
                            error.response?.data?.error ||

                            error.message

                    });

                }

            },

            addApplication: async (

                application

            ) => {

                try {

                    await createApplication(

                        application

                    );

                    const response = await getApplications();

                    set({

                        applications:
                            response.applications || []

                    });

                }

                catch (error) {

                    set({

                        error:
                            error.response?.data?.error ||

                            error.message

                    });

                }

            },

            updateStatus: (

                id,

                status

            ) =>

                set((state) => ({

                    applications:

                        state.applications.map(

                            (app) =>

                                app.id === id

                                    ? {

                                        ...app,

                                        status

                                    }

                                    : app

                        )

                })),

            setFilter: (

                filter

            ) =>

                set({

                    filter,

                    page: 1

                }),

            setPage: (

                page

            ) =>

                set({

                    page

                }),

            // NEW
            setSelectedJob: (

                job

            ) =>

                set({

                    selectedJob: job

                }),

            // NEW
            clearSelectedJob: () =>

                set({

                    selectedJob: null

                })

        }),

        {

            name:

                "Application Store"

        }

    )

);

export default useApplicationStore;
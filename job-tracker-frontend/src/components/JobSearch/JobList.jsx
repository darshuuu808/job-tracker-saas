import JobCard from "./JobCard";

export default function JobList({

    jobs

}) {

    if (!jobs.length)

        return null;

    return (

        <div className="space-y-4">

            {

                jobs.map(

                    (job, index) => (

                        <JobCard

                            key={index}

                            job={job}

                        />

                    )

                )

            }

        </div>

    );

}
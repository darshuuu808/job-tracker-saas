import useApplicationStore from "../../store/applicationStore";

export default function JobCard({ job }) {

    const setSelectedJob = useApplicationStore(
        (state) => state.setSelectedJob
    );

    const handleTrack = () => {

        console.log("✅ Track button clicked");
        console.log("Selected Job:", job);

        setSelectedJob(job);

        console.log("✅ Job sent to Zustand store");

    };

    return (

        <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">

            <h2 className="text-lg font-bold">
                {job.title}
            </h2>

            <p className="text-gray-700">
                {job.company}
            </p>

            <p className="text-gray-500">
                {job.location}
            </p>

            <p className="mt-2">
                <strong>Salary:</strong>{" "}
                {job.salary_min ?? "-"}
                {" - "}
                {job.salary_max ?? "-"}
            </p>

            <button
                type="button"
                onClick={handleTrack}
                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
            >
                Track
            </button>

        </div>

    );
}
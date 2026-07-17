import {

    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer

} from "recharts";

export default function ApplicationsBarChart({ data }) {

    return (

        <div className="card shadow-sm p-3">

            <h5>Applications Per Week</h5>

            <ResponsiveContainer width="100%" height={300}>

                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="week" />

                    <YAxis />

                    <Tooltip />

                    <Bar

                        dataKey="count"

                        fill="#0d6efd"

                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}
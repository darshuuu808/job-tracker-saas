import {

    PieChart,
    Pie,
    Tooltip,
    Legend,
    Cell,
    ResponsiveContainer

} from "recharts";

const COLORS = [

    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF"

];

export default function StatusPieChart({ data }) {

    return (

        <div className="card shadow-sm p-3">

            <h5>Status Distribution</h5>

            <ResponsiveContainer width="100%" height={300}>

                <PieChart>

                    <Pie

                        data={data}

                        dataKey="count"

                        nameKey="status"

                        outerRadius={100}

                        label

                    >

                        {

                            data.map((entry, index) => (

                                <Cell

                                    key={index}

                                    fill={COLORS[index % COLORS.length]}

                                />

                            ))

                        }

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}
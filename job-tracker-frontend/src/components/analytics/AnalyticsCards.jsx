export default function AnalyticsCards({ data }) {

    return (

        <div className="row g-3">

            <div className="col-md-3">

                <div className="card shadow-sm">

                    <div className="card-body">

                        <h6>Total Applications</h6>

                        <h2>{data.total_applications}</h2>

                    </div>

                </div>

            </div>

            <div className="col-md-3">

                <div className="card shadow-sm">

                    <div className="card-body">

                        <h6>Response Rate</h6>

                        <h2>{data.response_rate}%</h2>

                    </div>

                </div>

            </div>

            <div className="col-md-3">

                <div className="card shadow-sm">

                    <div className="card-body">

                        <h6>Best Day</h6>

                        <h2>{data.best_day_to_apply}</h2>

                    </div>

                </div>

            </div>

            <div className="col-md-3">

                <div className="card shadow-sm">

                    <div className="card-body">

                        <h6>Average Days</h6>

                        <h2>

                            {
                                Object.values(
                                    data.average_days_per_status
                                )[0] || 0
                            }

                        </h2>

                    </div>

                </div>

            </div>

        </div>

    );

}
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="border-t py-10 bg-background">

            <div className="max-w-7xl mx-auto px-6 flex flex-col gap-6 md:flex-row md:justify-between">

                <div>
                    <h3 className="text-xl font-bold">
                        Job Tracker
                    </h3>

                    <p className="text-muted-foreground mt-2">
                        AI-powered job application management.
                    </p>
                </div>

                <div className="flex gap-6">

                    <Link to="/">Home</Link>

                    <Link to="/login">Login</Link>

                    <a href="#">Privacy</a>

                    <a href="#">GitHub</a>

                </div>

            </div>

        </footer>
    );
}

export default Footer;
import { Helmet } from "react-helmet-async";

import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import Pricing from "../components/landing/Pricing";
import FAQ from "../components/landing/FAQ";
import Footer from "../components/landing/Footer";

function LandingPage() {
    return (
        <>
            <Helmet>
                <title>
                    Job Tracker | AI-Powered Job Application Tracker
                </title>

                <meta
                    name="description"
                    content="Track job applications, manage resumes, analyze interview progress, receive reminders, and save LinkedIn jobs instantly with our AI-powered Job Tracker."
                />

                <meta
                    name="keywords"
                    content="job tracker, job application tracker, AI job tracker, LinkedIn extension, resume tracker, interview tracker"
                />

                <meta
                    name="author"
                    content="Job Tracker"
                />

                <meta
                    property="og:title"
                    content="Job Tracker | AI-Powered Job Application Tracker"
                />

                <meta
                    property="og:description"
                    content="Track applications, upload resumes, analyze interviews, and save LinkedIn jobs with one click."
                />

                <meta
                    property="og:type"
                    content="website"
                />

                <meta
                    property="og:url"
                    content="http://localhost:5173/"
                />

                <meta
                    property="og:image"
                    content="/og-image.png"
                />

                <meta
                    name="twitter:card"
                    content="summary_large_image"
                />

                <meta
                    name="twitter:title"
                    content="Job Tracker"
                />

                <meta
                    name="twitter:description"
                    content="AI-powered Job Application Tracker."
                />

                <link
                    rel="canonical"
                    href="http://localhost:5173/"
                />
            </Helmet>

            <main>

                <Hero />

                <Features />

                <HowItWorks />

                <Pricing />

                <FAQ />

                <Footer />

            </main>
        </>
    );
}

export default LandingPage;
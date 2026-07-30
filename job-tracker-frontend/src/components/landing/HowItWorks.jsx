import {
    Search,
    Briefcase,
    Trophy,
    ArrowRight
} from "lucide-react";

const steps = [
    {
        icon: Search,
        title: "Discover Jobs",
        description:
            "Search for opportunities using AI recommendations or browse LinkedIn and save jobs instantly with the Chrome Extension."
    },
    {
        icon: Briefcase,
        title: "Track Applications",
        description:
            "Manage every application, update interview stages, upload resumes, and receive reminders in one dashboard."
    },
    {
        icon: Trophy,
        title: "Land Your Offer",
        description:
            "Monitor your progress with analytics, stay organized, and maximize your chances of securing your dream job."
    }
];

function HowItWorks() {
    return (
        <section className="bg-slate-50 py-24 dark:bg-slate-950">

            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                <div className="mx-auto max-w-3xl text-center">

                    <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                        How It Works
                    </span>

                    <h2 className="mt-6 text-4xl font-bold">
                        Three Simple Steps
                    </h2>

                    <p className="mt-6 text-lg text-muted-foreground">
                        Your entire job search workflow in one streamlined platform.
                    </p>

                </div>

                <div className="mt-20 grid gap-8 lg:grid-cols-3">

                    {steps.map((step, index) => {

                        const Icon = step.icon;

                        return (

                            <div
                                key={step.title}
                                className="relative rounded-2xl border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >

                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">

                                    <Icon className="h-8 w-8" />

                                </div>

                                <div className="mb-4 flex items-center gap-2">

                                    <span className="text-sm font-semibold text-blue-600">
                                        Step {index + 1}
                                    </span>

                                </div>

                                <h3 className="mb-4 text-2xl font-bold">
                                    {step.title}
                                </h3>

                                <p className="text-muted-foreground">
                                    {step.description}
                                </p>

                                {index !== steps.length - 1 && (

                                    <ArrowRight
                                        className="absolute -right-5 top-1/2 hidden h-8 w-8 -translate-y-1/2 text-blue-500 lg:block"
                                    />

                                )}

                            </div>

                        );

                    })}

                </div>

            </div>

        </section>
    );
}

export default HowItWorks;
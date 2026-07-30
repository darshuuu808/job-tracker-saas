import {
    Briefcase,
    Globe,
    BrainCircuit,
    BarChart3,
    Bell,
    FileText
} from "lucide-react";

const features = [
    {
        icon: Briefcase,
        title: "Application Tracker",
        description:
            "Organize every job application with statuses, interview stages, notes, and deadlines."
    },
    {
        icon: Globe,
        title: "Browser Extension",
        description:
            "Save LinkedIn jobs instantly with one click and automatically pre-fill your application form."
    },
    {
        icon: BrainCircuit,
        title: "AI Job Search",
        description:
            "Discover relevant jobs faster using AI-powered search and recommendations."
    },
    {
        icon: BarChart3,
        title: "Analytics Dashboard",
        description:
            "Visualize applications, interviews, offers, and rejection trends."
    },
    {
        icon: Bell,
        title: "Smart Reminders",
        description:
            "Receive reminders for interviews, follow-ups, and important deadlines."
    },
    {
        icon: FileText,
        title: "Resume Management",
        description:
            "Upload and organize multiple resumes tailored for different roles."
    }
];

function Features() {
    return (
        <section className="bg-background py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                <div className="mx-auto max-w-3xl text-center">

                    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                        Features
                    </span>

                    <h2 className="mt-6 text-4xl font-bold">
                        Everything You Need to Manage Your Job Search
                    </h2>

                    <p className="mt-6 text-lg text-muted-foreground">
                        From finding opportunities to tracking interviews,
                        Job Tracker keeps everything organized in one place.
                    </p>

                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                    {features.map((feature) => {

                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className="rounded-2xl border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >

                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600">

                                    <Icon className="h-7 w-7" />

                                </div>

                                <h3 className="mb-3 text-xl font-semibold">
                                    {feature.title}
                                </h3>

                                <p className="text-muted-foreground">
                                    {feature.description}
                                </p>

                            </div>
                        );

                    })}

                </div>

            </div>
        </section>
    );
}

export default Features;
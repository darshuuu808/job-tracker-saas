import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
    {
        name: "Free",
        price: "$0",
        description: "Perfect for students and job seekers.",
        features: [
            "Unlimited Applications",
            "Resume Upload",
            "Analytics Dashboard",
            "Chrome Extension"
        ],
        highlighted: false
    },
    {
        name: "Pro",
        price: "$9/mo",
        description: "Everything in Free plus future premium features.",
        features: [
            "AI Resume Suggestions",
            "AI Cover Letters",
            "Advanced Analytics",
            "Priority Support",
            "Unlimited AI Usage"
        ],
        highlighted: true
    }
];

function Pricing() {
    return (
        <section className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold">Simple Pricing</h2>
                    <p className="mt-4 text-muted-foreground">
                        Start free. Upgrade when you need more.
                    </p>
                </div>

                <div className="mt-16 grid gap-8 lg:grid-cols-2">

                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`rounded-2xl border p-8 ${
                                plan.highlighted
                                    ? "border-blue-600 shadow-xl"
                                    : ""
                            }`}
                        >
                            <h3 className="text-2xl font-bold">{plan.name}</h3>
                            <p className="mt-2 text-5xl font-bold">{plan.price}</p>
                            <p className="mt-4 text-muted-foreground">
                                {plan.description}
                            </p>

                            <ul className="mt-8 space-y-4">
                                {plan.features.map((item) => (
                                    <li key={item} className="flex gap-3">
                                        <Check className="text-green-600" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <Button className="mt-8 w-full">
                                Get Started
                            </Button>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}

export default Pricing;
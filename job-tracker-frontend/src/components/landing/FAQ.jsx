const faqs = [
    {
        q: "Is Job Tracker free?",
        a: "Yes. You can use the core features completely free."
    },
    {
        q: "Does it support LinkedIn?",
        a: "Yes. Our Chrome Extension lets you save LinkedIn jobs instantly."
    },
    {
        q: "Can I upload multiple resumes?",
        a: "Absolutely. Organize different resumes for different roles."
    },
    {
        q: "Is my data secure?",
        a: "Yes. Authentication and secure APIs protect your information."
    }
];

function FAQ() {
    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-950">

            <div className="max-w-5xl mx-auto px-6">

                <h2 className="text-4xl font-bold text-center">
                    Frequently Asked Questions
                </h2>

                <div className="mt-16 space-y-6">

                    {faqs.map((faq) => (
                        <div
                            key={faq.q}
                            className="rounded-xl border bg-card p-6"
                        >
                            <h3 className="font-semibold text-xl">
                                {faq.q}
                            </h3>

                            <p className="mt-3 text-muted-foreground">
                                {faq.a}
                            </p>
                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
}

export default FAQ;
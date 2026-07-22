import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import ApplicationTable from "../components/ApplicationTable/ApplicationTable";

describe("ApplicationTable", () => {

    const mockData = [

        {

            company: "Google",

            role: "Software Engineer",

            status: "Applied",

            notes: "Referral"

        },

        {

            company: "Microsoft",

            role: "Backend Engineer",

            status: "Interview",

            notes: ""

        }

    ];

    it("renders table headers", () => {

        render(

            <ApplicationTable

                data={mockData}

            />

        );

        expect(

            screen.getByText("Company")

        ).toBeInTheDocument();

        expect(

            screen.getByText("Role")

        ).toBeInTheDocument();

        expect(

            screen.getByText("Status")

        ).toBeInTheDocument();

    });

    it("renders application data", () => {

        render(

            <ApplicationTable

                data={mockData}

            />

        );

        expect(

            screen.getByText("Google")

        ).toBeInTheDocument();

        expect(

            screen.getByText("Microsoft")

        ).toBeInTheDocument();

        expect(

            screen.getByText("Software Engineer")

        ).toBeInTheDocument();

        expect(

            screen.getByText("Backend Engineer")

        ).toBeInTheDocument();

    });

    it("shows empty state", () => {

        render(

            <ApplicationTable

                data={[]}

            />

        );

        expect(

            screen.getByText("No applications found")

        ).toBeInTheDocument();

    });

});
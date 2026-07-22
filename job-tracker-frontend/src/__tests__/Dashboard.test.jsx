import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Dashboard from "../pages/Dashboard";

const fetchApplications = vi.fn();
const setFilter = vi.fn();

vi.mock("../store/applicationStore", () => ({

    default: (selector) =>

        selector({

            applications: [

                {

                    id: 1,

                    company: "Google",

                    role: "SDE",

                    status: "Applied",

                    notes: ""

                },

                {

                    id: 2,

                    company: "Microsoft",

                    role: "Backend",

                    status: "Interview",

                    notes: ""

                }

            ],

            loading: false,

            error: null,

            filter: "All",

            fetchApplications,

            setFilter

        })

}));

vi.mock("../forms/AddApplicationForm", () => ({

    default: () => <div>AddApplicationForm</div>

}));

vi.mock("../components/ApplicationTable/ApplicationTable", () => ({

    default: () => <div>ApplicationTable</div>

}));

vi.mock("../components/EmptyState", () => ({

    default: () => <div>EmptyState</div>

}));

vi.mock("../components/ThemeToggle", () => ({

    default: () => <div>ThemeToggle</div>

}));

vi.mock("../components/NotificationBell", () => ({

    default: () => <div>NotificationBell</div>

}));

vi.mock("../components/FileUpload/ResumeUpload", () => ({

    default: () => <div>ResumeUpload</div>

}));

vi.mock("../components/JobSearch/JobSearchBar", () => ({

    default: () => <div>JobSearchBar</div>

}));

describe("Dashboard", () => {

    beforeEach(() => {

        fetchApplications.mockClear();

    });

    it("renders dashboard", () => {

        render(

            <MemoryRouter>

                <Dashboard />

            </MemoryRouter>

        );

        expect(

            screen.getByText(

                "Job Tracker Dashboard"

            )

        ).toBeInTheDocument();

        expect(

            screen.getByText(

                "Applications"

            )

        ).toBeInTheDocument();

    });

    it("loads applications on mount", () => {

        render(

            <MemoryRouter>

                <Dashboard />

            </MemoryRouter>

        );

        expect(fetchApplications)

            .toHaveBeenCalled();

    });

    it("shows statistics", () => {

        render(

            <MemoryRouter>

                <Dashboard />

            </MemoryRouter>

        );

        expect(

            screen.getByText("Total")

        ).toBeInTheDocument();

        expect(

            screen.getByText("Applied")

        ).toBeInTheDocument();

        expect(

            screen.getByText("Interview")

        ).toBeInTheDocument();

    });

});
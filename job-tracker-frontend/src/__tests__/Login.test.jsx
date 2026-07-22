import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Login from "../pages/Login";

const loginMock = vi.fn();

vi.mock("../context/AuthContext", () => ({
    useAuth: () => ({
        login: loginMock
    })
}));

describe("Login Page", () => {

    beforeEach(() => {

        loginMock.mockReset();

    });

    it("renders login form", () => {

        render(<Login />);

        expect(
            screen.getByText("Job Tracker")
        ).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText("you@example.com")
        ).toBeInTheDocument();

        expect(
            screen.getByPlaceholderText("Enter your password")
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: /login/i })
        ).toBeInTheDocument();

    });

    it("calls login on submit", async () => {

        loginMock.mockResolvedValue();

        const user = userEvent.setup();

        render(<Login />);

        await user.type(
            screen.getByPlaceholderText("you@example.com"),
            "darshan@test.com"
        );

        await user.type(
            screen.getByPlaceholderText("Enter your password"),
            "password123"
        );

        await user.click(
            screen.getByRole("button", { name: /login/i })
        );

        expect(loginMock).toHaveBeenCalledWith(
            "darshan@test.com",
            "password123"
        );

    });

    it("shows login error", async () => {

        loginMock.mockRejectedValue({

            response: {

                data: {

                    error: "Invalid credentials"

                }

            }

        });

        const user = userEvent.setup();

        render(<Login />);

        await user.type(
            screen.getByPlaceholderText("you@example.com"),
            "abc@test.com"
        );

        await user.type(
            screen.getByPlaceholderText("Enter your password"),
            "wrongpassword"
        );

        await user.click(
            screen.getByRole("button", { name: /login/i })
        );

        expect(
            await screen.findByText("Invalid credentials")
        ).toBeInTheDocument();

    });

});
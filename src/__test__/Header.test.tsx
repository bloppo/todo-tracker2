/* eslint-disable */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Header from "../Header";

describe("Header Component", () => {

test("renders header with title, GitHub link, and today's date", () => {
    render(<Header />);
    expect(screen.getByText(/To Do Tracker/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /GitHub/i })).toHaveAttribute("href", expect.stringContaining("github.com"));

    // Check today's date in MM/dd/yy format
    const today = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    const expectedDate = `${pad(today.getMonth() + 1)}/${pad(today.getDate())}/${today.getFullYear().toString().slice(-2)}`;
    expect(screen.getByText(expectedDate)).toBeInTheDocument();
})});
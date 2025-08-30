/* eslint-disable */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import About from "../src/About";

describe("About Component", () => {
    test("renders About page content", () => {
        render(<MemoryRouter>
                    <About />
                </MemoryRouter>);
        expect(screen.getByText(/about/i)).toBeInTheDocument();
        // Add more assertions for specific text or links in your About component
    });
});

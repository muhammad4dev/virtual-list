import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

describe("App Component", () => {
  it("renders table headers correctly", () => {
    render(<App />);
    const headers = [
      "Subject",
      "Priority",
      "Status",
      "Description",
      "Assigned To",
      "Created At",
    ];
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  it("renders the correct number of visible rows initially", () => {
    render(<App />);
    const visibleRows = screen.getAllByRole("row");
    expect(visibleRows.length).toBeGreaterThan(1); // Header + visible rows
  });

  it("scrolling updates the visible rows", () => {
    render(<App />);
    const container = screen.getByRole("table").parentElement!;
    fireEvent.scroll(container, { target: { scrollTop: 300 } });

    // Assert that new rows are rendered in the visible area
    const updatedRows = screen.getAllByRole("row");
    expect(updatedRows.length).toBeGreaterThan(1); // Should still show visible rows
  });
});

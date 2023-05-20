import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Home from "@/app/page";

describe("Home page", () => {
  test("displays no items in menu initially", async () => {
    render(<Home />);

    expect(screen.queryAllByTestId("menu-item")).toHaveLength(0);
    expect(screen.getByText("No records to display")).toBeVisible();
  });

  // TODO: test double clicking without initial click does nothing
  test("double clicking on the map adds menu item", async () => {
    render(<Home />);

    const map = screen.getByRole("map");
    await userEvent.click(map);
    await userEvent.click(map);
    await userEvent.dblClick(map);

    expect(screen.queryAllByTestId("menu-item")).toHaveLength(1);
    expect(screen.getByTestId("menu-item")).toHaveTextContent("Route 1");
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Home from "@/app/page";
import { LeafletMapMock } from "@/app/map/LeafletMap.mock";
import { Provider } from "react-redux";
import { getStore } from "@/app/redux/store";

jest.mock("./map/LeafletMap", () => ({
  __esModule: true,
  LeafletMap: (props: any) => <LeafletMapMock {...props} />,
}));

describe("Home page", () => {
  test("displays no items in menu initially", async () => {
    render(
      <Provider store={getStore()}>
        <Home />
      </Provider>
    );

    expect(screen.queryAllByTestId("menu-item")).toHaveLength(0);
    expect(screen.getByText("No records to display")).toBeVisible();
  });

  test("double clicking on the map adds menu item", async () => {
    render(
      <Provider store={getStore()}>
        <Home />
      </Provider>
    );

    const map = await screen.findByTestId("map");
    await userEvent.click(map);
    await userEvent.click(map);
    await userEvent.dblClick(map);

    expect(screen.queryAllByTestId("menu-item")).toHaveLength(1);
    expect(screen.getByTestId("menu-item")).toHaveTextContent("Route 1");
  });

  test("clicking on remove button removes item", async () => {
    render(
      <Provider store={getStore()}>
        <Home />
      </Provider>
    );
    const map = await screen.findByTestId("map");
    await userEvent.click(map);
    await userEvent.click(map);
    await userEvent.dblClick(map);

    await userEvent.click(screen.getByTestId("remove-item-button"));

    expect(screen.queryAllByTestId("menu-item")).toHaveLength(0);
    expect(screen.getByText("No records to display")).toBeVisible();
  });
});

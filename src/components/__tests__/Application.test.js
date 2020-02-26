import React from "react";
import axios from "axios";

import {
  reducer,
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  SET_SPOTS
} from "reducers/application.js";

import {
  render,
  cleanup,
  waitForElement,
  getByText,
  fireEvent,
  toBeInTheDocument,
  container,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  debug,
  queryByText,
  queryByAltText
} from "@testing-library/react";

import Application from "components/Application";
afterEach(cleanup);

describe("Application", () => {
  it.only("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find(appointment => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Delete"));

    expect(
      getByText(appointment, "Are you sure you want to cancel?")
    ).toBeInTheDocument();

    fireEvent.click(queryByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, "Add"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    fireEvent.click(queryByAltText(container, "Edit"));

    fireEvent.change(getByPlaceholderText(container, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(container, "Sylvia Palmer"));

    fireEvent.click(getByText(container, "Save"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });
  it("shows the save error when failing to save an appointment", () => {
    axios.put.mockRejectedValueOnce();
  });
  it("shows the delete error when failing to delete an appointment", () => {
    axios.put.mockRejectedValueOnce();
  });
});

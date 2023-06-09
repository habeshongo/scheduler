import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByAltText, getByPlaceholderText, queryByText, queryByAltText, getByDisplayValue, getByText, getAllByTestId, prettyDOM } from "@testing-library/react";

import Application from "components/Application";
import axios from "axios";
import Form from "components/Appointment/Form";
import { act } from 'react-dom/test-utils';




afterEach(cleanup);

describe("Application", () => {

  /*Passing*/
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);


    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();

  });


  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    //console.log(prettyDOM(container));
    const appointments = getAllByTestId(container, "appointment");
    //console.log(prettyDOM(appointments))
    const appointment = appointments[0];


    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });



  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));



    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

  });



  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. Check that the "edit" component is shown with student name and interviewer selected.

    expect(getByDisplayValue(appointment, "Archie Cohen")).toBeInTheDocument();

    //5. Change the student name
    fireEvent.change(getByDisplayValue(appointment, "Archie Cohen"), {
      target: { value: "Lydia Miller-Jones" }
    });

    // 6. Click the "Save" button.
    fireEvent.click(getByText(appointment, "Save"));

    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    // 8. Wait until the element with the "Lydia Miller-Jones"  is displayed.

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // 9. Check that the DayListItem with the text "Monday" also has the text "1 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

    // debug();

  });

  /*Passing*/
  it("shows the save error when failing to save an appointment", async () => {

    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    axios.put.mockRejectedValueOnce();
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "SAVING")).toBeInTheDocument();


    await waitForElement(() => getByText(appointment, "Could not perform function"));


  });


  it("shows the delete error when failing to delete an existing appointment", async () => {

    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

    axios.delete.mockRejectedValueOnce();

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();


    await waitForElement(() => getByText(appointment, "Could not perform function"));
    debug();

  });



  // it("calls onCancel and resets the input field", () => {
  //   const onCancel = jest.fn();
  //   const { getByText, getByPlaceholderText, queryByText } = render(
  //     <Form
  //       interviewers={interviewers}
  //       name="Lydia Mill-Jones"
  //       onSave={jest.fn()}
  //       onCancel={onCancel}
  //     />
  //   );

  //   fireEvent.click(getByText("Save"));

  //   fireEvent.change(getByPlaceholderText("Enter Student Name"), {
  //     target: { value: "Lydia Miller-Jones" }
  //   });

  //   fireEvent.click(getByText("Cancel"));

  //   expect(queryByText(/student name cannot be blank/i)).toBeNull();

  //   expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");

  //   expect(onCancel).toHaveBeenCalledTimes(1);
  // });

})



import AddEmployeePage from "../../../pages/employee/add/index";
import "@testing-library/jest-dom";
import {
  renderWithProviders,
  screen,
  fireEvent,
  waitFor,
  act,
} from "../../test-utils";


let dispatch = jest.fn();
// Mock the useDispatch hook to return the mock dispatch function
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => dispatch,
  useSelector: jest.fn(),
}));

describe("Add-Employee-page", () => {
  it("should render List view button", () => {
    renderWithProviders(<AddEmployeePage />);
    expect(screen.getByTestId("Listbtn")).toBeInTheDocument();
  });
  it("renders the form & submit with empty data should show validations", async () => {
    const handleSubmit = jest.fn();
    act(() => {
      renderWithProviders(
        <AddEmployeePage onSubmit={handleSubmit} />
      );
    });

    // Check that the form is rendered
    const fNameInput = screen.getByLabelText("First name");
    const lNameInput = screen.getByLabelText("Last name");
    const emailInput = screen.getByLabelText("Email");
    const numberInput = screen.getByLabelText("Phone");
    const genderInput = screen.getByLabelText("Gender");
    const submitButton = screen.getByText("Add");

    expect(fNameInput).toBeInTheDocument();
    expect(lNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
    expect(genderInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    act(() => {
      // Simulate form submission with invalid data
      fireEvent.click(submitButton);
    });

    // Check that the validation errors are shown
    const errorFname = screen.getByTestId("error-Fname");
    const errorLname = screen.getByTestId("error-LName");
    const errorEmail = screen.getByTestId("error-email");
    const errorNumber = screen.getByTestId("error-number");
    const errorGender = screen.getByTestId("error-gender");

    await waitFor(() => {
      expect(handleSubmit).not.toHaveBeenCalled();
      expect(errorFname).toBeInTheDocument();
      expect(errorFname).toHaveTextContent("First name is required");

      expect(errorLname).toBeInTheDocument();
      expect(errorLname).toHaveTextContent("Last name is required");

      expect(errorEmail).toBeInTheDocument();
      expect(errorEmail).toHaveTextContent("Email is required");

      expect(errorNumber).toBeInTheDocument();
      expect(errorNumber).toHaveTextContent("Phone number is required");

      expect(errorGender).toBeInTheDocument();
      expect(errorGender).toHaveTextContent("Gender is required");
    });
  });

  it("renders the form & submit with invalid data should show validations set 1", async () => {
    const handleSubmit = jest.fn();
    act(() => {
      renderWithProviders(
        <AddEmployeePage onSubmit={handleSubmit} />
      );
    });

    // Check that the form is rendered
    const fNameInput = screen.getByLabelText("First name");
    const lNameInput = screen.getByLabelText("Last name");
    const emailInput = screen.getByLabelText("Email");
    const numberInput = screen.getByLabelText("Phone");
    const genderInput = screen.getByLabelText("Gender");
    const submitButton = screen.getByText("Add");

    //error message div components for each field
    const errorFname = screen.getByTestId("error-Fname");
    const errorLname = screen.getByTestId("error-LName");
    const errorEmail = screen.getByTestId("error-email");
    const errorNumber = screen.getByTestId("error-number");
    const errorGender = screen.getByTestId("error-gender");

    //  // Populate the form with invalid data
    act(() => {
      fireEvent.change(fNameInput, { target: { value: 125 } });
      fireEvent.change(lNameInput, { target: { value: 456 } });
      fireEvent.change(numberInput, { target: { value: "92766665252" } });
      fireEvent.change(emailInput, {
        target: { value: "johndoe.com" },
      });
      fireEvent.change(genderInput, { target: { value: "" } });
      fireEvent.click(genderInput);
      const option = screen.getByText("Select Gender");
      fireEvent.click(option);
    });

    act(() => {
      // Simulate form submission with invalid data
      fireEvent.click(submitButton);
    });

    // Check that the validation errors are shown
    await waitFor(() => {
      expect(handleSubmit).not.toHaveBeenCalled();
      expect(errorFname).toBeInTheDocument();
      expect(errorFname).toHaveTextContent("First name should only contain alphabets");

      expect(errorLname).toBeInTheDocument();
      expect(errorLname).toHaveTextContent("Last name should only contain alphabets");

      expect(errorEmail).toBeInTheDocument();
      expect(errorEmail).toHaveTextContent("Invalid email");

      expect(errorNumber).toBeInTheDocument();
      expect(errorNumber).toHaveTextContent("Invalid phone number");

      expect(errorGender).toBeInTheDocument();
      expect(errorGender).toHaveTextContent("Gender is required");
    });
  });

  it("renders the form & submit with invalid data should show validations set 2 - name should be at least 6 characters", async () => {
    const handleSubmit = jest.fn();
    act(() => {
      renderWithProviders(
        <AddEmployeePage onSubmit={handleSubmit} />
      );
    });

    // Check that the form is rendered
    const fNameInput = screen.getByLabelText("First name");
    const lNameInput = screen.getByLabelText("Last name");
    const submitButton = screen.getByText("Add");

    //error message div components for each field
    const errorFname = screen.getByTestId("error-Fname");
    const errorLname = screen.getByTestId("error-LName");

    //  // Populate the form with invalid data
    act(() => {
      fireEvent.change(fNameInput, { target: { value: "hey" } });
      fireEvent.change(lNameInput, { target: { value: "fer" } });
    });

    act(() => {
      // Simulate form submission with invalid data
      fireEvent.click(submitButton);
    });

    // Check that the validation errors are shown
    await waitFor(() => {
      expect(handleSubmit).not.toHaveBeenCalled();
      expect(errorFname).toBeInTheDocument();
      expect(errorFname).toHaveTextContent("First name should be at least 6 characters");
      expect(errorLname).toBeInTheDocument();
      expect(errorLname).toHaveTextContent("Last name should be at least 6 characters");
    });
  });

  it("renders the form & submit with invalid data should show validations set 3 - name should not exceed 10 characters", async () => {
    const handleSubmit = jest.fn();
    act(() => {
      renderWithProviders(
        <AddEmployeePage onSubmit={handleSubmit} />
      );
    });

    // Check that the form is rendered
    const fNameInput = screen.getByLabelText("First name");
    const lNameInput = screen.getByLabelText("Last name");
    const submitButton = screen.getByText("Add");

    //error message div components for each field
    const errorFname = screen.getByTestId("error-Fname");
    const errorLname = screen.getByTestId("error-LName");

    //  // Populate the form with invalid data
    act(() => {
      fireEvent.change(fNameInput, { target: { value: "jonsanfernando" } });
      fireEvent.change(lNameInput, { target: { value: "jonsanfernando" } });
    });

    act(() => {
      // Simulate form submission with invalid data
      fireEvent.click(submitButton);
    });

    // Check that the validation errors are shown
    await waitFor(() => {
      expect(handleSubmit).not.toHaveBeenCalled();
      expect(errorFname).toBeInTheDocument();
      expect(errorFname).toHaveTextContent("First name should not exceed 10 characters");
      expect(errorLname).toBeInTheDocument();
      expect(errorLname).toHaveTextContent("Last name should not exceed 10 characters");
    });
  });

  it("renders the form & submit with valid data", async () => {
    act(() => {
      renderWithProviders(
        <AddEmployeePage />
      );
    });

    // Check that the form is rendered
    const fNameInput = screen.getByLabelText("First name");
    const lNameInput = screen.getByLabelText("Last name");
    const emailInput = screen.getByLabelText("Email");
    const numberInput = screen.getByLabelText("Phone");
    const genderInput = screen.getByLabelText("Gender");

    //Populate the form with valid data
    act(() => {
      fireEvent.change(fNameInput, { target: { value: "Johnsan" } });
      fireEvent.change(lNameInput, { target: { value: "fernando" } });
      fireEvent.change(numberInput, { target: { value: "0765558557" } });
      fireEvent.change(emailInput, {
        target: { value: "johndoe@example.com" },
      });
      fireEvent.change(genderInput, { target: { value: "m" } });
      fireEvent.click(genderInput);
      const option = screen.getByText("Male");
      fireEvent.click(option);
    });

    // get error showing components
    const errorFname = screen.getByTestId("error-Fname");
    const errorLname = screen.getByTestId("error-LName");
    const errorEmail = screen.getByTestId("error-email");
    const errorNumber = screen.getByTestId("error-number");
    const errorGender = screen.getByTestId("error-gender");

    // Check that the validation errors are not shown
    await waitFor(() => {
      expect(fNameInput).toHaveValue("Johnsan");
      expect(lNameInput).toHaveValue("fernando");
      expect(emailInput).toHaveValue("johndoe@example.com");
      expect(numberInput).toHaveValue("0765558557");
      expect(genderInput).toHaveValue("m");

      // check no validation errors are shown
      expect(errorFname).toHaveTextContent("");
      expect(errorLname).toHaveTextContent("");
      expect(errorEmail).toHaveTextContent("");
      expect(errorNumber).toHaveTextContent("");
      expect(errorGender).toHaveTextContent("");
    });

  });
});

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewUserPage from "../NewUserPage";
import userEvent from "@testing-library/user-event";

describe("Create New User", () => {
//   const renderComponent = () => {
//     return render(<NewUserPage />);
//   };

//   test("submit button is disabled by default", () => {
//     renderComponent();

//     const submitButton = screen.getByTestId("signUpButton");
//     expect(submitButton).toBeDisabled();
//   });
  

  // test('submit button is enabled by with all fields filled',async ()=>{
  //     const user      = "user"
  //     const email     = 'email@email.com';
  //     const password  = '12345';
  //     const confirm   = '12345';

  //     renderComponent()

  //     const userInput     = screen.getByTestId('user')
  //     const emailInput    = screen.getByTestId('email')
  //     const passwordInput = screen.getByTestId('password')
  //     const ConfirmInput  = screen.getByTestId('confirm')

  //     userEvent.type(userInput,user)
  //     userEvent.type(emailInput,email)
  //     userEvent.type(passwordInput,password)
  //     userEvent.type(ConfirmInput,confirm)

  //     const submitButton = await screen.findByTestId('signUpButton')
  //     //const submitButton = screen.getByTestId('signUpButton')
  //     expect(submitButton).not.toBeDisabled();

  // })

  // test('password not match',()=>{
  //     const user = "user"
  //     const email = 'email@email.com';
  //     const password = '2222';
  //     const confirm = '1111';
  //     renderComponent()

  //     const userInput = screen.getByTestId('user')
  //     const emailInput = screen.getByTestId('email')
  //     const passwordInput = screen.getByTestId('password')
  //     const passwordConfirmInput = screen.getByTestId('confirm')

  //     userEvent.type(userInput,user)
  //     userEvent.type(emailInput,email)
  //     userEvent.type(passwordInput,password)
  //     userEvent.type(passwordConfirmInput,confirm)

  //     const submitButton = screen.getByTestId('signUpButton')
  //     userEvent.click(submitButton);

  //     const error = screen.getByTestId('error')

  //     expect(error).toBe('password confirmation does not match')

  // })
});

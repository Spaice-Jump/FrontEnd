import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import NewUserPage from "../NewUserPage";

describe('Create New User',()=>{
    const renderComponent = () => {
    
        return render(  
            <NewUserPage />     
        );
      };
    
    test('submit button is disabled by default',()=>{
        renderComponent()
        
        const submitButton = screen.getByTestId('signInButton')
        expect(submitButton).toBeDisabled();    
 
    })
})

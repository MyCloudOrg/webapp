# webapp
new changes
# clone the repo 
## Available Scripts

In the project directory, you can run:

### `npm i` 
installs all the dependancies and nodemodules

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

All API request/response payloads should be in JSON.
No UI should be implemented for the application.
As a user, I expect all API calls to return with a proper HTTP status code (Links to an external site.).
As a user, I expect the code quality of the application to be maintained to the highest standards using the unit and/or integration tests.
Your web application must only support Token-Based authentication and not Session Authentication Links to an external site..
As a user, I must provide a basic Links to an external site. authentication Links to an external site. token when making an API call to the authenticated endpoint.
Create a new user
As a user, I want to create an account by providing the following information.
Email Address
Password
First Name
Last Name
account_created field for the user should be set to the current time when user creation is successful.
Users should not be able to set values for account_created and account_updated. Any value provided for these fields must be ignored.
Password should never be returned in the response payload.
As a user, I expect to use my email address as my username.
Application must return 400 Bad Request HTTP response code when a user account with the email address already exists.
As a user, I expect my password to be stored securely using the BCrypt password hashing scheme Links to an external site. with salt Links to an external site..
Update user information
As a user, I want to update my account information. I should only be allowed to update the following fields.
First Name
Last Name
Password
Attempt to update any other field should return 400 Bad Request HTTP response code.
account_updated field for the user should be updated when the user update is successful.
A user can only update their own account information.
Get user information
As a user, I want to get my account information. Response payload should return all fields for the user except for password.

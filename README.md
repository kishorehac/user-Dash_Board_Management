# User Management Dashboard

## Objective
Develop a web application where users can view, add, edit, and delete user details using a mock backend API.

## Features
- View a list of users with details such as ID, First Name, Last Name, Email, and Department.
- Add new users.
- Edit existing users.
- Delete users.
- Pagination for user list.
- Client-side validation for the user input form.
- Responsive design.

## Tech Stack
- React
- Axios for HTTP requests
- JSONPlaceholder for mock backend API
- Bootstrap for responsive design
- React-Paginate for pagination

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/user-management-dashboard.git
    cd user-management-dashboard
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

## Project Structure
user-management-dashboard ├── public ├── src │ ├── components │ │ ├── UserList.js│ │ ├── UserForm.js│ ├── App.js│ ├── App.css│ ├── index.js│ └── styles.css├── package.json└── README.md


## Components

### UserList
Displays the list of users with pagination and action buttons for editing and deleting users.

### UserForm
Form for adding a new user or editing an existing user with client-side validation.

## API Endpoints
Using JSONPlaceholder:
- Fetch users: `GET https://jsonplaceholder.typicode.com/users`
- Add user: `POST https://jsonplaceholder.typicode.com/users`
- Edit user: `PUT https://jsonplaceholder.typicode.com/users/{id}`
- Delete user: `DELETE https://jsonplaceholder.typicode.com/users/{id}`

## Usage

1. **Viewing Users**: The main dashboard displays a list of users. Use the pagination controls at the bottom to navigate through pages.
2. **Adding a User**: Click the "Add User" button to display the user form. Fill in the details and submit to add a new user.
3. **Editing a User**: Click the "Edit" button next to a user to display the user form with existing details. Update the details and submit to save changes.
4. **Deleting a User**: Click the "Delete" button next to a user and confirm the action to remove the user from the list.

## Error Handling
Displays error messages if API requests fail.

## Assumptions
- User names are split into first and last names by a space.
- The department is derived from the company name.

## License
This project is licensed under the MIT License.

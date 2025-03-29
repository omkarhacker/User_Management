# User Management System

A user management system that allows users to list, search, edit, and delete users.

## Features

- **List Users**: Display users fetched from an API.
- **Search Users**: Search by first name, last name, or email across all pages or a single page.
- **Pagination**: Supports pagination to navigate through users.
- **Edit User**: Update user information and reflect changes in the UI.
- **Delete User**: Remove users from the list.
- **Search All Pages**: Option to search across all pages or within the current page.

## Setup Instructions

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/user-management.git
    cd user-management
    ```

2. **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Create `.env` file**:
    ```bash
    "VITE_API_URL=https://reqres.in/api"
    ```

4. **Run the app**:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
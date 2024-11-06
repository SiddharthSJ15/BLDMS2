# Blood Bank Management System

## Overview

The Blood Bank Management System is a straightforward web application aimed at managing blood donations and requests efficiently. This project facilitates the tracking of blood inventory, donor management, and patient blood requests for hospitals.

## Features

- **User Authentication**: Secure login for hospitals and admins.
- **Manage Blood Requests**: View and fulfill blood requests made by patients.
- **Track Donations**: Keep track of blood donations against each request.
- **Inventory Management**: Monitor available blood units and their sources.
- **Responsive Design**: Optimized for various devices.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Django, Django Rest Framework
- **Database**: SQLite
- **Version Control**: Git

## Getting Started

To run the application locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/blood-bank-management-system.git
   cd blood-bank-management-system
   ```

2. **Set up the backend:**

   - Navigate to the backend directory:
     ```bash
     cd backend
     ```

   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```

   - Run the Django server:
     ```bash
     python manage.py migrate
     python manage.py runserver
     ```

3. **Set up the frontend:**

   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```

   - Install dependencies:
     ```bash
     npm install
     ```

   - Run the React application:
     ```bash
     npm start
     ```

## Usage

1. Log in as a hospital or admin.
2. View pending blood requests.
3. Select blood units to donate against a request.
4. Manage the blood inventory as needed.

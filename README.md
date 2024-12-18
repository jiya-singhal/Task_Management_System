# Task Management System Backend API

## Project Description
This project is a backend API for a Task Management System built with Node.js, Express, and MongoDB. The system allows users to create, update, and manage tasks with features such as prioritization, deadlines, task dependencies, recurring tasks, and email notifications. It also supports team functionality, enabling collaboration between users, and includes role-based access control (RBAC) to manage permissions within teams. The API is secured with JWT authentication and includes functionality for real-time updates using WebSockets.

---
### Live Demo
The backend API is deployed and accessible at [https://task-management-system-7roi.onrender.com/](https://task-management-system-7roi.onrender.com/).
## Table of Contents
- [Project Description](#project-description)
- [Features](#features)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Technologies](#technologies)
- [Email Notification Feature](#email-notification-feature)

---

## Features
- **Task Management**: Create, update, delete tasks, and assign them to users or teams.
- **Team Collaboration**: Users can create teams and assign tasks based on roles (Owner, Admin, Member).
- **Role-Based Access Control (RBAC)**: Role-based permissions to manage and access tasks and team settings.
- **Task Dependencies**: Tasks can have dependencies that must be completed before moving forward.
- **Recurring Tasks**: Automatically create recurring tasks (daily, weekly, monthly).
- **Notifications**: Email and in-app notifications for overdue tasks and approaching deadlines.
- **Real-Time Updates**: WebSocket support for real-time task updates across team members.

---

## Getting Started

### Prerequisites
- **Node.js** and **npm**
- **MongoDB**

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/jiya-singhal/Task_Management_System.git
    cd Task_Management_System
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the root directory with the following values:
    ```env
    PORT=3006
    DB_URI=your_mongo_connection_string
    JWT_SECRET=your_jwt_secret
    EMAIL_SERVICE=your_email_service
    EMAIL_USER=your_email@example.com
    EMAIL_PASS=your_email_password
    ```
4. Start the server:
    ```bash
    npm start
    ```
5. The server will be running at [http://localhost:3006](http://localhost:3006).

---

## API Documentation
To test and explore the API endpoints, you can import the Postman collection provided in this repository.

### Steps to Import
1. Open Postman.
2. Click on **Import** in the top left corner.
3. Select **Upload Files** and navigate to the `docs/TaskManagementSystem.postman_collection.json` file in this repository.
4. Click **Import** to add the collection to Postman.

You can now use this collection to make requests and view example responses for the Task Management System API.

---

## Technologies
- **Node.js** and **Express** for server-side logic
- **MongoDB** for database storage
- **JWT** for user authentication
- **Nodemailer** for email notifications
- **WebSocket** for real-time updates

---

## Email Notification Feature

This application includes a feature to send email notifications related to tasks, such as task creation and updates. It uses Nodemailer to send emails via Gmail.

### 1. Setting Up Email Notifications
- The system automatically sends email notifications for key task events, such as:
  - **Task Creation**: When a new task is created, an email will be sent to the assigned user with the task details.
  - **Task Completion (Optional)**: You can configure email notifications for task completion.

### 2. How It Works
- The email notification system is triggered when a task is created or updated.
- The email is sent using the Gmail service and requires an app-specific password (if you have 2-factor authentication enabled in your Google account).

### 3. Testing Email Notifications
- To test the email system:
    ```bash
    node utils/testEmail.js
    ```

- **Expected Outcome**:
  - You should receive a test email at the address specified in your `.env` file (under `EMAIL_USER`).
  - The email will confirm that the system is working and notify you that an email was successfully sent.

### 4. Required Configuration
- For the email system to work correctly, configure the following in your `.env` file:

    ```env
    EMAIL_SERVICE=gmail
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-app-specific-password
    ```

- Replace `your-email@gmail.com` with your actual Gmail address and `your-app-specific-password` with the generated app-specific password.


### 5\. **Sample Email Notification**
Once the email is sent, the recipient will receive an email with the following format:


        
<img width="1176" alt="Screenshot 2024-11-15 at 2 22 12 AM" src="https://github.com/user-attachments/assets/13fce61c-6484-48b1-a59c-87240d312189">



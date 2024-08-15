# [Welcome to Phonebook App 🎉](https://phonebook-app-ten.vercel.app/)

## Project Overview

This project is a full-stack application featuring a modern frontend and robust backend, designed to deliver seamless user experiences and efficient data management.

### Frontend

The frontend is built using **React (v18.3.1)**, offering a dynamic and responsive user interface. The application uses **Vite** as the build tool for fast development and optimized production builds. **React Router (v6.26.0)** is employed for client-side routing, ensuring smooth navigation between pages. The styling is managed with **Sass**, allowing for modular and reusable CSS. The project is developed in **TypeScript**, which enhances code quality with static type checking.

**Key Technologies:**

[![FE Tech Stack](https://skillicons.dev/icons?i=react,vite,sass,typescript)](https://skillicons.dev)

### Backend

The backend is powered by **Flask (v3.0.3)**, a lightweight and flexible Python web framework. It serves as the core of the application’s server-side logic, handling requests and interacting with the frontend. The backend also uses **Flask-CORS** to manage Cross-Origin Resource Sharing, facilitating secure communication between the frontend and backend.

For cloud services, the project integrates with **AWS S3** via **Boto3**, allowing for efficient storage and retrieval of data. 

**Key Technologies:**

[![BE Tech Stack](https://skillicons.dev/icons?i=flask,aws)](https://skillicons.dev)

### Tooling

The project maintains high code quality standards with **ESLint** and **Prettier**. ESLint enforces consistent code styling, while Prettier formats the codebase for readability. **TypeScript** is used across both the frontend and backend, providing type safety and better tooling support.

**Key Tools:**
- ESLint
- Prettier
- TypeScript
- Vite Plugins (React, TypeScript)

This stack ensures that the project is not only modern and scalable but also maintainable and efficient, making it well-suited for production environments.

## Prerequisites

1. **Node.js and pnpm**: Ensure you have Node.js and [PnPm](https://pnpm.io) installed.
2. **Python 3.10 or higher**: Install Python if it's not already installed.
3. **Homebrew (Optional)**: If you're on macOS, you might have installed Python via Homebrew.
4. **AWS CLI**: Install and configure AWS CLI if you're interacting with AWS services.

### 1. Clone the Project Repository

```bash
      git clone https://github.com/Kingsleyyong/phonebook-app
      cd phonebook-app
```

### 2. Set Up the Backend (Flask)

- **Create a Python Virtual Environment**
```bash
      cd server/
      python3 -m venv venv
      source venv/bin/activate   # On Windows, use `venv\Scripts\activate`
```

- **Install Python Dependencies**

```bash
      pip install -r requirements.txt
```

- **Set Up Environment Variables**

Create a .env file in the root directory and add any necessary environment variables, such as AWS credentials and Flask configurations.

Example .env file:
```bash
      AWS_ACCESS_KEY_ID=
      AWS_SECRET_ACCESS_KEY=
      AWS_REGION=
      S3_BUCKET_NAME=
```

- **Run the Flask Application**

```bash
      flask run
```

The Flask backend should now be running at `http://127.0.0.1:5000/`.

### 3. Set Up the Frontend (React)
- Navigate to the Client Directory

```bash
      cd client
```

- Install Node.js Dependencies

```bash
      pnpm install
```

- Run the Development Server

```bash
      pnpm dev
```
The React frontend should now be running at `http://127.0.0.1:5173/` (or another port, depending on availability).

### 4. Connect Frontend and Backend
Ensure that the React frontend is making API requests to the Flask backend running on `http://127.0.0.1:5000/`. You can achieve this by creating a `.env` file in the root of the client directory.
```bash
      VITE_API_ENDPOINT =
```

### 5. Testing and Debugging
- Backend: Use tools like Postman to test API endpoints.
- Frontend: Open your browser’s developer tools to debug and test the frontend.

### 6. Deactivate the Python Virtual Environment (Optional)
After done with the server:

```bash
      deactivate
```
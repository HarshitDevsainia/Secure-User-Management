# 🔐 React Authentication & Users Dashboard

A modern React + TypeScript application demonstrating authentication (login/signup) and user data fetching using Redux Toolkit, Async Thunks, and Tailwind CSS.

This project uses public APIs for learning and demo purposes:

- Authentication → ReqRes API
- Users List → JSONPlaceholder API

## 🚀 Features

### 🔑 Authentication

- Login & Signup using Redux Toolkit
- Token-based authentication
- Persistent login using localStorage
- Logout functionality

### 👥 Users Dashboard

- Fetch users using createAsyncThunk
- Global state management via Redux
- Loading & error handling
- Responsive grid UI

### 🧪 Testing

- Unit tests for authentication and API logic
- Written using Test Driven Development (TDD) approach
- Jest + React Testing Library

## 🌐 APIs Used

### 🔹 Authentication (ReqRes)

```bash
POST https://reqres.in/api/login
POST https://reqres.in/api/register
```

- Example credentials:

```bash
{
  "email": "eve.holt@reqres.in",
  "password": "cityslicka"
}
```

### 🔹 Users Data (JSONPlaceholder)

```bash
GET https://jsonplaceholder.typicode.com/users
```

## 🧪 Testing (TDD Approach)

### 🔹 What is Tested

- Authentication success & failure
- Async thunk API calls
- Redux reducers & actions

### 🔹 Run Tests

```bash
npm test
```

## ▶️ Getting Started

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/react-redux-auth-dashboard.git
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start Development Server

```bash
npm run dev
```

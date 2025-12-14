# Sweet Shop Management System

## Overview

The **Sweet Shop Management System** is a full-stack web application designed to manage a sweet shop’s inventory, user authentication, and purchase flow.
The system provides RESTful APIs for backend operations and a modern React-based frontend for user interaction.

The project demonstrates backend API development, database persistence, frontend integration, authentication, and clean project structure.

---

## Tech Stack

### Backend

* **Node.js**
* **Express.js**
* **SQLite** (file-based persistent database)
* **bcryptjs** (password hashing)
* **jsonwebtoken (JWT)** (authentication)
* **cors**, **dotenv**

### Frontend

* **React**
* **React Router**
* **Axios**

### Database

* **SQLite**
  Data is stored persistently in a `.db` file on disk.
  No in-memory database is used.

---

## Features

### Authentication

* User registration
* User login
* JWT-based authentication
* Role support (`user`, `admin`)

### Sweet Management

* Add sweets (Admin)
* View all sweets
* Search sweets by name
* Purchase sweets (inventory decreases automatically)
* Disable purchase when quantity is zero

### Inventory

* Persistent inventory stored in SQLite
* Data remains intact after server restarts

---

## API Endpoints

### Auth

* `POST /api/auth/register` — Register a new user
* `POST /api/auth/login` — Login and receive JWT

### Sweets

* `GET /api/sweets` — Get all sweets
* `POST /api/sweets` — Add a new sweet
* `POST /api/sweets/:id/purchase` — Purchase a sweet

---

## Project Structure

```
sweet-shop-backend/
 ├── server.js
 ├── sweetshop.db
 ├── package.json

sweet-shop-frontend/
 ├── src/
 │   ├── pages/
 │   │   ├── Login.js
 │   │   ├── Register.js
 │   │   ├── Dashboard.js
 │   │   └── AdminPanel.js
 │   └── App.js
```

---

## How to Run the Project Locally

### Backend

```bash
cd sweet-shop-backend
npm install
npm start
```

Backend runs at:

```
http://localhost:5000
```

### Frontend

```bash
cd sweet-shop-frontend
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

## Database Details

The application uses **SQLite**, a lightweight file-based database.

* Database file: `sweetshop.db`
* Tables:

  * `users` — stores user credentials and roles
  * `sweets` — stores sweet inventory

The database persists data across server restarts, fulfilling the persistence requirement.

---

## Testing

Basic testing was performed by interacting with the frontend UI, validating:

* User registration and login
* Inventory creation
* Purchase flow
* Data persistence after refresh

(Test automation can be extended using Jest and Supertest.)

---

## My AI Usage

### Tools Used

* **ChatGPT**

### How AI Was Used

* Understanding backend API structure
* Debugging integration issues between frontend and backend
* Refining database logic and endpoint design
* Improving README documentation clarity

### Reflection

AI significantly accelerated development by helping identify issues quickly and suggesting clean architectural decisions. Final implementation choices and debugging decisions were made manually after understanding the suggestions.

---

## Notes

* SQLite was chosen for simplicity and reliability in a time-constrained assessment while still ensuring data persistence.
* The system can be extended easily to support additional admin features such as delete and restock operations.

---

## Conclusion

This project demonstrates a functional full-stack system with persistent storage, authentication, and frontend-backend integration. The design focuses on clarity, correctness, and maintainability.

---

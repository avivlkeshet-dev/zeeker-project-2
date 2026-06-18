# zeeker-project-2

Server-side functionality and logic that controls the data of this zeekr project

## Contributors
* **Amit Frank** — Backend Lead & Author
* **Aviv Keshet** — Project Contributor

---

## Overview

This repository houses the server-side architecture for **Zeeker Project 2**. Serving as the backbone of the application, it securely processes client requests, orchestrates database interactions, handles file storage, and ensures seamless data validation.

---

## Tech Stack & Dependencies

The core runtime environment is built on **Node.js**. Below are the primary libraries powering the backend server:

| Library | Purpose |
| :--- | :--- |
| **NodeJS** | Allowing the javscript to oparate in the backend |
| **Express.js** | Handling HTTP request to perform the CRUD functionality. |
| **Joi** | Object schema for validation. |
| **Mongoose** | Elegant MongoDB object modeling to manage database schemas. |
| **Multer** | Specialized middleware for handling form-data during file uploads. |
| **Nodemailer** | Used for handling transactional email transfers. |
| **pdf-parse** | Library for parsing and extracting text from PDF files. |
| **Mammoth** | Converts Google Docs/Microsoft Word/LibreOffice Writer text to html |
| **Cors** | Enables controlled access to resources located outside of a given domain |
| **Cookie-parser** | Parse the attached cookies to the request made by the client to the server.|
| **JWT** |  secure method for transmitting information between parties as a JSON object. |

## Main Features
- User registration and login
- Vehicles / services display
- Vehicle / service details page
- File upload
- Contact form
- Email sending
- Adding and deleting Documents

### how to run the server
```
cd backend
npm install
npm run seed
npm run dev
```

## Environment Variables
Create .env files based on the .env.example files.

```
PORT=4_digits_port
MONGODB_URI=your_mongodb_connection_string
EMAIL_USER=your_email
EMAIL_PASS=your_google_app_password
JWT_SECRET=your_jwt secret
FRONTEND_URL=you_frontend_url
```

### **Some of the request are required to use tools in order to test the http requests**
### **Recommandation: use postman in order to test the contact form**

### Auth — /api/users
| Method | Path | Description |
|---|---|---|
| POST | /api/users | Register new user (multipart — driver's licence image) |
| POST | /api/users/login | Login with phone + plate number; JWT cookie set |
| GET | /api/users/me | Return current user from JWT cookie |
| GET | /api/users/:id | Fetch user by ID |

### Documents — /api/documents
| Method | Path | Description |
|---|---|---|
| POST | /api/documents | Upload document to MongoDB storage |
| GET | /api/documents/:userId | List all documents for a user |
| GET | /api/documents/download/:fileId | A request to downloads the file |
| DELETE | /api/documents/:id | Delete from Firebase + MongoDB |

### Vehicles, Coupons, Contact, File Upload
Additional routes mounted under /api/vehicles, /api/coupons, /api/contact, /api/documents.

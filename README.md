## Students
- Student 1 Amit Frank
- Student 2 Aviv Levi Keshet

---

## System Architecture

```
zeeker-project-2/
├── frontend/
└── backend/
```

### Frontend (`frontend/`)
| Path | Purpose |
|---|---|
| `src/pages/` | Page-level route components |
| `src/components/` | Feature components (Login, Files, Payment, CarAgency, …) |
| `src/routes/route.jsx` | React Router v7 route definitions |
| `src/constants/fallbackSeedUser.js` | Shared offline-mode user mock |
| `src/utils/` | Shared helpers (e.g. currency formatter) |

---

## Page Routes

| Route | Component | Description |
|---|---|---|
| `/` | `LoginPage` | Phone + plate-number login with terms checkbox |
| `/dashboard` | `Dashboard` | User home with service tiles |
| `/pages` | `Pages` | Document management |
| `/agency` | `AgencyPage → CarAgency` | Leaflet map of agency locations; select a branch |
| `/services` | `Services → OrderService` | Book a service appointment for selected agency |
| `/repair` | `Repair` | Repair history |
| `/repairenotification` | `RepairNotificationPage` | Upcoming service alert |
| `/payment` | `Payment` | Payment flow entry |
| `/transferdetails` | `TransferDetailsPage` | Upload bank transfer proof + beneficiary details |
| `/paymentfinalize` | `MainPaymentPage` | Payment confirmation |
| `/carsettings` | `CarSettings` | Vehicle settings |
| `/carpurchase` | `CarPurchasePage` | Vehicle purchase order status |
| `/deals` | `Deals` | Active deals / coupons |
| `/message` | `MessagePage` | In-app messaging |
| `/register` | `Personal` | Registration personal details form |

### Documents — `/api/documents`
| Method | Path | Description |
|---|---|---|
| `POST` | `/api/documents` | Upload document to mongoDB Storage + save metadata |
| `GET` | `/api/documents/:userId` | List all documents for a user |
| `GET` | `/api/documents/download/:fileId` | Redirect to signed mongoDB URL |
| `DELETE` | `/api/documents/:id` | Delete from MongoDB |
| `PUT` | `/api/documents/:id/replace` | Replace file in mongoDB update record |

### Vehicles, Coupons, Contact, File Upload
Additional routes mounted under `/api/vehicles`, `/api/coupons`, `/api/contact`, `/api/files`.

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


### Authentication
- Login by **phone number + vehicle plate number**
- JWT stored as `httpOnly` cookie; `userId` stored in `localStorage`

### Document Management (`/pages`)
- Three sections: **המסמכים שלי** (myDocs), **מסמכי ZEEKR** (zeekrDocs), **מסמכי הזמנה** (orderDocs)
- Upload and delete documents (synced to Storage + MongoDB)
- If the API is unavailable, mock data is shown and uploads display the local filename/size

### Payment Flow
- Multi-step wizard: Payment → TransferDetails → PaymentFinalize
- `TransferDetails`: upload bank transfer proof; **קדימה** button enabled only after at least one file is uploaded
- Uploaded files displayed with real name and size regardless of DB availability

### Agency Map (`/agency`)
- Interactive **Leaflet** map with dark tile layer (CartoDB)
- Clicking a marker stores the selection; **הזמנת שירות** navigates to `/services` passing `{ business, plateNumber }` as router state

---

## Technologies

### Frontend
| Library | Version | Use |
|---|---|---|
| React | 19 | UI framework |
| Vite | 6 | Build tool / dev server |
| React Router | 7 | Client-side routing |
| Axios | 1.x | HTTP client |
| Bootstrap | 5 | Utility CSS |
| MUI (Material UI) | 9 | Icon set |
| Leaflet / react-leaflet | 1.9 / 5 | Interactive map |
| react-icons | 5 | Icon set |

---

### Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev


### Backend
```
cd backend
npm install
npm run seed
npm run dev
```

### Environment variables for Backend

```
PORT=4_digits_port
MONGODB_URI=your_mongodb_connection_string
EMAIL_USER=your_email
EMAIL_PASS=your_google_app_password
JWT_SECRET=your_jwt secret
FRONTEND_URL=you_frontend_url
```


---

### Frontend `.env`
| Variable | Description |
|---|---|
| `VITE_BACKEND_URL` | Base URL of the backend API |

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
| DELETE | /api/documents/:id | Delete from MongoDB |

### Vehicles - /api/vehicles
| Method | Path | Description |
|---|---|---|
| POST | /api/vehicles | Adds vehicle data and coordinates of where to buy the vehicle |
| GET | /api/vehicles | Gets all the data of the vehicle from the database |
| GET | /api/vehicles/:id | Gets a specific vehicle by his own id |
| DELETE | /api/vehicle/:id | Deletes a specific vehicle from the database |

### Coupons - /api/coupons
| Method | Path | Description |
|---|---|---|
| GET | /api/coupons | gets all the coupons available after the users registers |

### Contacts - /api/contacts
| Method | Path | Description |
|---|---|---|
| POST | /api/contacts | A endpoint that sends an email to the stored email address in the .env |
| GET | /api/contacts | Gets all the the emails that were sent from the clients |

### Vehicles, Coupons, Contact, File Upload
Additional routes mounted under /api/vehicles, /api/coupons, /api/contact, /api/documents.

---

## GitHub Contributions
- Amit Frank: Backend focus and connection to frontend
- Aviv Levi Keshet: Frontend focus and functionality of pages

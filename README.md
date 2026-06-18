## Students
- Student 1 Amit Frank
- Student 2 Aviv Levi Keshet

---

## System Architecture

```
aviv-root/
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

### Backend (`backend/`)
| Path | Purpose |
|---|---|
| `server.js` | Express app entry point, route mounting, DB connection |
| `routes/` | REST route handlers (auth, documents, maps, vehicles, coupons, contact, file upload) |
| `controllers/` | Multer, validation, and mongoDB helpers |
| `models/` | Mongoose schemas (User, Document, Vehicle, Map, Coupon, Contact) |
| `config/fallbackSeedUser.js` | Shared offline-mode user data |
| `seed/` | One-time DB seed scripts for users and map locations |

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

---

## Backend API

### Auth — `/api/users`
| Method | Path | Description |
|---|---|---|
| `POST` | `/api/users` | Register new user (multipart — driver's licence image) |
| `POST` | `/api/users/login` | Login with phone + plate number; JWT cookie set |
| `GET` | `/api/users/me` | Return current user from JWT cookie |
| `GET` | `/api/users/:id` | Fetch user by ID |

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

### Health check
`GET /api/ping` — returns `{ message: 'pong', timestamp }`.

### Authentication
- Login by **phone number + vehicle plate number**
- JWT stored as `httpOnly` cookie; `userId` stored in `localStorage`
- **Offline fallback**: if MongoDB is unreachable, credentials are compared against the seed user array in `fallbackSeedUser.js`; matching users are authenticated with a mock token

### Document Management (`/pages`)
- Three sections: **המסמכים שלי** (myDocs), **מסמכי ZEEKR** (zeekrDocs), **מסמכי הזמנה** (orderDocs)
- Upload, replace, and delete documents (synced to Storage + MongoDB)
- If the API is unavailable, mock data is shown and uploads display the local filename/size
- Backend: if MongoDB save fails after a successful upload, a `200` response with real file metadata is still returned so the UI reflects the upload correctly

### Payment Flow
- Multi-step wizard: Payment → Transfer → TransferDetails → PaymentFinalize
- `TransferDetails`: upload bank transfer proof; **קדימה** button enabled only after at least one file is uploaded
- Uploaded files displayed with real name and size regardless of DB availability

### Agency Map (`/agency`)
- Interactive **Leaflet** map with dark tile layer (CartoDB)
- Markers loaded from `/api/maps`; falls back to all 3 `seedMaps` entries when DB is offline
- Clicking a marker stores the selection; **הזמנת שירות** navigates to `/services` passing `{ business, plateNumber }` as router state
- Back navigation from `/services` restores the previously selected marker

### Offline / Fallback Strategy
All major features degrade gracefully when MongoDB or the backend is unavailable:
- **Login**: seed user array comparison
- **Documents**: mock document list; uploads display local metadata
- **Maps**: full fallback map dataset from seed
- **User plate**: falls back to `fallbackSeedUser.plateNumber`

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

## How to Run

### Prerequisites
- Node.js ≥ 18
- MongoDB instance (local or Atlas) — optional; app works in offline mode without it

### Backend
```bash
cd backend
cp .env.example .env 
npm install
npm run dev
```

#### Seed the database (optional)
```bash
npm run seed:maps
npm run seed:all
```

### Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

---

## Environment Variables

### Backend `.env`
| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for signing JWTs |
| `PORT` | Server port (default `3000`) |
| `FRONTEND_URL` | Allowed CORS origin |
| `EMAIL_USER` | Gmail address for Nodemailer |
| `EMAIL_PASS` | Gmail app password |

### Frontend `.env`
| Variable | Description |
|---|---|
| `VITE_BACKEND_URL` | Base URL of the backend API |

---

## GitHub Contributions
- Amit Frank: Backend focus and connection to frontend
- Aviv Levi Keshet: Frontend focus and functionality of pages

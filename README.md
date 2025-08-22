# Store Rating App

A full-stack web application for managing store ratings with role-based access control.

## Features

### System Admin
- Login authentication
- Add stores, normal users, and admins
- View dashboard with user/store/rating counts
- View users/stores with filtering and sorting

### Normal User
- Signup/Login
- View all stores
- Submit or modify ratings (1-5 stars)
- Search stores by name/address

### Store Owner
- Login authentication
- View ratings for their store
- See average rating

## Tech Stack

- **Backend**: Express.js with Sequelize ORM
- **Database**: MySQL
- **Frontend**: React.js with Vite
- **Authentication**: JWT
- **Password Security**: bcrypt

## Setup

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure your MySQL database in .env
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users` - Get all users (Admin only)
- `POST /api/users` - Create user (Admin only)
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin only)

### Stores
- `GET /api/stores` - Get all stores
- `POST /api/stores` - Create store (Admin only)
- `PUT /api/stores/:id` - Update store
- `DELETE /api/stores/:id` - Delete store (Admin only)

### Ratings
- `GET /api/ratings` - Get ratings
- `POST /api/ratings` - Submit rating
- `PUT /api/ratings/:id` - Update rating
- `DELETE /api/ratings/:id` - Delete rating

## Database Schema

The application uses Sequelize ORM with the following models:
- Users (with role-based access)
- Stores
- Ratings
- StoreOwners (junction table)

## Environment Variables

Create a `.env` file in the backend directory:

```env
DB_HOST=localhost
DB_USER=your_username
DB_PASS=your_password
DB_NAME=store_rating_db
JWT_SECRET=your_jwt_secret
PORT=5000
``` 
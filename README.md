# Productr - Product Management Dashboard

This is a full-stack web application built according to the provided Figma design for "Productr". 

<img width="959" height="437" alt="image" src="https://github.com/user-attachments/assets/94d47da1-4545-43f6-a3e9-4436ef0a25ad" />
<img width="959" height="442" alt="image" src="https://github.com/user-attachments/assets/6554f789-79b1-40cd-93be-e5c5061d30b3" />

## Tech Stack
- **Frontend:** React.js (Vite), Vanilla CSS, Framer Motion, React Router DOM, Axios
- **Backend:** Node.js, Express.js, JWT Authentication
- **Database:** MongoDB (Mongoose)

## Features Implemented
- **Pixel-perfect UI:** Matches the Figma design closely with a premium, dynamic feel.
- **Authentication:** Login flow with simulated OTP verification.
- **Dashboard:** Dynamic stats based on product data.
- **Product Management:** Full CRUD (Create, Read, Update, Delete) for products. Filtering by "Published" and "Unpublished" status.
- **Data Handling:** Proper MongoDB schemas for User and Product.

## Project Structure
- `client/` - Contains the React frontend
- `server/` - Contains the Express backend

## Environment Variables
Create a `.env` file in the `server` directory with the following variables:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/productr
JWT_SECRET=supersecretjwtkey12345
```

## How to Run Locally

### 1. Start the Backend Server
```bash
cd server
npm install
npm start
```
*Note: Make sure your local MongoDB instance is running on `mongodb://127.0.0.1:27017` or update the `MONGO_URI`.*

### 2. Start the Frontend Client
Open a new terminal window:
```bash
cd client
npm install
npm run dev
```

## Deployment
- The backend can be hosted on Render or Heroku.
- The frontend can be hosted on Vercel or Netlify.
- MongoDB should be hosted on MongoDB Atlas.

## Author
Completed as per the assignment requirements.

# NestAway — Accommodation Listing Platform

A full-stack accommodation listing application built with Node.js, Express.js, MongoDB, Mongoose and EJS.

## Features

- View all accommodation listings
- View a single listing
- Create a listing
- Edit a listing
- Delete a listing
- Joi request validation
- Mongoose schema validation
- Centralized Express error handling
- Async error forwarding with `wrapAsync`
- Dynamic EJS templates
- REST-style routes
- Responsive, portfolio-focused UI
- Sample data seeding script

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS / EJS Mate
- Joi
- Method Override
- HTML5
- CSS3
- Vanilla JavaScript

## Project Architecture

```text
Browser
   ↓
Express Route
   ↓
Joi Validation
   ↓
Mongoose
   ↓
MongoDB
   ↓
Mongoose Result
   ↓
EJS Template
   ↓
HTML Response
   ↓
Browser
```

## Project Structure

```text
NestAway/
├── app.js
├── package.json
├── .env.example
├── .gitignore
├── initData.js
├── README.md
├── schema.js
├── middleware/
│   └── validateListing.js
├── models/
│   └── listing.js
├── routes/
│   └── listing.js
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
└── views/
    ├── layouts/
    │   └── boilerplate.ejs
    ├── listings/
    │   ├── index.ejs
    │   ├── show.ejs
    │   ├── new.ejs
    │   └── edit.ejs
    └── error.ejs
```

## Requirements

Install:

- Node.js
- MongoDB Community Server

MongoDB must be running locally.

## Installation

Clone/download the repository and open the project folder:

```bash
npm install
```

Create a `.env` file from `.env.example`:

```text
MONGO_URI=mongodb://127.0.0.1:27017/nestaway
PORT=8080
```

## Seed Sample Data

Run:

```bash
npm run init-data
```

This clears the current NestAway listings collection and inserts eight sample listings.

## Start the Application

```bash
npm start
```

For development with automatic restart:

```bash
npm run dev
```

Open:

```text
http://localhost:8080
```

## Routes

| Method | Route | Purpose |
|---|---|---|
| GET | `/listings` | View all listings |
| GET | `/listings/new` | Show create form |
| POST | `/listings` | Create listing |
| GET | `/listings/:id` | View one listing |
| GET | `/listings/:id/edit` | Show edit form |
| PUT | `/listings/:id` | Update listing |
| DELETE | `/listings/:id` | Delete listing |

## Error Handling

`wrapAsync` forwards rejected asynchronous route operations to Express's error middleware, avoiding repetitive `try/catch` blocks.

`ExpressError` carries an application error message and HTTP status code.

For a valid MongoDB ObjectId that does not match a listing, `findById()` returns `null`; the route throws a 404 `ExpressError`, and the centralized error middleware renders the error page.

Invalid ObjectIds are detected before the database lookup and return a 400 error.

## Validation

Joi validates incoming request data before database operations.

Mongoose provides the Listing document schema and communicates with MongoDB.

This gives the application two clear validation layers:

1. Request-level validation with Joi
2. Database-document validation with Mongoose

## GitHub

Before pushing:

```bash
git init
git add .
git commit -m "Build NestAway accommodation listing platform"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Never commit `.env`, passwords, API keys or other secrets.

## Future Improvements

Possible future features include:

- Authentication and authorization
- Booking workflow
- Reviews and ratings
- Image upload service
- Search and filtering
- Maps/location integration

These are intentionally not part of the current implementation so the application remains simple and interview-friendly.

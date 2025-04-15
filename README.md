# School Management System - Student Module

## Overview
This module provides CRUD operations for managing student records in a school management system.

## Features
- Create, Read, Update, Delete student records
- Input validation
- Error handling
- Pagination for listing students
- MongoDB integration via Prisma

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or remote instance)
- npm or yarn

## Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file based on `.env.example`
4. Run database migrations: `npm run migrate`
5. Generate Prisma client: `npm run generate`
6. Start the server: `npm start` (or `npm run dev` for development)

## API Endpoints
- `POST /students` - Create a new student
- `GET /students` - Get all students (with pagination)
- `GET /students/:regNo` - Get student by registration number
- `PUT /students/:regNo` - Update student
- `DELETE /students/:regNo` - Delete student (soft delete)

## Testing
Run tests with: `npm test`

## Deployment
Configure your MongoDB connection string in `.env` and deploy to your preferred hosting platform.

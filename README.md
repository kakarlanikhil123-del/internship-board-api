# Internship Board API

A REST API for managing internship records using Node.js, Express, PostgreSQL, Prisma ORM, and Zod.

## Features

- Create, list, view, update, and delete internships
- PostgreSQL persistence through Prisma ORM
- Request validation using Zod
- Pagination (`page`, `limit`)
- Search and filters (`search`, `domain`, `mode`, `location`)
- Consistent JSON responses and error handling
- Seed script with fictional internship records

## Requirements

- Node.js 20.19+ or a compatible current LTS release
- PostgreSQL
- npm

## Setup

1. Clone this repository.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a PostgreSQL database named `internship_board`.

4. Copy `.env.example` to `.env` and update the database connection details.

   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/internship_board?schema=public"
   PORT=4000
   ```

5. Generate Prisma Client and run migrations:

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

6. Insert sample data:

   ```bash
   npm run prisma:seed
   ```

7. Start the development server:

   ```bash
   npm run dev
   ```

The API runs at `http://localhost:4000`.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/internships` | List internships |
| GET | `/api/internships/:id` | Get one internship |
| POST | `/api/internships` | Create an internship |
| PATCH | `/api/internships/:id` | Update an internship |
| DELETE | `/api/internships/:id` | Delete an internship |

## List Query Parameters

- `page` — Page number (default: `1`)
- `limit` — Records per page (default: `10`, maximum: `50`)
- `search` — Searches title, company, description, and skills
- `domain` — Exact domain filter
- `mode` — `remote`, `onsite`, or `hybrid`
- `location` — Partial location match

Example:

```http
GET http://localhost:4000/api/internships?page=1&limit=5&domain=Backend%20Development
```

## Create an Internship

**POST** `/api/internships`

```json
{
  "title": "React Developer Intern",
  "company": "Example Tech",
  "domain": "Frontend Development",
  "mode": "remote",
  "location": "India",
  "description": "Build and test reusable React components for a web application.",
  "skills": ["React", "JavaScript", "CSS"],
  "openings": 2,
  "applyUrl": "https://example.com/apply"
}
```

`applyUrl` is optional. `mode` must be `remote`, `onsite`, or `hybrid`.

## Get an Internship by ID

**GET** `/api/internships/:id`

Example:

```http
GET http://localhost:4000/api/internships/REPLACE_WITH_INTERNSHIP_ID
```

## Update an Internship

**PATCH** `/api/internships/:id`

Only the fields you want to update need to be included.

```json
{
  "title": "Updated React Developer Intern",
  "openings": 5
}
```

## Delete an Internship

**DELETE** `/api/internships/:id`

Example:

```http
DELETE http://localhost:4000/api/internships/REPLACE_WITH_INTERNSHIP_ID
```

## Response Format

Successful list response:

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 0,
    "totalPages": 0
  }
}
```

Error response example:

```json
{
  "success": false,
  "message": "Internship not found"
}
```

Common HTTP status codes:

- `200` — Successful request
- `201` — Resource created
- `400` — Validation error
- `404` — Resource or route not found
- `500` — Internal server error

## Test with Postman

Use `http://localhost:4000` as the base URL.

For POST and PATCH requests, select **Body → raw → JSON**.

## Notes

- All seed records and company names are fictional.
- `example.com` application links are placeholders for API testing, not real internship vacancies.
- Never commit your `.env` file or publish your database password.
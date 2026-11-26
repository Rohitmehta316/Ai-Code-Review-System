# AI Code Review System

A MERN application for AI-assisted code reviews. Submit JavaScript, TypeScript, Python, or Java source for an explained review of bugs, security concerns, code quality, and performance, plus an improved example and saved report. Source code is analyzed as text and never executed.

AI findings are suggestions. Review them manually and test any changes before relying on them.

## Implementation phases

1. Set up Vite React, Express, environment validation, MongoDB models, and shared request validation.
2. Add JWT authentication, profile changes, owner-scoped review APIs, input/rate limits, and Gemini structured analysis validated before saving.
3. Build responsive landing/auth pages, protected dashboard, Monaco editor, report, history, and profile, all connected to the API.
4. Add API/schema/UI tests and document installation and routes.

## Structure

```text
client/src/components/   Shared UI and authenticated shell
client/src/lib/          Axios client and authentication context
client/src/pages/        Landing, auth, dashboard, editor, reports, history, profile
client/src/styles.css    Responsive UI and themes
server/src/config/       Environment and MongoDB connection
server/src/controllers/  Auth, review, and profile handlers
server/src/middleware/   JWT, validation, and errors
server/src/models/       Mongoose User and CodeReview models
server/src/routes/       Auth, review, user API routes
server/src/services/     Gemini integration and Zod schemas
server/tests/            API boundary and response schema tests
```

## Setup

Requirements: Node.js 20.19+ or 22.12+, npm, MongoDB, and a Gemini API key.

1. Copy `.env.example` to `.env` in the project root.
2. Set `MONGODB_URI`, a random `JWT_SECRET` of 32+ characters, and `GEMINI_API_KEY`.
3. Run `npm install` from the project root.
4. Start MongoDB, then run `npm run dev`.

Client: `http://localhost:5173`. API: `http://localhost:5000`. Start services separately with `npm run dev --prefix server` and `npm run dev --prefix client`. Build with `npm run build`.

Get a key from [Google AI Studio](https://aistudio.google.com/app/apikey). Set `GEMINI_MODEL` to configure the model (default `gemini-2.5-flash`). Never use a `VITE_` prefix for server secrets.

## API

Protected endpoints require `Authorization: Bearer <JWT>`. Request validation errors return `{ message, errors }`.

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | Register `{ name, email, password }` |
| POST | `/api/auth/login` | Log in `{ email, password }` |
| GET | `/api/auth/me` | Current user |
| POST | `/api/reviews/analyze` | Analyze `{ title?, language, sourceCode }` |
| GET | `/api/reviews` | List latest 100; supports `search` and `language` |
| GET | `/api/reviews/stats` | User-scoped dashboard metrics and recent reviews |
| GET | `/api/reviews/:id` | Get a private review |
| DELETE | `/api/reviews/:id` | Delete a private review |
| GET | `/api/users/profile` | Read profile |
| PUT | `/api/users/profile` | Update name/email or password |
| GET | `/api/health` | API health |

Supported languages: `javascript`, `typescript`, `python`, `java`. Passwords require 10+ characters and must fit bcrypt’s 72-byte limit. AI requests are limited by `AI_RATE_LIMIT_WINDOW_MS` and `AI_RATE_LIMIT_MAX`. Every review query checks the signed-in owner.

Run suites with `npm test`, `npm run test:server`, and `npm run test:client`. Server tests avoid external Gemini/MongoDB calls and cover validation and response contracts.

Security: Gemini keys remain server-side; source size is limited; submitted code is untrusted and never run; passwords use bcrypt; JWT protects private routes; Helmet, CORS, Zod, and AI rate limiting are configured.

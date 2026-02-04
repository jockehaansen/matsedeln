# Matsedel 🍽️

### A simple food-planning dashboard

Matsedel is a small full-stack web application for planning meals, tracking available and upcoming recipes, and managing portions against a budget.
It is intentionally scoped to stay simple while following solid engineering practices.

### Current

#### Dashboard with:

- Available recipes
- Upcoming recipes
- Portion management (+ / −)
- Automatic status transitions (e.g. cooked recipes)
- Backend-driven state (database is the source of truth)
- Basic authentication (predetermined credentials)
- Seeded data for local development

#### Planned (v2)

Saved recipes page

Budget tracking & statistics

Recipe editing

Improved authentication (JWT)

Deployment (frontend + backend)

### Architecture

Monorepo (logical separation)

matsedel/
├─ backend/     # Java / Spring Boot API
└─ frontend/    # React / TypeScript SPA

#### Backend

Java 21

Spring Boot

Spring Security (Basic Auth)

Spring Data JPA

PostgreSQL (Neon)

Flyway (schema + seed migrations)

Design principles:

Semi-modular monolith

Explicit database migrations

Service layer owns business rules

Controllers expose stable API contracts

#### Frontend

React

TypeScript

MUI (Material UI)

Axios (single configured client)

Local state (useState / useEffect)

### Design principles:

Thin components

Centralized API access

No over-engineering (no global state libraries yet)

#### Authentication

Basic Auth

Predetermined credentials (no signup)

Stored client-side as Base64 for development

All /api/** endpoints are protected

This will be replaced with JWT in a later iteration.

#### Database & Migrations

PostgreSQL (hosted on Neon)

Flyway is the single source of truth for schema

Hibernate runs in validate mode (no auto-DDL)

#### Example migrations:

V1__create_recipes_table.sql

V2__seed_recipes.sql

## Getting Started (Local)
Backend

Requirements

Java 21

PostgreSQL (or Neon)

Gradle

Environment variables

DB_URL=jdbc:postgresql://<host>/<db>?sslmode=require
DB_USERNAME=...
DB_PASSWORD=...


Run

cd backend
./gradlew bootRun


API will be available at:

http://localhost:8080/api

Frontend

Requirements

Node.js (18+ recommended)

npm / pnpm / yarn

Install

cd frontend
npm install


Run

npm run dev


Frontend will be available at:

http://localhost:5173

API Overview (v1)
GET    /api/recipes/available
GET    /api/recipes/upcoming
PATCH  /api/recipes/{id}/portions


All endpoints require authentication.

Project Philosophy

This project intentionally prioritizes:

clarity over cleverness

explicit over implicit behavior

“good enough” solutions that can evolve

It is designed as a realistic solo-developer system, not a demo app.

Status

Active development
Expect breaking changes as features evolve.

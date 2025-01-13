# FOBOH Pricing Challenge

## Overview

This project is a submission for the FOBOH Pricing Challenge. It demonstrates a pricing module where suppliers can:

-   Filter products by category, segment, and brand.
-   Select products and make pricing adjustments (fixed or dynamic).
-   Save those pricing adjustment to their profile.

The project includes a backend API to handle pricing profile CRUD operations and pricing adjustments, built with Next.js (App Router) and Prisma ORM.

## Tech Stack

### Frontend

-   Framework: Next.js (App Router)
-   Styling: Tailwind CSS
-   Forms: React Hook Form
-   Validation: Zod (not fully implemented)

### Backend

-   Database: SQLite
-   ORM: Prisma
-   API: RESTful API routes built with Next.js

## Features

-   **Product Filtering**: Search and filter products by name, SKU, category, segment, and brand.
-   **Adjust Pricing**: Apply pricing adjustments (fixed or dynamic) to multiple products.
-   **Dynamic Table**: Display product adjustments with inline editing and validation.
-   **Form Validation**: Zod-based validation for pricing adjustments and profiles. (Incomplete)
-   **Database Management**: CRUD endpoints for pricing profiles and adjustments.

## Requirements

### System

-   Node.js v16+
-   SQLite

## Getting Started

1. Clone the Repository

```
git clone git@github.com:willdunlop/foboh-price-adjuster.git
cd foboh-pricing-challenge
```

2. Set Environment Variables

Create a `.env` file in the root directory using the `env.axample` file as a reference. 

```
cp env.example .env
```

Check you new `.env` file, there should be just one variable which is:

```
DATABASE_URL=file:./dev.db
```

3. Install all project dependencies using:

```
npm install
```

4. Initialize the Database

Run Prisma migrations and database seeder to set up the database:

```
npm run db:setup
```

5. Start the Development Server

```
npm run dev
```

The application will be available at http://localhost:3000.

# API Endpoints

## Swagger
Swagger documentation is available at http://localhost:3000/swagger

## Product Endpoints

1. **POST** `/api/products`

    - Filters products based on search, category, segment, and brand.
    - Request Body:

    ```
    {
        "search": "string",
        "category": "string",
        "segment": "string",
        "brand": "string"
    }
    ```


## Pricing Profile Endpoints

1. **GET** `/api/pricing-profiles`
    - Fetches all pricing profiles with adjustments.

    **POST** `/api/pricing-profiles`
    - Creates or updates a pricing profile.
    - Request Body:
    ```
        {
          "id": "string",
          "title": "string",
          "adjustmentMode": "increase | decrease",
          "adjustmentType": "fixed | dynamic",
          "adjustments": [
            {
              "productId": "string",
              "value": "string"
            }
          ]
        }
    ```

# Folder Structure
```
├── prisma/               # Prisma schema, migrations, db seeder
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # Reusable UI components
│   ├── lib/              # Utility libraries (e.g., Prisma client)
│   ├── styles/           # Tailwind CSS styles
├── .env                  # Environment variables
├── package.json          # Project configuration
├── README.md             # Project documentation
```

# Improvements

Given more time, these additional features and refinements could be implemented:

- Pagination: Improve scalability for large product datasets.
- Validation: Finish implementing client-side validation for more robust error handling.
- Unit Testing: Add Jest/React Testing Library for better test coverage.
- Design:
    - Full design was not implemented.
        - When editing your profile, only the 'multiple products' selection is functional. The radio buttons were emitted as a result
        - The 'pricing profile for one' screen was not implemented. Save occurs when pressing 'Next' (re-labled to 'Submit')
        - UI Elmements such as the side bar and top nav bar were not included as they had no practical use in the scope of this challenge
        - Tha ability to see your saved changes would provide a nicer user experience
- Bugs: Address remaining and known bugs
    - **POST** `/api/pricing-profiles`: This endpoint can update a profile and therefore the app works. Attempting to create through swagger will cause a `500` error



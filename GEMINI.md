# Project Overview

This is a vocational guidance platform for high school graduates in Santa Cruz, Montero, and Warnes, Bolivia. It aims to reduce vocational crisis and university dropout rates through gamified tests and labor market information.

The project is a web application built with the following technologies:

*   **Frontend:** React, Vite, TypeScript
*   **Backend:** Serverless functions on Vercel
*   **Database:** Supabase
*   **AI:** Gemini API
*   **Deployment:** Vercel

The application provides a vocational test, information about the job market, user profiles, and a matchmaking feature to connect students with educational institutions.

## Project Status

The project is well-structured and follows a sprint-based development plan. Sprints 1 through 6 are complete, which means the application is fully functional and includes features like user authentication, a dynamic adaptive vocational test, career recommendations, a matchmaking system, offline support, and a feedback mechanism.

## Building and Running

### Prerequisites

*   Node.js 18+
*   npm or pnpm

### Development

1.  **Clone the repository and install dependencies:**

    ```bash
    git clone <repository-url>
    cd orientacion-vocacional-bolivia
    npm install
    ```

2.  **Configure environment variables:**

    Copy the `.env.example` file to `.env` and fill in the Supabase and Gemini API credentials.

    ```bash
    cp .env.example .env
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:5173`.

### Production

*   **Build the application:**

    ```bash
    npm run build
    ```

    This will create a `dist` directory with the production-ready files.

*   **Preview the production build:**

    ```bash
    npm run preview
    ```

## Deployment

The project is deployed on Vercel. The `DESPLIEGUE_VERCEL.md` file provides detailed instructions on how to deploy the application. The `vercel.json` file configures the project for deployment on Vercel, including rewrite rules for the SPA.

## Development Conventions

*   **Styling:** The project has a detailed style guide in `STYLE_GUIDE.md`. It uses a modern, gamified, and technological design with a specific color palette, typography, and component styles. The `stich_design` directory contains a static HTML prototype of the vocational test.
*   **Linting:** The project uses `eslint` for linting, with rules defined in `eslint.config.js`. Run `npm run lint` to check for linting errors.
*   **TypeScript:** The project uses strict TypeScript, with the configuration defined in `tsconfig.json`. It includes a path alias `@/*` to `src/*`.
*   **Project Structure:** The project follows the structure recommended by Vite for React projects. Components are located in `src/components`, pages in `src/pages`, and hooks in `src/hooks`. Static assets are in the `public` directory.
*   **Routing:** The application uses `react-router-dom` for routing.
*   **Authentication:** User authentication is managed by Supabase and the `AuthContext`.
*   **Backend:** The backend is built with serverless functions on Vercel, located in the `api` directory.
    *   `api/proximo-paso.ts`: This function uses the Gemini API to generate the next question in the vocational test based on the user's previous answers.
    *   `api/recomendaciones.ts`: This function uses the Gemini API to generate career recommendations for the user based on their answers in the vocational test and the labor market context in Bolivia.

## AI Integration

The project uses the Gemini API for two key features:

1.  **Adaptive Vocational Test:** The `api/proximo-paso.ts` function generates a dynamic and adaptive vocational test. It uses the Gemini API to generate questions that are relevant to the user's previous answers, creating a personalized and engaging experience.
2.  **Career Recommendations:** The `api/recomendaciones.ts` function provides personalized career recommendations to the user. It sends the user's test results and the regional labor market context to the Gemini API, which generates a list of suitable careers with explanations.

## Database

The project uses Supabase for its database. The database schema is defined in the SQL files in the `supabase/migrations` directory.

*   `001_profiles.sql`: Defines the `profiles` table, which stores user information.
*   `002_feedback.sql`: Defines the `feedback` table, which stores user feedback.
*   `003_institutions_and_matching.sql`: Defines the tables for the matchmaking feature, including `institutions`, `academic_offers`, and `contact_interactions`.

## Documentation

The project includes the following documentation files:

*   `README.md`: Provides a general overview of the project and instructions on how to set it up and run it.
*   `PLAN_ORIENTACION_VOCACIONAL_BOLIVIA.md`: A detailed development plan for the project.
*   `DESPLIEGUE_VERCEL.md`: Detailed instructions on how to deploy the project to Vercel.
*   `STYLE_GUIDE.md`: A detailed style guide for the project.
*   `docs/ERROR_404_RECOMENDACIONES.md`: A troubleshooting guide for a 404 error that can occur when fetching recommendations.

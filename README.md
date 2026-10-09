# TOD — Todo On Demand

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js) ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript) ![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)

TOD (Todo On Demand) is a modern task-management interface built with Next.js, React, and TypeScript. It explores different ways of planning and organizing tasks through focused layouts, reusable checklist templates, project views, and interactive productivity tools.

## Live Demo

[Open the live application](https://apps-web-psi.vercel.app/)

## Features

- Create and manage todo items
- Mark tasks as completed
- Organize tasks by priority and project
- Multiple layouts, including minimal, daily, dark, and builder views
- Premade checklist templates and emoji-based checklists
- Project dashboard and mind-map planning view
- Light and dark visual themes
- English and Swedish translations
- PDF export support
- Responsive interface

## Screenshots

![Todo dashboard](public/tod/project1.png)

![Todo builder](public/tod/tod-builder.png)

![Premade checklists](public/tod/premade-checklists.png)

![Daily planner](public/tod/daily-planner.png)

![Mind-map view](public/tod/sherlock-mind-map.png)

## Technology Stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS and Radix UI
- Lucide React icons and Framer Motion
- Zustand for client-side state management
- Recharts for data visualisation
- jsPDF for PDF export
- next-intl for internationalisation
- Vercel for deployment

## Project Structure

```text
app/          Next.js routes and page layouts
components/   Reusable UI and todo components
data/         Checklist templates and sample data
i18n/         Internationalisation configuration
lib/          Authentication, PDF export, and utility functions
messages/     English and Swedish translations
public/tod/   Screenshots and demo assets
store/        Zustand state stores
```

## Run Locally

Requirements: Node.js 20 or later and npm.

```bash
git clone https://github.com/RMSSanali/apps-web.git
cd apps-web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Available commands:

```bash
npm run dev      # Start the development server
npm run lint     # Run ESLint
npm run build    # Create a production build
npm start        # Start the production server
```

## Deployment

The application is deployed on Vercel: [apps-web-psi.vercel.app](https://apps-web-psi.vercel.app/).

## Current Scope and Limitations

This repository focuses on the frontend experience and interaction design. Some task-management flows reference a local backend at `http://localhost:4000`, but that backend is not included in this repository.

The current authentication flow is intended for frontend demonstration and should not be treated as production-grade authentication without a secure backend, database, and server-side session management.

## Portfolio Context

This project demonstrates practical experience with TypeScript application development, React component design, Next.js App Router architecture, responsive UI development, client-side state management, reusable components, internationalisation, and frontend deployment with Vercel.

## Author

Created by [RMSSanali](https://github.com/RMSSanali).

## License

This project was created as a learning and practice project. All rights reserved unless otherwise specified.

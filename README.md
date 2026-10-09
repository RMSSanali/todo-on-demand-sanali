# TOD — Todo On Demand

A modern task-management application built with Next.js, React, and TypeScript.

[🌐 Live Demo](https://apps-web-psi.vercel.app/)  
[📦 GitHub Repository](https://github.com/RMSSanali/apps-web)

---

## ✨ About the Project

TOD — Todo On Demand is a productivity-focused web application designed to help users organise tasks, create checklists, manage projects, and explore different planning methods.

The application includes multiple interfaces for different workflows, including minimal task lists, daily planning, premade checklists, project organisation, and mind-map creation.

---

## 🌟 Main Features

- Create and manage todo items
- Mark tasks as completed
- Organise tasks by priority and project
- Premade checklist templates
- Emoji-based checklists
- Daily planner
- Minimal todo layout
- Dark mode interface
- Project dashboard
- Mind-map creator
- PDF export support
- English and Swedish language support
- Responsive design

---

## ⚙️ Installation

### Requirements

- Node.js 20 or later
- npm

### Setup

```bash
git clone https://github.com/RMSSanali/apps-web.git
cd apps-web
npm install
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

### Available Commands

```bash
npm run dev      # Start the development server
npm run lint     # Run ESLint
npm run build    # Create a production build
npm start        # Start the production server
```

---

## 🔧 Environment Variables

This project uses local environment configuration when required.

Create a `.env.local` file in the project root if local configuration is needed:

```env
# Add local development variables here if required
```

Do not commit `.env.local` or any file containing private credentials.

---

## 📁 Folder Structure

```text
app/              Next.js routes and page layouts
components/       Reusable UI and todo components
data/             Checklist templates and sample data
i18n/             Internationalisation configuration
lib/              Authentication, PDF export, and utilities
messages/         English and Swedish translations
public/tod/       Screenshots and demo assets
store/            Zustand state stores
```

---

## 🛠️ Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Radix UI
- Lucide React
- Framer Motion
- Zustand
- Recharts
- jsPDF
- next-intl
- Vercel

---

## 🎥 Built-in Tutorial and Planning Experiences

The project includes guided productivity and planning experiences that demonstrate how users can work with:

- Todo lists
- Daily planning
- Checklist templates
- Project organisation
- Mind-map planning
- Different productivity layouts

---

## 🎨 UI Polish Mode

The interface focuses on:

- Clear visual hierarchy
- Responsive layouts
- Reusable UI components
- Consistent spacing and typography
- Light and dark themes
- Accessible controls
- Interactive animations

---

## 🧭 Global Navigation

The application includes navigation for the main areas of the project, including:

- Home
- Todo views
- Templates
- Projects
- Builder
- Mind-map tools
- Authentication pages

---

## 🔐 Authentication System

The project includes a frontend authentication demonstration with login and registration interfaces.

The current authentication flow is intended for frontend demonstration. Production authentication would require a secure backend, database, server-side sessions, password hashing, and protected API routes.

---

## 📝 Minimal Todo App

The minimal todo view provides a focused interface for:

- Adding tasks
- Completing tasks
- Reviewing task progress
- Keeping the interface simple and distraction-free

---

## 🧠 Mind-map Creator

The mind-map view helps users organise ideas visually by connecting related concepts and planning tasks around a central topic.

---

## 🎨 Screenshots

### Todo Dashboard

![Todo dashboard](public/tod/project1.png)

### Todo Builder

![Todo builder](public/tod/tod-builder.png)

### Premade Checklists

![Premade checklists](public/tod/premade-checklists.png)

### Daily Planner

![Daily planner](public/tod/daily-planner.png)

### Mind-map Creator

![Mind-map creator](public/tod/sherlock-mind-map.png)

---

## 📦 Deployment

The application is deployed with Vercel:

[Open the live application](https://apps-web-psi.vercel.app/)

---

## ⚠️ Current Limitations

This repository focuses mainly on the frontend experience.

Some task-management flows reference a local backend at:

```text
http://localhost:4000
```

The backend is not included in this repository.

The current authentication flow is a frontend demonstration and should not be used as production authentication without a secure backend implementation.

---

## 🤝 Contributing

This project is personal portfolio work. Suggestions and improvements are welcome through pull requests.

---

## 📜 License

This project is available for educational and portfolio purposes.

---

## ❤️ Author

Created by [RMSSanali](https://github.com/RMSSanali).

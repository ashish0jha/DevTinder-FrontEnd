# 💻 DevTinder — Frontend
 
> A Tinder-style networking platform built for developers — swipe, connect, and collaborate with other devs based on skills and interests.
 
DevTinder is a full-stack social networking application that reimagines the "swipe to match" experience for the developer community. This repository contains the **React frontend** that powers the user interface, authentication flow, and real-time interactions with the backend API.
 
🔗 **Backend Repository:** [DevTinder Backend](https://github.com/ashish0jha/DevTinder)
 
---
 
## ✨ Features
 
- **🔐 Authentication** — Secure signup/login with JWT-based auth stored in HTTP-only cookies
- **🪪 Profile Management** — View and edit personal profile (bio, skills, photo, age, gender)
- **🔄 Developer Feed** — Browse other developers' cards with skills and interests
- **❤️ Connection Requests** — Send "Interested" or "Ignore" actions on profiles
- **📥 Manage Requests** — View received and sent connection requests in a dedicated tab
- **✅ Accept / Decline** — Respond to incoming connection requests
- **👥 My Connections** — View all accepted/matched connections
- **❌ Remove Connection** — Unmatch or remove an existing connection
- **🚪 Logout** — Secure session termination by clearing auth cookies
- **🎨 Responsive UI** — Built with Tailwind CSS + DaisyUI for a clean, modern dark-themed interface
---
 
## 🛠️ Tech Stack
 
| Category | Technology |
|---|---|
| **Library** | React |
| **Build Tool** | Vite |
| **Routing** | React Router |
| **State Management** | Redux Toolkit + React-Redux |
| **HTTP Client** | Axios |
| **Styling** | Tailwind CSS + DaisyUI |
 
---
 
## 📂 Project Structure
 
```
DevTinder-FrontEnd/
├── src/
│   ├── components/         # Reusable UI components (UserCard, NavBar, RequestItem, etc.)
│   ├── pages/               # Page-level views (Login, Feed, Connections, Requests, Profile)
│   ├── utils/                # Redux slices, store config, constants (baseUrl, etc.)
│   ├── App.jsx              # Root component with route definitions
│   └── main.jsx              # Application entry point
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```
 
---
 
## ⚙️ Getting Started
 
Follow these steps to run the project locally.
 
### Prerequisites
 
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)
- The [DevTinder Backend](https://github.com/ashish0jha/DevTinder) running locally or deployed
### 1. Clone the repository
 
```bash
git clone https://github.com/ashish0jha/DevTinder-FrontEnd.git
cd DevTinder-FrontEnd
```
 
### 2. Install dependencies
 
```bash
npm install
```
 
### 3. Configure the backend URL
 
Open `src/utils/constants.js` and ensure the `baseUrl` points to your running backend:
 
```javascript
export const baseUrl = "http://localhost:3000";
```
 
### 4. Start the development server
 
```bash
npm run dev
```
 
The app will be available at **`http://localhost:5173`**
 
### 5. Make sure the backend is running
 
This frontend depends on the DevTinder backend (Express + MongoDB) for authentication, feed data, and connection management. Without it running, API calls will fail.
 
---
 
## 📜 Available Scripts
 
| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Builds the app for production |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs ESLint to check code quality |
 
---
 
## 🔑 Key Implementation Highlights
 
- **Cookie-based JWT auth** — Tokens are stored in `httpOnly` cookies and sent automatically via `withCredentials: true` on every Axios request, keeping tokens inaccessible to client-side JavaScript (XSS protection).
- **Centralized state with Redux Toolkit** — User session, feed data, connections, and requests are managed through dedicated slices for predictable state updates across the app.
- **Protected routing** — Unauthenticated users are redirected to the login page when attempting to access protected routes.
- **Optimistic UI updates** — Actions like removing a connection or responding to a request update the Redux store immediately for a smoother user experience.
---
 
## 🚀 Deployment
 
This is a static Vite-built React app and can be deployed to any static hosting provider:
 
```bash
npm run build
```
 
This generates a `dist/` folder which can be deployed to **Vercel**, **Netlify**, **AWS S3 + CloudFront**, or served via **Nginx** on an EC2 instance alongside the backend.
 
> ⚠️ Remember to update `CORS` origin settings on the backend to match your deployed frontend URL, and set cookies with `secure: true` and `sameSite: "None"` for cross-origin HTTPS environments.
 
---
 
## 🤝 Contributing
 
Contributions, issues, and feature requests are welcome!
 
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
---
 
## 📄 License
 
This project is open-source and available for learning and personal use.
 
---
 
## 👤 Author
 
**Ashish Ojha**
- GitHub: [@ashish0jha](https://github.com/ashish0jha)
---
 
<p align="center">Built with ❤️ for the developer community</p>
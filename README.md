# DevTinder

Client for DevTinder — swipe through dev profiles, send connection requests, chat once you match, and go premium if you want extra reach. Talks to the DevTinder API underneath.

**Live:** http://13.236.147.238/ (served from the same EC2 instance as the backend — built and served as static files, no separate frontend deploy)

**Backend repo:** https://github.com/ashish0jha/DevTinder

## Stack

- React + Vite
- Redux Toolkit for state (feed, connections, requests, sent requests, user)
- React Router for navigation
- Tailwind CSS + DaisyUI for styling
- Socket.io-client for live chat
- Razorpay checkout integration for premium

## Pages

- **Login / Signup**
- **Feed** — browse other dev profiles, send Interested/Ignored
- **Connections** — people you've matched with
- **Requests** — incoming requests, accept or reject
- **Profile** — view and edit your own profile
- **Chat** — real-time messaging with a connection, over Socket.io
- **Premium** — Razorpay checkout for paid membership

## State management

Redux slices for the major pieces of data: `userSlice` (logged-in user), `feedSlice`, `connectionSlice`, `requestSlice` (incoming), and `sentRequestSlice` (outgoing). Components read from the store and dispatch actions on accept/reject/send rather than managing this locally, so the UI stays in sync across pages without prop-drilling.

## Folder structure

```
src/
├── components/
│   ├── Body.jsx
│   ├── Chat.jsx
│   ├── ConnectionItem.jsx
│   ├── Connections.jsx
│   ├── EditProfileCard.jsx
│   ├── Footer.jsx
│   ├── Login.jsx
│   ├── NavBar.jsx
│   ├── Premium.jsx
│   ├── Profile.jsx
│   ├── ReceivingRejectingRequest.jsx
│   ├── RequestItem.jsx
│   ├── SentRequestSection.jsx
│   └── UserCards.jsx
├── utils/
│   ├── appStore.js          # Redux store config
│   ├── connectionSlice.jsx
│   ├── constants.jsx
│   ├── feedSlice.js
│   ├── requestSlice.jsx
│   ├── sentRequestSlice.js
│   ├── socket.js            # Socket.io client setup
│   └── userSlice.js
├── App.jsx
├── index.css
└── main.jsx
```

## Running it locally

```bash
git clone https://github.com/ashish0jha/DevTinder-FrontEnd.git
cd DevTinder-FrontEnd
npm install
npm run dev
```

Make sure the backend is running first — the app expects the API to be reachable (check `src` for the base URL config and point it at your local backend if it's not already proxied).

## Build

```bash
npm run build
```

Outputs a `dist/` folder, which gets copied onto the EC2 instance and served alongside the API.

## Notes

- Routes are protected — no token, no access; you're bounced back to login.
- Chat connects over a websocket only after a connection request has been accepted, not before.
- Premium flow hits the backend to create a Razorpay order, then opens Razorpay's checkout — confirmation comes back through the backend webhook, not handled client-side.

## What's next

- In-app and push notifications for matches, messages, and requests
- A smarter feed — right now it's mostly exclusion-based; want to actually rank by shared skills/interests instead of just filtering out people already swiped on
- Search and filters on the feed (skills, experience level, tech stack)
- Voice/video calling for matched connections, on top of the existing chat

# ChatAI

![Logo](public/logo2.svg)

---

## Introduction

ChatAI is a modern, AI-powered video conferencing and chat application designed for seamless communication and collaboration. It leverages a powerful tech stack to provide real-time interactions, intelligent agent assistance, and a smooth user experience.

---

## Features

- **Real-time Video and Chat:** High-quality video and chat powered by Stream.
- **AI-Powered Agents:** Integrate AI agents into your meetings.
- **User Authentication:** Secure sign-up and sign-in with email, Google, and GitHub.
- **Meeting Management:** Schedule, join, and manage meetings.
- **Dashboard:** A comprehensive dashboard to view your meetings and agents.
- **Responsive Design:** A beautiful and responsive user interface built with shadcn/ui and Tailwind CSS.

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Database:** [Neon](https://neon.tech/) (Postgres)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **API:** [tRPC](https://trpc.io/)
- **Real-time Communication:** [Stream](https://getstream.io/)
- **Background Jobs:** [Inngest](https://www.inngest.com/)
- **Authentication:** [Better Auth](https://better-auth.dev/)

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v20 or later)
- npm, yarn, or pnpm

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/mdtabish0101/chatai.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd chatai
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```

### Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables. You will need to get these credentials from the respective services.

```env
# Database
DATABASE_URL="your_database_url"

# OpenAI
OPEN_API_KEY="your_openai_api_key"

# GitHub OAuth
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

# Google OAuth
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Polar
POLAR_ACCESS_TOKEN="your_polar_access_token"

# Stream (Chat)
NEXT_PUBLIC_STREAM_CHAT_API_KEY="your_stream_chat_api_key"
STREAM_CHAT_SECRET_KEY="your_stream_chat_secret_key"

# Stream (Video)
NEXT_PUBLIC_STREAM_VIDEO_API_KEY="your_stream_video_api_key"
STREAM_VIDEO_SECRET_KEY="your_stream_video_secret_key"

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Database Setup

Once you have set up your database and added the `DATABASE_URL` to your environment variables, you can push the schema to your database using Drizzle Kit:

```sh
npm run db:push
```

You can also use Drizzle Studio to view and manage your database:

```sh
npm run db:studio
```

### Running the Application

To start the development server, run:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Available Scripts

| Script        | Description                                      |
| ------------- | ------------------------------------------------ |
| `dev`         | Starts the development server.                   |
| `build`       | Builds the application for production.           |
| `start`       | Starts the production server.                    |
| `lint`        | Lints the codebase.                              |
| `db:push`     | Pushes the database schema using Drizzle Kit.    |
| `db:studio`   | Starts Drizzle Studio.                           |
| `dev:webhook` | Starts a webhook tunnel using ngrok.             |

---

## Deployment

This application is deployed on [Vercel](https://vercel.com/).

---

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

---


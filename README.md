This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Features
-Task Creation: Add tasks with details such as title, description, priority, and deadline.

-Priority Management: Set task priority levels (Low, Medium, High, Very High).

-Deadline Selection: Use a calendar picker to assign deadlines to tasks.

-Task Storage: Save tasks to localStorage for persistent state across sessions.

-Dynamic Dialogs: Use modal dialogs for creating and managing tasks.

-Form Validation: Ensure task inputs are valid using Zod schemas integrated with React Hook Form.

-Responsive UI: A user-friendly and responsive design built with Radix UI components.

## How It Works
## Adding Tasks:

Click the "Add Task" button to open a dialog.
Fill in the task details (title, description, priority, deadline).
Submit the form to save the task.
Viewing Tasks:

Tasks are displayed in a list with their respective details.
Persistent Storage:

Tasks are saved to localStorage to retain state after browser reload.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

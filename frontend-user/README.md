# Subscription Automation Platform

A Next.js application for managing and executing automation scripts with a subscription-based model.

## Features

- User authentication and authorization
- Script browsing and execution
- Execution history and monitoring
- Subscription management
- Token-based usage tracking
- Responsive design with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Context API and custom hooks
- **API Integration**: Fetch API with custom wrapper

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Copy `.env.example` to `.env.local` and update the values
4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
frontend-user/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js app router pages
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and API clients
│   ├── styles/          # Global styles
│   └── types/           # TypeScript type definitions
├── .env                 # Environment variables
├── .eslintrc.json       # ESLint configuration
├── next.config.js       # Next.js configuration
├── package.json         # Project dependencies
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Development

### Code Style

- Follow the ESLint and TypeScript configurations
- Use functional components with hooks
- Implement proper error handling
- Write meaningful comments for complex logic

### Testing

```bash
# Run tests
npm test
# or
yarn test
```

### Building for Production

```bash
# Build the application
npm run build
# or
yarn build

# Start the production server
npm start
# or
yarn start
```

## Deployment

The application can be deployed to any platform that supports Next.js, such as Vercel, Netlify, or a custom server.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
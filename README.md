Onboarding React Example

# Getting Started

We are using Node v24.13.0. Install nvm (or Volta) and use the following command to install the correct version of Node:

```bash
nvm install 24.13.0
```

The project already has a .nvmrc file that will automatically use the correct version of Node when you run `nvm use`.

So to run this application on a development server:

```bash
nvm use
npm install
npm run dev
```

# Building For Production

To build this application for production:

```bash
npm run build
```

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling.


## Routing

This project uses [TanStack Router](https://tanstack.com/router) with file-based routing. Routes are managed as files in `src/routes`.

## State Management

This project uses [Zustand](https://zustand-demo.pmnd.rs/) for state management.
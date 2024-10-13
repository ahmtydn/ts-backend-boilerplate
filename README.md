# TS Backend Boilerplate

This is a backend template built with TypeScript, designed to speed up the development process for backend projects. It provides a well-structured and scalable architecture with essential features for modern web applications. You can quickly get started by cloning this repository or using the following command:

```bash
npx ts-backend-boilerplate .
```

## Features

- **TypeScript**: Strongly typed programming for better code quality.
- **Modular Architecture**: Separation of concerns through different modules such as controllers, services, and models.
- **Error Handling**: Custom error handling middleware and centralized exception management.
- **JWT Authentication**: Pre-configured authentication using JSON Web Tokens (JWT).
- **Socket.IO Integration**: Ready-to-use setup for handling WebSocket connections.
- **Environment-Based Configurations**: Configuration management for different environments (development, production).
- **Security**: Includes utilities for encryption, UUID generation, and secure token management.
- **Validation**: Request validation with middleware support.
- **Logging**: Built-in logging functionality for better debugging and tracking.
- **Database Integration**: Easily connect to a database using the pre-configured setup.

## Project Structure

```bash
├── nodemon.json          # Configuration file for Nodemon
├── package-lock.json      # Package lock file
├── package.json           # Dependencies and project metadata
├── src
│   ├── app.ts            # Main app entry point
│   ├── config            # Environment configurations
│   │   └── index.ts
│   ├── controllers       # Business logic (e.g., auth, user management)
│   │   └── auth.controllers.ts
│   ├── databases         # Database connection and setup
│   │   └── index.ts
│   ├── exceptions        # Custom exceptions and error handling
│   │   └── http.exception.ts
│   ├── helpers           # Utility functions (e.g., token generation, cryptography)
│   │   ├── crypto.manager.ts
│   │   ├── token.manager.ts
│   │   └── uuid.manager.ts
│   ├── interfaces        # TypeScript interfaces for models, routes, etc.
│   │   └── users
│   │   │   └── user.interface.ts
│   ├── middlewares       # Express middleware (e.g., validation, error handling)
│   │   ├── error.middleware.ts
│   │   └── valid.middleware.ts
│   ├── models            # Database models (e.g., user model)
│   │   └── users
│   │       └── users.model.ts
│   ├── routes            # API routes
│   │   └── auth.route.ts
│   ├── server.ts         # Server configuration and start
│   ├── services          # Business logic services (e.g., auth, user services)
│   │   └── auth.service.ts
│   ├── sockets           # WebSocket setup and listeners
│   │   └── listen.sockets.ts
│   └── utils             # Utility files (e.g., error messages, logger)
│       ├── error.messages.ts
│       └── success.messages.ts
└── tsconfig.json          # TypeScript compiler configuration
```

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ts-backend-boilerplate.git
```

2. Install dependencies:

```bash
cd ts-backend-boilerplate
npm install
```

3. Set up your environment variables. You can use the `.env.example` as a template:

```bash
cp .env.example .env
```

4. Start the development server:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```

## Key Modules

### Controllers

The controllers handle the business logic and interact with services to process requests. For example, the `auth.controllers.ts` file handles authentication-related endpoints.

### Services

Services contain reusable business logic and are used by controllers to interact with external services or data models. For example, the `auth.service.ts` handles authentication and token management.

### Middlewares

Middlewares are used for validating requests, handling errors, and applying security measures like authentication checks. The `error.middleware.ts` catches and handles exceptions, while `valid.middleware.ts` ensures that incoming requests conform to expected data structures.

### Models

Models define the structure of the data stored in the database. For example, the `users.model.ts` defines the user schema for a MongoDB or SQL-based application.

### Utilities

Utility functions like cryptography (in `crypto.manager.ts`) and token management (`token.manager.ts`) are centralized in the `helpers` and `utils` folders for easy access and reusability.

### Sockets

The `sockets` folder contains files that help manage WebSocket connections. The `listen.sockets.ts` file is where you can define your real-time events and their handlers.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contributing

Feel free to submit issues, fork the repository, and create pull requests. Contributions are always welcome!

---

Happy coding! 🚀

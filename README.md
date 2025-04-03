# Subscription Automation Platform

A platform for managing and executing utility scripts based on user subscriptions and available tokens.

## Project Structure

- `frontend-user`: Next.js 14 application for end users
- `frontend-admin`: Next.js 14 application for administrators
- `backend`: Spring Boot REST API
- `db`: MySQL database with Docker setup

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local frontend development)
- Java 17+ (for local backend development)
- Maven (for local backend development)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/subscription-automation.git
cd subscription-automation
```

2. Create a `.env` file in the root directory:
```env
# MySQL Configuration
MYSQL_ROOT_PASSWORD=rootpassword
MYSQL_DATABASE=subscription_automation
MYSQL_USER=app_user
MYSQL_PASSWORD=app_password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production

# Frontend Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080
```

3. Start the application using Docker Compose:
```bash
docker-compose up -d
```

The following services will be available:
- Frontend User: http://localhost:3000
- Frontend Admin: http://localhost:3001
- Backend API: http://localhost:8080
- MySQL: localhost:3306

## Development

### Backend Development

1. Navigate to the backend directory:
```bash
cd backend
```

2. Run the application:
```bash
./mvnw spring-boot:run
```

### Frontend Development

1. Navigate to the frontend directory:
```bash
cd frontend-user  # or frontend-admin
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

## Features

### User Features
- Browse and search available scripts
- Execute scripts based on subscription level
- View execution history
- Manage profile and subscription
- Token management

### Admin Features
- User management
- Script management
- Execution monitoring
- Usage analytics
- System logs

## Security

- JWT-based authentication
- Role-based access control
- Secure password hashing
- CORS configuration
- Rate limiting
- Input validation
- XSS protection

## API Documentation

API documentation is available at:
- Swagger UI: http://localhost:8080/swagger-ui.html
- OpenAPI JSON: http://localhost:8080/api-docs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
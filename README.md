# 🚀 TaxPro - Professional Accounting & Tax Management

<div align="center">

![TaxPro Logo](https://via.placeholder.com/200x80/2196F3/ffffff?text=TaxPro)

**Enterprise-grade accounting and tax management system for large companies in Germany**

[![Node.js](https://img.shields.io/badge/Node.js-16%2B-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

</div>

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Development](#-development)
- [Docker Setup](#-docker-setup)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🏢 **Enterprise Accounting**
- **Complete Bookkeeping**: Full double-entry bookkeeping system
- **Invoice Management**: Professional invoice creation and tracking
- **Expense Management**: Digital receipt processing and categorization
- **Financial Reporting**: Comprehensive financial reports and analytics
- **Multi-Company Support**: Manage multiple subsidiaries and entities

### 🇩🇪 **German Tax Compliance**
- **VAT Management**: Automated VAT calculations and submissions
- **Tax Returns**: Streamlined tax return preparation
- **DATEV Integration**: Export data in DATEV format
- **GoBD Compliance**: Full compliance with German digital bookkeeping laws
- **ELSTER Integration**: Direct submission to German tax authorities

### 🔐 **Security & Compliance**
- **Enterprise Security**: Multi-factor authentication and role-based access
- **Data Encryption**: End-to-end encryption for sensitive financial data
- **Audit Trails**: Complete audit logs for all financial transactions
- **GDPR Compliance**: Full compliance with European data protection laws
- **Backup & Recovery**: Automated backups and disaster recovery

### 📊 **Business Intelligence**
- **Real-time Dashboard**: Live financial metrics and KPIs
- **Advanced Analytics**: Predictive analytics and forecasting
- **Custom Reports**: Build custom reports with drag-and-drop interface
- **Data Export**: Export to Excel, PDF, and other formats
- **API Integration**: RESTful API for third-party integrations

## 🛠 Tech Stack

### **Frontend**
- **React 18** with TypeScript
- **Material-UI (MUI)** for professional UI components
- **Redux Toolkit** for state management
- **React Query** for server state management
- **React Router** for navigation
- **Recharts** for data visualization

### **Backend**
- **Node.js** with Express.js framework
- **TypeScript** for type safety
- **PostgreSQL** for primary database
- **Redis** for caching and sessions
- **Sequelize ORM** for database operations
- **JWT** for authentication

### **DevOps & Infrastructure**
- **Docker** containerization
- **Docker Compose** for local development
- **Nginx** reverse proxy and load balancing
- **Prometheus** for monitoring
- **Grafana** for visualization
- **GitHub Actions** for CI/CD

### **Security**
- **Helmet.js** for security headers
- **Rate limiting** for API protection
- **bcryptjs** for password hashing
- **Express Validator** for input validation
- **CORS** configuration

## 🚀 Quick Start

### Prerequisites

- **Node.js** 16+ and npm 8+
- **PostgreSQL** 13+ (or use Docker)
- **Redis** 6+ (or use Docker)
- **Docker** (optional, for containerized setup)

### 1. Clone & Setup

```bash
git clone https://github.com/taxpro/taxpro-accounting.git
cd taxpro-accounting
chmod +x setup.sh
./setup.sh
```

### 2. Configure Environment

Edit `server/.env` with your settings:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=taxpro_accounting
DB_USER=your_username
DB_PASS=your_password

# JWT
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### 3. Start Development

```bash
npm run dev
```

🎉 **Your TaxPro system is now running!**

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api-docs

## 📦 Installation

### Manual Installation

```bash
# Install dependencies
npm install

# Install frontend dependencies
cd client && npm install && cd ..

# Install backend dependencies
cd server && npm install && cd ..

# Setup database
npm run db:migrate
npm run db:seed
```

### Docker Installation

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `5000` |
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_NAME` | Database name | `taxpro_accounting` |
| `JWT_SECRET` | JWT secret key | Required |
| `REDIS_HOST` | Redis host | `localhost` |
| `SMTP_HOST` | Email SMTP host | Required |

### Database Configuration

The system uses PostgreSQL with Sequelize ORM. Database migrations and seeders are managed through Sequelize CLI.

```bash
# Run migrations
npm run db:migrate

# Seed development data
npm run db:seed

# Reset database
npm run db:reset
```

## 🔧 Development

### Project Structure

```
taxpro-accounting/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Redux store
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   └── public/
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Database models
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
│   ├── migrations/         # Database migrations
│   └── seeders/           # Database seeders
├── docker-compose.yml      # Docker services
├── setup.sh               # Setup script
└── README.md
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start both frontend and backend |
| `npm run server` | Start only backend server |
| `npm run client` | Start only frontend |
| `npm run build` | Build for production |
| `npm test` | Run all tests |
| `npm run lint` | Lint all code |
| `npm run docker:up` | Start with Docker |

### Code Style

This project uses ESLint and Prettier for code formatting:

```bash
# Lint and fix
npm run lint:fix

# Format code
npx prettier --write .
```

## 🐳 Docker Setup

### Development with Docker

```bash
# Start all services
docker-compose up -d

# View services status
docker-compose ps

# View logs
docker-compose logs -f app

# Stop all services
docker-compose down
```

### Production Docker Build

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy to production
docker-compose -f docker-compose.prod.yml up -d
```

## 📚 API Documentation

The API documentation is available at `/api-docs` when the server is running. It includes:

- **Authentication endpoints**
- **User management**
- **Company management**
- **Invoice operations**
- **Expense tracking**
- **Financial reporting**
- **Tax calculations**

### API Examples

```javascript
// Authentication
POST /api/v1/auth/login
{
  "email": "user@company.de",
  "password": "password123"
}

// Create Invoice
POST /api/v1/invoices
{
  "customerId": "123",
  "items": [...],
  "dueDate": "2024-02-15"
}

// Get Financial Report
GET /api/v1/reports/financial?period=2024-Q1
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run frontend tests
npm run test:client

# Run backend tests
npm run test:server

# Watch mode
npm run test:watch
```

### Test Coverage

```bash
# Generate coverage report
npm run test:coverage

# View coverage
open coverage/lcov-report/index.html
```

## 🚀 Deployment

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Environment Setup

1. **Server Requirements**:
   - Node.js 16+
   - PostgreSQL 13+
   - Redis 6+
   - Nginx (recommended)

2. **Environment Variables**:
   - Set `NODE_ENV=production`
   - Configure production database
   - Set secure JWT secrets
   - Configure email settings

3. **SSL/TLS**:
   - Use Let's Encrypt for free SSL
   - Configure Nginx for HTTPS
   - Set up automatic certificate renewal

### Monitoring

The system includes built-in monitoring:

- **Prometheus**: Metrics collection
- **Grafana**: Visualization dashboards
- **Health checks**: Application health monitoring
- **Error tracking**: Comprehensive error logging

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Run linting and tests
6. Submit a pull request

### Code Guidelines

- Follow TypeScript best practices
- Write comprehensive tests
- Use semantic commit messages
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Email**: support@taxpro.de
- **Documentation**: https://docs.taxpro.de
- **GitHub Issues**: https://github.com/taxpro/taxpro-accounting/issues

## 🙏 Acknowledgments

- Built with ❤️ for German businesses
- Inspired by modern fintech solutions
- Designed for enterprise-scale operations

---

<div align="center">

**[Website](https://taxpro.de)** • **[Documentation](https://docs.taxpro.de)** • **[Support](mailto:support@taxpro.de)**

Made with ❤️ by the TaxPro Team

</div> 
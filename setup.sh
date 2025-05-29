#!/bin/bash

# 🚀 TaxPro - Professional Setup Script
# Dieses Script richtet das komplette TaxPro-System ein

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check system requirements
check_requirements() {
    print_status "Überprüfe Systemanforderungen..."
    
    # Check Node.js
    if command_exists node; then
        NODE_VERSION=$(node --version | cut -d 'v' -f 2)
        REQUIRED_NODE="16.0.0"
        if [ "$(printf '%s\n' "$REQUIRED_NODE" "$NODE_VERSION" | sort -V | head -n1)" = "$REQUIRED_NODE" ]; then
            print_success "Node.js $NODE_VERSION gefunden ✓"
        else
            print_error "Node.js >= $REQUIRED_NODE erforderlich, aber $NODE_VERSION gefunden"
            exit 1
        fi
    else
        print_error "Node.js ist nicht installiert"
        exit 1
    fi
    
    # Check npm
    if command_exists npm; then
        NPM_VERSION=$(npm --version)
        print_success "npm $NPM_VERSION gefunden ✓"
    else
        print_error "npm ist nicht installiert"
        exit 1
    fi
    
    # Check Docker (optional)
    if command_exists docker; then
        print_success "Docker gefunden ✓"
        DOCKER_AVAILABLE=true
    else
        print_warning "Docker nicht gefunden - nur lokale Entwicklung möglich"
        DOCKER_AVAILABLE=false
    fi
    
    # Check PostgreSQL (optional for local development)
    if command_exists psql; then
        print_success "PostgreSQL gefunden ✓"
        POSTGRES_LOCAL=true
    else
        print_warning "PostgreSQL nicht lokal installiert - Docker wird benötigt"
        POSTGRES_LOCAL=false
    fi
}

# Function to setup environment files
setup_environment() {
    print_status "Richte Umgebungsvariablen ein..."
    
    # Backend environment
    if [ ! -f "server/.env" ]; then
        cp server/.env.example server/.env
        print_success "Backend .env Datei erstellt"
        print_warning "Bitte bearbeite server/.env mit deinen Konfigurationen"
    else
        print_warning "Backend .env Datei existiert bereits"
    fi
    
    # Frontend environment
    if [ ! -f "client/.env" ]; then
        cat > client/.env << EOL
REACT_APP_API_URL=http://localhost:5000/api/v1
REACT_APP_ENVIRONMENT=development
REACT_APP_VERSION=1.0.0
REACT_APP_COMPANY_NAME=TaxPro GmbH
REACT_APP_SUPPORT_EMAIL=support@taxpro.de
EOL
        print_success "Frontend .env Datei erstellt"
    else
        print_warning "Frontend .env Datei existiert bereits"
    fi
}

# Function to install dependencies
install_dependencies() {
    print_status "Installiere Dependencies..."
    
    # Install root dependencies
    print_status "Installiere Root-Dependencies..."
    npm install
    
    # Install client dependencies if client directory exists
    if [ -d "client" ]; then
        print_status "Installiere Frontend-Dependencies..."
        cd client
        npm install
        
        # Install additional Material-UI and other packages
        print_status "Installiere zusätzliche Frontend-Packages..."
        npm install @mui/material @emotion/react @emotion/styled
        npm install @mui/icons-material
        npm install @reduxjs/toolkit react-redux
        npm install @tanstack/react-query
        npm install axios
        npm install react-router-dom
        npm install @mui/x-date-pickers
        npm install @mui/x-data-grid
        npm install recharts
        npm install react-hook-form
        npm install yup @hookform/resolvers
        
        cd ..
        print_success "Frontend-Dependencies installiert ✓"
    else
        print_warning "Client-Verzeichnis nicht gefunden - erstelle React App..."
        npx create-react-app client --template typescript
        print_success "React App erstellt ✓"
        
        # Install frontend dependencies
        cd client
        npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
        npm install @reduxjs/toolkit react-redux @tanstack/react-query axios react-router-dom
        cd ..
    fi
}

# Function to setup database
setup_database() {
    if [ "$POSTGRES_LOCAL" = true ]; then
        print_status "Richte lokale PostgreSQL-Datenbank ein..."
        
        # Check if database exists
        if psql -lqt | cut -d \| -f 1 | grep -qw taxpro_accounting; then
            print_warning "Datenbank 'taxpro_accounting' existiert bereits"
        else
            createdb taxpro_accounting
            print_success "Datenbank 'taxpro_accounting' erstellt ✓"
        fi
    elif [ "$DOCKER_AVAILABLE" = true ]; then
        print_status "Starte PostgreSQL mit Docker..."
        docker-compose up -d postgres redis
        
        # Wait for database to be ready
        print_status "Warte auf Datenbankverbindung..."
        sleep 10
        
        print_success "PostgreSQL und Redis mit Docker gestartet ✓"
    else
        print_error "Weder lokales PostgreSQL noch Docker verfügbar"
        exit 1
    fi
}

# Function to run migrations
run_migrations() {
    print_status "Führe Datenbank-Migrationen aus..."
    
    # Create migrations directory if it doesn't exist
    mkdir -p server/migrations
    mkdir -p server/seeders
    
    # Install sequelize-cli if not available
    if ! command_exists sequelize; then
        npm install -g sequelize-cli
    fi
    
    # Initialize sequelize config if needed
    if [ ! -f "server/.sequelizerc" ]; then
        cat > server/.sequelizerc << EOL
const path = require('path');

module.exports = {
  'config': path.resolve('config', 'database.js'),
  'models-path': path.resolve('models'),
  'seeders-path': path.resolve('seeders'),
  'migrations-path': path.resolve('migrations')
};
EOL
    fi
    
    print_success "Sequelize konfiguriert ✓"
}

# Function to create development data
create_dev_data() {
    print_status "Erstelle Entwicklungsdaten..."
    
    # This will be implemented when we have the full migration system
    print_success "Bereit für Entwicklungsdaten ✓"
}

# Function to start development servers
start_development() {
    print_status "Starte Entwicklungsumgebung..."
    
    # Start with Docker Compose if available
    if [ "$DOCKER_AVAILABLE" = true ]; then
        print_status "Starte mit Docker Compose..."
        docker-compose up -d
        
        print_success "🚀 TaxPro läuft jetzt mit Docker!"
        print_success "📊 Frontend: http://localhost:3000"
        print_success "🔧 Backend API: http://localhost:5000"
        print_success "💾 Grafana: http://localhost:3001"
        print_success "📈 Prometheus: http://localhost:9090"
        
    else
        print_status "Starte lokale Entwicklungsserver..."
        
        # Start backend in background
        cd server && npm start &
        BACKEND_PID=$!
        
        # Start frontend
        cd client && npm start &
        FRONTEND_PID=$!
        
        print_success "🚀 TaxPro läuft jetzt lokal!"
        print_success "📊 Frontend: http://localhost:3000"
        print_success "🔧 Backend API: http://localhost:5000"
        
        # Save PIDs for later cleanup
        echo $BACKEND_PID > .backend.pid
        echo $FRONTEND_PID > .frontend.pid
    fi
}

# Function to show final instructions
show_instructions() {
    echo ""
    echo "🎉 TaxPro Setup abgeschlossen!"
    echo ""
    echo "📋 Nächste Schritte:"
    echo "1. Bearbeite server/.env mit deinen Konfigurationen"
    echo "2. Starte die Entwicklungsumgebung: npm run dev"
    echo "3. Öffne http://localhost:3000 im Browser"
    echo ""
    echo "📚 Nützliche Befehle:"
    echo "- npm run dev         # Starte Frontend & Backend"
    echo "- npm run server      # Nur Backend starten"
    echo "- npm run client      # Nur Frontend starten"
    echo "- npm run build       # Production Build"
    echo "- npm test            # Tests ausführen"
    echo ""
    echo "🐳 Docker Befehle:"
    echo "- docker-compose up -d     # Alle Services starten"
    echo "- docker-compose down      # Alle Services stoppen"
    echo "- docker-compose logs -f   # Logs anzeigen"
    echo ""
    echo "📞 Support: support@taxpro.de"
    echo "📖 Dokumentation: https://docs.taxpro.de"
    echo ""
}

# Main execution
main() {
    echo "🚀 TaxPro Professional Setup"
    echo "=============================="
    echo ""
    
    check_requirements
    setup_environment
    install_dependencies
    setup_database
    run_migrations
    create_dev_data
    
    echo ""
    read -p "Möchtest du die Entwicklungsumgebung jetzt starten? (y/n): " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        start_development
    fi
    
    show_instructions
}

# Run main function
main "$@" 
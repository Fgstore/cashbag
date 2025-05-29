// Global variables
let invoiceCounter = 1;
let invoices = [];
let otherIncomes = [];
let mahnungen = [];
let ausgaben = [];

// Sample data for Auftragsbestätigungen
let auftragsbestatigungen = [
    {
        id: 'AB001',
        nummer: 'AB-2024-001',
        kunde: 'Mustermann GmbH',
        datum: '2024-01-15',
        betrag: 2500.00,
        status: 'bestätigt'
    },
    {
        id: 'AB002',
        nummer: 'AB-2024-002',
        kunde: 'Schmidt & Partner',
        datum: '2024-01-18',
        betrag: 1750.00,
        status: 'offen'
    },
    {
        id: 'AB003',
        nummer: 'AB-2024-003',
        kunde: 'Weber Industries',
        datum: '2024-01-20',
        betrag: 3200.00,
        status: 'in Bearbeitung'
    }
];

// Sample data for Lieferscheine
let lieferscheine = [
    {
        id: 'LS001',
        nummer: 'LS-2024-001',
        kunde: 'Mustermann GmbH',
        lieferdatum: '2024-01-20',
        status: 'geliefert'
    },
    {
        id: 'LS002',
        nummer: 'LS-2024-002',
        kunde: 'Schmidt & Partner',
        datum: '2024-01-22',
        status: 'versandbereit'
    },
    {
        id: 'LS003',
        nummer: 'LS-2024-003',
        kunde: 'Weber Industries',
        datum: '2024-01-25',
        status: 'in Vorbereitung'
    }
];

// Sample data for Ausgaben
ausgaben = [
    {
        id: 'EXP001',
        datum: '2024-01-15',
        beschreibung: 'Büromaterial - Stifte und Notizblöcke',
        kategorie: 'bueromaterial',
        betragNetto: 42.86,
        mwst: 19,
        betragBrutto: 51.00,
        lieferant: 'Office Depot',
        status: 'erfasst'
    },
    {
        id: 'EXP002',
        datum: '2024-01-18',
        beschreibung: 'Software-Lizenz Adobe Creative Suite',
        kategorie: 'software',
        betragNetto: 504.20,
        mwst: 19,
        betragBrutto: 600.00,
        lieferant: 'Adobe Systems',
        status: 'erfasst'
    },
    {
        id: 'EXP003',
        datum: '2024-01-20',
        beschreibung: 'Geschäftsessen mit Kunden',
        kategorie: 'bewirtung',
        betragNetto: 89.08,
        mwst: 19,
        betragBrutto: 106.00,
        lieferant: 'Restaurant Bella Vista',
        status: 'erfasst'
    },
    {
        id: 'EXP004',
        datum: '2024-01-22',
        beschreibung: 'Tankkosten Firmenwagen',
        kategorie: 'reisekosten',
        betragNetto: 67.23,
        mwst: 19,
        betragBrutto: 80.00,
        lieferant: 'Shell Tankstelle',
        status: 'erfasst'
    },
    {
        id: 'EXP005',
        datum: '2024-01-25',
        beschreibung: 'Online-Marketing Kampagne',
        kategorie: 'marketing',
        betragNetto: 420.17,
        mwst: 19,
        betragBrutto: 500.00,
        lieferant: 'Google Ads',
        status: 'erfasst'
    }
];

// DOM elements
const menuItems = document.querySelectorAll('.menu-item');
const submenuItems = document.querySelectorAll('.submenu-item');
const contentSections = document.querySelectorAll('.content-section');
const pageTitle = document.getElementById('page-title');
const sidebar = document.getElementById('sidebar');
const contentArea = document.querySelector('.content-area');
const menuToggle = document.getElementById('menu-toggle');
const sidebarOverlay = document.getElementById('sidebar-overlay');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadSampleData();
    updateInvoiceNumber();
    setDefaultDates();
    updateInvoicesList();
    updateOtherIncomesList();
    updateMahnungenList();
    updateStats();
    loadReminders();
    initializeSchnellstart();
    initializeDashboard();
    loadAuftragsbestatigungen();
    loadLieferscheine();
    loadAusgaben();
    initializeAusgabenEventListeners();
});

// Initialize Feather Icons
function initializeFeatherIcons() {
    try {
        if (typeof feather !== 'undefined') {
            feather.replace();
            console.log('Feather icons initialized successfully');
            
            // Add fallback text for icons that failed to load
            document.querySelectorAll('i[data-feather]').forEach(icon => {
                if (!icon.innerHTML.trim()) {
                    const iconName = icon.getAttribute('data-feather');
                    const fallbackText = {
                        'home': '🏠',
                        'file': '📄',
                        'users': '👥',
                        'settings': '⚙️',
                        'plus': '➕',
                        'edit': '✏️',
                        'trash': '🗑️',
                        'eye': '👁️',
                        'download': '⬇️',
                        'upload': '⬆️',
                        'search': '🔍',
                        'filter': '🔽',
                        'calendar': '📅',
                        'mail': '✉️',
                        'phone': '📞',
                        'map-pin': '📍',
                        'credit-card': '💳',
                        'dollar-sign': '💰',
                        'trending-up': '📈',
                        'trending-down': '📉',
                        'bell': '🔔',
                        'user': '👤',
                        'menu': '☰',
                        'x': '✕',
                        'check': '✓',
                        'arrow-right': '→',
                        'arrow-left': '←',
                        'arrow-up': '↑',
                        'arrow-down': '↓'
                    };
                    
                    if (fallbackText[iconName]) {
                        icon.innerHTML = fallbackText[iconName];
                        icon.style.fontSize = '16px';
                    }
                }
            });
        } else {
            console.warn('Feather icons library not loaded, retrying...');
            setTimeout(() => {
                initializeFeatherIcons();
            }, 1000);
        }
    } catch (error) {
        console.error('Error initializing Feather icons:', error);
        
        // Fallback: Add emoji icons
        document.querySelectorAll('i[data-feather]').forEach(icon => {
            const iconName = icon.getAttribute('data-feather');
            const fallbackText = {
                'home': '🏠',
                'file': '📄',
                'users': '👥',
                'settings': '⚙️',
                'plus': '➕'
            };
            
            if (fallbackText[iconName]) {
                icon.innerHTML = fallbackText[iconName];
                icon.style.fontSize = '16px';
            }
        });
    }
}

// Initialize Preview Chart
function initializePreviewChart() {
    const canvas = document.getElementById('preview-chart-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Sample data for preview chart
    const data = [20, 35, 25, 45, 30, 50, 40, 60, 45, 70];
    const max = Math.max(...data);
    const width = canvas.width;
    const height = canvas.height;
    const padding = 10;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(14, 165, 233, 0.3)');
    gradient.addColorStop(1, 'rgba(14, 165, 233, 0.05)');
    
    // Draw chart
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    
    for (let i = 0; i < data.length; i++) {
        const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
        const y = height - padding - (data[i] / max) * (height - 2 * padding);
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    
    // Close path for fill
    ctx.lineTo(width - padding, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    
    // Fill with gradient
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw line
    ctx.beginPath();
    ctx.moveTo(padding, height - padding - (data[0] / max) * (height - 2 * padding));
    
    for (let i = 0; i < data.length; i++) {
        const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
        const y = height - padding - (data[i] / max) * (height - 2 * padding);
        ctx.lineTo(x, y);
    }
    
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw points
    for (let i = 0; i < data.length; i++) {
        const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
        const y = height - padding - (data[i] / max) * (height - 2 * padding);
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = '#0ea5e9';
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

// Modern toggle submenu function
function toggleSubmenu(menuItem) {
    const submenu = menuItem.querySelector('.submenu');
    const isExpanded = menuItem.classList.contains('expanded');
    
    // Close all other submenus
    document.querySelectorAll('.menu-item.expanded').forEach(item => {
        if (item !== menuItem) {
            item.classList.remove('expanded');
            const otherSubmenu = item.querySelector('.submenu');
            if (otherSubmenu) {
                otherSubmenu.classList.remove('expanded');
            }
        }
    });
    
    // Toggle current submenu
    if (isExpanded) {
        menuItem.classList.remove('expanded');
        submenu.classList.remove('expanded');
    } else {
        menuItem.classList.add('expanded');
        submenu.classList.add('expanded');
    }
}

// Modern sidebar toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

// Update the initializeApp function
function initializeApp() {
    console.log('TaxPro Application initialized');
    
    // Initialize in proper order
    loadSampleData();
    setupEventListeners();
    
    // Initialize icons multiple times to ensure they load
    initializeFeatherIcons();
    
    // Initialize preview chart with a small delay
    setTimeout(() => {
        initializePreviewChart();
        initializeFeatherIcons(); // Reinitialize after chart creation
    }, 100);
    
    // Additional icon initialization for dynamic content
    setTimeout(() => {
        initializeFeatherIcons();
    }, 500);
    
    // Initialize section based on current location
    const currentSection = 'schnellstart';
    navigateToSection(currentSection);
    
    // Final icon initialization
    setTimeout(() => {
        initializeFeatherIcons();
        console.log('Final icon initialization completed');
    }, 1000);
}

function setupEventListeners() {
    // Initialize invoice form handlers
    const invoiceForm = document.getElementById('invoice-form');
    if (invoiceForm) {
        invoiceForm.addEventListener('submit', handleInvoiceSubmit);
    }

    // Initialize other income form handlers
    const otherIncomeForm = document.getElementById('other-income-form');
    if (otherIncomeForm) {
        otherIncomeForm.addEventListener('submit', handleOtherIncomeSubmit);
    }

    // Initialize mahnung form handlers
    const mahnungForm = document.getElementById('mahnung-form');
    if (mahnungForm) {
        mahnungForm.addEventListener('submit', handleMahnungSubmit);
    }

    // Initialize ausgaben form handlers
    const ausgabeForm = document.getElementById('ausgabe-form');
    if (ausgabeForm) {
        ausgabeForm.addEventListener('submit', handleAusgabeSubmit);
    }

    // Add item button
    const addItemBtn = document.getElementById('add-item-btn');
    if (addItemBtn) {
        addItemBtn.addEventListener('click', addInvoiceItem);
    }

    // Menu items click handlers - modern approach
    document.querySelectorAll('.menu-item:not(.has-submenu)').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const onclick = this.getAttribute('onclick');
            if (onclick && onclick.includes('navigateToSection')) {
                const section = onclick.match(/navigateToSection\('([^']+)'\)/)[1];
                navigateToSection(section);
            }
        });
    });

    // Submenu handlers
    document.querySelectorAll('.submenu-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const onclick = this.getAttribute('onclick');
            if (onclick && onclick.includes('navigateToSection')) {
                const section = onclick.match(/navigateToSection\('([^']+)'\)/)[1];
                navigateToSection(section);
            }
        });
    });

    // Customer filters
    const typFilter = document.getElementById('typ-filter');
    const statusFilter = document.getElementById('status-filter');
    const kundenSearch = document.getElementById('kunden-search');
    
    if (typFilter) {
        typFilter.addEventListener('change', filterKunden);
    }
    if (statusFilter) {
        statusFilter.addEventListener('change', filterKunden);
    }
    if (kundenSearch) {
        kundenSearch.addEventListener('input', filterKunden);
    }

    // Modern button handlers
    document.addEventListener('click', function(e) {
        // Handle action cards
        if (e.target.closest('.action-card')) {
            const card = e.target.closest('.action-card');
            const onclick = card.getAttribute('onclick');
            if (onclick && onclick.includes('navigateToSection')) {
                const section = onclick.match(/navigateToSection\('([^']+)'\)/)[1];
                navigateToSection(section);
            }
        }

        // Handle buttons with onclick attributes
        if (e.target.matches('button[onclick]')) {
            const onclick = e.target.getAttribute('onclick');
            if (onclick && onclick.includes('navigateToSection')) {
                e.preventDefault();
                const section = onclick.match(/navigateToSection\('([^']+)'\)/)[1];
                navigateToSection(section);
            }
        }
    });

    // Initialize ausgaben event listeners
    initializeAusgabenEventListeners();

    // Re-initialize Feather icons after DOM changes
    setTimeout(() => {
        initializeFeatherIcons();
    }, 100);
}

function toggleSubmenu(menuItem) {
    const submenu = menuItem.nextElementSibling;
    const arrow = menuItem.querySelector('.arrow');
    
    if (submenu && submenu.classList.contains('submenu')) {
        submenu.classList.toggle('expanded');
        menuItem.classList.toggle('expanded');
        
        if (arrow) {
            arrow.style.transform = submenu.classList.contains('expanded') 
                ? 'rotate(180deg)' 
                : 'rotate(0deg)';
        }
    }
}

function navigateToSection(sectionName) {
    const titles = {
        'schnellstart': 'Schnellstart',
        'dashboard': 'Übersicht',
        'angebote': 'Angebote',
        'auftragsbestatigungen': 'Auftragsbestätigungen',
        'lieferscheine': 'Lieferscheine',
        'neue-rechnung': 'Neue Rechnung',
        'rechnungen-liste': 'Rechnungen',
        'rechnungen': 'Rechnungen',
        'sonstige-einnahmen': 'Sonstige Einnahmen',
        'mahnungen': 'Mahnungen',
        'ausgaben': 'Ausgaben',
        'kunden': 'Kundenverwaltung',
        'berichte': 'Berichte',
        'einstellungen': 'Einstellungen',
        'einstellungen-benutzer': 'Einstellungen - Benutzer',
        'einstellungen-buchhaltung': 'Einstellungen - Buchhaltung',
        'einstellungen-unternehmen': 'Einstellungen - Unternehmen',
        'einstellungen-system': 'Einstellungen - System',
        'einstellungen-briefpapier': 'Einstellungen - Briefpapier',
        'einstellungen-textvorlagen': 'Einstellungen - Textvorlagen'
    };

    // Update page title
    const pageTitle = document.getElementById('page-title');
    if (pageTitle && titles[sectionName]) {
        pageTitle.textContent = titles[sectionName];
    }

    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));

    // Handle settings subsections
    if (sectionName.startsWith('einstellungen-')) {
        const targetSection = document.getElementById('einstellungen-section');
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Switch to the appropriate settings tab
        const settingsTab = sectionName.replace('einstellungen-', '');
        switchSettingsTab(settingsTab);
    } else {
        // Show target section for non-settings sections
        const targetSection = document.getElementById(sectionName + '-section');
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }

    // Update sidebar
    const menuItems = document.querySelectorAll('.menu-item, .submenu-item');
    menuItems.forEach(item => item.classList.remove('active'));

    const activeItem = document.querySelector(`[data-section="${sectionName}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }

    // Initialize section-specific functionality
    if (sectionName === 'dashboard') {
        initializeDashboard();
    } else if (sectionName === 'ausgaben') {
        loadAusgaben();
        initializeAusgabenEventListeners();
    } else if (sectionName === 'rechnungen-liste' || sectionName === 'rechnungen') {
        updateInvoicesList();
    } else if (sectionName === 'sonstige-einnahmen') {
        updateOtherIncomesList();
    } else if (sectionName === 'mahnungen') {
        updateMahnungenList();
    } else if (sectionName === 'auftragsbestatigungen') {
        loadAuftragsbestatigungen();
    } else if (sectionName === 'lieferscheine') {
        loadLieferscheine();
    } else if (sectionName === 'kunden') {
        showKundenSection();
    } else if (sectionName === 'einstellungen' || sectionName.startsWith('einstellungen-')) {
        initializeEinstellungen();
    }
    
    // Reinitialize icons after section change
    setTimeout(() => {
        initializeFeatherIcons();
    }, 100);
}

// New function to switch settings tabs
function switchSettingsTab(tabName) {
    // Hide all settings content
    const settingsContents = document.querySelectorAll('.settings-content');
    settingsContents.forEach(content => content.classList.remove('active'));
    
    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => button.classList.remove('active'));
    
    // Show the selected settings content
    const targetContent = document.getElementById(tabName + '-settings');
    if (targetContent) {
        targetContent.classList.add('active');
    }
    
    // Add active class to the selected tab button
    const targetButton = document.querySelector(`[data-tab="${tabName}"]`);
    if (targetButton) {
        targetButton.classList.add('active');
    }
}

function addInvoiceItem() {
    const container = document.getElementById('invoice-items-container');
    const newItem = document.createElement('div');
    newItem.className = 'invoice-item';
    newItem.innerHTML = `
        <input type="text" placeholder="Beschreibung" class="item-description" required>
        <input type="number" placeholder="1" class="item-quantity" min="1" value="1" required>
        <input type="number" placeholder="0.00" class="item-price" step="0.01" min="0" required>
        <select class="item-tax">
            <option value="19">19%</option>
            <option value="7">7%</option>
            <option value="0">0%</option>
        </select>
        <span class="item-total">€0.00</span>
        <button type="button" class="btn-remove-item">
            <i class="fas fa-trash"></i>
        </button>
    `;
    
    container.appendChild(newItem);
    setupItemEventListeners(newItem);
}

function setupItemEventListeners(item) {
    const removeBtn = item.querySelector('.btn-remove-item');
    const quantityInput = item.querySelector('.item-quantity');
    const priceInput = item.querySelector('.item-price');
    const taxSelect = item.querySelector('.item-tax');
    
    removeBtn.addEventListener('click', function() {
        if (document.querySelectorAll('.invoice-item').length > 1) {
            item.remove();
            calculateInvoiceTotal();
        }
    });
    
    [quantityInput, priceInput, taxSelect].forEach(input => {
        input.addEventListener('input', function() {
            updateItemTotal(item);
        });
    });
}

function updateItemTotal(item) {
    const quantity = parseFloat(item.querySelector('.item-quantity').value) || 0;
    const price = parseFloat(item.querySelector('.item-price').value) || 0;
    const total = quantity * price;
    
    item.querySelector('.item-total').textContent = `€${total.toFixed(2)}`;
    calculateInvoiceTotal();
}

function calculateInvoiceTotal() {
    const invoiceItems = document.querySelectorAll('.invoice-item');
    let subtotal = 0;
    let taxTotal = 0;
    
    invoiceItems.forEach(item => {
        const quantity = parseFloat(item.querySelector('.item-quantity').value) || 0;
        const price = parseFloat(item.querySelector('.item-price').value) || 0;
        const taxRate = parseFloat(item.querySelector('.item-tax').value) || 0;
        
        const itemTotal = quantity * price;
        const itemTax = itemTotal * (taxRate / 100);
        
        subtotal += itemTotal;
        taxTotal += itemTax;
    });
    
    const grandTotal = subtotal + taxTotal;
    
    document.getElementById('subtotal').textContent = `€${subtotal.toFixed(2)}`;
    document.getElementById('tax-total').textContent = `€${taxTotal.toFixed(2)}`;
    document.getElementById('grand-total').textContent = `€${grandTotal.toFixed(2)}`;
}

function handleInvoiceSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const invoiceData = {
        id: Date.now(),
        nummer: document.getElementById('rechnungsnummer').value,
        kunde: getCustomerName(formData.get('kunde')),
        datum: formData.get('rechnungsdatum'),
        faelligkeit: formData.get('faelligkeitsdatum'),
        status: 'versendet',
        items: [],
        subtotal: 0,
        tax: 0,
        total: 0
    };
    
    // Collect invoice items
    const invoiceItems = document.querySelectorAll('.invoice-item');
    invoiceItems.forEach(item => {
        const description = item.querySelector('.item-description').value;
        const quantity = parseFloat(item.querySelector('.item-quantity').value) || 0;
        const price = parseFloat(item.querySelector('.item-price').value) || 0;
        const taxRate = parseFloat(item.querySelector('.item-tax').value) || 0;
        
        if (description && quantity > 0 && price > 0) {
            const itemTotal = quantity * price;
            const itemTax = itemTotal * (taxRate / 100);
            
            invoiceData.items.push({
                description,
                quantity,
                price,
                taxRate,
                total: itemTotal
            });
            
            invoiceData.subtotal += itemTotal;
            invoiceData.tax += itemTax;
        }
    });
    
    invoiceData.total = invoiceData.subtotal + invoiceData.tax;
    
    // Save invoice
    invoices.push(invoiceData);
    invoiceCounter++;
    
    // Show success message
    showMessage('success', 'Rechnung erfolgreich erstellt!');
    
    // Reset form
    resetInvoiceForm();
    
    // Update invoices list
    updateInvoicesList();
    
    // Navigate to invoices list
    setTimeout(() => {
        navigateToSection('rechnungen-liste');
    }, 1500);
}

function saveDraft() {
    const formData = new FormData(document.getElementById('neue-rechnung-form'));
    const draftData = {
        id: Date.now(),
        nummer: document.getElementById('rechnungsnummer').value,
        kunde: getCustomerName(formData.get('kunde')),
        datum: formData.get('rechnungsdatum'),
        faelligkeit: formData.get('faelligkeitsdatum'),
        status: 'entwurf',
        items: [],
        subtotal: 0,
        tax: 0,
        total: 0
    };
    
    // Collect items
    const invoiceItems = document.querySelectorAll('.invoice-item');
    invoiceItems.forEach(item => {
        const description = item.querySelector('.item-description').value;
        const quantity = parseFloat(item.querySelector('.item-quantity').value) || 0;
        const price = parseFloat(item.querySelector('.item-price').value) || 0;
        const taxRate = parseFloat(item.querySelector('.item-tax').value) || 0;
        
        if (description || quantity > 0 || price > 0) {
            const itemTotal = quantity * price;
            const itemTax = itemTotal * (taxRate / 100);
            
            draftData.items.push({
                description,
                quantity,
                price,
                taxRate,
                total: itemTotal
            });
            
            draftData.subtotal += itemTotal;
            draftData.tax += itemTax;
        }
    });
    
    draftData.total = draftData.subtotal + draftData.tax;
    
    // Save draft
    invoices.push(draftData);
    invoiceCounter++;
    
    // Show success message
    showMessage('success', 'Entwurf erfolgreich gespeichert!');
    
    // Reset form
    resetInvoiceForm();
    
    // Update invoices list
    updateInvoicesList();
}

function resetInvoiceForm() {
    const form = document.getElementById('neue-rechnung-form');
    form.reset();
    
    // Reset invoice items to just one
    const container = document.getElementById('invoice-items-container');
    const items = container.querySelectorAll('.invoice-item');
    items.forEach((item, index) => {
        if (index > 0) {
            item.remove();
        }
    });
    
    // Reset totals
    document.getElementById('subtotal').textContent = '€0.00';
    document.getElementById('tax-total').textContent = '€0.00';
    document.getElementById('grand-total').textContent = '€0.00';
    
    // Update invoice number and dates
    updateInvoiceNumber();
    setDefaultDates();
}

function updateInvoiceNumber() {
    const invoiceNumberField = document.getElementById('rechnungsnummer');
    if (invoiceNumberField) {
        invoiceNumberField.value = `RG-2024-${String(invoiceCounter).padStart(3, '0')}`;
    }
}

function setDefaultDates() {
    const today = new Date().toISOString().split('T')[0];
    const rechnungsdatum = document.getElementById('rechnungsdatum');
    const faelligkeitsdatum = document.getElementById('faelligkeitsdatum');
    
    if (rechnungsdatum) rechnungsdatum.value = today;
    
    if (faelligkeitsdatum) {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 30);
        faelligkeitsdatum.value = dueDate.toISOString().split('T')[0];
    }
}

function getCustomerName(customerValue) {
    const customers = {
        'mustermann': 'Mustermann GmbH',
        'schmidt': 'Schmidt & Partner',
        'weber': 'Weber Industries',
        'mueller': 'Müller AG'
    };
    return customers[customerValue] || customerValue;
}

function updateInvoicesList() {
    const tbody = document.getElementById('rechnungen-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    invoices.forEach(invoice => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${invoice.nummer}</td>
            <td>${invoice.kunde}</td>
            <td>${formatDate(invoice.datum)}</td>
            <td>${formatDate(invoice.faelligkeit)}</td>
            <td>€${invoice.total.toFixed(2)}</td>
            <td><span class="status-badge status-${invoice.status}">${getStatusText(invoice.status)}</span></td>
            <td>
                <button class="action-btn view" onclick="viewInvoice(${invoice.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn edit" onclick="editInvoice(${invoice.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" onclick="deleteInvoice(${invoice.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function filterInvoices() {
    const statusFilter = document.getElementById('status-filter').value;
    const dateFilter = document.getElementById('date-filter').value;
    const searchFilter = document.getElementById('search-filter').value.toLowerCase();
    
    let filteredInvoices = invoices;
    
    // Filter by status
    if (statusFilter) {
        filteredInvoices = filteredInvoices.filter(invoice => invoice.status === statusFilter);
    }
    
    // Filter by search term
    if (searchFilter) {
        filteredInvoices = filteredInvoices.filter(invoice => 
            invoice.nummer.toLowerCase().includes(searchFilter) ||
            invoice.kunde.toLowerCase().includes(searchFilter)
        );
    }
    
    // Update table with filtered results
    const tbody = document.getElementById('rechnungen-tbody');
    tbody.innerHTML = '';
    
    filteredInvoices.forEach(invoice => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${invoice.nummer}</td>
            <td>${invoice.kunde}</td>
            <td>${formatDate(invoice.datum)}</td>
            <td>${formatDate(invoice.faelligkeit)}</td>
            <td>€${invoice.total.toFixed(2)}</td>
            <td><span class="status-badge status-${invoice.status}">${getStatusText(invoice.status)}</span></td>
            <td>
                <button class="action-btn view" onclick="viewInvoice(${invoice.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn edit" onclick="editInvoice(${invoice.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" onclick="deleteInvoice(${invoice.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function handleOtherIncomeSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const incomeData = {
        id: Date.now(),
        datum: formData.get('datum'),
        beschreibung: formData.get('beschreibung'),
        kategorie: formData.get('kategorie'),
        betrag: parseFloat(formData.get('betrag'))
    };
    
    otherIncomes.push(incomeData);
    
    showMessage('success', 'Einnahme erfolgreich hinzugefügt!');
    
    // Reset form and hide it
    e.target.reset();
    hideOtherIncomeForm();
    
    // Update list
    updateOtherIncomesList();
}

function showOtherIncomeForm() {
    const formContainer = document.getElementById('einnahme-form-container');
    formContainer.style.display = 'block';
    
    // Set today's date
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('einnahme-datum').value = today;
}

function hideOtherIncomeForm() {
    const formContainer = document.getElementById('einnahme-form-container');
    formContainer.style.display = 'none';
}

function updateOtherIncomesList() {
    const tbody = document.getElementById('einnahmen-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    otherIncomes.forEach(income => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(income.datum)}</td>
            <td>${income.beschreibung}</td>
            <td>${getCategoryText(income.kategorie)}</td>
            <td>€${income.betrag.toFixed(2)}</td>
            <td>
                <button class="action-btn edit" onclick="editIncome(${income.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" onclick="deleteIncome(${income.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE');
}

function getStatusText(status) {
    const statusTexts = {
        'entwurf': 'Entwurf',
        'versendet': 'Versendet',
        'bezahlt': 'Bezahlt',
        'ueberfaellig': 'Überfällig'
    };
    return statusTexts[status] || status;
}

function getCategoryText(category) {
    const categories = {
        'zinsen': 'Zinserträge',
        'dividenden': 'Dividenden',
        'mieteinnahmen': 'Mieteinnahmen',
        'lizenzgebuehren': 'Lizenzgebühren',
        'sonstige': 'Sonstige',
        'bueromaterial': 'Büromaterial',
        'software': 'Software',
        'reisekosten': 'Reisekosten',
        'marketing': 'Marketing',
        'bewirtung': 'Bewirtung',
        'fortbildung': 'Fortbildung'
    };
    return categories[category] || category;
}

// Action functions
function viewInvoice(id) {
    const invoice = invoices.find(inv => inv.id === id);
    if (invoice) {
        alert(`Rechnung anzeigen: ${invoice.nummer}\nKunde: ${invoice.kunde}\nBetrag: €${invoice.total.toFixed(2)}`);
    }
}

function editInvoice(id) {
    showMessage('info', 'Bearbeitungsfunktion wird implementiert...');
}

function deleteInvoice(id) {
    if (confirm('Sind Sie sicher, dass Sie diese Rechnung löschen möchten?')) {
        invoices = invoices.filter(inv => inv.id !== id);
        updateInvoicesList();
        showMessage('success', 'Rechnung erfolgreich gelöscht!');
    }
}

function editIncome(id) {
    showMessage('info', 'Bearbeitungsfunktion wird implementiert...');
}

function deleteIncome(id) {
    if (confirm('Sind Sie sicher, dass Sie diese Einnahme löschen möchten?')) {
        otherIncomes = otherIncomes.filter(income => income.id !== id);
        updateOtherIncomesList();
        showMessage('success', 'Einnahme erfolgreich gelöscht!');
    }
}

function showMessage(type, text) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    // Insert at the top of content area
    const contentArea = document.querySelector('.content-area');
    contentArea.insertBefore(message, contentArea.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        message.remove();
    }, 5000);
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

function loadSampleData() {
    // Sample invoices
    const sampleInvoices = [
        {
            id: 1,
            nummer: 'RG-2024-001',
            kunde: 'Mustermann GmbH',
            datum: '2024-01-15',
            faelligkeit: '2024-02-14',
            status: 'bezahlt',
            subtotal: 1000,
            tax: 190,
            total: 1190,
            items: [
                { description: 'Consulting Services', quantity: 10, price: 100, taxRate: 19, total: 1000 }
            ]
        },
        {
            id: 2,
            nummer: 'RG-2024-002',
            kunde: 'Schmidt & Partner',
            datum: '2024-01-20',
            faelligkeit: '2024-02-19',
            status: 'versendet',
            subtotal: 2500,
            tax: 475,
            total: 2975,
            items: [
                { description: 'Project Development', quantity: 25, price: 100, taxRate: 19, total: 2500 }
            ]
        },
        {
            id: 3,
            nummer: 'RG-2024-003',
            kunde: 'Weber Industries',
            datum: '2024-01-10',
            faelligkeit: '2024-02-09',
            status: 'ueberfaellig',
            subtotal: 750,
            tax: 142.5,
            total: 892.5,
            items: [
                { description: 'Maintenance Work', quantity: 7.5, price: 100, taxRate: 19, total: 750 }
            ]
        }
    ];
    
    // Sample other incomes
    const sampleIncomes = [
        {
            id: 1,
            datum: '2024-01-15',
            beschreibung: 'Zinserträge Geschäftskonto',
            kategorie: 'zinsen',
            betrag: 125.50
        },
        {
            id: 2,
            datum: '2024-01-20',
            beschreibung: 'Mieteinnahmen Büroräume',
            kategorie: 'mieteinnahmen',
            betrag: 1500.00
        }
    ];
    
    invoices.push(...sampleInvoices);
    otherIncomes.push(...sampleIncomes);
    invoiceCounter = 4; // Next invoice will be 004

    // Sample mahnungen
    const sampleMahnungen = [
        {
            id: 1,
            rechnungId: 3,
            rechnungNummer: 'RG-2024-003',
            kunde: 'Weber Industries',
            rechnungsDatum: '2024-01-10',
            faelligkeit: '2024-02-09',
            stufe: 'erste-mahnung',
            datum: '2024-02-15',
            gebuehren: 5.00,
            zinsen: 12.50,
            text: 'Erste Mahnung für überfällige Rechnung RG-2024-003',
            betragNetto: 750,
            betragBrutto: 910.00
        }
    ];
    
    mahnungen.push(...sampleMahnungen);
}

// Mahnungen functions
function handleMahnungSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const selectedInvoiceId = parseInt(formData.get('rechnung'));
    const selectedInvoice = invoices.find(inv => inv.id === selectedInvoiceId);
    
    if (!selectedInvoice) {
        showMessage('error', 'Bitte wählen Sie eine gültige Rechnung aus.');
        return;
    }
    
    const mahnungData = {
        id: Date.now(),
        rechnungId: selectedInvoiceId,
        rechnungNummer: selectedInvoice.nummer,
        kunde: selectedInvoice.kunde,
        rechnungsDatum: selectedInvoice.datum,
        faelligkeit: selectedInvoice.faelligkeit,
        stufe: formData.get('stufe'),
        datum: formData.get('datum'),
        gebuehren: parseFloat(formData.get('gebuehren')) || 0,
        zinsen: parseFloat(formData.get('zinsen')) || 0,
        text: formData.get('text') || '',
        betragNetto: selectedInvoice.subtotal,
        betragBrutto: selectedInvoice.total + parseFloat(formData.get('gebuehren')) + parseFloat(formData.get('zinsen'))
    };
    
    mahnungen.push(mahnungData);
    
    showMessage('success', 'Mahnung erfolgreich erstellt!');
    
    // Reset form and hide it
    e.target.reset();
    hideMahnungForm();
    
    // Update list
    updateMahnungenList();
}

function showMahnungForm() {
    const formContainer = document.getElementById('mahnung-form-container');
    formContainer.style.display = 'block';
    
    // Set today's date
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('mahnung-datum').value = today;
    
    // Populate overdue invoices
    populateOverdueInvoices();
}

function hideMahnungForm() {
    const formContainer = document.getElementById('mahnung-form-container');
    formContainer.style.display = 'none';
}

function populateOverdueInvoices() {
    const select = document.getElementById('mahnung-rechnung');
    select.innerHTML = '<option value="">Überfällige Rechnung auswählen...</option>';
    
    const today = new Date();
    const overdueInvoices = invoices.filter(invoice => {
        const dueDate = new Date(invoice.faelligkeit);
        return dueDate < today && (invoice.status === 'versendet' || invoice.status === 'ueberfaellig');
    });
    
    overdueInvoices.forEach(invoice => {
        const option = document.createElement('option');
        option.value = invoice.id;
        option.textContent = `${invoice.nummer} - ${invoice.kunde} (€${invoice.total.toFixed(2)})`;
        select.appendChild(option);
    });
}

function updateMahnungenList() {
    const tbody = document.getElementById('mahnungen-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    mahnungen.forEach(mahnung => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><span class="status-badge status-${mahnung.stufe}">${getMahnungStatusText(mahnung.stufe)}</span></td>
            <td>${formatDate(mahnung.faelligkeit)}</td>
            <td>${mahnung.rechnungNummer}</td>
            <td>${mahnung.kunde}</td>
            <td>${formatDate(mahnung.datum)}</td>
            <td>€${mahnung.betragNetto.toFixed(2)}</td>
            <td>€${mahnung.betragBrutto.toFixed(2)}</td>
            <td>
                <button class="action-btn view" onclick="viewMahnung(${mahnung.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn edit" onclick="editMahnung(${mahnung.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" onclick="deleteMahnung(${mahnung.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function filterMahnungen() {
    const statusFilter = document.getElementById('mahnung-status-filter').value;
    const kundeFilter = document.getElementById('mahnung-kunde-filter').value;
    const searchFilter = document.getElementById('mahnung-search-filter').value.toLowerCase();
    
    let filteredMahnungen = mahnungen;
    
    // Filter by status
    if (statusFilter) {
        filteredMahnungen = filteredMahnungen.filter(mahnung => mahnung.stufe === statusFilter);
    }
    
    // Filter by customer
    if (kundeFilter) {
        const customerName = getCustomerName(kundeFilter);
        filteredMahnungen = filteredMahnungen.filter(mahnung => mahnung.kunde === customerName);
    }
    
    // Filter by search term
    if (searchFilter) {
        filteredMahnungen = filteredMahnungen.filter(mahnung => 
            mahnung.rechnungNummer.toLowerCase().includes(searchFilter) ||
            mahnung.kunde.toLowerCase().includes(searchFilter)
        );
    }
    
    // Update table with filtered results
    const tbody = document.getElementById('mahnungen-tbody');
    tbody.innerHTML = '';
    
    filteredMahnungen.forEach(mahnung => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><span class="status-badge status-${mahnung.stufe}">${getMahnungStatusText(mahnung.stufe)}</span></td>
            <td>${formatDate(mahnung.faelligkeit)}</td>
            <td>${mahnung.rechnungNummer}</td>
            <td>${mahnung.kunde}</td>
            <td>${formatDate(mahnung.datum)}</td>
            <td>€${mahnung.betragNetto.toFixed(2)}</td>
            <td>€${mahnung.betragBrutto.toFixed(2)}</td>
            <td>
                <button class="action-btn view" onclick="viewMahnung(${mahnung.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn edit" onclick="editMahnung(${mahnung.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" onclick="deleteMahnung(${mahnung.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function getMahnungStatusText(status) {
    const statusTexts = {
        'erste-mahnung': '1. Mahnung',
        'zweite-mahnung': '2. Mahnung',
        'dritte-mahnung': '3. Mahnung',
        'inkasso': 'Inkasso'
    };
    return statusTexts[status] || status;
}

// Mahnung action functions
function viewMahnung(id) {
    const mahnung = mahnungen.find(m => m.id === id);
    if (mahnung) {
        alert(`Mahnung anzeigen: ${mahnung.rechnungNummer}\nKunde: ${mahnung.kunde}\nStufe: ${getMahnungStatusText(mahnung.stufe)}\nBetrag: €${mahnung.betragBrutto.toFixed(2)}`);
    }
}

function editMahnung(id) {
    showMessage('info', 'Bearbeitungsfunktion wird implementiert...');
}

function deleteMahnung(id) {
    if (confirm('Sind Sie sicher, dass Sie diese Mahnung löschen möchten?')) {
        mahnungen = mahnungen.filter(m => m.id !== id);
        updateMahnungenList();
        showMessage('success', 'Mahnung erfolgreich gelöscht!');
    }
}

// Initialize Schnellstart section
function initializeSchnellstart() {
    // Add event listeners for Schnellstart buttons
    const whyButton = document.getElementById('why-sevdesk-btn');
    if (whyButton) {
        whyButton.addEventListener('click', function() {
            // Toggle expansion of why section
            this.querySelector('i').classList.toggle('fa-chevron-down');
            this.querySelector('i').classList.toggle('fa-chevron-up');
        });
    }
    
    // Add event listeners for interest section
    const interestButtons = document.querySelectorAll('.interest-item .btn');
    interestButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.querySelector('i').classList.toggle('fa-chevron-down');
            this.querySelector('i').classList.toggle('fa-chevron-up');
        });
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

function closeMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.remove('open');
}

function updateStats() {
    // Implementation of updateStats function
}

function loadReminders() {
    // Implementation of loadReminders function
}

// Dashboard Management
function initializeDashboard() {
    updateDashboardStats();
    initializeCharts();
    loadRecentActivity();
    setupDashboardEventListeners();
}

function updateDashboardStats() {
    // Calculate stats from stored data
    const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    const expenses = JSON.parse(localStorage.getItem('ausgaben')) || [];
    const otherIncomes = JSON.parse(localStorage.getItem('otherIncomes')) || [];

    // Calculate totals
    const totalInvoiceAmount = invoices.reduce((sum, invoice) => {
        return sum + parseFloat(invoice.total || 0);
    }, 0);

    const totalOtherIncome = otherIncomes.reduce((sum, income) => {
        return sum + parseFloat(income.amount || 0);
    }, 0);

    const totalIncome = totalInvoiceAmount + totalOtherIncome;
    
    const totalExpenses = expenses.reduce((sum, expense) => {
        return sum + parseFloat(expense.amount || 0);
    }, 0);

    const profit = totalIncome - totalExpenses;

    // Update DOM elements
    const incomeElement = document.getElementById('total-income');
    const expensesElement = document.getElementById('total-expenses');
    const profitElement = document.getElementById('total-profit');
    const invoicesElement = document.getElementById('total-invoices');

    if (incomeElement) incomeElement.textContent = `€${totalIncome.toFixed(2)}`;
    if (expensesElement) expensesElement.textContent = `€${totalExpenses.toFixed(2)}`;
    if (profitElement) profitElement.textContent = `€${profit.toFixed(2)}`;
    if (invoicesElement) invoicesElement.textContent = invoices.length;

    // Update change indicators (mock data for demo)
    const incomeChange = ((Math.random() - 0.5) * 20).toFixed(1);
    const expensesChange = ((Math.random() - 0.5) * 10).toFixed(1);
    const profitChange = ((Math.random() - 0.5) * 30).toFixed(1);
    
    updateChangeIndicator('income-change', incomeChange);
    updateChangeIndicator('expenses-change', expensesChange);
    updateChangeIndicator('profit-change', profitChange);
}

function updateChangeIndicator(elementId, change) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const isPositive = parseFloat(change) >= 0;
    element.textContent = `${isPositive ? '+' : ''}${change}%`;
    element.className = `stat-change ${isPositive ? 'positive' : 'negative'}`;
}

function initializeCharts() {
    if (typeof Chart !== 'undefined') {
        initializeRevenueChart();
        initializeExpensesChart();
    }
}

function initializeRevenueChart() {
    const canvas = document.getElementById('revenue-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Generate sample data for the last 6 months
    const months = [];
    const revenueData = [];
    const expensesData = [];
    
    for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        months.push(date.toLocaleDateString('ar', { month: 'short' }));
        revenueData.push(Math.random() * 5000 + 2000);
        expensesData.push(Math.random() * 3000 + 1000);
    }

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'الإيرادات',
                data: revenueData,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }, {
                label: 'المصروفات',
                data: expensesData,
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '€' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

function initializeExpensesChart() {
    const canvas = document.getElementById('expenses-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const data = {
        labels: ['مكتب', 'برمجيات', 'سفر', 'تسويق', 'أخرى'],
        datasets: [{
            data: [30, 25, 20, 15, 10],
            backgroundColor: [
                '#3b82f6',
                '#10b981',
                '#f59e0b',
                '#ef4444',
                '#8b5cf6'
            ],
            borderWidth: 0
        }]
    };

    new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function loadRecentActivity() {
    loadRecentInvoices();
    loadRecentExpenses();
    loadOverdueInvoices();
}

function loadRecentInvoices() {
    const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    const recentInvoices = invoices.slice(-5).reverse();
    
    const container = document.getElementById('recent-invoices-list');
    if (!container) return;

    if (recentInvoices.length === 0) {
        container.innerHTML = '<div class="empty-state">لا توجد فواتير حديثة</div>';
        return;
    }

    container.innerHTML = recentInvoices.map(invoice => `
        <div class="activity-item">
            <div class="activity-info">
                <div class="activity-title">فاتورة #${invoice.invoiceNumber}</div>
                <div class="activity-subtitle">${invoice.customerName}</div>
            </div>
            <div class="activity-amount">€${parseFloat(invoice.total || 0).toFixed(2)}</div>
            <div class="activity-status ${invoice.status || 'pending'}">${getDashboardStatusText(invoice.status)}</div>
        </div>
    `).join('');
}

function loadRecentExpenses() {
    const expenses = JSON.parse(localStorage.getItem('ausgaben')) || [];
    const recentExpenses = expenses.slice(-5).reverse();
    
    const container = document.getElementById('recent-expenses-list');
    if (!container) return;

    if (recentExpenses.length === 0) {
        container.innerHTML = '<div class="empty-state">لا توجد مصروفات حديثة</div>';
        return;
    }

    container.innerHTML = recentExpenses.map(expense => `
        <div class="activity-item">
            <div class="activity-info">
                <div class="activity-title">${expense.beschreibung}</div>
                <div class="activity-subtitle">${expense.kategorie}</div>
            </div>
            <div class="activity-amount">€${parseFloat(expense.betragBrutto || 0).toFixed(2)}</div>
        </div>
    `).join('');
}

function loadOverdueInvoices() {
    const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    const today = new Date();
    
    const overdueInvoices = invoices.filter(invoice => {
        if (invoice.status === 'paid') return false;
        
        const dueDate = new Date(invoice.faelligkeit);
        return dueDate < today;
    });
    
    const container = document.getElementById('overdue-invoices-list');
    if (!container) return;

    if (overdueInvoices.length === 0) {
        container.innerHTML = '<div class="empty-state">لا توجد فواتير مستحقة</div>';
        return;
    }

    container.innerHTML = overdueInvoices.map(invoice => `
        <div class="activity-item">
            <div class="activity-info">
                <div class="activity-title">فاتورة #${invoice.invoiceNumber}</div>
                <div class="activity-subtitle">${invoice.customerName}</div>
            </div>
            <div class="activity-amount">€${parseFloat(invoice.total || 0).toFixed(2)}</div>
            <div class="activity-status overdue">متأخرة</div>
        </div>
    `).join('');
}

function getDashboardStatusText(status) {
    const statusMap = {
        'paid': 'مدفوعة',
        'pending': 'معلقة',
        'overdue': 'متأخرة',
        'draft': 'مسودة'
    };
    return statusMap[status] || 'معلقة';
}

function setupDashboardEventListeners() {
    // Period selector
    const periodSelector = document.getElementById('dashboard-period');
    if (periodSelector) {
        periodSelector.addEventListener('change', function() {
            updateDashboardStats();
            // You can add more period-specific updates here
        });
    }

    // Chart period buttons
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update chart based on selected period
            const period = this.dataset.period;
            updateChartPeriod(period);
        });
    });
}

function updateChartPeriod(period) {
    // This function would update the chart data based on the selected period
    // For now, it's a placeholder
    console.log('Updating chart for period:', period);
    // You can implement period-specific data loading here
}

function handleBuchhaltungSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const buchhaltungData = Object.fromEntries(formData);
    
    saveSettings('buchhaltung', buchhaltungData);
    showNotification('Buchhaltungseinstellungen gespeichert', 'success');
}

function handleUmsatzsteuerSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const umsatzsteuerData = Object.fromEntries(formData);
    
    saveSettings('umsatzsteuer', umsatzsteuerData);
    showNotification('Umsatzsteuer-Einstellungen gespeichert', 'success');
}

function handleUnternehmenSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const unternehmenData = Object.fromEntries(formData);
    
    saveSettings('unternehmen', unternehmenData);
    showNotification('Unternehmensdaten gespeichert', 'success');
}

function handleBankSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const bankData = Object.fromEntries(formData);
    
    saveSettings('bank', bankData);
    showNotification('Bankverbindung gespeichert', 'success');
}

function handleSystemSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const systemData = Object.fromEntries(formData);
    
    // Add checkbox values
    systemData['auto-backup'] = document.getElementById('auto-backup').checked;
    systemData['email-notifications'] = document.getElementById('email-notifications').checked;
    
    saveSettings('system', systemData);
    showNotification('Systemeinstellungen gespeichert', 'success');
}

function handleBriefpapierSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const briefpapierData = Object.fromEntries(formData);
    
    saveSettings('briefpapier', briefpapierData);
    showNotification('Briefpapier-Einstellungen gespeichert', 'success');
}

function handleLogoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
        showNotification('Datei zu groß. Maximum 2MB erlaubt.', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const logoPreview = document.getElementById('logo-preview');
        const logoImage = document.getElementById('logo-image');
        
        logoImage.src = event.target.result;
        logoPreview.style.display = 'block';
        
        // Save logo data
        saveSettings('logo', { data: event.target.result, name: file.name });
    };
    reader.readAsDataURL(file);
}

function handleTemplateSubmit(e, formId) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const templateData = Object.fromEntries(formData);
    
    saveSettings(formId, templateData);
    showNotification('Textvorlage gespeichert', 'success');
}

function saveSettings(category, data) {
    const allSettings = JSON.parse(localStorage.getItem('taxpro-settings') || '{}');
    allSettings[category] = data;
    localStorage.setItem('taxpro-settings', JSON.stringify(allSettings));
}

function exportAllData(format) {
    const allData = {
        settings: JSON.parse(localStorage.getItem('taxpro-settings') || '{}'),
        kunden: kunden,
        rechnungen: rechnungen || [],
        ausgaben: ausgaben || [],
        mahnungen: mahnungen || []
    };

    if (format === 'csv') {
        // Export as multiple CSV files
        exportMultipleCSV(allData);
    } else {
        // Export as JSON
        const dataStr = JSON.stringify(allData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `taxpro-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
    }
    
    showNotification(`Daten erfolgreich als ${format.toUpperCase()} exportiert`, 'success');
}

function exportMultipleCSV(data) {
    // Export each data type as separate CSV
    Object.keys(data).forEach(key => {
        if (Array.isArray(data[key]) && data[key].length > 0) {
            exportData(key, data[key]);
        }
    });
}

function handleImportData(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const importedData = JSON.parse(event.target.result);
            
            // Validate and import data
            if (importedData.settings) {
                localStorage.setItem('taxpro-settings', JSON.stringify(importedData.settings));
            }
            
            if (importedData.kunden) {
                window.kunden = importedData.kunden;
                localStorage.setItem('taxpro-kunden', JSON.stringify(importedData.kunden));
            }
            
            showNotification('Daten erfolgreich importiert', 'success');
            location.reload(); // Reload to apply imported data
            
        } catch (error) {
            showNotification('Fehler beim Importieren der Daten', 'error');
        }
    };
    reader.readAsText(file);
}

// Additional Dashboard functions
function loadRecentExpensesDashboard() {
    const expenses = JSON.parse(localStorage.getItem('ausgaben')) || [];
    const recentExpenses = expenses.slice(-5).reverse();
    
    const container = document.getElementById('recent-expenses-list');
    if (!container) return;

    if (recentExpenses.length === 0) {
        container.innerHTML = '<div class="empty-state">لا توجد مصروفات حديثة</div>';
        return;
    }

    container.innerHTML = recentExpenses.map(expense => `
        <div class="activity-item">
            <div class="activity-info">
                <div class="activity-title">${expense.beschreibung}</div>
                <div class="activity-subtitle">${expense.kategorie}</div>
            </div>
            <div class="activity-amount">€${parseFloat(expense.betragBrutto || 0).toFixed(2)}</div>
        </div>
    `).join('');
}

// Initialize Einstellungen (Settings) functionality
function initializeEinstellungen() {
    // Add event listeners for settings tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            if (tabName) {
                switchSettingsTab(tabName);
            }
        });
    });

    // Add event listeners for text template tab buttons
    const textTabButtons = document.querySelectorAll('.text-tab-btn');
    textTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textTabName = this.dataset.textTab;
            if (textTabName) {
                switchTextTemplateTab(textTabName);
            }
        });
    });

    // Add event listeners for form submissions
    const forms = {
        'benutzer-form': handleBenutzerSubmit,
        'passwort-form': handlePasswordSubmit,
        'buchhaltung-form': handleBuchhaltungSubmit,
        'umsatzsteuer-form': handleUmsatzsteuerSubmit,
        'unternehmen-form': handleUnternehmenSubmit,
        'bank-form': handleBankSubmit,
        'system-form': handleSystemSubmit,
        'briefpapier-form': handleBriefpapierSubmit,
        'rechnung-template-form': (e) => handleTemplateSubmit(e, 'rechnung'),
        'angebot-template-form': (e) => handleTemplateSubmit(e, 'angebot'),
        'mahnung-template-form': (e) => handleTemplateSubmit(e, 'mahnung'),
        'email-template-form': (e) => handleTemplateSubmit(e, 'email')
    };

    Object.entries(forms).forEach(([formId, handler]) => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', handler);
        }
    });

    // Initialize logo upload
    const logoUpload = document.getElementById('logo-upload');
    if (logoUpload) {
        logoUpload.addEventListener('change', handleLogoUpload);
    }

    // Initialize export/import buttons
    const exportCsvBtn = document.getElementById('export-csv-btn');
    const exportJsonBtn = document.getElementById('export-json-btn');
    const importBtn = document.getElementById('import-btn');
    const importFile = document.getElementById('import-file');

    if (exportCsvBtn) {
        exportCsvBtn.addEventListener('click', () => exportAllData('csv'));
    }

    if (exportJsonBtn) {
        exportJsonBtn.addEventListener('click', () => exportAllData('json'));
    }

    if (importBtn) {
        importBtn.addEventListener('click', () => importFile.click());
    }

    if (importFile) {
        importFile.addEventListener('change', handleImportData);
    }

    // Load saved settings
    loadSavedSettings();

    // Initialize with default tab (benutzer)
    switchSettingsTab('benutzer');
}

// New function to switch text template tabs
function switchTextTemplateTab(tabName) {
    // Hide all text template content
    const textTemplateContents = document.querySelectorAll('.text-template-content');
    textTemplateContents.forEach(content => content.classList.remove('active'));
    
    // Remove active class from all text tab buttons
    const textTabButtons = document.querySelectorAll('.text-tab-btn');
    textTabButtons.forEach(button => button.classList.remove('active'));
    
    // Show the selected text template content
    const targetContent = document.getElementById(tabName + '-templates');
    if (targetContent) {
        targetContent.classList.add('active');
    }
    
    // Add active class to the selected text tab button
    const targetButton = document.querySelector(`[data-text-tab="${tabName}"]`);
    if (targetButton) {
        targetButton.classList.add('active');
    }
}

// Handle Benutzer form submission
function handleBenutzerSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const benutzerData = Object.fromEntries(formData);
    
    saveSettings('benutzer', benutzerData);
    showNotification('Benutzerdaten gespeichert', 'success');
}

// Handle Password form submission
function handlePasswordSubmit(e) {
    e.preventDefault();
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (newPassword !== confirmPassword) {
        showNotification('Passwörter stimmen nicht überein', 'error');
        return;
    }

    if (newPassword.length < 6) {
        showNotification('Passwort muss mindestens 6 Zeichen lang sein', 'error');
        return;
    }

    // In a real application, you would verify the current password
    saveSettings('password', { lastChanged: new Date().toISOString() });
    showNotification('Passwort erfolgreich geändert', 'success');
    
    // Clear form
    e.target.reset();
}

// Load saved settings from localStorage
function loadSavedSettings() {
    const savedSettings = localStorage.getItem('taxpro-settings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        // Load settings into forms
        Object.entries(settings).forEach(([category, data]) => {
            if (typeof data === 'object') {
                Object.entries(data).forEach(([key, value]) => {
                    const input = document.getElementById(key);
                    if (input) {
                        if (input.type === 'checkbox') {
                            input.checked = value;
                        } else {
                            input.value = value;
                        }
                    }
                });
            }
        });
    }
}

// Show notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i data-feather="${type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : 'info'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Initialize the icon
    if (window.feather) {
        feather.replace();
    }
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
# PARTH AGROTECH Web Application Design Guidelines

## Design Approach
**System-Based with Industry Reference**: Following the existing landing page's terminal/command-line aesthetic combined with modern agricultural tech platforms (FarmLogs, Granular). The design emphasizes data clarity, operational efficiency, and rural accessibility while maintaining the tech-forward brand identity established in the landing page.

## Core Design Principles
1. **Terminal Aesthetic Consistency**: Maintain the monospace, command-line inspired interface throughout application dashboards
2. **Bilingual First**: All application interfaces support English/Gujarati toggle
3. **Data Transparency**: Clear visibility of metrics, weights, temperatures, and transaction records
4. **Rural Accessibility**: Large touch targets, high contrast, simple navigation for users with varying tech literacy

## Typography System

**Font Families**:
- Primary: System sans-serif (Inter/SF Pro equivalent)
- Technical/Data: Monospace (`font-mono`)
- Gujarati: Noto Sans Gujarati

**Hierarchy**:
- Dashboard Headers: `text-2xl md:text-3xl font-bold tracking-tight uppercase`
- Section Titles: `text-lg font-mono uppercase tracking-wider`
- Data Labels: `text-xs font-mono text-neutral-500 uppercase`
- Data Values: `text-xl md:text-2xl font-bold font-mono`
- Body Text: `text-sm text-neutral-300`
- Gujarati Text: Add 10-15% larger size for readability

## Layout & Spacing System

**Tailwind Spacing Units**: Use 4, 6, 8, 12, 16 for consistent rhythm
- Component padding: `p-6` or `p-8`
- Section spacing: `space-y-8` or `space-y-12`
- Card gaps: `gap-6`
- Page margins: `px-6 md:px-8`

**Grid Patterns**:
- Dashboard cards: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Stat displays: `grid-cols-2 md:grid-cols-4`
- Data tables: Full-width with horizontal scroll on mobile

## Color System (Extracted from Landing Page)

**Backgrounds**:
- Primary: `#050505` (near-black)
- Card/Panel: `bg-neutral-900/50` with `border border-white/10`
- Input fields: `bg-neutral-900 border-neutral-800`
- Hover states: `bg-neutral-800`

**Accents**:
- Primary Action: `bg-lime-500` / `text-black` (lime-400 to green-600 gradient for emphasis)
- Success/Active: `text-green-500` or `bg-green-500/20`
- Warning: `text-yellow-500` or `bg-yellow-500/20`
- Critical: `text-red-500` or `bg-red-500/20`
- Neutral: `text-neutral-400`

**Status Indicators**:
- Online/Active: Green pulse dot with `bg-green-500`
- Processing: Yellow pulse with `bg-yellow-500`
- Offline/Inactive: `bg-neutral-600`

## Component Library

### Navigation
- **Sidebar (Desktop)**: Fixed left sidebar, `w-64`, dark background, collapsible on tablet
- **Top Bar (Mobile)**: Sticky header with hamburger menu, breadcrumb navigation
- **Active State**: Left border accent `border-l-4 border-lime-500`

### Data Cards
```
Structure: 
- Container: rounded border with subtle backdrop blur
- Header: Icon + Title (uppercase mono)
- Value: Large mono font with unit label
- Status bar: Horizontal line with color indicator
- Metric: Small mono text below
```

### Forms
- **Input Fields**: Dark background, 1px border, focus state with lime accent
- **Labels**: Uppercase mono, small size, positioned above input
- **Buttons**: Primary (lime-500), Secondary (neutral-700 outline)
- **Validation**: Inline error messages in red-500

### Tables
- **Header**: Sticky, uppercase mono labels, neutral-800 background
- **Rows**: Alternating subtle backgrounds, hover state with neutral-800
- **Actions**: Icon buttons aligned right, small size
- **Mobile**: Collapse to card view with key data points

### Modals/Dialogs
- Dark overlay with `bg-black/80`
- Centered panel with `max-w-2xl`
- Close button top-right with X icon
- Action buttons bottom-aligned

### Status Dashboards
- **Terminal Output Style**: Scrollable log area with monospace font
- **Live Updates**: Timestamp prefix on each entry
- **Color Coding**: Success (green), warning (yellow), error (red)

## Logo Specifications
**Primary Logo**: 
- Square gradient background (lime-400 to green-600)
- Bold "P" letter mark in black
- Dimensions: 32x32px for navbar, 48x48px for headers

**Full Wordmark**:
- "PARTH AGROTECH" in bold uppercase
- Bilingual version with Gujarati below English

## Application-Specific Guidelines

### Farmer Portal
- Large registration form with step-by-step progress indicator
- Photo upload for farm documentation with preview
- Dashboard showing: Seeds received, Current crop status, Storage balance, Payment history
- Simple card-based layout prioritizing key metrics

### Factory Dashboard
- Real-time inventory availability table
- Filterable by potato variety, location, quality grade
- Order placement form with quantity calculator
- Delivery tracking with map integration placeholder

### Cold Storage Tracking
- Temperature monitoring cards with graph visualization
- Capacity gauge showing filled vs available space
- Entry/exit log in terminal-style format
- Alert system for temperature anomalies

### Admin Panel
- Multi-tab interface: Farmers, Factories, Storage, Transactions
- Bulk action capabilities with checkboxes
- Export data functionality with CSV download button
- System settings with bilingual toggle and preferences

## Images & Assets

**Logo Placement**: Top-left in all application headers, link to home

**Icons**: Use Lucide React icons consistently (Terminal, Database, Factory, Sprout, Activity, TrendingUp, Users, Package)

**No Hero Images**: Application pages are data-focused, no large hero sections needed

**Data Visualizations**: Use simple bar/line charts with green accent colors for trends

## Animations
**Minimal & Purposeful**:
- Pulse animation for status indicators only
- Smooth transitions for panel slides (200ms)
- Loading spinners for async operations
- No decorative animations

---

**Critical**: All application pages must feel like an extension of the landing page's terminal aesthetic while prioritizing data clarity and operational efficiency for agricultural supply chain management.
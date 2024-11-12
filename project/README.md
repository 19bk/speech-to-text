```markdown:project/README.md
# Device Monitoring & Harassment Detection Dashboard

## Overview
A modern React-based dashboard for monitoring IoT devices and analyzing harassment incidents in educational environments. Built with Vite, TypeScript, and Tailwind CSS.

## Features
- Real-time device status monitoring with battery and signal strength tracking
- Alert management system with priority levels and notifications
- Harassment incident analytics and reporting
- Class risk analysis and trend tracking
- Responsive design with mobile-first approach

## Tech Stack
- React 18.3
- TypeScript 5.5
- Vite 5.4
- Tailwind CSS 3.4
- Zustand 4.5 (State Management)
- Lucide React (Icons)

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── AlertsPanel.tsx     # Real-time alert monitoring
│   ├── DeviceGrid.tsx      # IoT device status grid
│   ├── HarassmentDashboard.tsx  # Analytics dashboard
│   ├── Header.tsx          # App header with navigation
│   └── Sidebar.tsx         # Navigation sidebar
├── App.tsx                 # Main app component
└── main.tsx               # App entry point
```

## Key Components

### Device Monitoring
- Real-time device status tracking
- Battery level monitoring
- Signal strength indicators
- Location tracking

### Alert System
- Priority-based alerts (warning, error, info)
- Real-time notifications
- Alert history tracking
- Quick response actions

### Analytics Dashboard
- Incident trend analysis
- Class risk assessment
- Response rate tracking
- Student safety metrics

## Deployment

This project includes Netlify configuration for easy deployment:

1. Push to GitHub
2. Connect to Netlify
3. Deploy with included netlify.toml configuration

Manual deployment via Netlify CLI:
```bash
netlify deploy
```

## Development

### Code Style
- ESLint for code quality
- TypeScript for type safety
- Tailwind CSS for styling
- Vite for fast development

### State Management
Uses Zustand for global state management, particularly for:
- User authentication
- Device status
- Alert notifications
- Analytics data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - feel free to use this project for your own purposes.
```
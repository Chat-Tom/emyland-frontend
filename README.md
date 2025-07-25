# emyland.vn Frontend

Standalone React frontend for emyland.vn - Vietnamese Real Estate Platform

## Features
- React 18 + TypeScript + Vite
- Tailwind CSS for styling  
- Radix UI components
- Vietnamese real estate search
- QR code sharing system
- Mobile-first responsive design

## Development

```bash
npm install
npm run dev
```

## Deployment on Vercel

1. Push to GitHub repository `emyland-frontend`
2. Connect to Vercel
3. Vercel auto-detects: Framework: Vite, Build: `npm run build`, Output: `dist`
4. Deploy automatically

## API Integration

Frontend connects to backend API at:
- Development: `https://emyland-vn--chat301277.replit.app/api`
- Production: Configure in vite.config.js proxy settings

## Build

```bash
npm run build
```

Output in `dist/` folder ready for deployment.
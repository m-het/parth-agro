# PARTH AGROTECH

A modern agricultural commerce platform connecting farmers with factories and cold storage facilities.

![PARTH AGROTECH](https://img.shields.io/badge/PARTH-AGROTECH-green?style=for-the-badge)

## 🌱 Features

- **Farmer Registration** - Easy onboarding for farmers
- **Factory Dashboard** - Manage procurement and inventory
- **Admin Panel** - Comprehensive oversight and analytics
- **Cold Storage Management** - Track storage capacity and inventory
- **Bilingual Support** - English and Gujarati

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS + Radix UI
- **Backend**: Express.js / Vercel Serverless Functions
- **Database**: MongoDB (Local or Atlas)
- **ODM**: Mongoose

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB (local installation or MongoDB Atlas)

### MongoDB Installation (Windows)

1. Download MongoDB Community Server from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Run the installer and select "Complete" installation
3. Choose "Install MongoDB as a Service"
4. MongoDB will run automatically on `localhost:27017`

Alternatively, use MongoDB Atlas (cloud):
1. Create a free account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a cluster and get your connection string

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/parth-agrotech.git
cd parth-agrotech
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your MongoDB connection URI
```

Example `.env`:
```
MONGODB_URI=mongodb://localhost:27017/parth_agrotech
```

4. Start development server
```bash
npm run dev
```

Visit `http://localhost:5000` to see the app.

## 📁 Project Structure

```
├── api/                 # Vercel serverless functions
│   ├── _lib/           # Shared utilities (db, schema, storage)
│   ├── farmers.ts      # Farmer endpoints
│   ├── factories.ts    # Factory endpoints
│   ├── cold-storages.ts
│   ├── inventory.ts
│   ├── contact.ts
│   └── stats.ts
├── client/             # React frontend
│   └── src/
│       ├── components/ # UI components
│       ├── pages/      # Page components
│       └── lib/        # Utilities & contexts
├── server/             # Express server (local dev)
├── shared/             # Shared types & Mongoose schemas
└── vercel.json         # Vercel configuration
```

## 🌐 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variable:
   - `MONGODB_URI` - Your MongoDB connection string (use MongoDB Atlas for production)
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## 📝 Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string (local or Atlas) |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

Built with 💚 in Gujarat, India

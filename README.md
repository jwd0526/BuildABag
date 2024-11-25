# Build-A-Bag

A golf bag customization web application built with Next.js, TypeScript, and MongoDB.

## Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn
- MongoDB Atlas account

### Installation

1. Clone the repository
```bash
git clone [your-repository-url]
cd build-a-bag
```

2. Install dependencies
```bash
npm install
```

3. Environment Setup
   - Copy the `.env.template` file to `.env`
   - Fill in the required environment variables (see Environment Variables section)

4. Database Setup
   - Create a MongoDB Atlas account
   - Create a new cluster
   - Create a database user
   - Get your connection string
   - Update DATABASE_URL in `.env`

5. Initialize the database
```bash
npx prisma generate
npx prisma db push
```

6. Start the development server
```bash
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

- `DATABASE_URL`: Your MongoDB connection string
- `NEXTAUTH_URL`: Your local development URL (http://localhost:3000)
- `NEXTAUTH_SECRET`: Generate using `openssl rand -base64 32`

#### GitHub OAuth
1. Go to GitHub Settings → Developer Settings → OAuth Apps
2. Create a new OAuth App
3. Set Homepage URL to `http://localhost:3000`
4. Set Authorization callback URL to `http://localhost:3000/api/auth/callback/github`

#### Google OAuth
1. Go to Google Cloud Console
2. Create a new project
3. Enable OAuth
4. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

## Development

The project uses:
- Next.js 13+ with App Router
- TypeScript
- MongoDB with Prisma ORM
- NextAuth.js for authentication
- Tailwind CSS for styling

## Contributing

1. Create a branch for your feature
2. Make your changes
3. Submit a pull request

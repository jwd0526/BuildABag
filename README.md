# Build-A-Bag

Developer enviroment setup

### Installation

1. Clone the repository
  ```bash
  git clone https://github.com/jwd0526/BuildABag.git
  cd build-a-bag
  ```

2. Install dependencies
  ```bash
  npm install
  ```

3. Environment Setup
  - Create a file called .env in the build-a-bag directory.
```env
# mongo
DATABASE_URL=""
    
# next-auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=""
```

- Generate a secret for next_auth and copy the output into the "NEXT_AUTH_SECRET" field.
  
```bash
openssl rand -base64 32
```

4. Database Setup
   - Create a MongoDB Atlas account
   - Create a new cluster
   - Create a database user
   - Get your connection string
   - Update DATABASE_URL in `.env`

5. DB initialization
  ```bash
  npx prisma generate
  npx prisma db push
  ```
  
  6. Start the server
```bash
npm run dev
```

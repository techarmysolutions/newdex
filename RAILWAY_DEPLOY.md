# Arbitrage Fullstack App - Railway Deployment

## Quick Deploy

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template)

## Setup Instructions

### 1. Create Railway Account
- Go to [railway.app](https://railway.app)
- Sign up with GitHub

### 2. Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Connect your GitHub account if not already connected
4. Select this repository

### 3. Configure Services

Railway will auto-detect the project. You need to set up **two services**:

#### Backend Service
1. Click **"Add Service"** → **"GitHub Repo"**
2. Set **Root Directory**: `backend`
3. Set **Start Command**: `node src/index.js`

#### Frontend Service  
1. Click **"Add Service"** → **"GitHub Repo"**
2. Set **Root Directory**: `frontend`
3. Set **Start Command**: `npx serve -s build -l $PORT`
4. Add **Build Command**: `npm run build`

### 4. Environment Variables

Add these environment variables to the **Backend** service:

| Variable | Description | Example |
|----------|-------------|---------|
| `RPC_URL` | BSC RPC endpoint | `https://bsc-dataseed1.binance.org` |
| `PRIVATE_KEY` | Wallet private key (keep secret!) | `0x...` |
| `CONTRACT_ADDRESS` | Deployed contract address | `0x...` |
| `SIMULATION_MODE` | Enable/disable simulation | `true` or `false` |
| `MIN_PROFIT_THRESHOLD` | Minimum profit % | `0.5` |
| `FLASH_LOAN_AMOUNT` | Loan amount in USDT | `100` |
| `AUTO_EXECUTE` | Auto-execute trades | `false` |
| `PORT` | Server port (auto-set by Railway) | `3001` |

Add these to the **Frontend** service:

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_BACKEND_URL` | Backend service URL | `https://your-backend.railway.app` |

### 5. Generate Domain

1. Go to each service → **Settings** → **Networking**
2. Click **"Generate Domain"**
3. Copy the backend URL and add it to frontend's `REACT_APP_BACKEND_URL`

### 6. Deploy

Railway auto-deploys on push. You can also:
- Click **"Deploy"** button manually
- Use Railway CLI: `railway up`

## Railway CLI Deployment

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Link to existing project
railway link

# Deploy
railway up
```

## Project Structure for Railway

```
arbitrage_fullstack_perfected/
├── railway.json          # Railway config
├── backend/
│   ├── package.json
│   ├── Procfile          # Backend process
│   └── src/
└── frontend/
    ├── package.json
    ├── Procfile          # Frontend process
    └── src/
```

## Monorepo Setup (Alternative)

If you want to deploy as a single service with backend serving frontend:

1. Build frontend: `cd frontend && npm run build`
2. Copy build to backend: `cp -r frontend/build backend/public`
3. Backend serves static files from `/public`
4. Deploy only backend service

## Troubleshooting

### Build Fails
- Check Node.js version in `package.json` engines field
- Ensure all dependencies are in `dependencies`, not `devDependencies`

### Environment Variables Not Working
- Check variable names match exactly (case-sensitive)
- Restart service after adding variables

### CORS Issues
- Update `CORS_ORIGIN` in backend config to allow Railway domain
- Or set `CORS_ORIGIN=*` for testing

### WebSocket Connection Failed
- Railway supports WebSockets on standard domains
- Ensure frontend connects to correct backend URL

## Security Notes

⚠️ **IMPORTANT**: Never commit private keys to Git!

- Use Railway's environment variables for secrets
- Keep `SIMULATION_MODE=true` until fully tested
- Start with small `FLASH_LOAN_AMOUNT` values

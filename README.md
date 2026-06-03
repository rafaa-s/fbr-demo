# FBR Demo App - Cloudflare Tunnel Ready

## ✓ What's Set Up

Your demo CRM/Realty Platform app is ready for Cloudflare Tunnel deployment.

### Files
- `index.html` - Main React app (Realty Platform CRM)
- `fbr-data.js` - Application data
- `fbr-*.jsx` - React components (UI, views, modules, ads, marketing)
- `.cloudflared/config.yml` - Tunnel configuration
- `.claude/launch.json` - Local server launch config

### Installed
- ✓ cloudflared v2026.3.0
- ✓ Python (for HTTP server)
- ✓ Configuration files created

## 🚀 Quick Start (3 Steps)

### Step 1: Start Local Server
Open Claude Code and launch the "serve-fbr-demo" configuration, or run:
```bash
python -m http.server 8000 --directory C:\Users\Admin\Documents\fbr-demo
```

### Step 2: Create & Run Tunnel
First time setup:
```bash
# Authenticate with Cloudflare (if not done)
cloudflared tunnel login

# Create tunnel
cloudflared tunnel create fbr-demo-tunnel

# Run tunnel
cloudflared tunnel run fbr-demo-tunnel
```

### Step 3: Access Your App
- **Local:** http://localhost:8000
- **Public:** https://your-domain.com (once configured)

## 📋 To Use Your Own Domain

1. Edit `.cloudflared/config.yml` and replace `your-domain.com` with your actual domain
2. Route the domain:
   ```bash
   cloudflared tunnel route dns fbr-demo-tunnel your-domain.com
   ```
3. The tunnel will automatically create the DNS record in Cloudflare

## 📚 Documentation

- `CLOUDFLARE_TUNNEL_SETUP.md` - Detailed setup & troubleshooting
- `setup-tunnel.ps1` - Automated setup script

## 🔧 Architecture

```
Your Local Machine:
  └─ HTTP Server (port 8000)
     └─ FBR App (React + Babel)

        ↓

Cloudflare Tunnel (cloudflared):
  └─ Secure encrypted connection

        ↓

Cloudflare Edge Network:
  └─ HTTPS (your-domain.com)

        ↓

Internet (Public Access)
```

## 💡 Features

- ✓ No port forwarding needed
- ✓ No firewall rules needed
- ✓ Automatic HTTPS
- ✓ Works from anywhere
- ✓ Secure encryption
- ✓ Zero Trust security (optional)

## ❓ Need Help?

1. Read `CLOUDFLARE_TUNNEL_SETUP.md` for troubleshooting
2. Check tunnel status: `cloudflared tunnel list`
3. View logs: Run tunnel with `--loglevel debug` flag
4. Cloudflare docs: https://developers.cloudflare.com/cloudflare-one/

---

**Ready?** Start with Step 1 above!

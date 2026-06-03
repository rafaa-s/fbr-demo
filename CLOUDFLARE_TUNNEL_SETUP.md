# Cloudflare Tunnel Setup for FBR Demo App

## Quick Start

### Step 1: Start the Local HTTP Server
Use Claude Code to start the server:
```bash
# In Claude Code terminal or launch the "serve-fbr-demo" configuration
python -m http.server 8000 --directory C:\Users\Admin\Documents\fbr-demo
```

The app will be available locally at: **http://localhost:8000**

### Step 2: Create the Tunnel (First Time Only)

If this is your first time setting up the tunnel, run:
```bash
cloudflared tunnel create fbr-demo-tunnel
```

This will:
- Create a new tunnel named `fbr-demo-tunnel`
- Generate credentials file at `C:\Users\Admin\.cloudflared\fbr-demo-tunnel.json`

### Step 3: Configure Your Domain

Update the `config.yml` file with your actual domain:

```yml
tunnel: fbr-demo-tunnel
credentials-file: C:\Users\Admin\.cloudflared\fbr-demo-tunnel.json

ingress:
  - hostname: your-domain.com      # Change this to your domain
    service: http://localhost:8000
  - service: http_status:404
```

Then route the domain to your tunnel via Cloudflare dashboard or CLI:
```bash
cloudflared tunnel route dns fbr-demo-tunnel your-domain.com
```

### Step 4: Run the Tunnel

```bash
cloudflared tunnel run fbr-demo-tunnel
```

Or use the full config path:
```bash
cloudflared tunnel --config C:\Users\Admin\Documents\fbr-demo\.cloudflared\config.yml run fbr-demo-tunnel
```

### Step 5: Access Your App

Once the tunnel is running, your app will be available at:
- **https://your-domain.com**
- **http://localhost:8000** (locally)

## Useful Commands

### List tunnels
```bash
cloudflared tunnel list
```

### Delete tunnel (if needed)
```bash
cloudflared tunnel delete fbr-demo-tunnel
```

### Check tunnel status
The tunnel will show a green check ✓ in the Cloudflare dashboard when active.

## Troubleshooting

**Issue:** `Error: Unauthorized - token may be invalid`
- Re-authenticate: `cloudflared tunnel login`
- Delete credentials and re-create: `cloudflared tunnel delete fbr-demo-tunnel`

**Issue:** `Connection refused on localhost:8000`
- Ensure the HTTP server is running on port 8000
- Check with: `netstat -ano | findstr :8000`

**Issue:** `hostname already in use`
- Your domain might be routed to another tunnel
- Check: `cloudflared tunnel route list`

## Architecture

```
Internet (HTTPS)
    ↓
Cloudflare Edge (your-domain.com)
    ↓
Cloudflare Tunnel (cloudflared)
    ↓
Local HTTP Server (localhost:8000)
    ↓
FBR Demo App (index.html + JSX files)
```

## Files

- `.cloudflared/config.yml` - Tunnel configuration
- `index.html` - Main app entry point (React + Babel)
- `fbr-data.js` - Application data
- `fbr-*.jsx` - React components

## Notes

- The tunnel creates a secure, encrypted connection between your local machine and Cloudflare's edge
- No port forwarding needed
- No firewall configuration needed
- Works from anywhere with internet access

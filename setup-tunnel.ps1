# FBR Demo App - Cloudflare Tunnel Setup Script
# Run with: powershell -ExecutionPolicy Bypass -File setup-tunnel.ps1

Write-Host "=== FBR Demo App - Cloudflare Tunnel Setup ===" -ForegroundColor Cyan

# Check cloudflared
Write-Host "`n[1/4] Checking cloudflared..." -ForegroundColor Yellow
try {
  $version = & cloudflared --version 2>&1
  Write-Host "✓ cloudflared installed: $version" -ForegroundColor Green
} catch {
  Write-Host "✗ cloudflared not found. Install from: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/" -ForegroundColor Red
  exit 1
}

# Authenticate
Write-Host "`n[2/4] Authenticate with Cloudflare..." -ForegroundColor Yellow
try {
  $authFile = "$env:USERPROFILE\.cloudflared\cert.pem"
  if (Test-Path $authFile) {
    Write-Host "✓ Already authenticated" -ForegroundColor Green
  } else {
    Write-Host "Opening Cloudflare login page..."
    & cloudflared tunnel login
    Write-Host "✓ Authentication complete" -ForegroundColor Green
  }
} catch {
  Write-Host "Authentication skipped - run `cloudflared tunnel login` manually if needed" -ForegroundColor Yellow
}

# Create tunnel
Write-Host "`n[3/4] Creating tunnel..." -ForegroundColor Yellow
try {
  $tunnelList = & cloudflared tunnel list 2>&1
  if ($tunnelList -match "fbr-demo-tunnel") {
    Write-Host "✓ Tunnel 'fbr-demo-tunnel' already exists" -ForegroundColor Green
  } else {
    Write-Host "Creating new tunnel..."
    & cloudflared tunnel create fbr-demo-tunnel
    Write-Host "✓ Tunnel created" -ForegroundColor Green
  }
} catch {
  Write-Host "Could not create tunnel: $_" -ForegroundColor Yellow
}

# Display instructions
Write-Host "`n[4/4] Setup Complete!" -ForegroundColor Green

Write-Host "`n╔════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║           NEXT STEPS                                   ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Cyan

Write-Host @"

1. START THE LOCAL SERVER:
   Use Claude Code to launch "serve-fbr-demo" or run:
   python -m http.server 8000 --directory C:\Users\Admin\Documents\fbr-demo

2. CONFIGURE YOUR DOMAIN:
   Edit .cloudflared\config.yml and replace:
   - hostname: your-domain.com

3. ROUTE YOUR DOMAIN:
   cloudflared tunnel route dns fbr-demo-tunnel your-domain.com

4. RUN THE TUNNEL:
   cloudflared tunnel --config C:\Users\Admin\Documents\fbr-demo\.cloudflared\config.yml run fbr-demo-tunnel

5. ACCESS YOUR APP:
   https://your-domain.com

"@

Write-Host "For more details, see CLOUDFLARE_TUNNEL_SETUP.md" -ForegroundColor Cyan

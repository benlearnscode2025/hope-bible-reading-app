# Start the local server in a separate background job
$serverJob = Start-Job -ScriptBlock {
    # Run the server script
    C:\Users\benim\Documents\antigravity\silly-noether\serve.ps1
}

# Wait for server to boot
Start-Sleep -Seconds 3

# Define paths
$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$outputPath = "C:\Users\benim\Documents\antigravity\silly-noether\scratch\preview_edge.png"

# Execute headless screenshot
& $edgePath --headless --disable-gpu --screenshot=$outputPath --window-size=1200,2400 "http://localhost:8080/brand-preview.html"

# Stop the background job
Stop-Job $serverJob
Remove-Job $serverJob

Write-Output "Screenshot saved to $outputPath"

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$scriptBlock = {
    $browser = New-Object System.Windows.Forms.WebBrowser
    $browser.Width = 1200
    $browser.Height = 1600
    $browser.ScrollBarsEnabled = $false
    
    $url = "file:///C:/Users/benim/Documents/antigravity/silly-noether/brand-preview.html"
    $browser.Navigate($url)
    
    # Wait for the document to load
    while ($browser.ReadyState -ne 'Complete') {
        [System.Windows.Forms.Application]::DoEvents()
        Start-Sleep -Milliseconds 100
    }
    
    # Let it render
    Start-Sleep -Seconds 3
    [System.Windows.Forms.Application]::DoEvents()
    
    # Create a bitmap of the browser
    $bitmap = New-Object System.Drawing.Bitmap($browser.Width, $browser.Height)
    $rect = New-Object System.Drawing.Rectangle(0, 0, $browser.Width, $browser.Height)
    $browser.DrawToBitmap($bitmap, $rect)
    
    # Save the bitmap
    $outputPath = "C:\Users\benim\Documents\antigravity\silly-noether\scratch\brand_preview_render.png"
    $bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bitmap.Dispose()
    $browser.Dispose()
    Write-Output "Screenshot saved to $outputPath"
}

# Run in an STA thread
$thread = New-Object System.Threading.Thread([System.Threading.ThreadStart]$scriptBlock)
$thread.SetApartmentState([System.Threading.ApartmentState]::STA)
$thread.Start()
$thread.Join()

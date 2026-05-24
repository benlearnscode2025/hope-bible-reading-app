Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$files = @("_-05.svg", "_-06.svg", "_-11.svg")

$scriptBlock = {
    param($files)
    
    foreach ($filename in $files) {
        $browser = New-Object System.Windows.Forms.WebBrowser
        $browser.Width = 500
        $browser.Height = 500
        $browser.ScrollBarsEnabled = $false
        
        $filePath = "file:///C:/Users/benim/Documents/antigravity/silly-noether/assets/brand/$filename"
        $browser.Navigate($filePath)
        
        # Wait for the document to load
        while ($browser.ReadyState -ne 'Complete') {
            [System.Windows.Forms.Application]::DoEvents()
            Start-Sleep -Milliseconds 100
        }
        
        # Let it render
        Start-Sleep -Milliseconds 500
        [System.Windows.Forms.Application]::DoEvents()
        
        # Create a bitmap and draw the browser to it
        $bitmap = New-Object System.Drawing.Bitmap(500, 500)
        $rect = New-Object System.Drawing.Rectangle(0, 0, 500, 500)
        $browser.DrawToBitmap($bitmap, $rect)
        
        # Save the bitmap
        $outputPath = "C:\Users\benim\Documents\antigravity\silly-noether\scratch\$($filename).png"
        $bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
        $bitmap.Dispose()
        $browser.Dispose()
        
        Write-Output "Rendered $filename to $outputPath"
    }
}

# Run in an STA thread
$thread = New-Object System.Threading.Thread([System.Threading.ThreadStart]{ & $scriptBlock $files })
$thread.SetApartmentState([System.Threading.ApartmentState]::STA)
$thread.Start()
$thread.Join()

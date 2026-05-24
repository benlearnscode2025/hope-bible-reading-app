[Reflection.Assembly]::LoadWithPartialName("System.Drawing") | Out-Null
$img = [System.Drawing.Image]::FromFile("assets/brand/__Primary-Hickory.jpg")
Write-Output "$($img.Width)x$($img.Height)"
$img.Dispose()

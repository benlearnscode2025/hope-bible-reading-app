$brandDir = "C:\Users\benim\Documents\antigravity\silly-noether\assets\brand"
$files = Get-ChildItem -Path $brandDir -Filter *.svg

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Count <path tags
    $matches = [regex]::Matches($content, "<path")
    $pathCount = $matches.Count
    
    # Find viewBox
    $viewBoxMatch = [regex]::Match($content, 'viewBox="([^"]+)"')
    $viewBox = if ($viewBoxMatch.Success) { $viewBoxMatch.Groups[1].Value } else { "none" }
    
    # Find Hex Colors
    $colorMatches = [regex]::Matches($content, '#[0-9a-fA-F]{6}')
    $colors = @()
    foreach ($m in $colorMatches) {
        if ($colors -notcontains $m.Value) {
            $colors += $m.Value
        }
    }
    $colorsStr = $colors -join ", "
    
    Write-Output "$($file.Name): paths=$pathCount, viewBox=$viewBox, colors=$colorsStr"
}

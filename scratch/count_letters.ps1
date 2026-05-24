$files = @("_-05.svg", "_-06.svg", "_-11.svg")

foreach ($filename in $files) {
    $filePath = "assets/brand/$filename"
    $content = Get-Content $filePath -Raw
    
    # Extract path nodes
    $matches = [regex]::Matches($content, '<path[^>]+d="([^"]+)"')
    
    $lowerPaths = @()
    
    foreach ($m in $matches) {
        $pathData = $m.Groups[1].Value
        $numbers = [regex]::Matches($pathData, '-?\d+\.?\d*') | ForEach-Object { [double]$_.Value }
        
        # Calculate bounding box for this path
        $minX = 999999; $maxX = -999999; $minY = 999999; $maxY = -999999
        for ($i = 0; $i -lt $numbers.Count; $i++) {
            $val = $numbers[$i]
            if ($i % 2 -eq 0) {
                if ($val -lt $minX) { $minX = $val }
                if ($val -gt $maxX) { $maxX = $val }
            } else {
                if ($val -lt $minY) { $minY = $val }
                if ($val -gt $maxY) { $maxY = $val }
            }
        }
        
        # If the path is located at the bottom half (Y > 280 for a 500-height viewBox)
        if ($minY -gt 280) {
            $lowerPaths += [PSCustomObject]@{
                minX = $minX
                maxX = $maxX
                minY = $minY
                maxY = $maxY
                width = ($maxX - $minX)
            }
        }
    }
    
    # Sort lower paths by X coordinate to see letters from left to right
    $sortedPaths = $lowerPaths | Sort-Object minX
    
    Write-Output "File: $filename | Total paths: $($matches.Count) | Bottom paths (Y > 280): $($lowerPaths.Count)"
    if ($sortedPaths.Count -gt 0) {
        Write-Output "  Bottom paths bounds: X: [$($sortedPaths[0].minX), $($sortedPaths[-1].maxX)] | Y: [$($sortedPaths[0].minY), $($sortedPaths[-1].maxY)]"
    }
}

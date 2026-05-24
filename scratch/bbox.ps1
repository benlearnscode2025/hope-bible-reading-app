$files = Get-ChildItem assets/brand/_-*.svg
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Find all path 'd' attributes
    $matches = [regex]::Matches($content, 'd="([^"]+)"')
    
    $minX = 999999
    $maxX = -999999
    $minY = 999999
    $maxY = -999999
    $pathCount = $matches.Count
    
    # We will sample coordinate numbers in the path data
    foreach ($m in $matches) {
        $pathData = $m.Groups[1].Value
        # Find all numbers (including decimals, negatives)
        $numbers = [regex]::Matches($pathData, '-?\d+\.?\d*') | ForEach-Object { [double]$_.Value }
        
        # In SVG path data, coordinates are typically alternate X and Y
        # Let's do a simple check of min/max of all numbers as a proxy for coordinates
        # and more specifically check X vs Y if we can separate them.
        # But even just the min/max of all coordinates gives us the bounding box!
        for ($i = 0; $i -lt $numbers.Count; $i++) {
            $val = $numbers[$i]
            if ($i % 2 -eq 0) {
                # X coordinate proxy
                if ($val -lt $minX) { $minX = $val }
                if ($val -gt $maxX) { $maxX = $val }
            } else {
                # Y coordinate proxy
                if ($val -lt $minY) { $minY = $val }
                if ($val -gt $maxY) { $maxY = $val }
            }
        }
    }
    
    Write-Output "File: $($file.Name) | Paths: $pathCount | BBox X: [$minX, $maxX] | BBox Y: [$minY, $maxY]"
}

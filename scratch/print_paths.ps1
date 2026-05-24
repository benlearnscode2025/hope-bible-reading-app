$filePath = "assets/brand/_-11.svg"
$content = Get-Content $filePath -Raw
$matches = [regex]::Matches($content, '<path[^>]+d="([^"]+)"')

Write-Output "Total paths found: $($matches.Count)"
for ($i = 0; $i -lt [Math]::Min(10, $matches.Count); $i++) {
    $pathData = $matches[$i].Groups[1].Value
    $numbers = [regex]::Matches($pathData, '-?\d+\.?\d*') | ForEach-Object { [double]$_.Value }
    
    $minX = 999999; $maxX = -999999; $minY = 999999; $maxY = -999999
    for ($j = 0; $j -lt $numbers.Count; $j++) {
        $val = $numbers[$j]
        if ($j % 2 -eq 0) {
            if ($val -lt $minX) { $minX = $val }
            if ($val -gt $maxX) { $maxX = $val }
        } else {
            if ($val -lt $minY) { $minY = $val }
            if ($val -gt $maxY) { $maxY = $val }
        }
    }
    Write-Output "Path $i | Numbers: $($numbers.Count) | X: [$minX, $maxX] | Y: [$minY, $maxY]"
}

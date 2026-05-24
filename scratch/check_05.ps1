$filePath = "assets/brand/_-05.svg"
$content = Get-Content $filePath -Raw
$matches = [regex]::Matches($content, '<path[^>]+d="([^"]+)"')

$bottomPaths = @()
for ($i = 0; $i -lt $matches.Count; $i++) {
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
    
    if ($maxY -gt 350) {
        $bottomPaths += [PSCustomObject]@{
            index = $i
            minX = $minX
            maxX = $maxX
            minY = $minY
            maxY = $maxY
        }
    }
}

# Sort by minX
$sorted = $bottomPaths | Sort-Object minX
Write-Output "Total bottom paths: $($sorted.Count)"
foreach ($p in $sorted) {
    Write-Output "Path $($p.index) | X: [$($p.minX), $($p.maxX)] | Y: [$($p.minY), $($p.maxY)]"
}

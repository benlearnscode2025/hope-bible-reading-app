$files = @("_-05.svg", "_-06.svg", "_-11.svg")

foreach ($filename in $files) {
    $filePath = "assets/brand/$filename"
    $content = Get-Content $filePath -Raw
    $matches = [regex]::Matches($content, '<path[^>]+d="([^"]+)"')
    
    $pathsWithMaxYOver350 = 0
    $pathsWithMaxYBetween250And350 = 0
    $pathsWithMaxYUnder250 = 0
    
    for ($i = 0; $i -lt $matches.Count; $i++) {
        $pathData = $matches[$i].Groups[1].Value
        $numbers = [regex]::Matches($pathData, '-?\d+\.?\d*') | ForEach-Object { [double]$_.Value }
        
        $maxY = -999999
        for ($j = 1; $j -lt $numbers.Count; $j += 2) {
            $val = $numbers[$j]
            if ($val -gt $maxY) { $maxY = $val }
        }
        
        if ($maxY -gt 350) {
            $pathsWithMaxYOver350++
        } elseif ($maxY -gt 250) {
            $pathsWithMaxYBetween250And350++
        } else {
            $pathsWithMaxYUnder250++
        }
    }
    
    Write-Output "File: $filename | Total Paths: $($matches.Count) | MaxY > 350: $pathsWithMaxYOver350 | MaxY 250-350: $pathsWithMaxYBetween250And350 | MaxY < 250: $pathsWithMaxYUnder250"
}

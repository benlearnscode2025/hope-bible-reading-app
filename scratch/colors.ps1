$files = Get-ChildItem assets/brand/_-*.svg
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $colors = [regex]::Matches($content, '#[0-9a-fA-F]{6}') | ForEach-Object { $_.Value } | Select-Object -Unique
    $colorsStr = ($colors -join ", ")
    Write-Output "$($file.Name) colors: $colorsStr"
}

$files = Get-ChildItem assets/brand/_-*.svg
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Extract IDs in group tags or SVG id
    $groupIds = [regex]::Matches($content, '<g\s+id="([^"]+)"') | ForEach-Object { $_.Groups[1].Value }
    # Extract titles
    $titles = [regex]::Matches($content, '<title>([^<]+)</title>') | ForEach-Object { $_.Groups[1].Value }
    
    # Let's print out what we found
    $groupsStr = ($groupIds -join ", ")
    if ($groupsStr.Length -gt 100) { $groupsStr = $groupsStr.Substring(0, 100) + "..." }
    $titleStr = ($titles -join ", ")
    
    Write-Output "File: $($file.Name) | Title: $titleStr | Groups: $groupsStr"
}

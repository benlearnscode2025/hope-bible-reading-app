$files = Get-ChildItem -Path "C:\Users\benim\Documents\antigravity\silly-noether\assets\brand" -Filter _-*.svg
foreach ($file in $files) {
    $c = [System.IO.File]::ReadAllText($file.FullName)
    # Check if we can find a viewBox
    $viewBox = ""
    if ($c -match 'viewBox="([^"]+)"') {
        $viewBox = $Matches[1]
    }
    # Check for some content identifiers
    $hasBook = $c -contains "book" -or $c.Contains("M124.75")
    # Let's count path tags
    $paths = ([regex]::Matches($c, '<path')).Count
    Write-Output "$($file.Name) : size=$($file.Length) viewBox=$viewBox paths=$paths"
}

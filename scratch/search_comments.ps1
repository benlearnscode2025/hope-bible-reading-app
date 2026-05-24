$files = Get-ChildItem assets/brand/_-*.svg
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $comments = [regex]::Matches($content, '<!--([^>]+)-->') | ForEach-Object { $_.Groups[1].Value.Trim() }
    if ($comments) {
        $commentsStr = ($comments -join " | ")
        Write-Output "$($file.Name) comments: $commentsStr"
    }
}

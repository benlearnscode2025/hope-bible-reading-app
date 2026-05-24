$files = Get-ChildItem assets/brand/_-*.svg
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    if ($content -like '*Hope*' -or $content -like '*Toledo*' -or $content -like '*Baptist*') {
        Write-Output "Match found in $($file.Name)"
    }
}

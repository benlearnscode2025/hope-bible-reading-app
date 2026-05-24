$logPath = "C:\Users\benim\.gemini\antigravity\brain\27c9bf24-2bd6-4bd9-948d-76a193c5a642\.system_generated\logs\transcript.jsonl"
$lines = Get-Content $logPath
foreach ($line in $lines) {
    if ($line -like "*media__*" -or $line -like "*png*") {
        # Parse json to see step index and tool name
        try {
            $json = ConvertFrom-Json $line
            Write-Output "Step: $($json.step_index) | Type: $($json.type) | Tool: $($json.tool_calls[0].name) | Args: $($json.tool_calls[0].args | Out-String)"
        } catch {
            # Not valid json
        }
    }
}

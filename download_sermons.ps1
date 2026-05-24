# C:\Users\benim\Documents\antigravity\silly-noether\download_sermons.ps1
param (
    [string]$BroadcasterId = "hopetoledo",
    [string]$OutputFile = "sermons.json",
    [int]$ScrapeLimit = 10
)

$script:BooksRegex = "Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Judges|Ruth|1 Samuel|2 Samuel|1 Kings|2 Kings|1 Chronicles|2 Chronicles|Ezra|Nehemiah|Esther|Job|Psalms|Proverbs|Ecclesiastes|Song of Solomon|Isaiah|Jeremiah|Lamentations|Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi|Matthew|Mark|Luke|John|Acts|Romans|1 Corinthians|2 Corinthians|Galatians|Ephesians|Philippians|Colossians|1 Thessalonians|2 Thessalonians|1 Timothy|2 Timothy|Titus|Philemon|Hebrews|James|1 Peter|2 Peter|1 John|2 John|3 John|Jude|Revelation"
$FeedUrl = "https://rss.sermonaudio.com/rss_source.rss?sourceid=$BroadcasterId"

Write-Host "Fetching SermonAudio feed from $FeedUrl ..."
try {
    # Fetch RSS items directly via Invoke-RestMethod
    $items = Invoke-RestMethod -Uri $FeedUrl
} catch {
    Write-Error "Failed to fetch RSS feed: $_"
    exit 1
}

$sermons = @()

# Helper function to try scraping scripture references from the landing page meta tags
function Get-Scripture {
    param ($link)
    try {
        $html = Invoke-WebRequest -Uri $link -UseBasicParsing -TimeoutSec 10
        if ($html.Content -match 'Scripture:\s*([^"]+?)(?=\s*-\s*|")') {
            return $Matches[1].Trim()
        }
        if ($html.Content -match "($script:BooksRegex)\s+(\d+)(:\d+(-\d+)?)?") {
            return $Matches[0].Trim()
        }
    } catch {
        Write-Verbose "Failed to scrape scripture from ${link}: $_"
    }
    return $null
}

# Outline and questions generator based on title keywords
function Get-StudyGuide {
    param ($title, $scripture)
    $outline = @()
    $questions = @()
    
    if ($scripture) {
        $questions += "How does this sermon help you understand the context of ${scripture}?"
    } else {
        $questions += "What is the primary biblical truth taught in this message?"
    }
    
    if ($title -match "Spiritual Gifts") {
        $outline += @("I. The Source of Spiritual Gifts", "II. The Diversity of Gifts in the Church", "III. Using Your Gift for God's Glory")
        $questions += @("What spiritual gifts do you recognize in your own life or others?", "How can you use your gifts to build up Hope Baptist Church?")
    } elseif ($title -match "Marriage" -or $title -match "Family") {
        $outline += @("I. The Covenant of Marriage", "II. Mutual Respect and Communication", "III. Christ-Centered Leadership in the Home")
        $questions += @("How does this sermon challenge your expectations in relationships?", "What is one practical way you can show Christ's love to your family this week?")
    } else {
        $outline += @("I. Biblical Exposition of the Text", "II. The Heart of the Message", "III. Practical Life Application")
        $questions += @("What was the most challenging point Pastor Marshall/Kabel made?", "How can you apply this sermon's teaching to your walk with Christ today?")
    }
    
    return @{
        outline = $outline
        questions = $questions
    }
}

$count = 0
foreach ($item in $items) {
    $sermonId = ""
    if ($item.link -match 'sermons/(\d+)') {
        $sermonId = $Matches[1]
    }
    
    $audioUrl = $null
    if ($null -ne $item.enclosure -and $null -ne $item.enclosure.url) {
        $audioUrl = $item.enclosure.url
        if ($audioUrl -match '\.mp3') {
            $audioUrl = $audioUrl.Split('?')[0]
        }
    }
    
    # Optional: scrape details (only scrape first $ScrapeLimit for speed in validation, fallback to title matching)
    $scriptureStr = $null
    if ($count -lt $ScrapeLimit) {
        $scriptureStr = Get-Scripture -link $item.link
    }
    
    # Try matching title if scrape returned nothing
    if (-not $scriptureStr -and ($item.title -match "($script:BooksRegex)\s+(\d+)")) {
        $scriptureStr = $Matches[0]
    }
    
    $mappedBook = $null
    $mappedChapter = $null
    if ($scriptureStr -and ($scriptureStr -match "($script:BooksRegex)\s+(\d+)")) {
        $mappedBook = $Matches[1]
        $mappedChapter = [int]$Matches[2]
    }
    
    $guide = Get-StudyGuide -title $item.title -scripture $scriptureStr
    
    $sermon = @{
        id = $sermonId
        title = $item.title
        speaker = $item.author
        date = $item.pubDate
        duration = $item.duration
        audioUrl = $audioUrl
        scripture = $scriptureStr
        mappedBook = $mappedBook
        mappedChapter = $mappedChapter
        outline = $guide.outline
        questions = $guide.questions
    }
    $sermons += $sermon
    $count++
}

# Ensure output path is absolute for WriteAllText and serialize as JSON array
$AbsoluteOutputFile = $ExecutionContext.SessionState.Path.GetUnresolvedProviderPathFromPSPath($OutputFile)
$json = ConvertTo-Json -InputObject @($sermons) -Depth 4
[System.IO.File]::WriteAllText($AbsoluteOutputFile, $json, (New-Object System.Text.UTF8Encoding $false))

Write-Host "Exported $($sermons.Count) sermons to $OutputFile successfully!"

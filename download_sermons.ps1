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
    param ($title, $scripture, $speaker)
    $outline = @()
    $questions = @()
    
    # Clean up title to find a nice topic name
    # E.g. "Spiritual Gifts #14 (Helps)" -> "Helps"
    # "Soul Winning #1 (Fishing For Men)" -> "Fishing For Men"
    $cleanTopic = $title
    
    # If title has parentheses with content inside, extract it if it's not a continuation/part note
    if ($title -match '\(([^)]+)\)') {
        $parenthetical = $Matches[1].Trim()
        if ($parenthetical -notmatch '(?i)part|cont|session|year|date|sermon|\d+') {
            $cleanTopic = $parenthetical
        } else {
            # Strip parenthetical part
            $cleanTopic = ($title -replace '\s*\(.*?\)', '').Trim()
        }
    }
    
    # Strip numbers like #12, #1, etc.
    $cleanTopic = ($cleanTopic -replace '\s*#\d+', '').Trim()
    
    # Clean up double spaces
    $cleanTopic = ($cleanTopic -replace '\s+', ' ').Trim()

    # Determine templates based on keywords
    if ($title -match "Spiritual Gifts") {
        $gift = $cleanTopic
        if ($gift -eq "Spiritual Gifts") { $gift = "Spiritual Gifts in the Church" }
        $outline += @(
            "I. The Biblical Source and Purpose of Spiritual Gifts",
            ('II. Understanding the Specific Role of {0} in the Body' -f $gift),
            "III. Stewardship: Putting Your Gifts into Action for God's Glory"
        )
        $questions += @(
            ('How does the specific gift of {0} build up and strengthen the church?' -f $gift),
            "What spiritual gifts do you recognize in your own life or in others?",
            "How can you practically use your gifts to minister to others at Hope Baptist Church?"
        )
    } elseif ($title -match "Marriage" -or $title -match "Family" -or $title -match "Home" -or $title -match "Husband" -or $title -match "Wife" -or $title -match "Parent") {
        $outline += @(
            "I. The Divine Design for Marriage and the Home",
            "II. Key Principles for Relationships: Communication, Respect, and Love",
            "III. Establishing a Christ-Centered Atmosphere in Daily Life"
        )
        $questions += @(
            ('How does the biblical view of {0} contrast with the world''s standard?' -f $cleanTopic),
            "What is one practical way you can show Christ's love to your family members this week?",
            "How does this message challenge your expectations or communication in your relationships?"
        )
    } elseif ($title -match "Woman" -or $title -match "Women" -or $title -match "Wives" -or $title -match "Mother" -or $title -match "Godly Woman" -or $title -match "Godly Women") {
        $outline += @(
            "I. The Calling and Value of Godly Womanhood",
            "II. Character Traits of a Virtuous Woman in a Worldly Culture",
            "III. Cultivating Spiritual Beauty, Grace, and Faith"
        )
        $questions += @(
            ('What specific qualities of a godly woman were highlighted in {0}?' -f $cleanTopic),
            "How does society pressure women to conform to worldly standards, and how does Scripture protect them?",
            "How can the church encourage and support women in pursuing a Christ-centered life?"
        )
    } elseif ($title -match "Man" -or $title -match "Men" -or $title -match "Fathers" -or $title -match "Husband" -or $title -match "Godly Man" -or $title -match "Male") {
        $outline += @(
            "I. The Biblical Standard for Godly Manhood and Leadership",
            "II. Responsibilities of Men in the Home, Church, and Community",
            "III. Walking in Integrity, Courage, and Spiritual Maturity"
        )
        $questions += @(
            ('What key responsibilities of a godly man stood out in {0}?' -f $cleanTopic),
            "How can men cultivate spiritual strength and humility in their daily walk?",
            "In what ways does Christ model the ultimate pattern for male leadership?"
        )
    } elseif ($title -match "Christ" -or $title -match "Jesus" -or $title -match "Savior" -or $title -match "Lord" -or $title -match "God") {
        $outline += @(
            ('I. The Supreme Character and Person of Jesus Christ: {0}' -f $cleanTopic),
            "II. The Finished Work of Redemption and Grace",
            "III. Conforming Our Hearts and Minds to the Savior's Image"
        )
        $questions += @(
            "How does this sermon enlarge your appreciation for the person and work of Christ?",
            ('What does it mean to live in conformity to the image of Christ in the context of {0}?' -f $cleanTopic),
            "How does the truth of this message encourage you in your daily walk of faith?"
        )
    } elseif ($title -match "Soul Winning" -or $title -match "Evangelism" -or $title -match "Gospel" -or $title -match "Witness" -or $title -match "Fishing For Men") {
        $outline += @(
            "I. The Biblical Commandment and Necessity of Soul Winning",
            "II. Overcoming Fear: Developing a Heart of Compassion for the Lost",
            "III. Practical Application: Sharing the Gospel (Fishing for Men)"
        )
        $questions += @(
            "Why is sharing the Gospel often difficult, and how does this message encourage you to share your faith?",
            "Who is one person God has placed in your life that you can actively pray for and witness to?",
            "What does it mean to be a 'fisher of men' in your daily circle of influence?"
        )
    } elseif ($title -match "Gideon" -or $title -match "Joab" -or $title -match "David" -or $title -match "Saul" -or $title -match "Moses" -or $title -match "Paul" -or $title -match "Peter") {
        $charName = $cleanTopic
        if ($title -match "Gideon") { $charName = "Gideon" }
        elseif ($title -match "Joab") { $charName = "Joab" }
        elseif ($title -match "David") { $charName = "David" }
        elseif ($title -match "Saul") { $charName = "Saul" }
        elseif ($title -match "Moses") { $charName = "Moses" }
        elseif ($title -match "Paul") { $charName = "Paul" }
        elseif ($title -match "Peter") { $charName = "Peter" }
        
        $outline += @(
            ('I. The Historical and Biblical Setting of the Life of {0}' -f $charName),
            ('II. Character Analysis: Lessons, Triumphs, and Failures of {0}' -f $charName),
            "III. Applying These Old/New Testament Lessons to Our Christian Walk"
        )
        $questions += @(
            ('What key lesson or warning from the life of {0} stood out to you most?' -f $charName),
            ('How did God show His power, grace, or judgment through the story of {0}?' -f $charName),
            "How can we apply these character principles to avoid similar pitfalls and stand strong in faith?"
        )
    } else {
        $outline += @(
            ('I. Scriptural Exposition of the Theme: {0}' -f $cleanTopic),
            "II. Deeper Insights and Core Spiritual Truths",
            ('III. Personal Obedience: Applying {0} to Your Walk with Christ' -f $cleanTopic)
        )
        $questions += @(
            ('What was the most challenging or encouraging truth presented regarding {0}?' -f $cleanTopic),
            "How does this teaching align with other scriptures you have studied?",
            ('What is one concrete action step you can take to put this message into practice today?' -f $cleanTopic)
        )
    }
    
    # Universal additions based on scripture and speaker
    if ($scripture) {
        $questions = @(('How does this sermon help you understand the context and application of {0}?' -f $scripture)) + $questions
    } else {
        $questions = @("What is the primary biblical truth taught in this message?") + $questions
    }
    
    if ($speaker) {
        $speakerName = if ($speaker -match 'Pastor|Dr\.|Rev\.') { $speaker } else { 'Pastor ' + $speaker }
        $questions += ('{0} highlighted key applications. How can you share this encouragement with the brethren?' -f $speakerName)
    } else {
        $questions += "How can you share the truths of this sermon with the brethren at Hope Baptist?"
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
    
    $guide = Get-StudyGuide -title $item.title -scripture $scriptureStr -speaker $item.author
    
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

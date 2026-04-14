# Check for unused CSS custom property tokens
$tokenFile = "design-tokens-ultimate.css"
$motionFile = "motion.css"
$componentsDir = "components"

# Extract all token definitions from token files
function Get-TokenDefinitions($filePath) {
    $content = Get-Content $filePath -Raw
    $pattern = '--sys-[^:]+'
    $matches = [regex]::Matches($content, $pattern)
    $tokens = $matches | ForEach-Object { $_.Value }
    return $tokens
}

# Extract all token references from CSS files
function Get-TokenReferences($filePath) {
    $content = Get-Content $filePath -Raw
    $pattern = 'var\(--sys-[^)]+\)'
    $matches = [regex]::Matches($content, $pattern)
    $refs = $matches | ForEach-Object { $_.Value -replace 'var\(|\)', '' }
    return $refs
}

Write-Host "=== UNUSED TOKEN AUDIT ==="

# Get all defined tokens
$definedTokens = Get-TokenDefinitions $tokenFile
$motionTokens = Get-TokenDefinitions $motionFile
$allDefinedTokens = $definedTokens + $motionTokens | Select-Object -Unique
Write-Host "Total defined tokens: $($allDefinedTokens.Count)"
Write-Host "  - From $($tokenFile): $($definedTokens.Count)"
Write-Host "  - From $($motionFile): $($motionTokens.Count)"

# Get all CSS files to search for references
$cssFiles = Get-ChildItem -Path "." -Filter "*.css" -Recurse | Where-Object { $_.FullName -notlike "*node_modules*" }
Write-Host "`nSearching for references in $($cssFiles.Count) CSS files..."

$allReferences = @()
foreach ($file in $cssFiles) {
    $refs = Get-TokenReferences $file.FullName
    $allReferences += $refs
}

$uniqueReferences = $allReferences | Select-Object -Unique
Write-Host "Total unique token references found: $($uniqueReferences.Count)"

# Find unused tokens (defined but not referenced)
$unusedTokens = $allDefinedTokens | Where-Object { $uniqueReferences -notcontains $_ }
Write-Host "`nUnused tokens (defined but not referenced): $($unusedTokens.Count)"

if ($unusedTokens.Count -gt 0) {
    # Group by token category for better readability
    $categories = @{}
    foreach ($token in $unusedTokens) {
        $category = $token -replace '^--sys-([^-]+).*$', '$1'
        if (-not $categories.ContainsKey($category)) {
            $categories[$category] = @()
        }
        $categories[$category] += $token
    }
    
    # Display by category
    foreach ($category in $categories.Keys | Sort-Object) {
        $count = $categories[$category].Count
        Write-Host "`n  $category ($count):"
        $categories[$category] | Sort-Object | ForEach-Object { Write-Host "    $_" }
    }
} else {
    Write-Host "✅ All tokens are referenced!"
}

# Find referenced but undefined tokens (should be zero after previous fix)
$undefinedTokens = $uniqueReferences | Where-Object { $allDefinedTokens -notcontains $_ }
Write-Host "`nReferenced but undefined tokens: $($undefinedTokens.Count)"
if ($undefinedTokens.Count -gt 0) {
    $undefinedTokens | Sort-Object | ForEach-Object { Write-Host "  $_" }
} else {
    Write-Host "✅ All referenced tokens are defined."
}

# Token usage statistics
Write-Host "`n=== TOKEN USAGE STATISTICS ==="
$usageCount = @{}
foreach ($ref in $allReferences) {
    if (-not $usageCount.ContainsKey($ref)) {
        $usageCount[$ref] = 0
    }
    $usageCount[$ref]++
}

$mostUsed = $usageCount.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 10
Write-Host "Top 10 most used tokens:"
foreach ($item in $mostUsed) {
    Write-Host "  $($item.Name): $($item.Value) references"
}
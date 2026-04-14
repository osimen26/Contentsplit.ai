# Check for duplicate CSS custom property definitions in design-tokens-ultimate.css
$cssFile = "design-tokens-ultimate.css"
$content = Get-Content $cssFile -Raw

# Extract all token names (--sys-*)
$tokenPattern = '--sys-[^:]+'
$matches = [regex]::Matches($content, $tokenPattern)
$tokenNames = $matches | ForEach-Object { $_.Value }

Write-Host "=== DUPLICATE TOKEN CHECK ==="
Write-Host "Total tokens found: $($tokenNames.Count)"

# Find duplicates
$duplicates = $tokenNames | Group-Object | Where-Object { $_.Count -gt 1 }

if ($duplicates.Count -eq 0) {
    Write-Host "✅ No duplicate token definitions found."
} else {
    Write-Host "❌ Found $($duplicates.Count) duplicate token definitions:"
    $duplicates | ForEach-Object {
        Write-Host "  $($_.Name): $($_.Count) occurrences"
    }
}

# Check for tokens that reference other tokens (circular references)
Write-Host "`n=== TOKEN REFERENCE CHECK ==="
$varRefPattern = 'var\(--sys-[^)]+\)'
$varRefs = [regex]::Matches($content, $varRefPattern)
$referencedTokens = $varRefs | ForEach-Object { $_.Value -replace 'var\(|\)', '' }

Write-Host "Total token references found: $($referencedTokens.Count)"
$uniqueReferenced = $referencedTokens | Select-Object -Unique
Write-Host "Unique referenced tokens: $($uniqueReferenced.Count)"

# Check if any referenced tokens don't exist
$missingTokens = $uniqueReferenced | Where-Object { $tokenNames -notcontains $_ }
if ($missingTokens.Count -eq 0) {
    Write-Host "✅ All referenced tokens are defined."
} else {
    Write-Host "❌ Found $($missingTokens.Count) referenced tokens that are not defined:"
    $missingTokens | ForEach-Object { Write-Host "  $_" }
}

# Output summary
Write-Host "`n=== SUMMARY ==="
Write-Host "Total token definitions: $($tokenNames.Count)"
Write-Host "Unique token definitions: $($tokenNames | Select-Object -Unique | Measure-Object).Count"
Write-Host "Token references: $($referencedTokens.Count)"
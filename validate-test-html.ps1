# Validate test.html integration
$htmlFile = "test.html"
$cssFiles = @(
    "design-tokens-ultimate.css",
    "motion.css",
    "components/button.css",
    "components/input.css",
    "components/card.css",
    "components/chips.css",
    "components/icons.css",
    "components/table.css",
    "components/toast.css",
    "components/modal.css",
    "components/select.css",
    "components/navigation.css",
    "components/tooltips.css"
)

Write-Host "=== TEST.HTML INTEGRATION VALIDATION ==="

# Check CSS files exist
$missingCss = @()
foreach ($css in $cssFiles) {
    if (-not (Test-Path $css)) {
        $missingCss += $css
    }
}
if ($missingCss.Count -gt 0) {
    Write-Host "❌ Missing CSS files: $($missingCss -join ', ')"
} else {
    Write-Host "✅ All CSS files exist."
}

# Read HTML content
$htmlContent = Get-Content $htmlFile -Raw

# Extract class attributes using regex
$classPattern = 'class="([^"]+)"'
$classMatches = [regex]::Matches($htmlContent, $classPattern)
$allClasses = @()
foreach ($match in $classMatches) {
    $classes = $match.Groups[1].Value -split '\s+' | Where-Object { $_ -ne '' }
    $allClasses += $classes
}
$uniqueClasses = $allClasses | Select-Object -Unique
Write-Host "Found $($uniqueClasses.Count) unique CSS classes in test.html"

# Load all component CSS content
$componentCssContent = @()
foreach ($css in $cssFiles) {
    if (Test-Path $css) {
        $content = Get-Content $css -Raw
        $componentCssContent += $content
    }
}
$combinedCssContent = $componentCssContent -join "`n"

# Check each class exists in CSS (as a selector)
$missingClasses = @()
foreach ($class in $uniqueClasses) {
    # Look for pattern .class (with possible preceding characters like .class:)
    $pattern = "\.$class([\s,:.{]|$)"
    if ($combinedCssContent -notmatch $pattern) {
        $missingClasses += $class
    }
}
if ($missingClasses.Count -gt 0) {
    Write-Host "❌ $($missingClasses.Count) classes not found in component CSS:"
    $missingClasses | Sort-Object | ForEach-Object { Write-Host "  $_" }
} else {
    Write-Host "✅ All classes used in test.html are defined in component CSS."
}

# Check for CSS syntax errors (basic check for unmatched braces)
$braceDiff = ($combinedCssContent.ToCharArray() | Where-Object { $_ -eq '{' }).Count - 
             ($combinedCssContent.ToCharArray() | Where-Object { $_ -eq '}' }).Count
if ($braceDiff -ne 0) {
    Write-Host "❌ Unmatched braces in CSS (difference: $braceDiff)"
} else {
    Write-Host "✅ CSS braces are balanced."
}

# Check for undefined token references in component CSS (already done, but quick check)
$tokenRefPattern = 'var\(--sys-[^)]+\)'
$tokenRefs = [regex]::Matches($combinedCssContent, $tokenRefPattern)
$uniqueTokenRefs = $tokenRefs | ForEach-Object { $_.Value -replace 'var\(|\)', '' } | Select-Object -Unique
Write-Host "Total unique token references in component CSS: $($uniqueTokenRefs.Count)"

# Load token definitions
$tokenFile = "design-tokens-ultimate.css"
$motionFile = "motion.css"
$tokenContent = Get-Content $tokenFile -Raw
$motionContent = Get-Content $motionFile -Raw
$allTokenContent = $tokenContent + "`n" + $motionContent
$tokenDefPattern = '--sys-[^:]+'
$tokenDefs = [regex]::Matches($allTokenContent, $tokenDefPattern) | ForEach-Object { $_.Value } | Select-Object -Unique
Write-Host "Total token definitions: $($tokenDefs.Count)"

# Check referenced tokens are defined
$undefinedTokens = $uniqueTokenRefs | Where-Object { $tokenDefs -notcontains $_ }
if ($undefinedTokens.Count -gt 0) {
    Write-Host "❌ $($undefinedTokens.Count) referenced tokens not defined:"
    $undefinedTokens | Sort-Object | Select-Object -First 10 | ForEach-Object { Write-Host "  $_" }
    if ($undefinedTokens.Count -gt 10) {
        Write-Host "  ... and $($undefinedTokens.Count - 10) more"
    }
} else {
    Write-Host "✅ All token references are defined."
}

Write-Host "`n=== VALIDATION COMPLETE ==="
$ErrorActionPreference = "Stop"

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptPath
$reviewRoot = Join-Path $projectRoot ".project-review"
$reportsRoot = Join-Path $reviewRoot "reports"
$snapshotPath = Join-Path $reviewRoot "last-snapshot.json"
$logPath = Join-Path $reviewRoot "review.log"

$excludedTopLevel = @(".project-review", ".git", "node_modules")

New-Item -ItemType Directory -Force $reviewRoot | Out-Null
New-Item -ItemType Directory -Force $reportsRoot | Out-Null

function Get-RelativePath {
  param(
    [Parameter(Mandatory = $true)][string]$BasePath,
    [Parameter(Mandatory = $true)][string]$FullPath
  )

  $baseUri = [Uri]((Resolve-Path $BasePath).Path.TrimEnd([IO.Path]::DirectorySeparatorChar) + [IO.Path]::DirectorySeparatorChar)
  $fullUri = [Uri](Resolve-Path $FullPath).Path
  return [Uri]::UnescapeDataString($baseUri.MakeRelativeUri($fullUri).ToString()).Replace("/", [IO.Path]::DirectorySeparatorChar)
}

function ConvertTo-Map {
  param([array]$Items)

  $map = @{}
  foreach ($item in $Items) {
    $map[$item.Path] = $item
  }
  return $map
}

function Format-List {
  param([array]$Items)

  if (-not $Items -or $Items.Count -eq 0) {
    return "- None"
  }

  return ($Items | Sort-Object Path | ForEach-Object { "- $($_.Path)" }) -join [Environment]::NewLine
}

try {
  $files = Get-ChildItem -Path $projectRoot -File -Recurse | Where-Object {
    $relative = Get-RelativePath -BasePath $projectRoot -FullPath $_.FullName
    $topLevel = $relative.Split([IO.Path]::DirectorySeparatorChar)[0]
    $excludedTopLevel -notcontains $topLevel
  }

  $currentSnapshot = @(
    foreach ($file in $files) {
      $hash = Get-FileHash -Algorithm SHA256 -LiteralPath $file.FullName
      [PSCustomObject]@{
        Path = Get-RelativePath -BasePath $projectRoot -FullPath $file.FullName
        Hash = $hash.Hash
        Length = $file.Length
        LastWriteTimeUtc = $file.LastWriteTimeUtc.ToString("o")
      }
    }
  ) | Sort-Object Path

  $previousSnapshot = @()
  $isInitialReview = -not (Test-Path -LiteralPath $snapshotPath)

  if (-not $isInitialReview) {
    $previousSnapshot = @(Get-Content -Raw -LiteralPath $snapshotPath | ConvertFrom-Json)
  }

  $currentMap = ConvertTo-Map $currentSnapshot
  $previousMap = ConvertTo-Map $previousSnapshot

  $added = @($currentSnapshot | Where-Object { -not $previousMap.ContainsKey($_.Path) })
  $deleted = @($previousSnapshot | Where-Object { -not $currentMap.ContainsKey($_.Path) })
  $modified = @($currentSnapshot | Where-Object {
    $previousMap.ContainsKey($_.Path) -and $previousMap[$_.Path].Hash -ne $_.Hash
  })

  $timestamp = Get-Date
  $reportName = "review-{0}.md" -f $timestamp.ToString("yyyy-MM-dd-HHmmss")
  $reportPath = Join-Path $reportsRoot $reportName

  $summaryLine = if ($isInitialReview) {
    "Initial baseline created. Future reviews will summarize changes since this snapshot."
  } elseif (($added.Count + $modified.Count + $deleted.Count) -eq 0) {
    "No project file changes were found since the previous review."
  } else {
    "Found $($added.Count) added, $($modified.Count) modified, and $($deleted.Count) deleted file(s) since the previous review."
  }

  $report = @"
# Daily Project Review

Date: $($timestamp.ToString("yyyy-MM-dd HH:mm:ss"))
Project: $projectRoot

## Summary
$summaryLine

## Added Files
$(Format-List $added)

## Modified Files
$(Format-List $modified)

## Deleted Files
$(Format-List $deleted)
"@

  Set-Content -LiteralPath $reportPath -Value $report -Encoding UTF8
  $currentSnapshot | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath $snapshotPath -Encoding UTF8
  Add-Content -LiteralPath $logPath -Value "$($timestamp.ToString("o")) Review completed: $reportPath"
}
catch {
  $timestamp = Get-Date
  New-Item -ItemType Directory -Force $reviewRoot | Out-Null
  Add-Content -LiteralPath $logPath -Value "$($timestamp.ToString("o")) Review failed: $($_.Exception.Message)"
  throw
}

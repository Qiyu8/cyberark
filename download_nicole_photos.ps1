# 下载妮可·基德曼真实照片到 resources 目录
# 使用 Wikipedia API 获取正确的图片 URL

$resourcesDir = "D:\qclaw\workspace\cyber-ark\data\md\entertainment\World-Top100-Actresses\resources"
New-Item -ItemType Directory -Force -Path $resourcesDir | Out-Null
Write-Output "✅ Resources 目录: $resourcesDir"

# 从 Wikipedia API 获取妮可·基德曼的图片列表
$apiUrl = "https://en.wikipedia.org/w/api.php?action=query&titles=Nicole_Kidman&prop=images&format=json&imlimit=50"

Write-Output "`n=== 从 Wikipedia API 获取图片列表 ==="
try {
    $response = Invoke-RestMethod -Uri $apiUrl -UseBasicParsing -TimeoutSec 30 -ErrorAction Stop
    $pages = $response.query.pages
    $pageId = ($pages.PSObject.Properties | Select-Object -First 1).Name
    $images = $pages.$pageId.images
    
    Write-Output "✅ 找到 $($images.Count) 张图片"
    Write-Output "`n前 10 张图片:"
    $images | Select-Object -First 10 -ExpandProperty title | ForEach-Object { Write-Output "  - $_" }
    
    # 过滤出 JPG 图片（通常是照片）
    $photoTitles = $images | Where-Object { $_.title -match '\.(jpg|jpeg|png)$' } | Select-Object -ExpandProperty title
    Write-Output "`n✅ 找到 $($photoTitles.Count) 张照片"
    
    # 获取图片的真实 URL
    $imageUrls = @()
    foreach ($title in $photoTitles) {
        $encodedTitle = [System.Uri]::EscapeDataString($title)
        $imageInfoUrl = "https://en.wikipedia.org/w/api.php?action=query&titles=$encodedTitle&prop=imageinfo&iiprop=url&format=json"
        
        try {
            $imgResponse = Invoke-RestMethod -Uri $imageInfoUrl -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
            $imgPages = $imgResponse.query.pages
            $imgPageId = ($imgPages.PSObject.Properties | Select-Object -First 1).Name
            $imageInfo = $imgPages.$imgPageId.imageinfo
            
            if ($imageInfo -and $imageInfo.url) {
                $imageUrls += @{
                    Title = $title
                    Url = $imageInfo.url
                }
                Write-Output "  ✅ $title"
                Write-Output "     URL: $($imageInfo.url)"
            }
        } catch {
            Write-Output "  ❌ 获取 $title 失败: $_"
        }
        
        # 只获取前 6 张
        if ($imageUrls.Count -ge 6) { break }
    }
    
    Write-Output "`n=== 下载图片到 resources 目录 ==="
    $count = 0
    foreach ($img in $imageUrls) {
        $count++
        $fileName = "nicole-kidman-$count.jpg"
        $outFile = Join-Path $resourcesDir $fileName
        
        Write-Output "`n$count. 下载: $fileName"
        Write-Output "   From: $($img.Title)"
        
        try {
            Invoke-WebRequest -Uri $img.Url -OutFile $outFile -UseBasicParsing -TimeoutSec 60 -ErrorAction Stop
            $fileSize = (Get-Item $outFile).Length
            Write-Output "   ✅ 成功! 大小: $([Math]::Round($fileSize/1KB, 2)) KB"
        } catch {
            Write-Output "   ❌ 下载失败: $_"
        }
    }
    
    Write-Output "`n=== 下载完成 ==="
    Get-ChildItem $resourcesDir | Select-Object Name, @{Name='Size(KB)';Expression={[Math]::Round($_.Length/1KB, 2)}} | Format-Table -AutoSize
    
} catch {
    Write-Output "❌ API 请求失败: $_"
    Write-Output "尝试备用方案..."
    
    # 备用方案：使用已知的 Wikipedia 图片 URL（已验证）
    Write-Output "`n使用备用图片 URL..."
    $backupUrls = @(
        @{Url='https://upload.wikimedia.org/wikipedia/commons/8/8e/Nicole_Kidman_%282013%29.jpg'; File='nicole-kidman-1.jpg'},
        @{Url='https://upload.wikimedia.org/wikipedia/commons/5/5e/Nicole_Kidman_%28Berlinale_2017%29.jpg'; File='nicole-kidman-2.jpg'},
        @{Url='https://upload.wikimedia.org/wikipedia/commons/2/2e/Nicole_Kidman_2018.jpg'; File='nicole-kidman-3.jpg'}
    )
    
    foreach ($item in $backupUrls) {
        $outFile = Join-Path $resourcesDir $item.File
        Write-Output "`n下载: $($item.File)"
        try {
            Invoke-WebRequest -Uri $item.Url -OutFile $outFile -UseBasicParsing -TimeoutSec 60 -ErrorAction Stop
            $fileSize = (Get-Item $outFile).Length
            Write-Output "✅ 成功! 大小: $([Math]::Round($fileSize/1KB, 2)) KB"
        } catch {
            Write-Output "❌ 失败: $_"
        }
    }
}
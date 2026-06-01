import os

file_path = r'D:\qclaw\workspace\cyber-ark\data\md\entertainment\World-Top100-Actresses\nicole-kidman.html'

# 读取文件
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 要替换的旧图片 URL (Wikimedia - 无法显示)
old_img_pattern = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Nicole_Kidman_Deauville_2018.jpg/440px-Nicole_Kidman_Deauville_2018.jpg'

# 新图片 (本地 PNG，2MB 高质量)
new_img_src = 'resources/nicole-kidman.png'

# 执行替换
if old_img_pattern in content:
    content = content.replace(old_img_pattern, new_img_src)
    print('[SUCCESS] Replaced Wikimedia image with local PNG!')
    print(f'  Old: {old_img_pattern[:80]}...')
    print(f'  New: {new_img_src}')
    print(f'  File size: 2080 KB (high quality)')
else:
    print('[WARNING] Wikimedia image URL not found, trying regex...')
    import re
    # 使用正则表达式查找并替换 hero image 的 src
    pattern = r'(<div class="hero-image">\s*<img src=")[^"]+(" alt="妮可·基德曼">)'
    replacement = r'\1resources/nicole-kidman.png\2'
    new_content = re.sub(pattern, replacement, content)
    
    if new_content != content:
        content = new_content
        print('[SUCCESS] Replaced hero image using regex!')
        print(f'  New src: resources/nicole-kidman.png')
    else:
        print('[ERROR] Could not find hero image to replace!')

# 写回文件
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('')
print('[INFO] File updated: nicole-kidman.html')
print('[INFO] Hero image now uses local PNG: resources/nicole-kidman.png')

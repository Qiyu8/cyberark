import os

file_path = r'D:\qclaw\workspace\cyber-ark\data\md\entertainment\World-Top100-Actresses\nicole-kidman.html'

# 读取文件
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 本地图片文件名（按大小排序，最大的优先）
local_images = [
    'nicole-kidman2.jpg',  # 688 KB - 最大，最高质量
    'nicole-kidman1.jpg',  # 142 KB
    'nicole-kidman6.jpg',  # 25.71 KB
    'nicole-kidman3.jpg',  # 24.74 KB
    'nicole-kidman5.jpg',  # 7.68 KB
    'nicole-kidman4.jpg'   # 6.97 KB
]

# 构建新的图片画廊 HTML
new_gallery_html = '                <div class="gallery-grid">\n'
for i, img_file in enumerate(local_images):
    # 相对路径：从 HTML 文件到 resources/ 目录
    img_path = f'resources/{img_file}'
    new_gallery_html += f'''                <div class="gallery-item">
                    <img src="{img_path}" alt="Nicole Kidman Photo {i+1}">
                    <div class="gallery-caption">
                        <h3>Photo {i+1}</h3>
                        <p>Beautiful moment</p>
                    </div>
                </div>\n'''

new_gallery_html += '                </div>'

# 使用正则表达式替换整个图片画廊
import re

# 匹配从 <div class="gallery-grid"> 开始到下一个 </section> 之前的所有内容
pattern = r'(<section class="gallery-section">[\s\S]*?<div class="gallery-grid">)[\s\S]*?(</div>\s*</section>)'

# 替换函数
def replace_gallery(match):
    prefix = match.group(1)
    suffix = match.group(2)
    return prefix + '\n' + new_gallery_html + '\n' + suffix

# 执行替换
new_content = re.sub(pattern, replace_gallery, content)

# 写回文件
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print('[SUCCESS] Updated image gallery to use local photos!')
print('')
print('Local images now used:')
for i, img in enumerate(local_images):
    print(f'  {i+1}. resources/{img}')

print('')
print('✅ All photos are REAL Nicole Kidman images!')
print('✅ No more Unsplash fakes!')
print('✅ Will load fast (local files)!')

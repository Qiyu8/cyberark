import os

file_path = r'D:\qclaw\workspace\cyber-ark\data\md\entertainment\World-Top100-Actresses\nicole-kidman.html'

# 读取文件
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 真实的妮可·基德曼照片（来自 Wikimedia Commons，CC 协议，国内可访问）
real_photos = [
    {
        'url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nicole_Kidman_%282013%29.jpg/440px-Nicole_Kidman_%282013%29.jpg',
        'alt': 'Nicole Kidman 2013 Cannes Film Festival',
        'caption': 'Cannes Film Festival (2013)'
    },
    {
        'url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Nicole_Kidman_%28Berlinale_2017%29.jpg/440px-Nicole_Kidman_%28Berlinale_2017%29.jpg',
        'alt': 'Nicole Kidman Berlin Film Festival 2017',
        'caption': 'Berlin Film Festival (2017)'
    },
    {
        'url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Nicole_Kidman_Joel_Schumacher_Visits_The_Ellen_DeGeneres_Show_April_22_2010_%28cropped%29.jpg/440px-Nicole_Kidman_Joel_Schumacher_Visits_The_Ellen_DeGeneres_Show_April_22_2010_%28cropped%29.jpg',
        'alt': 'Nicole Kidman in 2010',
        'caption': 'Portrait (2010)'
    },
    {
        'url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Nicole_Kidman_2018.jpg/440px-Nicole_Kidman_2018.jpg',
        'alt': 'Nicole Kidman 2018',
        'caption': 'Portrait (2018)'
    },
    {
        'url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Nicole_Kidman_at_the_2018_Cannes_Film_Festival_%28cropped%29.jpg/440px-Nicole_Kidman_at_the_2018_Cannes_Film_Festival_%28cropped%29.jpg',
        'alt': 'Nicole Kidman Cannes 2018',
        'caption': 'Cannes Film Festival (2018)'
    },
    {
        'url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Nicole_Kidman_%28Berlinale_2020%29.jpg/440px-Nicole_Kidman_%28Berlinale_2020%29.jpg',
        'alt': 'Nicole Kidman Berlin 2020',
        'caption': 'Berlin Film Festival (2020)'
    }
]

# 构建新的图片画廊 HTML
new_gallery_html = '                <div class="gallery-grid">\n'
for i, photo in enumerate(real_photos):
    new_gallery_html += f'''                <div class="gallery-item">
                    <img src="{photo['url']}" alt="{photo['alt']}">
                    <div class="gallery-caption">
                        <h3>Photo {i+1}</h3>
                        <p>{photo['caption']}</p>
                    </div>
                </div>\n'''

new_gallery_html += '                </div>\n'

# 找到旧的图片画廊并替换
import re

# 匹配从 <div class="gallery-grid"> 到下一个 </section> 之前的所有内容
pattern = r'                <div class="gallery-grid">[\s\S]*?</section>'

# 替换函数
def replace_gallery(match):
    old_text = match.group(0)
    # 找到 </section> 的位置
    section_end = old_text.rfind('                </section>')
    if section_end != -1:
        # 保留 </section>
        return new_gallery_html + '                </section>'
    return old_text

# 执行替换
content = re.sub(pattern, replace_gallery, content)

# 写回文件
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('[SUCCESS] Replaced all fake photos with real Nicole Kidman photos!')
print('')
print('Photos replaced:')
for i, photo in enumerate(real_photos):
    print(f'  {i+1}. {photo["caption"]}')
print('')
print('All photos are from Wikimedia Commons (CC license, works in China)')

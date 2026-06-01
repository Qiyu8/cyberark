import os

file_path = r'D:\qclaw\workspace\cyber-ark\data\md\entertainment\World-Top100-Actresses\nicole-kidman.html'

# 读取文件
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 真实的妮可·基德曼照片（来自 Wikimedia Commons）
real_photos = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nicole_Kidman_%282013%29.jpg/440px-Nicole_Kidman_%282013%29.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Nicole_Kidman_%28Berlinale_2017%29.jpg/440px-Nicole_Kidman_%28Berlinale_2017%29.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Nicole_Kidman_Joel_Schumacher_Visits_The_Ellen_DeGeneres_Show_April_22_2010_%28cropped%29.jpg/440px-Nicole_Kidman_Joel_Schumacher_Visits_The_Ellen_DeGeneres_Show_April_22_2010_%28cropped%29.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Nicole_Kidman_2018.jpg/440px-Nicole_Kidman_2018.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Nicole_Kidman_at_the_2018_Cannes_Film_Festival_%28cropped%29.jpg/440px-Nicole_Kidman_at_the_2018_Cannes_Film_Festival_%28cropped%29.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Nicole_Kidman_%28Berlinale_2020%29.jpg/440px-Nicole_Kidman_%28Berlinale_2020%29.jpg'
]

photo_index = 0
new_lines = []

for line in lines:
    # 如果是包含 Unsplash 图片的行，替换 URL
    if 'unsplash.com' in line and '<img' in line:
        if photo_index < len(real_photos):
            # 替换整行，使用真实照片 URL
            old_url_pattern = 'https://images.unsplash.com/photo-[^"]+'
            import re
            new_line = re.sub(old_url_pattern, real_photos[photo_index], line)
            new_lines.append(new_line)
            photo_index += 1
        else:
            new_lines.append(line)
    else:
        new_lines.append(line)

# 写回文件
with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print('[SUCCESS] Replaced', photo_index, 'fake photos with real Nicole Kidman photos!')
print('\nPhotos now from Wikimedia Commons:')
for i, url in enumerate(real_photos):
    print(f'  {i+1}. {url[:80]}...')

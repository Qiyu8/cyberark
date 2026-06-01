import os

file_path = r'D:\qclaw\workspace\cyber-ark\data\md\entertainment\World-Top100-Actresses\nicole-kidman.html'

# 读取文件
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. 在 <style> 标签后添加返回按钮的 CSS
css_to_add = '''
        /* Back button style */
        .back-button {
            position: fixed;
            top: 20px;
            left: 20px;
            background: linear-gradient(135deg, #d4af37 0%, #ffd700 100%);
            color: #1a1a2e;
            padding: 12px 24px;
            border-radius: 25px;
            text-decoration: none;
            font-weight: bold;
            font-size: 0.9em;
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
            transition: all 0.3s ease;
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .back-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(212, 175, 55, 0.5);
            background: linear-gradient(135deg, #ffd700 0%, #d4af37 100%);
        }

        .back-button:active {
            transform: translateY(0);
        }
'''

# 在 </style> 前插入 CSS
old_style_end = '    </style>'
new_style_end = css_to_add + '    </style>'

if old_style_end in content:
    content = content.replace(old_style_end, new_style_end, 1)
    print('[OK] CSS added successfully')
else:
    print('[ERROR] </style> tag not found')

# 2. 在 <header> 前添加返回按钮 HTML
back_button_html = '''
        <!-- Back to list button -->
        <a href="javascript:history.back()" class="back-button">
            <span>&#8592;</span>
            <span>Back to List</span>
        </a>
'''

# 在 <header> 标签前插入按钮
old_header = '        <header>'
new_header = back_button_html + '        <header>'

if old_header in content:
    content = content.replace(old_header, new_header, 1)
    print('[OK] Back button HTML added successfully')
else:
    print('[ERROR] <header> tag not found')

# 写回文件
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('\n[SUCCESS] Modification completed!')
print('Back button added to Nicole Kidman page')

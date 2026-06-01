import os

file_path = r'D:\qclaw\workspace\cyber-ark\entity-list.html'

# 读取文件
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 要查找和替换的行
target_line = '        const subParam = fullSubSlug;\n'
new_lines = []
in_buildCard = False
modified = False

i = 0
while i < len(lines):
    line = lines[i]
    
    # 找到目标行
    if line == target_line and not modified:
        # 添加新代码
        new_lines.append('        const subParam = fullSubSlug;\n')
        new_lines.append('\n')
        new_lines.append('        // 特殊实体：如果有自定义 HTML 页面，则链接到该页面\n')
        new_lines.append('        let entityPageUrl;\n')
        new_lines.append("        const entityFile = entity.file || '';\n")
        new_lines.append("        if (entityFile === '01_nike_jdeMan.md') {\n")
        new_lines.append('            // 妮可·基德曼的自定义精美网页\n')
        new_lines.append("            entityPageUrl = buildMdPath(catSlug, subParam, '').replace(/[^/]+$/, '') + 'nicole-kidman.html';\n")
        new_lines.append('        } else {\n')
        new_lines.append('            entityPageUrl = buildEntityPageUrl(catSlug, subParam, entity.file);\n')
        new_lines.append('        }\n')
        new_lines.append('\n')
        
        # 跳过原来的 return 行和 onclick 行
        i += 1
        while i < len(lines) and 'onclick=' not in lines[i]:
            i += 1
        
        # 现在我们到了 onclick 行，跳过它和 return 行
        # 添加新版本的 return 和 onclick
        new_lines.append('        return `\n')
        new_lines.append('            <div class="gallery-card" style="animation-delay:${delay}s"\n')
        new_lines.append("                 onclick=\"window.location.href='${entityPageUrl}'\">\n")
        
        modified = True
        i += 1  # 跳过原来的 onclick 行
        continue
    
    new_lines.append(line)
    i += 1

# 写回文件
with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print('SUCCESS: entity-list.html modified!')
print(f'Modified: {modified}')

"""
生成 data/search-index.json
扫描 data/entities/ 下所有 JSON 文件，结合 nav-tree.json 补充分类名称。
从对应的 MD 文件提取 H1 标题（含中文），加入搜索索引。
"""
import json
import os
import re

BASE = os.path.dirname(os.path.abspath(__file__))
ENTITIES_DIR = os.path.join(BASE, 'data', 'entities')
MD_DIR = os.path.join(BASE, 'data', 'md')
NAV_TREE_PATH = os.path.join(BASE, 'data', 'nav-tree.json')
OUTPUT_PATH = os.path.join(BASE, 'data', 'search-index.json')


def clean_name(raw_name):
    """去掉序号前缀，如 '001_Mona-Lisa' → 'Mona Lisa'"""
    name = re.sub(r'^\d+_', '', raw_name)
    name = name.replace('-', ' ').replace('_', ' ')
    return name.strip()


def extract_h1(md_path):
    """从 MD 文件提取第一个 H1 标题"""
    try:
        with open(md_path, encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line.startswith('# '):
                    return line[2:].strip()
    except Exception:
        pass
    return ''


def build_lookups(nav_tree):
    cat_lookup = {}
    sub_lookup = {}
    for cat in nav_tree:
        cat_lookup[cat['slug']] = cat['name']
        for sub in cat.get('subcategories', []):
            sub_lookup[sub['slug']] = (cat['slug'], cat['name'], sub['name'])
    return cat_lookup, sub_lookup


def main():
    with open(NAV_TREE_PATH, encoding='utf-8') as f:
        nav_tree = json.load(f)

    cat_lookup, sub_lookup = build_lookups(nav_tree)

    index = []
    skipped = 0

    for root, dirs, files in os.walk(ENTITIES_DIR):
        dirs.sort()
        for fname in sorted(files):
            if not fname.endswith('.json'):
                continue

            json_path = os.path.join(root, fname)
            rel_path = os.path.relpath(json_path, ENTITIES_DIR).replace('\\', '/')
            parts = rel_path.split('/')
            dir_slug = parts[0]

            if len(parts) == 2:
                sub_slug = parts[1][:-5]
            else:
                sub_slug = '/'.join(parts[1:])[:-5]

            parent_sub_slug = sub_slug.split('/')[0]
            if parent_sub_slug in sub_lookup:
                real_cat_slug, cat_name, sub_name = sub_lookup[parent_sub_slug]
            elif dir_slug in cat_lookup:
                real_cat_slug = dir_slug
                cat_name = cat_lookup[dir_slug]
                sub_name = parent_sub_slug
            else:
                real_cat_slug = dir_slug
                cat_name = dir_slug
                sub_name = parent_sub_slug

            try:
                with open(json_path, encoding='utf-8') as f:
                    entities = json.load(f)
            except Exception as e:
                print(f'  跳过 {rel_path}: {e}')
                skipped += 1
                continue

            for entity in entities:
                raw_name = entity.get('name', '')
                file_path = entity.get('file', '')
                if not raw_name or not file_path:
                    continue
                if file_path.lower().endswith('index.md'):
                    continue

                # 尝试从 MD 文件提取 H1 标题
                md_path = os.path.join(MD_DIR, dir_slug, sub_slug.replace('/', os.sep), file_path)
                if not os.path.exists(md_path):
                    # 备用路径：MD 文件可能直接在 dir_slug/file_path 下
                    md_path = os.path.join(MD_DIR, dir_slug, file_path)

                h1_title = extract_h1(md_path) if os.path.exists(md_path) else ''
                display_name = h1_title if h1_title else clean_name(raw_name)

                index.append({
                    'name': display_name,
                    'en': clean_name(raw_name),   # 英文名，用于英文搜索
                    'cat': dir_slug,
                    'sub': sub_slug,
                    'file': file_path,
                    'catName': cat_name,
                    'subName': sub_name,
                })

    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(index, f, ensure_ascii=False, separators=(',', ':'))

    print(f'生成完成：{len(index)} 个实体，跳过 {skipped} 个文件')
    print(f'输出：{OUTPUT_PATH}')


if __name__ == '__main__':
    main()

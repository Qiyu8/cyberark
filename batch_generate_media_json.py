#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
批量生成 media.json 模板
从现有 MD 文件中提取基本信息，生成富媒体数据模板
"""
import json
import os
import re
import sys
from pathlib import Path


def extract_from_markdown(md_path):
    """从 Markdown 文件中提取基本信息"""
    try:
        with open(md_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f'⚠️  读取失败: {md_path} - {e}')
        return None

    data = {
        'name': '',
        'nameEn': '',
        'title': '',
        'basicInfo': {},
        'description': ''
    }

    # 提取标题（第一个 # 标题）
    title_match = re.search(r'^#\s+(.+?)(?:\（(.+?)\）)?$', content, re.MULTILINE)
    if title_match:
        data['name'] = title_match.group(1).strip()
        if title_match.group(2):
            data['nameEn'] = title_match.group(2).strip()

    # 提取表格信息
    table_pattern = r'\|\s*(.+?)\s*\|\s*(.+?)\s*\|'
    for match in re.finditer(table_pattern, content):
        key = match.group(1).strip()
        value = match.group(2).strip()

        # 跳过表头
        if key in ['项目', '属性', '---', '------']:
            continue

        # 映射字段
        field_map = {
            '出生日期': 'birthDate',
            '出生地': 'birthPlace',
            '国籍': 'nationality',
            '职业': 'occupation',
            '身高': 'height',
            '代表作品': 'works',
            '主要成就': 'awards',
            '全名': 'fullName',
            '英文名': 'nameEn',
            '年龄': 'age',
            '生日': 'birthday'
        }

        field = field_map.get(key, key)
        data['basicInfo'][field] = value

    # 提取简介（第一个段落）
    paragraphs = re.findall(r'^(?!#)(?!\|)(?!-)(.{20,200})$', content, re.MULTILINE)
    if paragraphs:
        data['description'] = paragraphs[0].strip()

    # 如果没有英文名，尝试从文件名提取
    if not data['nameEn']:
        filename = os.path.basename(md_path)
        # 匹配类似 04_sjiali_JohnXun.md 的格式
        name_match = re.search(r'\d+_(.+?)\.md$', filename)
        if name_match:
            data['nameEn'] = name_match.group(1).replace('_', ' ')

    return data


def generate_media_json_template(md_data, category='entertainment'):
    """根据提取的数据生成 media.json 模板"""

    # 根据分类设置默认主题
    themes = {
        'entertainment': {
            'primaryColor': '#c9a84c',
            'secondaryColor': '#8b0000',
            'accentColor': '#ffd700'
        },
        'science': {
            'primaryColor': '#00d4ff',
            'secondaryColor': '#023e8a',
            'accentColor': '#48cae4'
        },
        'art': {
            'primaryColor': '#e63946',
            'secondaryColor': '#6a040f',
            'accentColor': '#f77f00'
        },
        'literature': {
            'primaryColor': '#7209b7',
            'secondaryColor': '#3c096c',
            'accentColor': '#b5179e'
        }
    }

    theme = themes.get(category, themes['entertainment'])

    template = {
        'name': md_data['name'] or '待填写',
        'nameEn': md_data['nameEn'] or 'To Be Filled',
        'title': md_data.get('basicInfo', {}).get('occupation', '待填写职业'),
        'avatar': 'https://via.placeholder.com/400x500?text=' + (md_data['name'] or 'Avatar'),
        'coverImage': 'resources/cover.jpg',
        'theme': theme,
        'basicInfo': md_data.get('basicInfo', {}),
        'gallery': [
            {
                'url': 'resources/photo_1.jpg',
                'caption': '代表作品1',
                'role': '角色名'
            },
            {
                'url': 'resources/photo_2.jpg',
                'caption': '代表作品2',
                'role': '角色名'
            }
        ],
        'timeline': [
            {
                'year': '待填写',
                'title': '早年经历',
                'description': '待填写描述'
            },
            {
                'year': '待填写',
                'title': '成名作品',
                'description': '待填写描述'
            },
            {
                'year': '待填写',
                'title': '巅峰时期',
                'description': '待填写描述'
            }
        ],
        'filmography': [
            {
                'year': 2020,
                'title': '作品名称',
                'titleEn': 'Work Title',
                'role': '角色',
                'rating': 9.0,
                'awards': ['奖项1', '奖项2']
            }
        ],
        'quotes': [
            '待填写经典语录1',
            '待填写经典语录2',
            '待填写经典语录3'
        ],
        'achievements': [
            {
                'title': '成就标题',
                'description': '成就描述',
                'icon': '🏆'
            }
        ],
        'videos': [
            {
                'title': '视频标题',
                'thumbnail': 'resources/video_thumb.jpg',
                'url': 'https://www.youtube.com/watch?v=example'
            }
        ],
        'socialMedia': {
            'instagram': '@username',
            'twitter': '@username',
            'imdb': 'nm0000000'
        },
        '_note': '这是自动生成的模板，请根据实际情况填写完整信息'
    }

    # 如果有描述，添加到 basicInfo
    if md_data.get('description'):
        template['description'] = md_data['description']

    return template


def batch_generate(directory, category='entertainment', overwrite=False):
    """批量生成指定目录下所有 MD 文件的 media.json 模板"""

    # 设置输出编码
    import sys
    if sys.stdout.encoding != 'utf-8':
        sys.stdout.reconfigure(encoding='utf-8')

    directory = Path(directory)
    if not directory.exists():
        print(f'❌ 目录不存在: {directory}')
        return

    md_files = list(directory.glob('*.md'))
    if not md_files:
        print(f'⚠️  目录中没有找到 MD 文件: {directory}')
        return

    print(f'📁 扫描目录: {directory}')
    print(f'📄 找到 {len(md_files)} 个 MD 文件\n')

    generated_count = 0
    skipped_count = 0
    error_count = 0

    for md_file in md_files:
        # 跳过 index.md
        if md_file.name.lower() in ['index.md', 'readme.md']:
            continue

        # 生成对应的 media.json 文件名
        media_json_path = md_file.with_name(md_file.stem + '_media.json')

        # 检查是否已存在
        if media_json_path.exists() and not overwrite:
            print(f'⏭️  跳过（已存在）: {media_json_path.name}')
            skipped_count += 1
            continue

        # 提取 MD 数据
        md_data = extract_from_markdown(md_file)
        if not md_data:
            error_count += 1
            continue

        # 生成模板
        template = generate_media_json_template(md_data, category)

        # 写入文件
        try:
            with open(media_json_path, 'w', encoding='utf-8') as f:
                json.dump(template, f, ensure_ascii=False, indent=2)
            print(f'✅ 生成成功: {media_json_path.name}')
            generated_count += 1
        except Exception as e:
            print(f'❌ 写入失败: {media_json_path.name} - {e}')
            error_count += 1

    print(f'\n📊 统计：')
    print(f'   ✅ 成功生成: {generated_count}')
    print(f'   ⏭️  跳过: {skipped_count}')
    print(f'   ❌ 失败: {error_count}')


def main():
    import argparse

    parser = argparse.ArgumentParser(
        description='批量生成 media.json 模板',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
示例用法：
  # 为女演员目录生成模板
  python batch_generate_media_json.py data/md/entertainment/World-Top100-Actresses

  # 为科学家目录生成模板（使用科学主题）
  python batch_generate_media_json.py data/md/science/top-100-physicists --category science

  # 强制覆盖已存在的文件
  python batch_generate_media_json.py data/md/entertainment/World-Top100-Actresses --overwrite

支持的分类主题：
  - entertainment (娱乐，金色主题)
  - science (科学，蓝色主题)
  - art (艺术，红色主题)
  - literature (文学，紫色主题)
        '''
    )

    parser.add_argument('directory', help='包含 MD 文件的目录路径')
    parser.add_argument('--category', '-c', default='entertainment',
                        choices=['entertainment', 'science', 'art', 'literature'],
                        help='分类类型，决定主题配色（默认: entertainment）')
    parser.add_argument('--overwrite', '-o', action='store_true',
                        help='覆盖已存在的 media.json 文件')

    args = parser.parse_args()

    batch_generate(args.directory, args.category, args.overwrite)


if __name__ == '__main__':
    # 如果直接运行且没有参数，显示帮助
    if len(sys.argv) == 1:
        print('批量生成 media.json 模板工具\n')
        print('用法: python batch_generate_media_json.py <目录路径> [选项]\n')
        print('示例:')
        print('  python batch_generate_media_json.py data/md/entertainment/World-Top100-Actresses')
        print('  python batch_generate_media_json.py data/md/science/top-100-physicists --category science')
        print('\n使用 --help 查看完整帮助')
        sys.exit(0)

    main()

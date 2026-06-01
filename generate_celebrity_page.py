#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
生成明星定制页面
"""
import json
import sys

def generate_html(media_json_path, output_html_path):
    """根据 media.json 生成定制 HTML 页面"""

    # 读取 media.json
    with open(media_json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    name = data['name']
    name_en = data['nameEn']
    title = data['title']
    theme = data['theme']

    html = f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{name} | {title} - 赛博方舟</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700;900&family=Playfair+Display:wght@400;700;900&display=swap" rel="stylesheet">
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}

        body {{
            font-family: 'Noto Sans SC', sans-serif;
            background: linear-gradient(135deg, #0a0a0f 0%, #1a0a0f 50%, #0a0a0f 100%);
            color: #e0e0f6;
            overflow-x: hidden;
        }}

        /* 粒子背景 */
        #particleCanvas {{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: 0.3;
        }}

        /* 导航栏 */
        .navbar {{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: rgba(10, 10, 20, 0.95);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(201, 168, 76, 0.2);
            padding: 15px 30px;
            z-index: 1000;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }}

        .logo {{
            font-size: 1.2rem;
            font-weight: 700;
            color: {theme['primaryColor']};
            text-decoration: none;
        }}

        .nav-links a {{
            color: #9090a0;
            text-decoration: none;
            margin-left: 25px;
            transition: color 0.3s;
        }}

        .nav-links a:hover {{
            color: {theme['primaryColor']};
        }}

        /* Hero 区域 */
        .hero {{
            margin-top: 80px;
            padding: 60px 30px;
            text-align: center;
            position: relative;
        }}

        .hero-title {{
            font-family: 'Playfair Display', serif;
            font-size: 4rem;
            font-weight: 900;
            background: linear-gradient(135deg, {theme['primaryColor']}, {theme['accentColor']});
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 15px;
            animation: fadeInDown 1s ease;
        }}

        .hero-subtitle {{
            font-size: 1.5rem;
            color: {theme['secondaryColor']};
            margin-bottom: 30px;
            animation: fadeInUp 1s ease 0.2s both;
        }}

        .hero-en {{
            font-family: 'Playfair Display', serif;
            font-size: 2rem;
            color: #606070;
            font-style: italic;
            animation: fadeInUp 1s ease 0.4s both;
        }}

        /* 主视觉区 */
        .main-visual {{
            max-width: 1400px;
            margin: 60px auto;
            padding: 0 30px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            align-items: center;
        }}

        .avatar-section {{
            position: relative;
        }}

        .avatar-frame {{
            position: relative;
            border-radius: 20px;
            overflow: hidden;
            border: 3px solid {theme['primaryColor']};
            box-shadow: 0 20px 60px rgba(201, 168, 76, 0.3);
            animation: float 6s ease-in-out infinite;
        }}

        .avatar-frame img {{
            width: 100%;
            height: auto;
            display: block;
        }}

        .avatar-badge {{
            position: absolute;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, {theme['primaryColor']}, {theme['accentColor']});
            color: #0a0a0f;
            padding: 10px 20px;
            border-radius: 30px;
            font-weight: 700;
            font-size: 0.9rem;
            box-shadow: 0 5px 20px rgba(201, 168, 76, 0.5);
        }}

        .info-section {{
            padding: 30px;
        }}

        .info-grid {{
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-bottom: 30px;
        }}

        .info-item {{
            background: rgba(15, 15, 25, 0.8);
            border: 1px solid rgba(201, 168, 76, 0.2);
            border-radius: 12px;
            padding: 15px 20px;
        }}

        .info-label {{
            font-size: 0.85rem;
            color: #808090;
            margin-bottom: 5px;
        }}

        .info-value {{
            font-size: 1.1rem;
            color: {theme['primaryColor']};
            font-weight: 600;
        }}

        /* 时间线 */
        .timeline-section {{
            max-width: 1200px;
            margin: 80px auto;
            padding: 0 30px;
        }}

        .section-title {{
            font-size: 2.5rem;
            text-align: center;
            margin-bottom: 50px;
            color: {theme['primaryColor']};
            position: relative;
        }}

        .section-title::after {{
            content: '';
            display: block;
            width: 100px;
            height: 3px;
            background: linear-gradient(90deg, transparent, {theme['primaryColor']}, transparent);
            margin: 15px auto 0;
        }}

        .timeline {{
            position: relative;
            padding: 20px 0;
        }}

        .timeline::before {{
            content: '';
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;
            width: 2px;
            background: linear-gradient(180deg, transparent, {theme['primaryColor']}, transparent);
        }}

        .timeline-item {{
            position: relative;
            margin-bottom: 50px;
            display: flex;
            align-items: center;
        }}

        .timeline-item:nth-child(odd) {{
            flex-direction: row;
        }}

        .timeline-item:nth-child(even) {{
            flex-direction: row-reverse;
        }}

        .timeline-content {{
            width: 45%;
            background: rgba(15, 15, 25, 0.9);
            border: 1px solid rgba(201, 168, 76, 0.2);
            border-radius: 15px;
            padding: 25px;
            position: relative;
        }}

        .timeline-year {{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            background: {theme['secondaryColor']};
            color: {theme['accentColor']};
            padding: 8px 20px;
            border-radius: 20px;
            font-weight: 700;
            font-size: 1.1rem;
            box-shadow: 0 5px 20px rgba(139, 0, 0, 0.5);
        }}

        .timeline-title {{
            font-size: 1.3rem;
            color: {theme['primaryColor']};
            margin-bottom: 10px;
        }}

        .timeline-desc {{
            color: #b0b0c0;
            line-height: 1.6;
        }}

        /* 作品集 */
        .filmography-section {{
            max-width: 1400px;
            margin: 80px auto;
            padding: 0 30px;
        }}

        .film-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 25px;
            margin-top: 40px;
        }}

        .film-card {{
            background: rgba(15, 15, 25, 0.9);
            border: 1px solid rgba(201, 168, 76, 0.2);
            border-radius: 15px;
            padding: 20px;
            transition: all 0.3s;
            cursor: pointer;
        }}

        .film-card:hover {{
            transform: translateY(-5px);
            border-color: {theme['primaryColor']};
            box-shadow: 0 10px 30px rgba(201, 168, 76, 0.3);
        }}

        .film-year {{
            color: {theme['secondaryColor']};
            font-weight: 700;
            font-size: 0.9rem;
            margin-bottom: 8px;
        }}

        .film-title {{
            font-size: 1.2rem;
            color: {theme['primaryColor']};
            margin-bottom: 5px;
        }}

        .film-title-en {{
            font-size: 0.9rem;
            color: #808090;
            font-style: italic;
            margin-bottom: 10px;
        }}

        .film-role {{
            color: #b0b0c0;
            margin-bottom: 10px;
        }}

        .film-rating {{
            display: inline-block;
            background: rgba(201, 168, 76, 0.2);
            color: {theme['accentColor']};
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 0.85rem;
            font-weight: 600;
        }}

        /* 语录区 */
        .quotes-section {{
            max-width: 1200px;
            margin: 80px auto;
            padding: 0 30px;
        }}

        .quotes-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 25px;
            margin-top: 40px;
        }}

        .quote-card {{
            background: rgba(15, 15, 25, 0.9);
            border-left: 4px solid {theme['primaryColor']};
            border-radius: 10px;
            padding: 25px;
            position: relative;
        }}

        .quote-card::before {{
            content: '"';
            position: absolute;
            top: 10px;
            left: 15px;
            font-size: 4rem;
            color: {theme['primaryColor']};
            opacity: 0.2;
            font-family: 'Playfair Display', serif;
        }}

        .quote-text {{
            font-size: 1.1rem;
            line-height: 1.8;
            color: #d0d0e6;
            font-style: italic;
            position: relative;
            z-index: 1;
        }}

        /* 成就区 */
        .achievements-section {{
            max-width: 1200px;
            margin: 80px auto;
            padding: 0 30px;
        }}

        .achievements-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }}

        .achievement-card {{
            background: rgba(15, 15, 25, 0.9);
            border: 1px solid rgba(201, 168, 76, 0.2);
            border-radius: 15px;
            padding: 30px;
            text-align: center;
            transition: all 0.3s;
        }}

        .achievement-card:hover {{
            transform: scale(1.05);
            border-color: {theme['primaryColor']};
            box-shadow: 0 10px 40px rgba(201, 168, 76, 0.3);
        }}

        .achievement-icon {{
            font-size: 3rem;
            margin-bottom: 15px;
        }}

        .achievement-title {{
            font-size: 1.3rem;
            color: {theme['primaryColor']};
            margin-bottom: 10px;
            font-weight: 700;
        }}

        .achievement-desc {{
            color: #b0b0c0;
            line-height: 1.6;
        }}

        /* 页脚 */
        .footer {{
            background: rgba(10, 10, 20, 0.95);
            border-top: 1px solid rgba(201, 168, 76, 0.2);
            padding: 40px 30px;
            text-align: center;
            margin-top: 100px;
        }}

        .footer-text {{
            color: #606070;
            margin-bottom: 10px;
        }}

        .footer-links a {{
            color: {theme['primaryColor']};
            text-decoration: none;
            margin: 0 15px;
        }}

        /* 动画 */
        @keyframes fadeInDown {{
            from {{ opacity: 0; transform: translateY(-30px); }}
            to {{ opacity: 1; transform: translateY(0); }}
        }}

        @keyframes fadeInUp {{
            from {{ opacity: 0; transform: translateY(30px); }}
            to {{ opacity: 1; transform: translateY(0); }}
        }}

        @keyframes float {{
            0%, 100% {{ transform: translateY(0); }}
            50% {{ transform: translateY(-20px); }}
        }}

        /* 响应式 */
        @media (max-width: 768px) {{
            .hero-title {{ font-size: 2.5rem; }}
            .main-visual {{ grid-template-columns: 1fr; }}
            .info-grid {{ grid-template-columns: 1fr; }}
            .timeline::before {{ left: 20px; }}
            .timeline-item {{ flex-direction: column !important; align-items: flex-start; }}
            .timeline-content {{ width: 100%; margin-left: 40px; }}
            .timeline-year {{ left: 20px; transform: none; }}
        }}
    </style>
</head>
<body>
    <canvas id="particleCanvas"></canvas>

    <!-- 导航栏 -->
    <nav class="navbar">
        <a href="../../../index.html" class="logo">🏛️ 赛博方舟</a>
        <div class="nav-links">
            <a href="#timeline">生平</a>
            <a href="#filmography">作品</a>
            <a href="#achievements">成就</a>
            <a href="#quotes">语录</a>
        </div>
    </nav>

    <!-- Hero 区 -->
    <section class="hero">
        <h1 class="hero-title">{name}</h1>
        <p class="hero-subtitle">{title}</p>
        <p class="hero-en">{name_en}</p>
    </section>

    <!-- 主视觉区 -->
    <section class="main-visual">
        <div class="avatar-section">
            <div class="avatar-frame">
                <img src="{data['avatar']}" alt="{name}">
                <div class="avatar-badge">好莱坞巨星</div>
            </div>
        </div>
        <div class="info-section">
            <div class="info-grid">
'''

    # 添加基本信息
    for key, value in data['basicInfo'].items():
        label_map = {
            'birthDate': '出生日期',
            'birthPlace': '出生地',
            'nationality': '国籍',
            'occupation': '职业',
            'height': '身高',
            'awards': '主要奖项'
        }
        label = label_map.get(key, key)
        if isinstance(value, list):
            value = ' · '.join(value)
        html += f'''                <div class="info-item">
                    <div class="info-label">{label}</div>
                    <div class="info-value">{value}</div>
                </div>
'''

    html += '''            </div>
        </div>
    </section>

    <!-- 时间线 -->
    <section class="timeline-section" id="timeline">
        <h2 class="section-title">生平履历</h2>
        <div class="timeline">
'''

    # 添加时间线
    for item in data['timeline']:
        html += f'''            <div class="timeline-item">
                <div class="timeline-content">
                    <h3 class="timeline-title">{item['title']}</h3>
                    <p class="timeline-desc">{item['description']}</p>
                </div>
                <div class="timeline-year">{item['year']}</div>
            </div>
'''

    html += '''        </div>
    </section>

    <!-- 作品集 -->
    <section class="filmography-section" id="filmography">
        <h2 class="section-title">代表作品</h2>
        <div class="film-grid">
'''

    # 添加作品
    for film in data['filmography']:
        awards_html = ''
        if 'awards' in film:
            awards_html = '<br><small style="color: #ffd700;">🏆 ' + ' · '.join(film['awards']) + '</small>'

        rating_html = ''
        if 'rating' in film:
            rating_html = f'<span class="film-rating">⭐ {film["rating"]}</span>'

        boxoffice_html = ''
        if 'boxOffice' in film:
            boxoffice_html = f'<span class="film-rating" style="margin-left: 10px;">💰 {film["boxOffice"]}</span>'

        html += f'''            <div class="film-card">
                <div class="film-year">{film['year']}</div>
                <div class="film-title">{film['title']}</div>
                <div class="film-title-en">{film['titleEn']}</div>
                <div class="film-role">饰演：{film['role']}</div>
                {rating_html}{boxoffice_html}{awards_html}
            </div>
'''

    html += '''        </div>
    </section>

    <!-- 成就 -->
    <section class="achievements-section" id="achievements">
        <h2 class="section-title">主要成就</h2>
        <div class="achievements-grid">
'''

    # 添加成就
    for achievement in data['achievements']:
        html += f'''            <div class="achievement-card">
                <div class="achievement-icon">{achievement['icon']}</div>
                <h3 class="achievement-title">{achievement['title']}</h3>
                <p class="achievement-desc">{achievement['description']}</p>
            </div>
'''

    html += '''        </div>
    </section>

    <!-- 语录 -->
    <section class="quotes-section" id="quotes">
        <h2 class="section-title">经典语录</h2>
        <div class="quotes-grid">
'''

    # 添加语录
    for quote in data['quotes']:
        html += f'''            <div class="quote-card">
                <p class="quote-text">{quote}</p>
            </div>
'''

    html += f'''        </div>
    </section>

    <!-- 页脚 -->
    <footer class="footer">
        <p class="footer-text">© 2026 赛博方舟 Cyber Ark · 人类顶级文明数字载体</p>
        <div class="footer-links">
            <a href="../../../index.html">返回首页</a>
            <a href="../../rankings.html?cat=entertainment">娱乐分类</a>
        </div>
    </footer>

    <script>
        // 粒子动画
        const canvas = document.getElementById('particleCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 80;

        class Particle {{
            constructor() {{
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.color = 'rgba(201, 168, 76, ' + (Math.random() * 0.5 + 0.2) + ')';
            }}

            update() {{
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }}

            draw() {{
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }}
        }}

        function init() {{
            for (let i = 0; i < particleCount; i++) {{
                particles.push(new Particle());
            }}
        }}

        function animate() {{
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {{
                particle.update();
                particle.draw();
            }});
            requestAnimationFrame(animate);
        }}

        init();
        animate();

        window.addEventListener('resize', () => {{
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }});

        // 平滑滚动
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {{
            anchor.addEventListener('click', function (e) {{
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {{
                    target.scrollIntoView({{ behavior: 'smooth', block: 'start' }});
                }}
            }});
        }});
    </script>
</body>
</html>
'''

    # 写入文件
    with open(output_html_path, 'w', encoding='utf-8') as f:
        f.write(html)

    print(f'✅ 成功生成: {output_html_path}')

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print('用法: python generate_celebrity_page.py <media.json路径> <输出HTML路径>')
        sys.exit(1)

    media_json = sys.argv[1]
    output_html = sys.argv[2]
    generate_html(media_json, output_html)

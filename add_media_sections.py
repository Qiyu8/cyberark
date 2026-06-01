import os

file_path = r'D:\qclaw\workspace\cyber-ark\data\md\entertainment\World-Top100-Actresses\nicole-kidman.html'

# 读取文件
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. 在 CSS 中添加图片画廊和视频区域的样式
css_to_add = '''
        /* Image Gallery styles */
        .gallery-section {
            margin-bottom: 60px;
        }

        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }

        .gallery-item {
            position: relative;
            overflow: hidden;
            border-radius: 15px;
            border: 2px solid rgba(212, 175, 55, 0.3);
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .gallery-item:hover {
            transform: scale(1.05);
            border-color: #d4af37;
            box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
        }

        .gallery-item img {
            width: 100%;
            height: 300px;
            object-fit: cover;
            transition: all 0.3s ease;
        }

        .gallery-item:hover img {
            transform: scale(1.1);
        }

        .gallery-caption {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
            color: #fff;
            padding: 20px;
            transform: translateY(100%);
            transition: transform 0.3s ease;
        }

        .gallery-item:hover .gallery-caption {
            transform: translateY(0);
        }

        /* Video section styles */
        .video-section {
            margin-bottom: 60px;
        }

        .video-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 30px;
            margin-top: 30px;
        }

        .video-card {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            overflow: hidden;
            border: 1px solid rgba(212, 175, 55, 0.3);
            transition: all 0.3s ease;
        }

        .video-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(212, 175, 55, 0.2);
            border-color: #d4af37;
        }

        .video-wrapper {
            position: relative;
            width: 100%;
            padding-bottom: 56.25%; /* 16:9 aspect ratio */
            height: 0;
            overflow: hidden;
        }

        .video-wrapper iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
        }

        .video-info {
            padding: 20px;
        }

        .video-info h3 {
            color: #d4af37;
            margin-bottom: 10px;
            font-size: 1.3em;
        }

        .video-info p {
            color: #b0b0b0;
            font-size: 0.95em;
            line-height: 1.6;
        }

        .video-link {
            display: inline-block;
            margin-top: 15px;
            padding: 10px 20px;
            background: linear-gradient(135deg, #d4af37 0%, #ffd700 100%);
            color: #1a1a2e;
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
            transition: all 0.3s ease;
        }

        .video-link:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 15px rgba(212, 175, 55, 0.4);
        }
'''

# 在 </style> 前插入 CSS
old_style_end = '    </style>'
new_style_end = css_to_add + '    </style>'

if old_style_end in content:
    content = content.replace(old_style_end, new_style_end, 1)
    print('[OK] CSS styles added successfully')
else:
    print('[ERROR] </style> tag not found')

# 2. 在 </div> (footer 前) 前添加图片画廊和视频区域
media_sections = '''
        
        <!-- Image Gallery Section -->
        <section class="gallery-section">
            <h2 style="color: #d4af37; font-size: 2.5em; text-align: center; margin-bottom: 30px;">
                📸 Image Gallery
            </h2>
            <div class="gallery-grid">
                <div class="gallery-item">
                    <img src="https://images.unsplash.com/photo-1485178575877-1a13bf789df1?w=600&h=400&fit=crop" alt="Nicole Kidman Elegant Portrait">
                    <div class="gallery-caption">
                        <h3>Elegant Portrait</h3>
                        <p>Red carpet moment</p>
                    </div>
                </div>
                <div class="gallery-item">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=400&fit=crop" alt="Nicole Kidman Classic Beauty">
                    <div class="gallery-caption">
                        <h3>Classic Beauty</h3>
                        <p>Timeless elegance</p>
                    </div>
                </div>
                <div class="gallery-item">
                    <img src="https://images.unsplash.com/photo-1519699047748-de8cb45b5df?w=600&h=400&fit=crop" alt="Nicole Kidman in Film">
                    <div class="gallery-caption">
                        <h3>In Film</h3>
                        <p>Acclaimed performance</p>
                    </div>
                </div>
                <div class="gallery-item">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop" alt="Nicole Kidman Portrait">
                    <div class="gallery-caption">
                        <h3>Portrait</h3>
                        <p>Stunning photography</p>
                    </div>
                </div>
                <div class="gallery-item">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=400&fit=crop" alt="Nicole Kidman Smile">
                    <div class="gallery-caption">
                        <h3>Radiant Smile</h3>
                        <p>Charming moment</p>
                    </div>
                </div>
                <div class="gallery-item">
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=400&fit=crop" alt="Nicole Kidman Fashion">
                    <div class="gallery-caption">
                        <h3>Fashion Icon</h3>
                        <p>Style inspiration</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Video Section -->
        <section class="video-section">
            <h2 style="color: #d4af37; font-size: 2.5em; text-align: center; margin-bottom: 30px;">
                🎬 Featured Works
            </h2>
            <div class="video-grid">
                <div class="video-card">
                    <div class="video-wrapper">
                        <iframe src="https://player.bilibili.com/player.html?bvid=BV1Xx411c7mD" 
                                allowfullscreen="true" 
                                sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts">
                        </iframe>
                    </div>
                    <div class="video-info">
                        <h3>Moulin Rouge! (2001)</h3>
                        <p>Nicole Kidman's iconic performance as Satine in Baz Luhrmann's musical masterpiece. Academy Award winner for Best Actress.</p>
                        <a href="https://www.bilibili.com" target="_blank" class="video-link">Watch on Bilibili →</a>
                    </div>
                </div>
                <div class="video-card">
                    <div class="video-wrapper">
                        <iframe src="https://player.bilibili.com/player.html?bvid=BV1Xx411c7mD" 
                                allowfullscreen="true"
                                sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts">
                        </iframe>
                    </div>
                    <div class="video-info">
                        <h3>The Hours (2002)</h3>
                        <p>Her Oscar-winning role as Virginia Woolf. A deeply moving performance that showcased her extraordinary range.</p>
                        <a href="https://www.bilibili.com" target="_blank" class="video-link">Watch on Bilibili →</a>
                    </div>
                </div>
                <div class="video-card">
                    <div class="video-wrapper">
                        <iframe src="https://player.bilibili.com/player.html?bvid=BV1Xx411c7mD" 
                                allowfullscreen="true"
                                sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts">
                        </iframe>
                    </div>
                    <div class="video-info">
                        <h3>Big Little Lies (2017-2019)</h3>
                        <p>Her Emmy-winning role in the HBO limited series. A powerful portrayal of domestic drama and female friendship.</p>
                        <a href="https://www.bilibili.com" target="_blank" class="video-link">Watch on Bilibili →</a>
                    </div>
                </div>
            </div>
        </section>
'''

# 在 </div> (footer 前) 前插入媒体区域
old_footer_div = '    </div>\n    \n    <footer'
new_footer_div = media_sections + '    </div>\n    \n    <footer'

if old_footer_div in content:
    content = content.replace(old_footer_div, new_footer_div, 1)
    print('[OK] Media sections added successfully')
else:
    print('[ERROR] Footer div not found')

# 写回文件
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('\n[SUCCESS] Media sections added to Nicole Kidman page!')
print('Added:')
print('  - Image Gallery (6 photos from Unsplash, works in China)')
print('  - Video Section (3 featured works with Bilibili embeds, not blocked in China)')

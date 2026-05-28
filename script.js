// 赛博方舟 Cyber Ark - 主脚本
// 实现：粒子动画、分类卡片、实体展示、搜索、模态框

// ========== 全局数据：14大分类 ==========
const categories = [
    {
        icon: '🏛️',
        name: '政治',
        slug: 'politics',
        desc: '经典政治理论、传世政论著作、知名政体体系、历史政治里程碑、经典政治人物',
        color: '#4A90D9',
        subcategories: ['经典政治理论', '传世政论著作', '知名政体体系', '历史政治里程碑', '经典政治人物']
    },
    {
        icon: '⚔️',
        name: '军事',
        slug: 'military',
        desc: '经典军事典籍、传奇战役、顶尖军事思想、名将名录、传世兵器与军事工程',
        color: '#C0392B',
        subcategories: ['经典军事典籍', '传奇战役', '顶尖军事思想', '名将名录', '传世兵器与军事工程']
    },
    {
        icon: '🔬',
        name: '科学',
        slug: 'science',
        desc: '基础学科成果、顶尖科学理论、里程碑发明、著名科学家、经典科学著作、前沿科研成果',
        color: '#2ECC71',
        subcategories: ['基础学科成果', '顶尖科学理论', '里程碑发明', '著名科学家', '经典科学著作', '前沿科研成果']
    },
    {
        icon: '💰',
        name: '经济',
        slug: 'economics',
        desc: '经典经济学理论、传世经济著作、经济里程碑事件、知名经济学者、经典商业模式',
        color: '#F39C12',
        subcategories: ['经典经济学理论', '传世经济著作', '经济里程碑事件', '知名经济学者', '经典商业模式']
    },
    {
        icon: '📚',
        name: '教育',
        slug: 'education',
        desc: '经典教育典籍、顶尖学府、传世教育思想、名师名录、经典教材与通识内容',
        color: '#9B59B6',
        subcategories: ['经典教育典籍', '顶尖学府', '传世教育思想', '名师名录', '经典教材与通识内容']
    },
    {
        icon: '📜',
        name: '历史',
        slug: 'history',
        desc: '世界通史、断代史、传世史书、历史文明古国、传奇历史人物、重大历史事件',
        color: '#E67E22',
        subcategories: ['世界通史', '断代史', '传世史书', '历史文明古国', '传奇历史人物', '重大历史事件']
    },
    {
        icon: '🙏',
        name: '宗教',
        slug: 'religion',
        desc: '传世宗教经典、主流宗教体系、宗教文化遗迹、宗教思想、知名宗教先贤',
        color: '#8E44AD',
        subcategories: ['传世宗教经典', '主流宗教体系', '宗教文化遗迹', '宗教思想', '知名宗教先贤']
    },
    {
        icon: '🎨',
        name: '艺术',
        slug: 'art',
        desc: '绘画、雕塑、建筑、摄影、设计、工艺美术、传世艺术名作、艺术大师',
        color: '#E74C3C',
        subcategories: ['绘画', '雕塑', '建筑', '摄影', '设计', '工艺美术', '传世艺术名作', '艺术大师']
    },
    {
        icon: '🎮',
        name: '娱乐',
        slug: 'entertainment',
        desc: '经典影视、传世音乐、殿堂级游戏、经典综艺、舞台表演、影视金曲',
        color: '#1ABC9C',
        subcategories: ['经典影视', '传世音乐', '殿堂级游戏', '经典综艺', '舞台表演', '影视金曲']
    },
    {
        icon: '🛒',
        name: '消费',
        slug: 'consumer',
        desc: '传世经典品牌、百年匠心产品、高端生活美学、经典设计产品、地域特色精品',
        color: '#D35400',
        subcategories: ['传世经典品牌', '百年匠心产品', '高端生活美学', '经典设计产品', '地域特色精品']
    },
    {
        icon: '🏛️',
        name: '文化',
        slug: 'culture',
        desc: '民俗文化、非遗技艺、地域文明、传统礼仪、经典文化符号、文化遗迹',
        color: '#16A085',
        subcategories: ['民俗文化', '非遗技艺', '地域文明', '传统礼仪', '经典文化符号', '文化遗迹']
    },
    {
        icon: '📖',
        name: '文学',
        slug: 'literature',
        desc: '世界名著、诗词曲赋、经典散文、戏剧作品、知名文豪、传世短篇小说',
        color: '#C0392B',
        subcategories: ['世界名著', '诗词曲赋', '经典散文', '戏剧作品', '知名文豪', '传世短篇小说']
    },
    {
        icon: '⚽',
        name: '体育',
        slug: 'sports',
        desc: '经典体育赛事、传奇体育明星、传统体育项目、经典体育纪录、体育精神著作',
        color: '#2980B9',
        subcategories: ['经典体育赛事', '传奇体育明星', '传统体育项目', '经典体育纪录', '体育精神著作']
    },
    {
        icon: '📦',
        name: '杂项',
        slug: 'misc',
        desc: '综合传世珍品、小众高端文化、跨界经典内容、特殊文明载体、趣味高价值典藏',
        color: '#7F8C8D',
        subcategories: ['综合传世珍品', '小众高端文化', '跨界经典内容', '特殊文明载体', '趣味高价值典藏']
    }
];

// ========== 模拟实体数据 ==========
const sampleEntities = [
    {
        id: 1,
        name: '论语',
        category: '文学',
        categorySlug: 'literature',
        desc: '儒家经典，记录孔子及其弟子言行，中华文明的基石之作。',
        tags: ['经典', '哲学', '儒家', '中华'],
        rating: 5,
        featured: true,
        thumbnail: '📖',
        year: '公元前551年'
    },
    {
        id: 2,
        name: '蒙娜丽莎',
        category: '艺术',
        categorySlug: 'art',
        desc: '达·芬奇传世名作，文艺复兴时期最具影响力的绘画作品。',
        tags: ['绘画', '文艺复兴', '达芬奇', '传世'],
        rating: 5,
        featured: true,
        thumbnail: '🎨',
        year: '1503年'
    },
    {
        id: 3,
        name: '相对论',
        category: '科学',
        categorySlug: 'science',
        desc: '爱因斯坦提出的物理学理论，彻底改变了人类对时空的理解。',
        tags: ['物理', '理论', '爱因斯坦', '里程碑'],
        rating: 5,
        featured: true,
        thumbnail: '🔬',
        year: '1905年'
    },
    {
        id: 4,
        name: '孙子兵法',
        category: '军事',
        categorySlug: 'military',
        desc: '中国古代军事经典，世界军事史上的巅峰之作。',
        tags: ['兵法', '经典', '古代', '战略'],
        rating: 5,
        featured: true,
        thumbnail: '⚔️',
        year: '公元前5世纪'
    },
    {
        id: 5,
        name: '史记',
        category: '历史',
        categorySlug: 'history',
        desc: '司马迁撰写的纪传体通史，中国史学的奠基之作。',
        tags: ['历史', '通史', '司马迁', '经典'],
        rating: 5,
        featured: true,
        thumbnail: '📜',
        year: '公元前91年'
    },
    {
        id: 6,
        name: '国富论',
        category: '经济',
        categorySlug: 'economics',
        desc: '亚当·斯密经典经济学著作，现代经济学的奠基之作。',
        tags: ['经济学', '经典', '亚当斯密', '自由市场'],
        rating: 5,
        featured: true,
        thumbnail: '💰',
        year: '1776年'
    }
];

// ========== 页面初始化 ==========
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    renderCategories();
    renderFeatured();
    initScrollEffect();
});

// ========== 粒子动画 ==========
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    const particleCount = 80;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = Math.random() > 0.5 ? '0, 212, 255' : '201, 168, 76';
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ========== 渲染分类卡片 ==========
function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    categories.forEach((cat, index) => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.style.animationDelay = `${index * 0.05}s`;
        card.innerHTML = `
            <span class="category-icon">${cat.icon}</span>
            <h3 class="category-name">${cat.name}</h3>
            <p class="category-desc">${cat.desc}</p>
            <button class="category-btn" onclick="openCategory('${cat.slug}')">
                探索该分类
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </button>
        `;
        grid.appendChild(card);
    });
}

// ========== 渲染精选实体 ==========
function renderFeatured() {
    const grid = document.getElementById('featuredGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const featured = sampleEntities.filter(e => e.featured);
    
    featured.forEach((entity, index) => {
        const card = document.createElement('div');
        card.className = 'entity-card featured';
        card.style.animationDelay = `${index * 0.1}s`;
        
        const stars = '★'.repeat(entity.rating) + '☆'.repeat(5 - entity.rating);
        
        card.innerHTML = `
            <div class="entity-thumbnail">${entity.thumbnail}</div>
            <h3 class="entity-name">${entity.name}</h3>
            <p class="entity-category">${entity.category} · ${entity.year}</p>
            <p class="entity-desc">${entity.desc}</p>
            <div class="entity-tags">
                ${entity.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="entity-rating">${stars}</div>
        `;
        
        card.addEventListener('click', () => showEntityDetail(entity.id));
        grid.appendChild(card);
    });
}

// ========== 打开分类 ==========
function openCategory(slug) {
    const cat = categories.find(c => c.slug === slug);
    if (!cat) return;
    
    alert(`即将跳转到【${cat.name}】分类页\n\n子分类：${cat.subcategories.join('、')}\n\n（完整版将实现分类详情页）`);
}

// ========== 显示实体详情 ==========
function showEntityDetail(entityId) {
    const entity = sampleEntities.find(e => e.id === entityId);
    if (!entity) return;
    
    const modal = document.getElementById('entityModal');
    const content = document.getElementById('entityDetailContent');
    
    const stars = '★'.repeat(entity.rating) + '☆'.repeat(5 - entity.rating);
    
    content.innerHTML = `
        <div class="entity-detail-header">
            <div class="entity-detail-thumbnail">${entity.thumbnail}</div>
            <div class="entity-detail-info">
                <h2 class="entity-detail-name">${entity.name}</h2>
                <div class="entity-detail-meta">
                    <span class="meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                            <line x1="7" y1="7" x2="7.01" y2="7"></line>
                        </svg>
                        ${entity.category}
                    </span>
                    <span class="meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        ${entity.year}
                    </span>
                </div>
                <div class="entity-detail-tags">
                    ${entity.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="entity-rating" style="margin-bottom: 1.5rem;">${stars}</div>
                <div class="entity-detail-actions">
                    <button class="btn-primary" onclick="alert('收藏功能开发中')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        收藏
                    </button>
                    <button class="btn-secondary" onclick="alert('分享功能开发中')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="18" cy="5" r="3"></circle>
                            <circle cx="6" cy="12" r="3"></circle>
                            <circle cx="18" cy="19" r="3"></circle>
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                        </svg>
                        分享
                    </button>
                </div>
            </div>
        </div>
        <div class="entity-detail-body">
            <h3>详细介绍</h3>
            <p>${entity.desc}</p>
            <p>这里是${entity.name}的详细内容介绍。完整版本将包含：</p>
            <ul>
                <li>完整的背景介绍</li>
                <li>发展历程与演变</li>
                <li>核心价值与意义</li>
                <li>历史影响与评价</li>
                <li>相关资源与延伸阅读</li>
            </ul>
            
            <h3>精华内容专区</h3>
            <p>根据内容类型，这里将展示：</p>
            <ul>
                <li><strong>文本类</strong>：经典段落节选、核心思想摘要</li>
                <li><strong>图片类</strong>：高清图片展示、细节放大</li>
                <li><strong>音频/视频类</strong>：经典片段预览、精彩片段</li>
                <li><strong>书籍类</strong>：原作阅览、章节选读</li>
            </ul>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ========== 搜索功能 ==========
function performSearch() {
    const query = document.getElementById('globalSearch').value.trim();
    if (!query) {
        alert('请输入搜索关键词');
        return;
    }
    
    const results = sampleEntities.filter(e => 
        e.name.includes(query) || 
        e.desc.includes(query) || 
        e.tags.some(t => t.includes(query)) ||
        e.category.includes(query)
    );
    
    if (results.length === 0) {
        alert(`未找到与"${query}"相关的结果。\n\n完整版将实现全站搜索功能。`);
    } else {
        alert(`找到 ${results.length} 条与"${query}"相关的结果。\n\n完整版将展示搜索结果列表。`);
    }
}

// ========== 模态框控制 ==========
function showAbout() {
    const modal = document.getElementById('aboutModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function showFavorites() {
    alert('收藏夹功能开发中\n\n完整版将展示用户收藏的所有实体。');
}

function showUserPanel() {
    alert('用户面板功能开发中\n\n完整版将支持：\n- 用户登录/注册\n- 个人收藏管理\n- 浏览历史\n- 个性化推荐');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// 点击模态框外部关闭
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ========== 暗黑模式切换 ==========
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    alert(`${isDark ? '进入' : '退出'}暗黑模式\n\n（当前为演示，完整版将持久化用户偏好）`);
}

// ========== 滚动效果 ==========
function initScrollEffect() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ========== 滚动到分类区 ==========
function scrollToCategories() {
    const categoriesSection = document.getElementById('categories');
    if (categoriesSection) {
        categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ========== 键盘快捷键 ==========
document.addEventListener('keydown', function(e) {
    // ESC 关闭模态框
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Ctrl/Cmd + K 聚焦搜索框
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('globalSearch').focus();
    }
});

// ========== 搜索框回车键支持 ==========
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('globalSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
});

console.log('%c赛博方舟 | Cyber Ark', 'font-size: 20px; font-weight: bold; color: #00d4ff;');
console.log('%c人类顶级文明数字载体，典藏全球高价值资产', 'font-size: 12px; color: #9090a0;');

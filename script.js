// 赛博方舟 Cyber Ark - 主脚本（数据驱动版）
// 实现：粒子动画、分类卡片、三级导航、搜索、模态框

// ========== 全局数据 ==========
let navTree = [];  // 导航树数据

// ========== 精选实体数据（首页展示用）==========
const featuredEntities = [
    {
        id: 1,
        name: '论语',
        category: '文学',
        categorySlug: 'literature',
        desc: '儒家经典，记录孔子及其弟子言行，中华文明的基石之作。',
        tags: ['经典', '哲学', '儒家', '中华'],
        rating: 5,
        thumbnail: '📖'
    },
    {
        id: 2,
        name: '蒙娜丽莎',
        category: '艺术',
        categorySlug: 'art',
        desc: '达·芬奇传世名作，文艺复兴时期最具影响力的绘画作品。',
        tags: ['绘画', '文艺复兴', '达芬奇', '传世'],
        rating: 5,
        thumbnail: '🎨'
    },
    {
        id: 3,
        name: '相对论',
        category: '科学',
        categorySlug: 'science',
        desc: '爱因斯坦提出的物理学理论，彻底改变了人类对时空的理解。',
        tags: ['物理', '理论', '爱因斯坦', '里程碑'],
        rating: 5,
        thumbnail: '🔬'
    },
    {
        id: 4,
        name: '孙子兵法',
        category: '军事',
        categorySlug: 'military',
        desc: '中国古代军事经典，世界军事史上的巅峰之作。',
        tags: ['兵法', '经典', '古代', '战略'],
        rating: 5,
        thumbnail: '⚔️'
    },
    {
        id: 5,
        name: '史记',
        category: '历史',
        categorySlug: 'history',
        desc: '司马迁撰写的纪传体通史，中国史学的奠基之作。',
        tags: ['历史', '通史', '司马迁', '经典'],
        rating: 5,
        thumbnail: '📜'
    },
    {
        id: 6,
        name: '国富论',
        category: '经济',
        categorySlug: 'economy',
        desc: '亚当·斯密经典经济学著作，现代经济学的奠基之作。',
        tags: ['经济学', '经典', '亚当斯密', '自由市场'],
        rating: 5,
        thumbnail: '💰'
    }
];

// ========== 初始化 ==========
document.addEventListener('DOMContentLoaded', async function() {
    // 加载导航树数据
    await loadNavTree();
    
    // 初始化各个功能模块
    initParticles();
    initScrollEffect();
    
    // 根据当前页面渲染内容
    const path = window.location.pathname;
    if (path.includes('index.html') || path.endsWith('/') || path.endsWith('cyber-ark')) {
        renderCategories();
        renderFeatured();
    }
});

// ========== 加载导航树数据 ==========
async function loadNavTree() {
    try {
        const response = await fetch('data/nav-tree.json');
        navTree = await response.json();
        console.log(`[数据加载] 已加载 ${navTree.length} 个分类，共 ${navTree.reduce((sum, c) => sum + c.subcategoryCount, 0)} 个榜单`);
    } catch (error) {
        console.error('加载导航树数据失败:', error);
    }
}

// ========== 渲染首页分类卡片 ==========
function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid || navTree.length === 0) return;
    
    grid.innerHTML = navTree.map((cat, index) => `
        <div class="category-card" style="animation-delay: ${index * 0.05}s;" onclick="window.location.href='rankings.html?cat=${cat.slug}'">
            <div class="category-icon" style="font-size: 3rem; margin-bottom: 15px;">${cat.icon}</div>
            <h3 class="category-name">${cat.name}</h3>
            <p class="category-desc">${cat.subcategoryCount} 个榜单 · ${cat.entityCount.toLocaleString()} 个实体</p>
            <div class="category-color-bar" style="background: ${cat.color};"></div>
            <button class="category-btn" style="background: ${cat.color}20; color: ${cat.color}; border-color: ${cat.color}40;">
                探索该分类
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </button>
        </div>
    `).join('');
}

// ========== 渲染精选推荐 ==========
function renderFeatured() {
    const grid = document.getElementById('featuredGrid');
    if (!grid) return;
    
    grid.innerHTML = featuredEntities.map((entity, index) => {
        const stars = '★'.repeat(entity.rating) + '☆'.repeat(5 - entity.rating);
        return `
            <div class="entity-card" style="animation-delay: ${index * 0.05}s;" onclick="window.location.href='entity.html?cat=${entity.categorySlug}&entity=${entity.name}'">
                <div class="entity-thumbnail">${entity.thumbnail}</div>
                <h3 class="entity-name">${entity.name}</h3>
                <p class="entity-category">${entity.category}</p>
                <p class="entity-desc">${entity.desc}</p>
                <div class="entity-tags">
                    ${entity.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="entity-rating">${stars}</div>
            </div>
        `;
    }).join('');
}

// ========== 粒子动画系统 ==========
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.5 + 0.2
        };
    }
    
    function initParticleArray() {
        particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push(createParticle());
        }
    }
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, i) => {
            // 更新位置
            p.x += p.vx;
            p.y += p.vy;
            
            // 边界检测
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            
            // 绘制粒子
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
            ctx.fill();
            
            // 连线
            particles.slice(i + 1).forEach(p2 => {
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - dist / 150)})`;
                    ctx.stroke();
                }
            });
        });
        
        animationId = requestAnimationFrame(draw);
    }
    
    resize();
    initParticleArray();
    draw();
    
    window.addEventListener('resize', () => {
        resize();
        initParticleArray();
    });
}

// ========== 暗黑模式切换 ==========
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

// ========== 显示收藏夹 ==========
function showFavorites() {
    alert('收藏夹功能开发中\n\n完整版将展示用户收藏的所有实体。');
}

// ========== 显示用户面板 ==========
function showUserPanel() {
    alert('用户面板功能开发中\n\n完整版将支持：\n- 用户登录/注册\n- 个人收藏管理\n- 浏览历史\n- 个性化推荐');
}

// ========== 显示关于 ==========
function showAbout() {
    const modal = document.getElementById('aboutModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// ========== 关闭模态框 ==========
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ========== 搜索功能 ==========
function performSearch() {
    const query = document.getElementById('globalSearch').value.trim();
    if (!query) {
        alert('请输入搜索关键词');
        return;
    }
    
    // 在导航树中搜索
    const results = [];
    navTree.forEach(cat => {
        if (cat.name.includes(query) || cat.slug.includes(query)) {
            results.push({ type: 'category', ...cat });
        }
        cat.subcategories.forEach(sub => {
            if (sub.name.includes(query) || sub.slug.includes(query)) {
                results.push({ type: 'ranking', category: cat.slug, ...sub });
            }
        });
    });
    
    if (results.length === 0) {
        alert(`未找到与"${query}"相关的结果。`);
    } else {
        alert(`找到 ${results.length} 条与"${query}"相关的结果。\n\n完整版将展示搜索结果列表。`);
    }
}

// ========== 滚动效果 ==========
function initScrollEffect() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
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
        const searchInput = document.getElementById('globalSearch');
        if (searchInput) searchInput.focus();
    }
});

// ========== 搜索框回车键支持 ==========
document.addEventListener('keypress', function(e) {
    if (e.target.id === 'globalSearch' && e.key === 'Enter') {
        performSearch();
    }
});

// 点击模态框外部关闭
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

console.log('%c赛博方舟 | Cyber Ark', 'font-size: 20px; font-weight: bold; color: #00d4ff;');
console.log('%c人类顶级文明数字载体，典藏全球高价值资产', 'font-size: 12px; color: #9090a0;');

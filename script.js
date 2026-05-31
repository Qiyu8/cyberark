// 赛博方舟 Cyber Ark - 主脚本（数据驱动版）
// 实现：粒子动画、分类卡片、三级导航、搜索、模态框

// ========== 全局数据 ==========
let navTree = [];  // 导航树数据
let searchIndex = [];  // 搜索索引

const featuredEntities = [
    {
        id: 1,
        name: '李煜',
        category: '文学',
        categorySlug: 'literature',
        subSlug: 'classical-literature',
        file: 'entities/T1/Leeyu.md',
        desc: '南唐后主，婉约派代表词人，千古杰作《虞美人》等。',
        tags: ['南唐', '词人', '婉约派', '千古杰作'],
        rating: 5,
        thumbnail: '📖'
    },
    {
        id: 2,
        name: '蒙娜丽莎',
        category: '艺术',
        categorySlug: 'art',
        subSlug: 'painting',
        file: 'World-Famous-Paintings-Top100/Renaissance/001_Mona-Lisa.md',
        desc: '达·芬奇传世名作，文艺复兴时期最具影响力的绘画作品。',
        tags: ['绘画', '文艺复兴', '达芬奇', '传世'],
        rating: 5,
        thumbnail: '🎨'
    },
    {
        id: 3,
        name: '阿尔伯特·爱因斯坦',
        category: '科学',
        categorySlug: 'science',
        subSlug: 'physics',
        file: 'nobel-physicsTop50/022_Albert·Einstein.md',
        desc: '提出相对论，彻底改变了人类对时空的理解。',
        tags: ['物理', '相对论', '诺贝尔物理学奖', '里程碑'],
        rating: 5,
        thumbnail: '🔬'
    },
    {
        id: 4,
        name: '海南岛战役',
        category: '军事',
        categorySlug: 'military',
        subSlug: 'army-forces',
        file: 'entities/T1/SeanIslandBattle.md',
        desc: '1950年中国人民解放军攻打海南岛的战役，解放海南全境。',
        tags: ['解放战争', '战役', '1950年', '解放军'],
        rating: 5,
        thumbnail: '⚔️'
    },
    {
        id: 5,
        name: '董卓',
        category: '历史',
        categorySlug: 'history',
        subSlug: 'ancient-history',
        file: 'entities/T1/dongzhuo.md',
        desc: '东汉末年权臣，废少帝立献帝，暴虐专权。',
        tags: ['东汉', '权臣', '暴虐', '三国'],
        rating: 5,
        thumbnail: '📜'
    },
    {
        id: 6,
        name: '亚当·斯密',
        category: '经济',
        categorySlug: 'economy',
        subSlug: 'economists',
        file: 'Global-Top-Economists-Top50/001_Adam-Smith.md',
        desc: '现代经济学之父，《国富论》作者，提出"看不见的手"。',
        tags: ['经济学', '国富论', '看不见的手', '古典经济学'],
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
    initSearch();

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

// ========== 加载搜索索引（后台异步，不阻塞页面） ==========
async function loadSearchIndex() {
    try {
        const r = await fetch('data/search-index.json');
        if (r.ok) searchIndex = await r.json();
    } catch (e) { /* 静默，搜索降级为分类搜索 */ }
}

// ========== 渲染首页分类卡片 ==========
function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid || navTree.length === 0) return;

    grid.innerHTML = navTree.map((cat, index) => `
        <div class="category-card" style="animation-delay: ${index * 0.05}s; --cat-color: ${cat.color};" onclick="window.location.href='${buildRankingsUrl(cat.slug)}'">
            <div class="category-card-bg" style="background: radial-gradient(ellipse at top left, ${cat.color}22 0%, transparent 65%);"></div>
            <div class="category-card-top">
                <span class="category-icon">${cat.icon}</span>
                <span class="category-count-badge" style="background: ${cat.color}22; color: ${cat.color}; border-color: ${cat.color}44;">${cat.entityCount.toLocaleString()}</span>
            </div>
            <h3 class="category-name">${cat.name}</h3>
            <p class="category-desc">${cat.subcategoryCount} 个榜单</p>
            <div class="category-color-bar" style="background: linear-gradient(90deg, ${cat.color}, ${cat.color}44);"></div>
            <div class="category-arrow" style="color: ${cat.color};">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </div>
        </div>
    `).join('');
}

// ========== 渲染精选推荐 ==========
function renderFeatured() {
    const grid = document.getElementById('featuredGrid');
    if (!grid) return;

    grid.innerHTML = featuredEntities.map((entity, index) => {
        const url = entity.subSlug && entity.file
            ? buildEntityPageUrl(entity.categorySlug, entity.subSlug, entity.file)
            : `entity-list.html?cat=${entity.categorySlug}`;
        return `
            <div class="entity-card" style="animation-delay: ${index * 0.05}s;" onclick="window.location.href='${url}'">
                <div class="entity-thumbnail">
                    <span class="entity-thumb-icon">${entity.thumbnail}</span>
                </div>
                <div class="entity-card-body">
                    <span class="entity-category-badge">${entity.category}</span>
                    <h3 class="entity-name">${entity.name}</h3>
                    <p class="entity-desc">${entity.desc}</p>
                    <div class="entity-tags">
                        ${entity.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
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
    const input = document.getElementById('globalSearch');
    if (input) input.focus();
}

function initSearch() {
    const input = document.getElementById('globalSearch');
    if (!input) return;

    loadSearchIndex();

    // 挂到 body，用 fixed 定位避免被 flex/overflow 影响
    const dropdown = document.createElement('div');
    dropdown.className = 'search-dropdown';
    dropdown.style.display = 'none';
    document.body.appendChild(dropdown);

    function positionDropdown() {
        const rect = input.closest('.search-box').getBoundingClientRect();
        dropdown.style.cssText = `
            position: fixed !important;
            top: ${rect.bottom + 6}px !important;
            left: ${rect.left}px !important;
            width: ${rect.width}px !important;
            z-index: 2147483647 !important;
            display: block;
            background: #0d0d1e !important;
            border: 1px solid rgba(0, 212, 255, 0.25) !important;
            border-radius: 12px !important;
            max-height: 360px !important;
            overflow-y: auto !important;
            box-shadow: 0 24px 64px rgba(0, 0, 0, 0.95) !important;
        `;
    }

    let activeIndex = -1;
    let currentResults = [];

    function fuzzySearch(query) {
        if (!query || !searchIndex.length) return [];
        const q = query.toLowerCase();
        const scored = [];
        for (const item of searchIndex) {
            const name = item.name.toLowerCase();
            const en = (item.en || '').toLowerCase();
            // 精确前缀 > 包含匹配（name 含中英文，en 纯英文）
            let score = 0;
            if (name.startsWith(q) || en.startsWith(q)) score = 3;
            else if (name.includes(q) || en.includes(q)) score = 2;
            else if (item.catName.includes(query) || item.subName.includes(query)) score = 1;
            if (score > 0) scored.push({ item, score });
        }
        scored.sort((a, b) => b.score - a.score);
        return scored.slice(0, 10).map(s => s.item);
    }

    function highlight(text, query) {
        if (!query || !text) return text;
        const idx = text.toLowerCase().indexOf(query.toLowerCase());
        if (idx < 0) return text;
        return text.slice(0, idx) +
            `<span class="search-highlight">${text.slice(idx, idx + query.length)}</span>` +
            text.slice(idx + query.length);
    }

    function renderDropdown(results, query) {
        activeIndex = -1;
        currentResults = results;
        if (!results.length) {
            closeDropdown();
            return;
        }
        const items = results.map((item, i) => {
            const url = buildEntityPageUrl(item.cat, item.sub, item.file);
            const displayName = highlight(item.name, query);
            const parentLabel = [item.catName, item.subName].filter(Boolean).join(' / ');
            return `<div class="search-dropdown-row"><a class="search-dropdown-item" href="${url}" data-idx="${i}"><span class="item-name">${displayName}</span>&nbsp;&nbsp;&nbsp;<em class="item-parent">${parentLabel}</em></a></div>`;
        });
        const total = searchIndex.length ? `共 ${searchIndex.length.toLocaleString()} 个典藏` : '';
        items.push(`<div class="search-dropdown-footer">显示前 ${results.length} 条 · ${total}</div>`);
        dropdown.innerHTML = items.join('');
        positionDropdown();
        dropdown.style.display = 'block';
    }

    function closeDropdown() {
        dropdown.style.cssText = 'display: none !important;';
        activeIndex = -1;
    }

    input.addEventListener('input', function() {
        const q = this.value.trim();
        if (!q) { closeDropdown(); return; }
        renderDropdown(fuzzySearch(q), q);
    });

    // 键盘导航
    input.addEventListener('keydown', function(e) {
        const items = dropdown.querySelectorAll('.search-dropdown-item');
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (!items.length) return;
            activeIndex = Math.min(activeIndex + 1, items.length - 1);
            items.forEach((el, i) => el.classList.toggle('active', i === activeIndex));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (!items.length) return;
            activeIndex = Math.max(activeIndex - 1, 0);
            items.forEach((el, i) => el.classList.toggle('active', i === activeIndex));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (activeIndex >= 0 && items[activeIndex]) {
                window.location.href = items[activeIndex].href;
            } else if (items.length > 0) {
                window.location.href = items[0].href;
            }
        } else if (e.key === 'Escape') {
            closeDropdown();
            input.blur();
        }
    });

    // 窗口 resize 时重新定位
    window.addEventListener('resize', function() {
        if (dropdown.style.display !== 'none') positionDropdown();
    });

    // 点击外部关闭
    const searchBox = input.closest('.search-box');
    document.addEventListener('click', function(e) {
        if (!searchBox.contains(e.target) && !dropdown.contains(e.target)) closeDropdown();
    });
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

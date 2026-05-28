// 赛博方舟 Cyber Ark - 主脚本（完整版）
// 实现：粒子动画、分类卡片、实体展示、搜索、模态框、分类页、详情页

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
        color: '#27AE60',
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

// ========== 模拟实体数据（40+ 条）==========
const sampleEntities = [
    // ===== 文学类 =====
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
        year: '公元前551年',
        author: '孔子及其弟子',
        dynasty: '春秋时期'
    },
    {
        id: 29,
        name: '莎士比亚全集',
        category: '文学',
        categorySlug: 'literature',
        desc: '英国文豪莎士比亚作品全集，世界文学巅峰。',
        tags: ['文学', '戏剧', '莎士比亚', '英国'],
        rating: 5,
        featured: false,
        thumbnail: '📖',
        year: '1590-1613年',
        author: '威廉·莎士比亚',
        works: '37部戏剧、154首十四行诗'
    },
    {
        id: 30,
        name: '堂吉诃德',
        category: '文学',
        categorySlug: 'literature',
        desc: '现代小说奠基之作，塞万提斯传世名作。',
        tags: ['小说', '西班牙', '塞万提斯', '经典'],
        rating: 5,
        featured: false,
        thumbnail: '📖',
        year: '1605-1615年',
        author: '米格尔·德·塞万提斯',
        significance: '现代小说奠基之作'
    },
    // ===== 艺术类 =====
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
        year: '1503年',
        artist: '列奥纳多·达·芬奇',
        location: '法国卢浮宫'
    },
    {
        id: 21,
        name: '大卫雕像',
        category: '艺术',
        categorySlug: 'art',
        desc: '米开朗基罗传世杰作，文艺复兴雕塑艺术巅峰。',
        tags: ['雕塑', '文艺复兴', '米开朗基罗', '传世'],
        rating: 5,
        featured: false,
        thumbnail: '🎨',
        year: '1504年',
        artist: '米开朗基罗',
        location: '意大利佛罗伦萨美术学院'
    },
    {
        id: 22,
        name: '西斯廷教堂天顶画',
        category: '艺术',
        categorySlug: 'art',
        desc: '米开朗基罗历时四年创作，文艺复兴壁画巅峰。',
        tags: ['壁画', '文艺复兴', '米开朗基罗', '传世'],
        rating: 5,
        featured: false,
        thumbnail: '🎨',
        year: '1512年',
        artist: '米开朗基罗',
        location: '梵蒂冈西斯廷教堂'
    },
    // ===== 科学类 =====
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
        year: '1905年',
        scientist: '阿尔伯特·爱因斯坦',
        impact: '彻底改变人类对时空的理解'
    },
    {
        id: 12,
        name: '牛顿三大定律',
        category: '科学',
        categorySlug: 'science',
        desc: '经典力学基石，奠定现代物理学基础。',
        tags: ['物理', '力学', '牛顿', '经典'],
        rating: 5,
        featured: false,
        thumbnail: '🔬',
        year: '1687年',
        scientist: '艾萨克·牛顿',
        impact: '经典力学基石'
    },
    {
        id: 13,
        name: '元素周期表',
        category: '科学',
        categorySlug: 'science',
        desc: '门捷列夫创立的化学元素分类体系，科学史上伟大发现。',
        tags: ['化学', '元素', '门捷列夫', '分类'],
        rating: 5,
        featured: false,
        thumbnail: '🔬',
        year: '1869年',
        scientist: '德米特里·门捷列夫',
        impact: '化学元素系统分类'
    },
    {
        id: 14,
        name: '进化论',
        category: '科学',
        categorySlug: 'science',
        desc: '达尔文提出的生物进化理论，彻底改变人类对生命起源的认知。',
        tags: ['生物', '进化', '达尔文', '起源'],
        rating: 5,
        featured: false,
        thumbnail: '🔬',
        year: '1859年',
        scientist: '查尔斯·达尔文',
        work: '《物种起源》'
    },
    {
        id: 33,
        name: '量子力学',
        category: '科学',
        categorySlug: 'science',
        desc: '微观世界物理理论，现代科技基石（半导体、激光等）。',
        tags: ['物理', '量子', '微观', '科技基石'],
        rating: 5,
        featured: false,
        thumbnail: '🔬',
        year: '20世纪初',
        scientists: '普朗克、玻尔、海森堡、薛定谔等',
        impact: '现代科技基石'
    },
    {
        id: 34,
        name: 'DNA双螺旋结构',
        category: '科学',
        categorySlug: 'science',
        desc: '沃森和克里克发现DNA结构，开启分子生物学时代。',
        tags: ['生物', 'DNA', '分子生物学', '结构'],
        rating: 5,
        featured: false,
        thumbnail: '🔬',
        year: '1953年',
        scientists: '詹姆斯·沃森、弗朗西斯·克里克',
        impact: '开启分子生物学时代'
    },
    {
        id: 35,
        name: '互联网',
        category: '科学',
        categorySlug: 'science',
        desc: '20世纪最伟大的发明之一，彻底改变人类生活方式。',
        tags: ['技术', '网络', '信息', '革命'],
        rating: 5,
        featured: false,
        thumbnail: '🔬',
        year: '1969年（ARPANET）',
        pioneers: '蒂姆·伯纳斯-李、文顿·瑟夫等',
        impact: '彻底改变人类生活方式'
    },
    // ===== 军事类 =====
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
        year: '公元前5世纪',
        author: '孙武',
        dynasty: '春秋时期'
    },
    {
        id: 10,
        name: '滑铁卢战役',
        category: '军事',
        categorySlug: 'military',
        desc: '拿破仑最终败北的传奇战役，改变欧洲历史。',
        tags: ['战役', '拿破仑', '欧洲', '传奇'],
        rating: 5,
        featured: false,
        thumbnail: '⚔️',
        year: '1815年',
        location: '比利时滑铁卢',
        outcome: '拿破仑最终败北'
    },
    {
        id: 11,
        name: '诺曼底登陆',
        category: '军事',
        categorySlug: 'military',
        desc: '二战最大规模海上登陆作战，盟军胜利转折点。',
        tags: ['二战', '登陆', '盟军', '转折点'],
        rating: 5,
        featured: false,
        thumbnail: '⚔️',
        year: '1944年',
        location: '法国诺曼底',
        outcome: '盟军胜利，开辟欧洲第二战场'
    },
    {
        id: 36,
        name: '第二次世界大战',
        category: '军事',
        categorySlug: 'military',
        desc: '人类历史上规模最大、损失最惨重的战争。',
        tags: ['战争', '全球', '20世纪', '惨重'],
        rating: 5,
        featured: false,
        thumbnail: '⚔️',
        year: '1939-1945年',
        parties: '同盟国 vs 轴心国',
        outcome: '同盟国胜利，联合国成立'
    },
    {
        id: 37,
        name: '原子弹',
        category: '军事',
        categorySlug: 'military',
        desc: '曼哈顿计划产物，改变战争形态与国际格局。',
        tags: ['武器', '核弹', '曼哈顿计划', '改变格局'],
        rating: 5,
        featured: false,
        thumbnail: '⚔️',
        year: '1945年',
        project: '曼哈顿计划',
        scientists: '奥本海默等'
    },
    // ===== 历史类 =====
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
        year: '公元前91年',
        author: '司马迁',
        dynasty: '西汉'
    },
    {
        id: 17,
        name: '法国大革命',
        category: '历史',
        categorySlug: 'history',
        desc: '推翻君主专制，传播自由平等博爱思想，影响全球。',
        tags: ['革命', '法国', '启蒙', '民主'],
        rating: 5,
        featured: false,
        thumbnail: '📜',
        year: '1789年',
        location: '法国',
        impact: '推翻君主专制，传播民主思想'
    },
    {
        id: 18,
        name: '文艺复兴',
        category: '历史',
        categorySlug: 'history',
        desc: '欧洲文化艺术复兴运动，奠定现代社会基础。',
        tags: ['文化', '艺术', '欧洲', '复兴'],
        rating: 5,
        featured: false,
        thumbnail: '📜',
        year: '14-17世纪',
        location: '欧洲',
        impact: '文化艺术全面复兴'
    },
    {
        id: 40,
        name: '丝绸之路',
        category: '历史',
        categorySlug: 'history',
        desc: '古代东西方文明交流通道，贸易与文化融合之路。',
        tags: ['贸易', '交流', '古代', '文明融合'],
        rating: 5,
        featured: false,
        thumbnail: '📜',
        year: '公元前2世纪-14世纪',
        route: '中国长安 → 中亚 → 西亚 → 欧洲',
        significance: '东西方文明交流通道'
    },
    // ===== 经济类 =====
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
        year: '1776年',
        author: '亚当·斯密',
        impact: '现代经济学奠基之作'
    },
    // ===== 教育类 =====
    {
        id: 15,
        name: '哈佛大学',
        category: '教育',
        categorySlug: 'education',
        desc: '美国顶尖高等学府，常春藤盟校之一，全球影响力巨大。',
        tags: ['大学', '美国', '常春藤', '顶尖'],
        rating: 5,
        featured: false,
        thumbnail: '📚',
        year: '1636年',
        location: '美国马萨诸塞州剑桥市',
        ranking: '全球顶尖'
    },
    {
        id: 16,
        name: '牛津大学',
        category: '教育',
        categorySlug: 'education',
        desc: '英语世界最古老大学，世界顶尖学府之一。',
        tags: ['大学', '英国', '古老', '顶尖'],
        rating: 5,
        featured: false,
        thumbnail: '📚',
        year: '1096年',
        location: '英国牛津',
        ranking: '世界顶尖'
    },
    // ===== 宗教类 =====
    {
        id: 19,
        name: '圣经',
        category: '宗教',
        categorySlug: 'religion',
        desc: '基督教经典，全球发行量最大、影响力最深远的书籍。',
        tags: ['宗教', '基督教', '经典', '全球'],
        rating: 5,
        featured: false,
        thumbnail: '🙏',
        year: '公元前1500年-公元100年',
        religion: '基督教',
        impact: '全球影响力最深远的书籍'
    },
    {
        id: 20,
        name: '古兰经',
        category: '宗教',
        categorySlug: 'religion',
        desc: '伊斯兰教根本经典，指导全球穆斯林生活准则。',
        tags: ['宗教', '伊斯兰教', '经典', '全球'],
        rating: 5,
        featured: false,
        thumbnail: '🙏',
        year: '610-632年',
        religion: '伊斯兰教',
        prophet: '穆罕默德'
    },
    // ===== 娱乐类 =====
    {
        id: 23,
        name: '泰坦尼克号',
        category: '娱乐',
        categorySlug: 'entertainment',
        desc: '影史经典爱情电影，全球票房冠军，传世名作。',
        tags: ['电影', '爱情', '经典', '传世'],
        rating: 5,
        featured: false,
        thumbnail: '🎮',
        year: '1997年',
        director: '詹姆斯·卡梅隆',
        boxOffice: '全球票房冠军'
    },
    {
        id: 24,
        name: '贝多芬第九交响曲',
        category: '娱乐',
        categorySlug: 'entertainment',
        desc: '乐圣巅峰之作，欢乐颂传唱全球，古典音乐巅峰。',
        tags: ['音乐', '古典', '贝多芬', '交响曲'],
        rating: 5,
        featured: false,
        thumbnail: '🎮',
        year: '1824年',
        composer: '路德维希·范·贝多芬',
        movement: '古典音乐'
    },
    // ===== 消费类 =====
    {
        id: 25,
        name: '路易威登',
        category: '消费',
        categorySlug: 'consumer',
        desc: '法国奢侈品牌，百年历史，箱包工艺巅峰。',
        tags: ['奢侈品', '法国', '箱包', '百年'],
        rating: 5,
        featured: false,
        thumbnail: '🛒',
        year: '1854年',
        founder: '路易·威登',
        country: '法国'
    },
    {
        id: 26,
        name: '可口可乐',
        category: '消费',
        categorySlug: 'consumer',
        desc: '全球最大饮料品牌，美国文化符号，百年传奇。',
        tags: ['饮料', '美国', '百年', '文化符号'],
        rating: 5,
        featured: false,
        thumbnail: '🛒',
        year: '1886年',
        founder: '约翰·彭伯顿',
        country: '美国'
    },
    // ===== 文化类 =====
    {
        id: 27,
        name: '中国长城',
        category: '文化',
        categorySlug: 'culture',
        desc: '世界文化遗产，中华文明的象征，人类建筑奇迹。',
        tags: ['文化遗产', '中国', '建筑', '奇迹'],
        rating: 5,
        featured: false,
        thumbnail: '🏛️',
        year: '公元前7世纪-17世纪',
        location: '中国北方',
        length: '21196.18公里'
    },
    {
        id: 28,
        name: '端午节',
        category: '文化',
        categorySlug: 'culture',
        desc: '中国传统节日，非物质文化遗产，纪念屈原。',
        tags: ['传统节日', '中国', '非遗', '屈原'],
        rating: 5,
        featured: false,
        thumbnail: '🏛️',
        year: '战国时期起源',
        culture: '中华文化',
        significance: '纪念屈原，弘扬爱国精神'
    },
    // ===== 体育类 =====
    {
        id: 31,
        name: '世界杯',
        category: '体育',
        categorySlug: 'sports',
        desc: '全球最大体育盛事，足球运动巅峰舞台。',
        tags: ['足球', '全球', '赛事', '巅峰'],
        rating: 5,
        featured: false,
        thumbnail: '⚽',
        year: '1930年首次举办',
        frequency: '每4年一届',
        organizer: '国际足球联合会（FIFA）'
    },
    {
        id: 32,
        name: '奥运会',
        category: '体育',
        categorySlug: 'sports',
        desc: '全球最大综合性体育盛会，和平与竞技的殿堂。',
        tags: ['综合', '全球', '赛事', '和平'],
        rating: 5,
        featured: false,
        thumbnail: '⚽',
        year: '公元前776年起源',
        frequency: '每4年一届',
        organizer: '国际奥林匹克委员会（IOC）'
    },
    // ===== 政治类 =====
    {
        id: 7,
        name: '柏拉图理想国',
        category: '政治',
        categorySlug: 'politics',
        desc: '西方政治哲学巅峰之作，探讨正义与理想政体。',
        tags: ['政治哲学', '经典', '柏拉图', '理想国'],
        rating: 5,
        featured: false,
        thumbnail: '🏛️',
        year: '公元前380年',
        author: '柏拉图',
        era: '古希腊'
    },
    {
        id: 8,
        name: '社会契约论',
        category: '政治',
        categorySlug: 'politics',
        desc: '卢梭代表作，启蒙运动重要政治理论著作。',
        tags: ['政治', '启蒙', '卢梭', '社会契约'],
        rating: 5,
        featured: false,
        thumbnail: '🏛️',
        year: '1762年',
        author: '让-雅克·卢梭',
        impact: '法国大革命思想源泉'
    },
    {
        id: 9,
        name: '拿破仑法典',
        category: '政治',
        categorySlug: 'politics',
        desc: '现代民法典典范，影响全球法律体系。',
        tags: ['法律', '法典', '拿破仑', '民法'],
        rating: 5,
        featured: false,
        thumbnail: '🏛️',
        year: '1804年',
        author: '拿破仑·波拿巴',
        impact: '现代法律体系基石'
    },
    {
        id: 38,
        name: '联合国',
        category: '政治',
        categorySlug: 'politics',
        desc: '二战后建立的国际组织，维护全球和平与安全。',
        tags: ['国际组织', '和平', '安全', '合作'],
        rating: 5,
        featured: false,
        thumbnail: '🏛️',
        year: '1945年',
        headquarters: '美国纽约',
        members: '193个成员国'
    },
    {
        id: 39,
        name: '欧盟',
        category: '政治',
        categorySlug: 'politics',
        desc: '欧洲一体化组织，全球最具影响力的区域联盟。',
        tags: ['区域组织', '欧洲', '一体化', '影响力'],
        rating: 5,
        featured: false,
        thumbnail: '🏛️',
        year: '1993年（马斯特里赫特条约）',
        members: '27个欧洲国家',
        significance: '全球最具影响力的区域联盟'
    }
];

// ========== 页面初始化 ==========
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    renderCategories();
    renderFeatured();
    initScrollEffect();
    
    // 如果是在分类页面，渲染分类详情
    if (document.getElementById('categoryHeader')) {
        renderCategoryPage();
    }
    
    // 如果是在实体详情页面，渲染实体详情
    if (document.getElementById('entityDetail')) {
        renderEntityDetailPage();
    }
});

// ========== 粒子动画 ==========
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return; // 如果页面没有 canvas，跳过
    
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
    window.location.href = `category.html?cat=${slug}`;
}

// ========== 渲染分类页面 ==========
function renderCategoryPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('cat');
    const category = categories.find(c => c.slug === slug);
    
    if (!category) {
        document.getElementById('categoryTitle').textContent = '未找到该分类';
        document.getElementById('categoryDesc').textContent = '';
        return;
    }
    
    // 更新页面标题
    document.title = `${category.name} - 赛博方舟`;
    
    // 渲染分类信息
    document.getElementById('categoryTitle').textContent = `${category.icon} ${category.name}`;
    document.getElementById('categoryDesc').textContent = category.desc;
    
    // 渲染子分类标签
    const header = document.getElementById('categoryHeader');
    const tagsDiv = document.createElement('div');
    tagsDiv.style.marginTop = '20px';
    tagsDiv.innerHTML = category.subcategories.map(sub => `<span class="tag">${sub}</span>`).join(' ');
    header.appendChild(tagsDiv);
    
    // 渲染该分类下的实体
    renderCategoryEntities(slug);
}

// ========== 渲染分类下的实体 ==========
function renderCategoryEntities(slug) {
    const grid = document.getElementById('entityListGrid');
    const list = document.getElementById('entityListList');
    
    if (!grid || !list) return;
    
    const entities = sampleEntities.filter(e => e.categorySlug === slug);
    
    if (entities.length === 0) {
        grid.innerHTML = '<p style="color:#9090a0;text-align:center;">暂无该分类下的实体数据。</p>';
        list.innerHTML = '';
        return;
    }
    
    // 卡片视图
    grid.innerHTML = entities.map((entity, index) => {
        const stars = '★'.repeat(entity.rating) + '☆'.repeat(5 - entity.rating);
        return `
            <div class="entity-card" style="animation-delay: ${index * 0.05}s;" onclick="window.location.href='entity.html?id=${entity.id}'">
                <div class="entity-thumbnail">${entity.thumbnail}</div>
                <h3 class="entity-name">${entity.name}</h3>
                <p class="entity-category">${entity.category} · ${entity.year}</p>
                <p class="entity-desc">${entity.desc}</p>
                <div class="entity-tags">
                    ${entity.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="entity-rating">${stars}</div>
            </div>
        `;
    }).join('');
    
    // 列表视图
    list.innerHTML = entities.map((entity, index) => {
        const stars = '★'.repeat(entity.rating) + '☆'.repeat(5 - entity.rating);
        return `
            <div style="
                background: rgba(15,15,25,0.95);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(0,212,255,0.2);
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 15px;
                display: flex;
                align-items: center;
                gap: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
            " onmouseover="this.style.borderColor='rgba(0,212,255,0.6)'; this.style.transform='translateX(5px)';" onmouseout="this.style.borderColor='rgba(0,212,255,0.2)'; this.style.transform='translateX(0)';" onclick="window.location.href='entity.html?id=${entity.id}'">
                <div style="font-size: 3rem;">${entity.thumbnail}</div>
                <div style="flex: 1;">
                    <h3 style="color: #e0e0f6; font-size: 1.3rem; margin-bottom: 8px;">${entity.name}</h3>
                    <p style="color: #9090a0; font-size: 14px; margin-bottom: 8px;">${entity.category} · ${entity.year}</p>
                    <p style="color: #a0a0b5; font-size: 14px; margin-bottom: 10px;">${entity.desc}</p>
                    <div class="entity-tags">
                        ${entity.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="entity-rating">${stars}</div>
            </div>
        `;
    }).join('');
}

// ========== 切换视图（卡片/列表）==========
function switchView(view) {
    const grid = document.getElementById('entityListGrid');
    const list = document.getElementById('entityListList');
    const buttons = document.querySelectorAll('.view-toggle button');
    
    if (view === 'grid') {
        grid.style.display = 'grid';
        list.style.display = 'none';
        buttons[0].classList.add('active');
        buttons[1].classList.remove('active');
    } else {
        grid.style.display = 'none';
        list.style.display = 'block';
        buttons[0].classList.remove('active');
        buttons[1].classList.add('active');
    }
}

// ========== 显示实体详情 ==========
function showEntityDetail(entityId) {
    window.location.href = `entity.html?id=${entityId}`;
}

// ========== 渲染实体详情页面 ==========
function renderEntityDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const entityId = parseInt(urlParams.get('id'));
    const entity = sampleEntities.find(e => e.id === entityId);
    
    if (!entity) {
        document.getElementById('entityDetail').innerHTML = '<p style="color:#9090a0;text-align:center;">未找到该实体</p>';
        return;
    }
    
    // 更新页面标题
    document.title = `${entity.name} - 赛博方舟`;
    
    const detail = document.getElementById('entityDetail');
    const stars = '★'.repeat(entity.rating) + '☆'.repeat(5 - entity.rating);
    
    detail.innerHTML = `
        <div class="entity-detail-header" style="
            display: flex;
            gap: 40px;
            margin-bottom: 50px;
            background: rgba(15,15,25,0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(0,212,255,0.2);
            border-radius: 20px;
            padding: 40px;
        ">
            <div class="entity-detail-thumbnail" style="
                font-size: 8rem;
                text-align: center;
                min-width: 200px;
            ">${entity.thumbnail}</div>
            <div class="entity-detail-info" style="flex: 1;">
                <h2 class="entity-detail-name" style="
                    font-size: 2.5rem;
                    background: linear-gradient(135deg, #00d4ff, #c9a84c);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 15px;
                ">${entity.name}</h2>
                <div class="entity-detail-meta" style="
                    display: flex;
                    gap: 20px;
                    margin-bottom: 20px;
                    color: #9090a0;
                    font-size: 14px;
                ">
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
                <div class="entity-detail-tags" style="
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-bottom: 20px;
                ">
                    ${entity.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="entity-rating" style="margin-bottom: 1.5rem; font-size: 1.2rem; color: #c9a84c;">${stars}</div>
                <div class="entity-detail-actions" style="display: flex; gap: 15px;">
                    <button class="btn-primary" onclick="alert('收藏功能开发中')" style="
                        padding: 10px 25px;
                        border: none;
                        border-radius: 8px;
                        background: linear-gradient(135deg, #00d4ff, #0099cc);
                        color: #0a0a0f;
                        font-weight: 600;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        transition: all 0.3s ease;
                    ">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        收藏
                    </button>
                    <button class="btn-secondary" onclick="alert('分享功能开发中')" style="
                        padding: 10px 25px;
                        border: 1px solid rgba(0,212,255,0.3);
                        border-radius: 8px;
                        background: transparent;
                        color: #00d4ff;
                        font-weight: 600;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        transition: all 0.3s ease;
                    ">
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
        <div class="entity-detail-body" style="
            background: rgba(15,15,25,0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(0,212,255,0.2);
            border-radius: 20px;
            padding: 40px;
        ">
            <h3 style="
                color: #e0e0f6;
                font-size: 1.8rem;
                margin-bottom: 20px;
                background: linear-gradient(135deg, #00d4ff, #c9a84c);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            ">详细介绍</h3>
            <p style="color: #a0a0b5; font-size: 16px; line-height: 1.8; margin-bottom: 20px;">${entity.desc}</p>
            <p style="color: #9090a0; font-size: 14px; line-height: 1.8; margin-bottom: 20px;">这里是${entity.name}的详细内容介绍。完整版本将包含：</p>
            <ul style="color: #a0a0b5; font-size: 14px; line-height: 1.8; margin-bottom: 30px; padding-left: 20px;">
                <li>完整的背景介绍</li>
                <li>发展历程与演变</li>
                <li>核心价值与意义</li>
                <li>历史影响与评价</li>
                <li>相关资源与延伸阅读</li>
            </ul>
            
            <h3 style="
                color: #e0e0f6;
                font-size: 1.8rem;
                margin-bottom: 20px;
                background: linear-gradient(135deg, #00d4ff, #c9a84c);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            ">精华内容专区</h3>
            <p style="color: #9090a0; font-size: 14px; line-height: 1.8; margin-bottom: 20px;">根据内容类型，这里将展示：</p>
            <ul style="color: #a0a0b5; font-size: 14px; line-height: 1.8; margin-bottom: 30px; padding-left: 20px;">
                <li><strong style="color: #00d4ff;">文本类</strong>：经典段落节选、核心思想摘要</li>
                <li><strong style="color: #00d4ff;">图片类</strong>：高清图片展示、细节放大</li>
                <li><strong style="color: #00d4ff;">音频/视频类</strong>：经典片段预览、精彩片段</li>
                <li><strong style="color: #00d4ff;">书籍类</strong>：原作阅览、章节选读</li>
            </ul>
            
            <h3 style="
                color: #e0e0f6;
                font-size: 1.8rem;
                margin-bottom: 20px;
                background: linear-gradient(135deg, #00d4ff, #c9a84c);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            ">相关推荐</h3>
            <p style="color: #9090a0; font-size: 14px; line-height: 1.8; margin-bottom: 20px;">与${entity.name}相关的其他高价值实体：</p>
            <div style="
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 15px;
                margin-top: 20px;
            ">
                ${sampleEntities.filter(e => e.category === entity.category && e.id !== entity.id).slice(0, 3).map(related => `
                    <div style="
                        background: rgba(15,15,25,0.95);
                        backdrop-filter: blur(20px);
                        border: 1px solid rgba(0,212,255,0.2);
                        border-radius: 12px;
                        padding: 15px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    " onmouseover="this.style.borderColor='rgba(0,212,255,0.6)';" onmouseout="this.style.borderColor='rgba(0,212,255,0.2)';" onclick="window.location.href='entity.html?id=${related.id}'">
                        <div style="font-size: 2rem; margin-bottom: 10px; text-align: center;">${related.thumbnail}</div>
                        <h4 style="color: #e0e0f6; font-size: 1rem; margin-bottom: 5px;">${related.name}</h4>
                        <p style="color: #9090a0; font-size: 12px;">${related.year}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
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
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function showFavorites() {
    alert('收藏夹功能开发中\n\n完整版将展示用户收藏的所有实体。');
}

function showUserPanel() {
    alert('用户面板功能开发中\n\n完整版将支持：\n- 用户登录/注册\n- 个人收藏管理\n- 浏览历史\n- 个性化推荐');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
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

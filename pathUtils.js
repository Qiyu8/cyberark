// 赛博方舟 - 路径工具函数
// 统一处理所有页面 URL 和数据文件路径的构建，消除散落各处的路径拼接逻辑

/**
 * 解析 subSlug，区分普通子分类和嵌套子分类
 * 普通：'painting'         → { parentSubSlug: 'painting', childSlug: '', isNested: false }
 * 嵌套：'painting/renaissance' → { parentSubSlug: 'painting', childSlug: 'renaissance', isNested: true }
 */
function parseSubSlug(subSlug) {
    if (subSlug && subSlug.includes('/')) {
        const idx = subSlug.indexOf('/');
        const parentSubSlug = subSlug.slice(0, idx);
        const childSlug = subSlug.slice(idx + 1);
        return { parentSubSlug, childSlug, isNested: true };
    }
    return { parentSubSlug: subSlug || '', childSlug: '', isNested: false };
}

/**
 * 构建 entity.html 页面 URL
 * @param {string} catSlug
 * @param {string} subSlug  - 可以是 'painting' 或 'painting/renaissance'
 * @param {string} entityFile - 可以是 '001_Mona-Lisa.md' 或 'Renaissance/001_Mona-Lisa.md'
 */
function buildEntityPageUrl(catSlug, subSlug, entityFile) {
    return `entity.html?cat=${catSlug}&sub=${encodeURIComponent(subSlug)}&entity=${encodeURIComponent(entityFile)}`;
}

/**
 * 构建 entity-list.html 页面 URL
 * @param {string} catSlug
 * @param {string} subSlug  - 可以是 'painting' 或 'painting/renaissance'
 */
function buildEntityListUrl(catSlug, subSlug) {
    return `entity-list.html?cat=${catSlug}&sub=${encodeURIComponent(subSlug)}`;
}

/**
 * 构建 rankings.html 页面 URL
 * @param {string} catSlug
 */
function buildRankingsUrl(catSlug) {
    return `rankings.html?cat=${catSlug}`;
}

/**
 * 构建 data/md/... 路径
 *
 * 规则：
 *   普通子分类 + 简单文件名：  data/md/{cat}/{sub}/{file}
 *   嵌套子分类 + 简单文件名：  data/md/{cat}/{parent}/{child}/{file}
 *   嵌套子分类 + 带路径文件名：data/md/{cat}/{parent}/{file}  （file 自带子目录前缀）
 *
 * @param {string} catSlug
 * @param {string} subSlug
 * @param {string} entityFile
 */
function buildMdPath(catSlug, subSlug, entityFile) {
    const { parentSubSlug, childSlug, isNested } = parseSubSlug(subSlug);
    if (isNested) {
        if (entityFile.includes('/')) {
            return `data/md/${catSlug}/${parentSubSlug}/${entityFile}`;
        }
        return `data/md/${catSlug}/${parentSubSlug}/${childSlug}/${entityFile}`;
    }
    return `data/md/${catSlug}/${subSlug}/${entityFile}`;
}

/**
 * 构建 data/entities/... 路径
 *
 * 规则：
 *   普通子分类：                data/entities/{cat}/{sub}.json
 *   嵌套子分类 + 简单文件名：   data/entities/{cat}/{parent}/{child}.json
 *   嵌套子分类 + 带路径文件名： data/entities/{cat}/{parent}/{fileDir}.json
 *
 * @param {string} catSlug
 * @param {string} subSlug
 * @param {string|null} entityFile - 传入时用于推断带路径文件名的情况
 */
function buildEntitiesJsonPath(catSlug, subSlug, entityFile) {
    const { parentSubSlug, childSlug, isNested } = parseSubSlug(subSlug);
    if (isNested) {
        if (entityFile && entityFile.includes('/')) {
            const fileDir = entityFile.split('/').slice(0, -1).join('/');
            return `data/entities/${catSlug}/${parentSubSlug}/${fileDir}.json`;
        }
        return `data/entities/${catSlug}/${parentSubSlug}/${childSlug}.json`;
    }
    return `data/entities/${catSlug}/${subSlug}.json`;
}

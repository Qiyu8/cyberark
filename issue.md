一、高优先级（影响功能/稳定性）

1. 修复损坏的 Python 构建脚本
build.py、generate_all.py、generate_files.py 均存在语法错误和字符串截断。这是最大的技术债务——一旦需要批量生成或更新数据，这些脚本完全不可用。建议：

重写 build.py，职责单一：从 data/md/ 扫描文件，生成 nav-tree.json 和 entities/*.json
用 Python 标准库即可，不需要引入复杂依赖

2. 实现搜索功能
搜索框 UI 已存在，但 performSearch() 未实现。13,780 个实体没有搜索等于废了一半价值。

轻量方案：构建时生成一个扁平的 search-index.json（name + category + subSlug），前端加载后做客户端模糊匹配
无需引入 Elasticsearch，fuse.js（~10KB）足够

3. 分页 / 虚拟滚动
部分 ranking 下实体数量很大（如绘画 104 条），全量渲染无分页会导致 DOM 膨胀。建议：

entity-list.html 加简单分页（每页 24 条）
或用 Intersection Observer 实现懒加载

---


二、中优先级（体验/健壮性）

4. 统一路径处理逻辑
近期 commit 历史显示大量 bug 集中在嵌套目录路径拼接（parentSubSlug、childDirSlug）。根本原因是路径逻辑散落在多处。建议：

在 script.js 中提取一个 buildEntityUrl(cat, sub, filePath) 纯函数，所有地方统一调用
消除 window._cyberArk 这种全局变量传参方式，改用 URL 参数或模块化传递

5. 错误处理
当前 JSON/Markdown 文件缺失时静默失败，用户看到空白页。建议：

fetch 失败时显示友好提示（"内容暂未收录"）
控制台输出具体失败路径，方便调试

6. 硬编码的 featured 实体
script.js 中首页 6 个精选实体是硬编码的。建议移到 data/featured.json，内容更新无需改代码。


---


三、低优先级（长期改善）

7. 无障碍（Accessibility）
分类卡片缺少 aria-label
颜色对比度（深空背景 + 半透明文字）部分区域不达 WCAG AA
键盘导航未测试

8. CSS 变量整理
style.css 1170 行，部分颜色值（如 rgba(0, 212, 255, 0.1)）重复出现而未用变量。建议统一到 :root 变量块。


9. 移动端触摸体验
粒子 canvas 动画在低端手机上可能卡顿，建议检测 prefers-reduced-motion 后禁用。


---


总结

| 优先级 | 问题 | 工作量 |

|--------|------|--------|

| 🔴 高 | 修复构建脚本 | 中 |

| 🔴 高 | 实现搜索 | 中 |

| 🔴 高 | 分页/懒加载 | 小 |

| 🟡 中 | 统一路径函数 | 小 |

| 🟡 中 | 错误处理 | 小 |

| 🟡 中 | featured 数据化 | 小 |

| 🟢 低 | 无障碍 | 大 |

| 🟢 低 | CSS 整理 | 小 |
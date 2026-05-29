#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
赛博方舟网站扩展文件生成脚本
功能：
1. 扩展 script.js（添加40+实体数据）
2. 创建 category.html（分类子页面模板）
3. 创建 entity.html（实体详情页模板）
"""

import os

OUTPUT_DIR = r"D:\qclaw\workspace\cyber-ark"

def write_file(filename, content):“””安全写入文件（UTF-8编码）“”““”
    filepath = os.path.join(OUTPUT_DIR, filename)
    with open(filepath,'w', encoding='utf-8') as f:
        f.write(content)
    print(f"[✅]已生成：{filename}")

def generate_script_js():”“”生成扩展版 script.js“”“”
    content = r"""//赛博方舟CyberArk -主脚本（完整版）
//实现：粒子动画、分类卡片、实体展示、搜索模态框、分类页详情页

//==========全局数据：14大分类==========
const categories = [
    {
        icon:'🏛️',name:'政治',slug:'politics',
        desc:'经典政治理论传世政论著作知名政体体系历史政治里程碑经典政治人物',color:'#4A90D9',
        subcategories:[{name:'经典政治理论',desc:'柏拉图理想国马基雅维利君主论等'},{name:"传世政论著作",desc:"社会契约论资本论等"},{name:"知名政体体系",desc:"民主制共和制君主立宪制等"},{name :"历史政治里程碑，desc："法国大革命美国独立宣言等等}，{ name：“经典政治人物”， desc ： “秦始皇丘吉尔等等}]
     },
     {
         icon："⚔️"， name ： “军事”， slug ： “military”， 
          desc：“经典军事典籍传奇战役顶尖军事思想名将名录传世兵器与军事工程”， color:“#C0392B”, 
           subcategories:[ { name：“传奇战役”，deesc：“滑铁卢战役诺曼底登陆等”}， { name：“顶尖军事思想”， desc ： “孙子兵法克劳塞维茨战争论等”}， { name：“名将名录”， desc ： “拿破仑巴顿隆美尔等”}， { name:“传世兵器与军事工程”,desc:“坦克原子弹导弹防御系统等”}]
      },
  
];

//==========模拟实体数据（40+条）==========
const sampleEntities = [
    //=====文学类=====
   id:1,name:`论语`,category:`文学`,categorySlug:`literature`,
     deesc:`儒家经典记录孔子及其弟子言行中华文明的基石之作。，tags:[`经典`,`哲学`,`儒家`,`中华 `],rating:5featured:truethumbnail:`📖 `year:`公元前551年`
      author:`孔子及其弟子 `,
       dynasty：`春秋时期 `
         },
    
];


console.log('%c赛博方舟|Cyber Ark','font-size :20px ;font-weight :bold ;color:#00d4ff;');console.log('%c人类顶级文明数字载体典藏全球高价值资产','font-size :12px ;color:#9090a0;');
"""
    write_file("script.js",content)

def generate_category_html():”“ ”生成 category.html“”“”
   content = r"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-widthinitial-scale=1.0">
 <title>分类详情 -赛博方舟</title>
 <link rel="stylesheet" href="style.css">
</head>
<body>
<!--导航栏 -->
<nav class="navbar"id ="navbar"></nav>

<!--分类详情区-->
<section class ="category-detail">
<div class ="container"></div></section>

<!--Footer --><footer></footer>

<script src ="script.js"></script >
<script >//渲染分类详情页逻辑 </script ></body ></html >"""
 write_file("category.html ",content )

def generate_entity_html():”“ ” ” ” ” """
     content =r"""<!DOCTYPE html >
<html lang="zh-CN">
<head >
<meta charset ="UTF -8"> 
<meta name ="viewport "content ="width=device-widthinitial-scale=1.o"> 
<title >实体详情 -赛博方舟</title>     
<link rel ="stylesheet "href ="style.css ">   
</head>    
<body>      
 <!--导航栏 -->       
<nav class= "navbar "id= "navbar "> </ nav >

<!--实体详情区-->       
<sectionclass=”entity-detail-page”>     
<divclass=”container”>

</div></section>

<!--Footer-->      
<footer></footer>

<scriptsrc=”script.js”></script>   
<script >/ /渲染实体详情页逻辑 </ / ></body></html >"""
write_file ("entity.html ",content )

if __name__ == "__main__":print("[🚀]开始生扩展到文件...")
                    

import { writeFileSync, mkdirSync } from 'fs';

const outDir = 'C:/Users/Administrator/Desktop/荣郑律师个人网页/articles/';
mkdirSync(outDir, { recursive: true });

function escapeHTML(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// Build a single article
function article(cfg) {
  const nav = `<nav class="nav" id="nav"><div class="nav-inner"><a href="../index.html" class="nav-logo">荣<span>郑</span></a><div class="nav-links"><a href="../index.html">首页</a><a href="../criminal.html">刑事专题</a><a href="../civil.html">民商事专题</a><a href="../index.html#contact">联系</a></div></div></nav>`;

  const header = `<header class="page-header"><div class="breadcrumb"><a href="../index.html">首页</a> &rsaquo; <a href="../${cfg.hubLink}">${cfg.hubName}</a> &rsaquo; ${cfg.title}</div><div class="cat">${cfg.catLabel}</div><h1>${cfg.title}</h1><div class="meta">荣郑律师 &middot; 湖北立丰律师事务所 &middot; 2026年6月</div></header>`;

  const cta = `<section class="cta-box"><div class="cta-inner"><h3>${cfg.ctaTitle}</h3><p>${cfg.ctaDesc}</p><a href="../index.html#contact">立即联系荣郑律师</a></div></section>`;

  const author = `<section class="author-card"><div class="author-inner"><img class="author-photo" src="../photo.jpg" alt="荣郑律师" onerror="this.style.display='none'"><div class="author-info"><h4>荣郑律师</h4><div class="author-title">湖北立丰律师事务所 · 高级合伙人</div><div class="author-bio">西南政法大学法学本科，四川外国语大学英语双学位，执业10年。专注刑事辩护、民商事诉讼、公司股权与并购重组、建设工程与房地产、海事海商、数据合规及银行金融法律事务。湖北省法学会西政法学研究会副秘书长，湖北经视及武汉电视台常年法律嘉宾。</div><div class="author-contact"><span>&#x1F4F1; 15872427052</span><span>&#x1F4E7; rz@lflawyers.com</span><span>&#x1F4CD; 湖北省武汉市</span></div></div></div></section>`;

  const footer = `<footer><div class="f-nav"><a href="../index.html">首页</a><a href="../criminal.html">刑事专题</a><a href="../civil.html">民商事专题</a><a href="../index.html#contact">联系</a></div><p>&copy; 2026 荣郑律师 · 湖北立丰律师事务所</p></footer>`;

  const related = cfg.related ? `<section class="related"><h3>相关文章</h3><div class="related-grid">${cfg.related}</div></section>` : '';

  return `<!DOCTYPE html><html lang="zh-CN">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="description" content="${cfg.desc}荣郑律师，湖北立丰律师事务所高级合伙人，执业10年。">
<meta name="keywords" content="${cfg.kw},荣郑律师,湖北立丰律师事务所">
<meta name="author" content="荣郑律师">
<title>${cfg.title} —— 荣郑律师 | 湖北立丰律师事务所</title>
<style>
  :root{--bg:#fafaf8;--white:#fff;--ink:#111;--ink-soft:#333;--text:#444;--text-muted:#999;--gold:#a0844c;--gold-light:#c4a86c;--rule:#e8e4dc;--rule-light:#f2efe8}
  *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
  body{font-family:"PingFang SC","Microsoft YaHei","Hiragino Sans GB",sans-serif;background:var(--bg);color:var(--text);font-size:15px;line-height:1.85;-webkit-font-smoothing:antialiased}
  a{color:inherit;text-decoration:none}
  .nav{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(255,255,255,.94);backdrop-filter:blur(16px);border-bottom:1px solid var(--rule);transition:transform .35s}
  .nav.hide{transform:translateY(-100%)}
  .nav-inner{max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;padding:0 40px;height:64px}
  .nav-logo{font-family:"Noto Serif SC",serif;font-size:18px;color:var(--ink);letter-spacing:.04em}
  .nav-logo span{color:var(--gold)}
  .nav-links{display:flex;gap:32px;align-items:center}
  .nav-links a{font-size:13px;color:var(--text-muted);letter-spacing:.04em;transition:color .2s}
  .nav-links a:hover{color:var(--ink)}
  .page-header{padding:140px 40px 60px;max-width:860px;margin:0 auto;border-bottom:1px solid var(--rule)}
  .breadcrumb{font-size:12px;color:var(--text-muted);letter-spacing:.04em;margin-bottom:24px}
  .breadcrumb a{color:var(--text-muted)}.breadcrumb a:hover{color:var(--ink)}
  .page-header .cat{font-size:10px;letter-spacing:.2em;color:var(--gold);text-transform:uppercase;margin-bottom:12px}
  .page-header h1{font-family:"Noto Serif SC",serif;font-size:36px;font-weight:500;color:var(--ink);letter-spacing:.02em;margin-bottom:12px;line-height:1.35}
  .page-header .meta{font-size:13px;color:var(--text-muted);letter-spacing:.02em}
  .article-body{max-width:860px;margin:0 auto;padding:48px 40px}
  .article-body h2{font-family:"Noto Serif SC",serif;font-size:22px;font-weight:600;color:var(--ink);margin:40px 0 16px;letter-spacing:.02em}
  .article-body p{margin-bottom:16px;text-indent:2em;font-size:15px;color:var(--text);line-height:2}
  .article-body ul,.article-body ol{margin:12px 0 20px 1.5em;font-size:15px;color:var(--text)}
  .article-body li{margin-bottom:8px;line-height:1.85}
  .article-body strong{color:var(--ink)}
  .author-card{max-width:860px;margin:0 auto 64px;padding:40px 40px 0}
  .author-inner{display:flex;gap:24px;align-items:flex-start;background:var(--white);border:1px solid var(--rule);padding:32px}
  .author-photo{width:80px;height:80px;border-radius:50%;object-fit:cover;flex-shrink:0}
  .author-info h4{font-size:17px;color:var(--ink);margin-bottom:4px}
  .author-info .author-title{font-size:13px;color:var(--text-muted);letter-spacing:.02em;margin-bottom:8px}
  .author-info .author-bio{font-size:13px;color:var(--text-muted);line-height:1.7;margin-bottom:12px}
  .author-info .author-contact{font-size:12px;color:var(--text-muted);letter-spacing:.02em}
  .author-info .author-contact span{margin-right:16px}
  .cta-box{max-width:860px;margin:0 auto 40px;padding:0 40px}
  .cta-inner{background:var(--ink);color:white;padding:36px;text-align:center}
  .cta-inner h3{font-family:"Noto Serif SC",serif;font-size:20px;margin-bottom:10px;letter-spacing:.02em}
  .cta-inner p{font-size:14px;color:rgba(255,255,255,.6);margin-bottom:20px}
  .cta-inner a{display:inline-block;color:var(--ink);background:var(--gold);padding:12px 36px;font-size:14px;letter-spacing:.04em;border-radius:2px;transition:.25s;font-weight:600}
  .cta-inner a:hover{background:var(--gold-light)}
  .related{max-width:860px;margin:0 auto 80px;padding:0 40px}
  .related h3{font-family:"Noto Serif SC",serif;font-size:18px;color:var(--ink);margin-bottom:20px;letter-spacing:.02em}
  .related-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
  .related-card{border:1px solid var(--rule);padding:20px 24px;transition:all .25s;display:block}
  .related-card:hover{border-color:var(--gold)}
  .related-card .rc-tag{font-size:10px;letter-spacing:.12em;color:var(--gold);text-transform:uppercase;margin-bottom:8px}
  .related-card h4{font-size:15px;color:var(--ink);line-height:1.4}
  footer{background:var(--ink);color:rgba(255,255,255,.45);text-align:center;padding:36px;font-size:12px;letter-spacing:.04em}
  footer a{color:var(--gold-light)}
  .f-nav{display:flex;justify-content:center;gap:28px;margin-bottom:16px;flex-wrap:wrap}
  @media(max-width:768px){.page-header h1{font-size:26px}.article-body{padding:32px 20px}.author-inner{flex-direction:column;align-items:center;text-align:center}.related-grid{grid-template-columns:1fr}.cta-inner{padding:24px 20px}}
</style></head><body>${nav}${header}<article class="article-body">${cfg.body}</article>${cta}${author}${related}${footer}
<script>let last=0;window.addEventListener("scroll",function(){var y=window.scrollY;document.getElementById("nav").classList.toggle("hide",y>last&&y>200);last=y});</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"${cfg.title}","description":"${cfg.desc}","author":{"@type":"Attorney","name":"荣郑","jobTitle":"高级合伙人","worksFor":{"@type":"LegalService","name":"湖北立丰律师事务所"},"telephone":"+86-15872427052","email":"rz@lflawyers.com"},"datePublished":"2026-06-14"}</script>
</body></html>`;
}

// Define all articles
const criminal = [
  {
    fn:'zhapianzui-feifa-zhanyou-mudi',
    title:'诈骗罪：非法占有目的的认定与辩护路径',
    catLabel:'Criminal Defense', hubLink:'criminal.html', hubName:'刑事辩护专题',
    desc:'诈骗罪非法占有目的的认定标准与辩护路径，涵盖基本构成、核心辩点、金额压缩策略及程序维度的黄金37天操作指南。',
    kw:'诈骗罪,非法占有目的,刑事辩护,武汉刑事律师',
    ctaTitle:'涉嫌诈骗罪需要专业刑事辩护？', ctaDesc:'无论您是被刑事拘留的当事人还是家属，第一时间寻求专业律师的帮助至关重要。荣郑律师团队将为您提供专业、高效的法律解决方案。',
    body:`
      <h2>一、诈骗罪的基本构成与量刑框架</h2>
      <p>诈骗罪规定于《刑法》第二百六十六条，以非法占有为目的，虚构事实、隐瞒真相，骗取数额较大的公私财物。量刑分为三档：数额较大（三千至一万元以上）处三年以下有期徒刑；数额巨大（三万元至十万元以上）处三年以上十年以下有期徒刑；数额特别巨大（五十万元以上）处十年以上有期徒刑至无期徒刑。湖北省一般以五千元为数额较大起点。</p>
      <h2>二、核心辩点：非法占有目的的否定</h2>
      <p>诈骗罪区别于民事欺诈的关键在于行为人是否具有“非法占有目的”。辩护实务中，否定非法占有目的通常从以下四个维度切入：（1）资金去向——行为人是否将资金用于约定的经营或投资，而非挥霍或逃匿；（2）履约能力——签约时是否具备履约条件，事后经营失败不等于诈骗；（3）还款意愿——是否存在真实的还款行为和计划；（4）逃匿行为——是否存在失联、转移财产。民间借贷型、合作经营型、项目投资型案件极易出现刑民交叉，辩护人应优先从民事法律关系角度论证案件不具刑事违法性。</p>
      <h2>三、金额辩护：压缩指控数额的有效路径</h2>
      <p>诈骗罪以诈骗金额作为核心量刑依据，金额辩护是重中之重。有效路径包括：剔除存在真实交易对价的部分、剔除被害人对资金用途知情同意的资金、剔除用于实际经营的资金、剔除仅有言词证据支撑的金额、对司法会计鉴定提出程序性质疑、以及适用存疑有利于被告人原则对界限不清部分予以扣除。</p>
      <h2>四、程序维度：黄金37天与审前辩护</h2>
      <p>刑事案件的“黄金37天”（拘留至逮捕期间）是争取取保候审和不批捕的最佳时机。如在报捕前发现案件属民事纠纷而非刑事犯罪，应立即提交不予提请批准逮捕的法律意见；如确涉刑事但情节较轻，应在退赃退赔、取得谅解后提交不予批准逮捕的法律意见。审查起诉阶段则以争取不起诉为目标。</p>`,
    related:'<a href="articles/bangxinzui-mingzhi-rensing.html" class="related-card"><div class="rc-tag">Criminal Defense</div><h4>帮信罪：明知的认定与辩护策略</h4></a><a href="articles/qubaohoushen-quanliucheng.html" class="related-card"><div class="rc-tag">Criminal Defense</div><h4>取保候审全流程实务指南</h4></a>'
  },
  {
    fn:'bangxinzui-mingzhi-rensing',
    title:'帮信罪：明知的认定与辩护策略',
    catLabel:'Criminal Defense', hubLink:'criminal.html', hubName:'刑事辩护专题',
    desc:'帮信罪明知认定的法律标准与辩护策略，涵盖立法背景、明知推定反驳、情节严重界分及与上游犯罪共犯的区分。',
    kw:'帮信罪,明知认定,两卡犯罪,武汉刑事律师',
    ctaTitle:'被指控帮信罪？需要专业刑事辩护', ctaDesc:'帮信罪案发量急剧攀升，辩护空间大。尽早委托专业律师介入，争取不起诉或轻判。',
    body:`
      <h2>一、帮信罪的立法背景与案发态势</h2>
      <p>帮信罪规定于《刑法》第二百八十七条之二，系2015年《刑法修正案（九）》新增罪名。近年来案发量急剧攀升，已成为仅次于危险驾驶罪的第二高发罪名。实践中大量案件涉及出租、出售银行卡、电话卡，俗称“两卡”犯罪，被告人多为年轻人，主观恶性普遍较低。</p>
      <h2>二、最核心辩点：“明知”的认定与反驳</h2>
      <p>帮信罪以“明知他人利用信息网络实施犯罪”为主观要件。最高人民法院、最高人民检察院相关司法解释第十一条规定了可以推定明知的七种情形。辩护的核心在于举证推翻“明知”的推定：如系正常市场交易行为且价格未明显偏离、行为人已尽合理审查义务、无证据表明行为人知道对方从事犯罪活动。推定明知的规则允许反证推翻。</p>
      <h2>三、情节严重与情节显著轻微的界分</h2>
      <p>帮信罪以“情节严重”为入罪门槛：为三个以上对象提供帮助、支付结算金额二十万元以上、违法所得一万元以上等。辩护方向包括论证未达情节严重标准，或论证情节显著轻微，争取检察机关作出不起诉决定。</p>
      <h2>四、与上游犯罪共犯的界分——直接决定量刑层级</h2>
      <p>帮信罪与上游犯罪（如诈骗罪）共犯的区分决定法定刑上限。帮信罪法定最高刑为三年，而上游犯罪共犯可能面临十年以上有期徒刑。关键区别在于行为人与上游犯罪人之间是否存在“通谋”——单纯提供技术或支付结算帮助、无通谋的，应认定为帮信罪；事前通谋、分工合作的，可能构成上游犯罪的共犯。</p>`,
    related:'<a href="articles/zhapianzui-feifa-zhanyou-mudi.html" class="related-card"><div class="rc-tag">Criminal Defense</div><h4>诈骗罪：非法占有目的的认定与辩护路径</h4></a><a href="articles/qubaohoushen-quanliucheng.html" class="related-card"><div class="rc-tag">Criminal Defense</div><h4>取保候审全流程实务指南</h4></a>'
  },
  {
    fn:'feifaxishou-gongzhong-cunkuan',
    title:'非法吸收公众存款罪：从犯区分、金额压缩与退赃退赔',
    catLabel:'Criminal Defense', hubLink:'criminal.html', hubName:'刑事辩护专题',
    desc:'非法吸收公众存款罪的四个特征要件审查、主从犯区分策略、金额压缩方法及退赃退赔的协同运用。',
    kw:'非法吸收公众存款,非法集资,退赃退赔,武汉刑事律师',
    ctaTitle:'涉及非法集资案件？需要专业刑事辩护', ctaDesc:'非法吸收公众存款案件涉及金额大、人数多，辩护策略的选择直接决定量刑结果。尽早委托专业律师介入。',
    body:`
      <h2>一、四个特征要件的逐一审查</h2>
      <p>根据《最高人民法院关于审理非法集资刑事案件具体应用法律若干问题的解释》，非法吸收公众存款罪的认定需同时具备四个特征：非法性（未经批准）、公开性（向社会公开宣传）、利诱性（承诺还本付息）、社会性（向不特定对象吸收资金）。辩护人应逐项检验在案证据是否满足全部四个特征，缺少任何一个即不构成本罪。</p>
      <h2>二、主从犯区分：非核心人员的降档辩护</h2>
      <p>非法吸收公众存款案多为共同犯罪，涉案人员层级复杂。对于公司中层管理人员、业务员、客服人员、财务人员等非决策层人员，辩护策略应着重论证其为从犯——其不参与产品设计、不制定融资方案、不掌握资金去向、仅按照上级安排执行具体工作。</p>
      <h2>三、金额压缩与退赃退赔的协同运用</h2>
      <p>非法吸收公众存款罪的核心量刑情节是吸存金额和造成损失金额。金额辩护上应剔除亲友资金（非“不特定对象”）、剔除通过银行等正规渠道融资部分、剔除合法经营收入。退赃退赔方面，根据量刑指导意见，全额退赃退赔并取得谅解的，可以减少基准刑30%-50%。在审查起诉阶段积极退赃退赔还有可能争取到不起诉处理。</p>`,
    related:'<a href="articles/zhapianzui-feifa-zhanyou-mudi.html" class="related-card"><div class="rc-tag">Criminal Defense</div><h4>诈骗罪：非法占有目的的认定与辩护路径</h4></a><a href="articles/bangxinzui-mingzhi-rensing.html" class="related-card"><div class="rc-tag">Criminal Defense</div><h4>帮信罪：明知的认定与辩护策略</h4></a>'
  },
  {
    fn:'weixian-jiashi-zuijia',
    title:'危险驾驶罪（醉驾型）：情节显著轻微的实务运用',
    catLabel:'Criminal Defense', hubLink:'criminal.html', hubName:'刑事辩护专题',
    desc:'2023年醉驾新规核心变化解读，情节显著轻微的适用条件、即使构罪如何争取最轻处理的实务策略。',
    kw:'危险驾驶罪,醉驾,不起诉,武汉刑事律师',
    ctaTitle:'被查到醉驾？需要专业律师评估', ctaDesc:'2023年醉驾新规大幅缩小入罪范围。荣郑律师可帮助您评估是否属于情节显著轻微、争取不起诉处理。',
    body:`
      <h2>一、2023年醉驾新规的核心变化</h2>
      <p>2023年12月，“两高两部”联合发布《关于办理醉酒危险驾驶刑事案件的意见》，对醉驾入刑标准进行了全面调整。核心变化：血液酒精含量不满150毫克/100毫升的，如无从重情节，可以不认为是犯罪；在居民小区、停车场等场所短距离挪车的，一般不作为犯罪处理；紧急送医等情形可认定紧急避险。这一调整大幅缩小了醉驾入罪范围。</p>
      <h2>二、“情节显著轻微”的适用条件</h2>
      <p>根据新意见，以下情形可认定为情节显著轻微、不作为犯罪处理：血液酒精含量不满150毫克/100毫升且无其他从重情节；在居民小区、停车场短距离挪车；紧急送医等紧急避险情形；驾驶摩托车且酒精含量较低未造成实际危害后果等。辩护人应根据具体情形，在侦查阶段即提出不构成犯罪的法律意见，争取早日撤案。</p>
      <h2>三、即使构罪，如何争取最轻处理</h2>
      <p>如醉驾行为确实构成危险驾驶罪，辩护重点转向量刑：酒精含量越低越好（150-180区间仍可争取不起诉或免刑）、无事故无损伤、初犯、认罪认罚等情节综合运用，争取检察机关不起诉或法院免予刑事处罚。</p>`,
    related:'<a href="articles/guyi-shanghai-zhengdang-fangwei.html" class="related-card"><div class="rc-tag">Criminal Defense</div><h4>故意伤害罪：正当防卫与鉴定质证</h4></a><a href="articles/qubaohoushen-quanliucheng.html" class="related-card"><div class="rc-tag">Criminal Defense</div><h4>取保候审全流程实务指南</h4></a>'
  },
  {
    fn:'guyi-shanghai-zhengdang-fangwei',
    title:'故意伤害罪：正当防卫、被害人过错与轻伤鉴定质证',
    catLabel:'Criminal Defense', hubLink:'criminal.html', hubName:'刑事辩护专题',
    desc:'故意伤害案件三重辩护策略：正当防卫认定框架、被害人过错量刑运用、轻伤鉴定意见的技术性质证。',
    kw:'故意伤害罪,正当防卫,轻伤鉴定,武汉刑事律师',
    ctaTitle:'涉及故意伤害案件？需要专业刑事辩护', ctaDesc:'正当防卫的认定直接决定罪与非罪。荣郑律师帮助您梳理证据、构建最佳辩护策略。',
    body:`
      <h2>一、正当防卫辩护的基本框架</h2>
      <p>故意伤害案件中最有力的无罪辩护理由是正当防卫。根据“两高一部”《关于依法适用正当防卫制度的指导意见》，应当立足防卫人防卫时的具体情境，按照社会公众的一般认知依法判断，不应苛求防卫人。辩护要点：证明对方存在不法侵害（先行动手、持续施暴、持械）、防卫行为具有必要性和相当性（不要求绝对对等）、防卫意图而非互殴意图。即使不构成正当防卫，也可论证成立防卫过当实现减轻处罚。</p>
      <h2>二、被害人过错在量刑中的运用</h2>
      <p>即使不能成立正当防卫，被害人存在重大过错的，对被告人量刑有重要影响。被害人先行动手、挑衅、辱骂引发纠纷的，可作为酌定从轻情节。根据量刑指导意见，被害人对犯罪发生有过错的，可以减少基准刑的20%-30%。</p>
      <h2>三、轻伤鉴定意见的技术性质证</h2>
      <p>故意伤害罪以轻伤以上为入罪门槛，鉴定意见的质证是轻伤害案件辩护的核心战场：鉴定机构与鉴定人资质是否完备、鉴定依据的病历资料是否完整真实、鉴定时机是否合适、鉴定标准适用是否正确（《人体损伤程度鉴定标准》）、伤情与行为的因果关系是否唯一。技术性证据的审查能力往往决定了轻伤害案件的根本走向。</p>`,
    related:'<a href="articles/zhapianzui-feifa-zhanyou-mudi.html" class="related-card"><div class="rc-tag">Criminal Defense</div><h4>诈骗罪：非法占有目的的认定与辩护路径</h4></a><a href="articles/zhiwu-qinzhan-zhuti.html" class="related-card"><div class="rc-tag">Criminal Defense</div><h4>职务侵占罪：主体适格性与本单位财物辩护</h4></a>'
  }
];

// Generate first batch: criminal articles 1-5 (skipping qubaohoushen which already exists)
console.log('Generating article pages...');
let count = 0;
for (const a of criminal) {
  const html = article(a);
  const path = outDir + a.fn + '.html';
  writeFileSync(path, html, 'utf8');
  console.log('Created: ' + a.fn + '.html');
  count++;
}

// Also generate the remaining criminal articles (6-8) with minimal content for now
const restCriminal = [
  {fn:'zhiwu-qinzhan-zhuti',title:'职务侵占罪：主体适格性与本单位财物的辩护',catLabel:'Criminal Defense',hubLink:'criminal.html',hubName:'刑事辩护专题',desc:'职务侵占罪的构成要件精析、主体适格性辩护及本单位财物认定。',kw:'职务侵占罪,本单位财物,刑民交叉,武汉刑事律师',ctaTitle:'涉及职务侵占指控？需要专业辩护',ctaDesc:'职务侵占案件刑民交叉特征显著，权属不清则不构成侵占。荣郑律师为您提供专业法律分析。',body:'<h2>一、职务侵占罪的构成要件精析</h2><p>职务侵占罪规定于《刑法》第二百七十一条，系公司、企业或者其他单位的工作人员利用职务上的便利将本单位财物非法占为己有、数额较大的行为。2021年《刑法修正案（十一）》将量刑调整为三档：数额较大（六万元以上）处三年以下有期徒刑；数额巨大（一百万元以上）处三年以上十年以下有期徒刑；数额特别巨大处十年以上至无期徒刑。</p><h2>二、主体辩护：是否属于本单位工作人员</h2><p>职务侵占罪的主体要件要求行为人系本单位工作人员。劳动关系的存在是基础——劳务关系或合作关系中的争议属民事纠纷，不构成本罪。辩护人应仔细审查劳动合同、社保缴纳记录、工资发放记录及实际工作内容等客观证据。</p><h2>三、客体辩护：本单位财物的认定</h2><p>争议最大的辩护领域是本单位财物的认定。在公司治理不规范、股东个人财产与公司财产混同时，行为性质往往属于民事纠纷而非职务侵占。核心逻辑是“权属不清则不构成侵占”。</p>',related:'<a href="articles/guyi-shanghai-zhengdang-fangwei.html" class="related-card"><div class="rc-tag">Criminal Defense</div><h4>故意伤害罪：正当防卫与鉴定质证</h4></a><a href="articles/feifajingying-koudaizui.html" class="related-card"><div class="rc-tag">Criminal Defense</div><h4>非法经营罪：口袋罪的限缩辩护</h4></a>'},
  {fn:'kaisheduchang-wangluo-daili',title:'开设赌场罪：网络赌场与代理模式的认定边界',catLabel:'Criminal Defense',hubLink:'criminal.html',hubName:'刑事辩护专题',desc:'开设赌场罪网络代理与普通玩家的界分标准、赌资数额的计算与质证。',kw:'开设赌场罪,网络赌博,代理认定,武汉刑事律师',ctaTitle:'涉及开设赌场罪？需要专业辩护',ctaDesc:'代理还是玩家？这一区分直接决定罪与非罪。荣郑律师为您精准分析案件定性。',body:'<h2>一、开设赌场罪的基本构成与量刑框架</h2><p>开设赌场罪规定于《刑法》第三百零三条第二款，法定刑为五年以下有期徒刑；情节严重的处五年以上十年以下有期徒刑。网上开设赌场共同犯罪中，不同层级的代理、技术人员、财务人员等量刑差异极大。</p><h2>二、核心辩点：代理还是玩家？</h2><p>网络赌博案件中，代理与普通玩家的界分直接决定罪与非罪。代理的核心特征是“以营利为目的为赌博网站担任代理并接受投注”。如果行为人仅提供赌博链接、非以营利为目的、无下级代理、非专职人员，则可能不构成开设赌场罪而仅构成赌博违法行为。</p><h2>三、赌资数额的认定与质证</h2><p>开设赌场情节严重的认定通常以赌资数额为核心标准。辩护要点包括：银行流水中多账户之间的反复流转是否被重复累计；投注金额还是净输赢金额；行为人账户中的非赌博资金是否被错误认定为赌资等。</p>',related:'<a href="articles/bangxinzui-mingzhi-rensing.html" class="related-card"><div class="rc-tag">Criminal Defense</div><h4>帮信罪：明知的认定与辩护策略</h4></a><a href="articles/feifajingying-koudaizui.html" class="related-card"><div class="rc-tag">Criminal Defense</div><h4>非法经营罪：口袋罪的限缩辩护</h4></a>'},
  {fn:'feifajingying-koudaizui',title:'非法经营罪：口袋罪的限缩辩护与行政许可辨析',catLabel:'Criminal Defense',hubLink:'criminal.html',hubName:'刑事辩护专题',desc:'非法经营罪的规范结构与口袋化趋势、违反国家规定与部门规章的区分。',kw:'非法经营罪,国家规定,行政许可,武汉刑事律师',ctaTitle:'被指控非法经营罪？需要专业辩护',ctaDesc:'口袋罪往往突破罪刑法定边界。荣郑律师帮助您识别指控是否超越“国家规定”的法定范围。',body:'<h2>一、非法经营罪的规范结构与口袋化趋势</h2><p>非法经营罪规定于《刑法》第二百二十五条，以列举加兜底的方式规定了四种行为类型。由于兜底条款的存在，该罪近年来出现了明显的口袋化趋势。辩护的核心任务就是严守罪刑法定原则，将不符合明确列举类型的行为排除在本罪之外。</p><h2>二、核心辩点：违反的是国家规定还是部门规章？</h2><p>非法经营罪以“违反国家规定”为前置条件。《刑法》第九十六条规定，国家规定仅指全国人大及其常委会制定的法律和决定，以及国务院制定的行政法规。部门规章、地方性法规不属国家规定。如果指控所依据的是部门规章而非法律或行政法规，则该指控的前置违法性条件不成立。</p><h2>三、行政许可与特许经营的区分</h2><p>非法经营罪中未经许可的认定，需区分普通行政许可和特许经营许可。大部分违反普通行政许可的行为不构成本罪。只有在相关法律或行政法规明确将特定行业纳入特许经营制度且行为人未取得特许许可时，才可能构成本罪。</p>',related:'<a href="articles/kaisheduchang-wangluo-daili.html" class="related-card"><div class="rc-tag">Criminal Defense</div><h4>开设赌场罪：网络代理认定</h4></a><a href="articles/zhiwu-qinzhan-zhuti.html" class="related-card"><div class="rc-tag">Criminal Defense</div><h4>职务侵占罪：主体适格性辩护</h4></a>'}
];

for (const a of restCriminal) {
  const html = article(a);
  writeFileSync(outDir + a.fn + '.html', html, 'utf8');
  console.log('Created: ' + a.fn + '.html');
  count++;
}

// Civil articles
const civil = [
  {fn:'hetongjiufen-xiaoli-weiyue-jiechu',title:'合同纠纷：效力认定、违约救济与合同解除的实务要点',catLabel:'Civil & Commercial',hubLink:'civil.html',hubName:'民商事诉讼专题',desc:'合同纠纷三层次审查框架、违约金调低的举证策略、合同解除权的行使方式与除斥期间时效陷阱。',kw:'合同纠纷,违约金调整,合同解除,武汉民商事律师',ctaTitle:'遇到合同纠纷？需要专业法律支持',ctaDesc:'合同纠纷是民商事诉讼第一大案由。荣郑律师帮助您精准分析合同效力、计算违约金、把握解除权时效。',body:'<h2>一、合同效力争议的三层次审查框架</h2><p>合同纠纷案件中，首当其冲的往往是合同效力问题。审查应遵循三个层次：第一层次是合同是否成立——要约、承诺、意思表示一致是否存在；第二层次是合同是否生效——是否存在附条件或附期限的约定；第三层次是合同是否无效——是否违反《民法典》第一百五十三条的效力性强制性规定。实务中，违反管理性强制性规定的合同不当然无效，只有违反效力性强制性规定的合同才归于无效。</p><h2>二、违约金调整：过高的认定与举证策略</h2><p>违约金调整是合同纠纷中的高频争议点。《民法典》第五百八十五条及最高人民法院合同编通则司法解释第六十五条规定，约定的违约金超过实际损失的30%即可认定为过分高于造成的损失。守约方应在缔约阶段即对违约金条款给予足够重视，并在履行过程中注意保全损失证据。</p><h2>三、合同解除权的行使与时效陷阱</h2><p>《民法典》第五百六十五条规定，解除权人应当通知对方，合同自通知到达对方时解除。律师建议：合同解除应以书面方式通知（律师函、EMS邮寄），保留签收记录。解除权的行使期限为自知道或应当知道解除事由之日起一年，逾期消灭——此期间为除斥期间不适用中止中断，极易因拖延而丧失。</p>',related:'<a href="articles/gongsi-zhili-gudong-quanyi.html" class="related-card"><div class="rc-tag">Civil & Commercial</div><h4>公司治理与股权纠纷：股东权益保护</h4></a><a href="articles/jianshe-gongcheng-youxian-shouchang.html" class="related-card"><div class="rc-tag">Civil & Commercial</div><h4>建设工程纠纷：价款优先受偿权</h4></a>'},
  {fn:'gongsi-zhili-gudong-quanyi',title:'公司治理与股权纠纷：股东权益保护的实务路径',catLabel:'Civil & Commercial',hubLink:'civil.html',hubName:'民商事诉讼专题',desc:'2024年新公司法背景下股东权益保护加强、股东知情权之诉操作要点、大股东滥用控制权的救济路径。',kw:'公司治理,股权纠纷,股东知情权,武汉民商事律师',ctaTitle:'股东权益被侵害？需要专业律师介入',ctaDesc:'新公司法为小股东提供了更强保护。荣郑律师帮助您通过知情权之诉等途径维权。',body:'<h2>一、2024年新公司法对股东权益保护的加强</h2><p>2024年7月1日起施行的新《公司法》在股东权益保护方面有多项重要修订：完善了股东知情权制度（股东可查阅会计凭证）、强化了控股股东与实际控制人的信义义务、增加了双重股东代表诉讼制度、优化了公司决议效力瑕疵的司法救济路径。</p><h2>二、股东知情权之诉：查账是维权的第一步</h2><p>小股东面对大股东的信息封锁，最有效的第一步是提起股东知情权之诉。根据新《公司法》第五十七条，股东有权查阅会计凭证。股东应先书面申请查阅并说明目的，公司拒绝或十五日内不予答复后方可起诉。</p><h2>三、大股东滥用控制权的救济路径</h2><p>大股东滥用控制权损害公司或小股东利益的，救济路径包括：主张大股东违反信义义务承担赔偿责任、申请撤销滥用控制权作出的决议、在极端情形下申请司法解散。策略上，信息披露+索赔组合拳效果最佳。</p>',related:'<a href="articles/hetongjiufen-xiaoli-weiyue-jiechu.html" class="related-card"><div class="rc-tag">Civil & Commercial</div><h4>合同纠纷：效力认定与违约救济</h4></a><a href="articles/minjian-jiedai-lilv-zhaiwu.html" class="related-card"><div class="rc-tag">Civil & Commercial</div><h4>民间借贷：利率保护与虚假诉讼</h4></a>'},
  {fn:'jianshe-gongcheng-youxian-shouchang',title:'建设工程施工合同纠纷：价款优先受偿权与质量争议应对',catLabel:'Civil & Commercial',hubLink:'civil.html',hubName:'民商事诉讼专题',desc:'建设工程价款优先受偿权的行使条件与期限、工程质量反诉的应对策略、实际施工人的权利主张。',kw:'建设工程纠纷,优先受偿权,实际施工人,武汉民商事律师',ctaTitle:'被拖欠工程款？需要主张优先受偿权',ctaDesc:'建设工程价款优先受偿权是承包人的超级武器，但行使期限仅18个月。荣郑律师帮助您把握时效。',body:'<h2>一、建设工程价款优先受偿权：承包人的超级武器</h2><p>《民法典》第八百零七条规定了建设工程价款优先受偿权——发包人未按约定支付价款的，承包人有权就该建设工程折价或拍卖的价款优先受偿。该权利优先于抵押权和其他债权。实务中需特别注意：行使期限为自发包人应当给付建设工程价款之日起十八个月内，逾期消灭。</p><h2>二、工程质量反诉的应对策略</h2><p>发包方在面对承包方索要工程款的诉讼时最常用的对抗策略是提起工程质量反诉。应对思路：核实工程是否已竣工验收合格；区分质量问题的性质（主体结构问题vs一般瑕疵）；审查发包方是否已实际使用工程（如已使用视为认可）。</p><h2>三、实际施工人的权利主张</h2><p>实际施工人向发包人主张工程款的权利依据为建工司法解释（一）第四十三条。权利范围仅限于工程价款，不包括违约金和利息。</p>',related:'<a href="articles/hetongjiufen-xiaoli-weiyue-jiechu.html" class="related-card"><div class="rc-tag">Civil & Commercial</div><h4>合同纠纷：效力认定与违约救济</h4></a><a href="articles/minjian-jiedai-lilv-zhaiwu.html" class="related-card"><div class="rc-tag">Civil & Commercial</div><h4>民间借贷：利率保护与虚假诉讼</h4></a>'},
  {fn:'minjian-jiedai-lilv-zhaiwu',title:'民间借贷纠纷：利率保护、夫妻共同债务与虚假诉讼识别',catLabel:'Civil & Commercial',hubLink:'civil.html',hubName:'民商事诉讼专题',desc:'民间借贷利率保护上限变化、夫妻共同债务的认定标准与债权保障、虚假诉讼的识别特征与应对策略。',kw:'民间借贷,利率保护,夫妻共同债务,武汉民商事律师',ctaTitle:'有借贷纠纷？需要专业法律意见',ctaDesc:'民间借贷是案发量最大的单一民事案由。荣郑律师帮助您梳理利率保护边界、识别虚假诉讼风险。',body:'<h2>一、利率保护上限的变化与适用</h2><p>民间借贷利率保护上限经历了从两线三区到一年期LPR四倍的变化。根据最高人民法院民间借贷司法解释（2020年第二次修正）第二十五条，双方约定的利率超过合同成立时一年期LPR四倍的，人民法院不予支持。利率上限按合同成立时而非起诉时的LPR计算。</p><h2>二、夫妻共同债务的认定标准</h2><p>夫妻共同债务的认定依据是《民法典》第一千零六十四条。出借人如欲主张夫妻共同债务，应在借款时即要求夫妻双方共同签署借款合同——这是成本最低、效果最好的债权保障手段。</p><h2>三、虚假诉讼的识别与应对</h2><p>民间借贷是虚假诉讼的高发领域。常见特征：原被告之间存在亲属或关联企业关系；大额借款仅有借条而无转账凭证。如代理被告方，应申请法院调取双方银行流水审查资金走向、申请笔迹形成时间鉴定。虚假诉讼一经查实，参与人可能面临罚款、拘留乃至刑事追究。</p>',related:'<a href="articles/hunyin-caichan-jicheng.html" class="related-card"><div class="rc-tag">Civil & Commercial</div><h4>婚姻财产与继承：分割赠与遗嘱</h4></a><a href="articles/laodong-zhengyi-jiechu-buchang.html" class="related-card"><div class="rc-tag">Civil & Commercial</div><h4>劳动争议：认定解除与社保争议</h4></a>'},
  {fn:'hunyin-caichan-jicheng',title:'婚姻财产与继承纠纷：财产分割、赠与撤销与遗嘱效力',catLabel:'Civil & Commercial',hubLink:'civil.html',hubName:'民商事诉讼专题',desc:'夫妻共同财产分割高频争议、忠诚协议效力认定、遗嘱形式要件的满足与多份遗嘱效力优先规则。',kw:'婚姻财产,离婚分割,遗嘱效力,武汉民商事律师',ctaTitle:'面临婚姻财产或继承纠纷？需要专业律师',ctaDesc:'家事纠纷兼具法律与情感双重复杂性。荣郑律师帮助您理清财产归属、确保遗嘱效力。',body:'<h2>一、夫妻共同财产分割的实务要点</h2><p>离婚财产分割的核心是区分夫妻共同财产与个人财产。高频争议：婚前一方支付首付、婚后共同还贷的房产——共同还贷部分及其对应增值属夫妻共同财产；有限公司股权的分割涉及其他股东优先购买权，法院通常不直接判分割股权而采取折价补偿方式。</p><h2>二、夫妻财产约定与赠与撤销</h2><p>夫妻之间赠与房产在变更登记之前赠与人享有任意撤销权。实务中最具争议的是忠诚协议和净身出户约定的效力：各地法院在效力认定和裁判尺度上存在明显差异。建议此类协议务必由专业律师起草。</p><h2>三、遗嘱形式要件与效力争议</h2><p>《民法典》下，自书遗嘱须亲笔书写、签名并注明年月日（缺一不可）；打印遗嘱须遗嘱人和见证人在每一页签名；公证遗嘱不再具有最高效力——多份遗嘱并存时以最后一份有效遗嘱为准。</p>',related:'<a href="articles/minjian-jiedai-lilv-zhaiwu.html" class="related-card"><div class="rc-tag">Civil & Commercial</div><h4>民间借贷：利率保护与虚假诉讼</h4></a><a href="articles/laodong-zhengyi-jiechu-buchang.html" class="related-card"><div class="rc-tag">Civil & Commercial</div><h4>劳动争议：认定解除与社保争议</h4></a>'},
  {fn:'laodong-zhengyi-jiechu-buchang',title:'劳动争议：劳动关系认定、解除补偿与社保争议的实务要点',catLabel:'Civil & Commercial',hubLink:'civil.html',hubName:'民商事诉讼专题',desc:'劳动关系实质重于形式的认定标准、违法解除劳动合同的认定与救济、社保争议的权利救济路径。',kw:'劳动争议,劳动关系认定,违法解除,武汉民商事律师',ctaTitle:'遭遇不公解雇或劳动纠纷？需要专业代理',ctaDesc:'劳动案件高频高发。荣郑律师帮助您认定劳动关系、计算解除补偿、维护合法权益。',body:'<h2>一、劳动关系认定的实质标准</h2><p>劳动关系是劳动法体系的基础概念。认定劳动关系采用实质重于形式原则，依据原劳动和社会保障部《关于确立劳动关系有关事项的通知》。劳动合同不是认定劳动关系的唯一依据——无合同但具备实质三要素的，仍然成立事实劳动关系。外卖骑手、网约车司机等新业态劳动者的劳动关系认定是近年来的热点争议。</p><h2>二、违法解除劳动合同的认定与救济</h2><p>用人单位需举证解除事由的存在且程序合法——已通知工会、已送达解除通知。违法解除的，根据《劳动合同法》第四十八条，劳动者可选择要求继续履行合同或主张赔偿金（经济补偿标准的二倍）。</p><h2>三、社保争议的权利救济</h2><p>自愿放弃社保协议不能免除用人单位的法定缴纳义务。但劳动者已明确书面自愿放弃且获得了一定补偿的情况下，再以未缴纳社保为由主张被迫解除并要求经济补偿，部分法院会基于诚信原则不予支持。</p>',related:'<a href="articles/hunyin-caichan-jicheng.html" class="related-card"><div class="rc-tag">Civil & Commercial</div><h4>婚姻财产与继承：分割赠与遗嘱</h4></a><a href="articles/qinquan-zeren-guocuo-peichang.html" class="related-card"><div class="rc-tag">Civil & Commercial</div><h4>侵权责任：过错认定与损害赔偿</h4></a>'},
  {fn:'qinquan-zeren-guocuo-peichang',title:'侵权责任纠纷：过错认定、损害赔偿与举证责任分配',catLabel:'Civil & Commercial',hubLink:'civil.html',hubName:'民商事诉讼专题',desc:'侵权责任三重归责体系、人身及财产损害赔偿的范围与计算、特殊侵权领域高频争议的举证规则。',kw:'侵权责任,过错认定,损害赔偿,武汉民商事律师',ctaTitle:'遭遇人身或财产损害？需要专业律师评估',ctaDesc:'侵权案件归责原则决定举证责任分配。荣郑律师帮助您准确识别案件类型、计算赔偿范围。',body:'<h2>一、侵权责任的三重归责体系</h2><p>《民法典》侵权责任编构建了过错责任、过错推定责任和无过错责任三重归责体系。过错责任是原则，由原告举证被告存在过错；过错推定责任实行举证责任倒置；无过错责任不以过错为要件。准确识别案件适用的归责原则是侵权诉讼的第一步。</p><h2>二、损害赔偿的范围与计算</h2><p>人身损害赔偿根据《民法典》第一千一百七十九条，赔偿范围包括医疗费、护理费、交通费、营养费、住院伙食补助费、误工费、残疾赔偿金、死亡赔偿金等。财产损害赔偿遵循填平原则。精神损害赔偿需达到严重精神损害标准。</p><h2>三、特殊侵权领域的高频争议</h2><p>实务中高频的特殊侵权案件类型包括：机动车交通事故责任、医疗损害责任、提供劳务者受害责任、违反安全保障义务责任。每个领域都有特定的举证规则和抗辩方向，建议当事人尽早咨询专业律师确定诉讼策略。</p>',related:'<a href="articles/laodong-zhengyi-jiechu-buchang.html" class="related-card"><div class="rc-tag">Civil & Commercial</div><h4>劳动争议：认定解除与社保争议</h4></a><a href="articles/hetongjiufen-xiaoli-weiyue-jiechu.html" class="related-card"><div class="rc-tag">Civil & Commercial</div><h4>合同纠纷：效力认定与违约救济</h4></a>'}
];

for (const a of civil) {
  const html = article(a);
  writeFileSync(outDir + a.fn + '.html', html, 'utf8');
  console.log('Created: ' + a.fn + '.html');
  count++;
}

console.log('\\nTotal: ' + count + ' article pages generated.');

import { readFileSync, writeFileSync, readdirSync } from 'fs';

const dir = 'C:/Users/Administrator/Desktop/荣郑律师个人网页/articles/';
const files = readdirSync(dir).filter(f => f.endsWith('.html'));

const map = {
  'zhapianzui-feifa-zhanyou-mudi.html': [
    {u:'articles/bangxinzui-mingzhi-rensing.html',t:'Criminal Defense',h:'帮信罪：明知的认定与辩护策略'},
    {u:'articles/qubaohoushen-quanliucheng.html',t:'Criminal Defense',h:'取保候审全流程实务指南'},
    {u:'articles/feifaxishou-gongzhong-cunkuan.html',t:'Criminal Defense',h:'非法吸收公众存款罪：从犯区分与退赃退赔'}
  ],
  'bangxinzui-mingzhi-rensing.html': [
    {u:'articles/zhapianzui-feifa-zhanyou-mudi.html',t:'Criminal Defense',h:'诈骗罪：非法占有目的的认定与辩护路径'},
    {u:'articles/kaisheduchang-wangluo-daili.html',t:'Criminal Defense',h:'开设赌场罪：网络代理与玩家界分'},
    {u:'articles/qubaohoushen-quanliucheng.html',t:'Criminal Defense',h:'取保候审全流程实务指南'}
  ],
  'feifaxishou-gongzhong-cunkuan.html': [
    {u:'articles/zhapianzui-feifa-zhanyou-mudi.html',t:'Criminal Defense',h:'诈骗罪：非法占有目的的认定与辩护路径'},
    {u:'articles/bangxinzui-mingzhi-rensing.html',t:'Criminal Defense',h:'帮信罪：明知的认定与辩护策略'},
    {u:'articles/feifajingying-koudaizui.html',t:'Criminal Defense',h:'非法经营罪：口袋罪的限缩辩护'}
  ],
  'weixian-jiashi-zuijia.html': [
    {u:'articles/guyi-shanghai-zhengdang-fangwei.html',t:'Criminal Defense',h:'故意伤害罪：正当防卫与鉴定质证'},
    {u:'articles/qubaohoushen-quanliucheng.html',t:'Criminal Defense',h:'取保候审全流程实务指南'}
  ],
  'guyi-shanghai-zhengdang-fangwei.html': [
    {u:'articles/zhiwu-qinzhan-zhuti.html',t:'Criminal Defense',h:'职务侵占罪：主体适格性与本单位财物辩护'},
    {u:'articles/weixian-jiashi-zuijia.html',t:'Criminal Defense',h:'危险驾驶罪：情节显著轻微'}
  ],
  'zhiwu-qinzhan-zhuti.html': [
    {u:'articles/guyi-shanghai-zhengdang-fangwei.html',t:'Criminal Defense',h:'故意伤害罪：正当防卫与鉴定质证'},
    {u:'articles/feifajingying-koudaizui.html',t:'Criminal Defense',h:'非法经营罪：口袋罪的限缩辩护'},
    {u:'articles/gongsi-zhili-gudong-quanyi.html',t:'Civil & Commercial',h:'公司治理与股权纠纷：股东权益保护'}
  ],
  'kaisheduchang-wangluo-daili.html': [
    {u:'articles/bangxinzui-mingzhi-rensing.html',t:'Criminal Defense',h:'帮信罪：明知的认定与辩护策略'},
    {u:'articles/feifajingying-koudaizui.html',t:'Criminal Defense',h:'非法经营罪：口袋罪的限缩辩护'}
  ],
  'feifajingying-koudaizui.html': [
    {u:'articles/kaisheduchang-wangluo-daili.html',t:'Criminal Defense',h:'开设赌场罪：网络代理认定'},
    {u:'articles/zhiwu-qinzhan-zhuti.html',t:'Criminal Defense',h:'职务侵占罪：主体适格性辩护'},
    {u:'articles/hetongjiufen-xiaoli-weiyue-jiechu.html',t:'Civil & Commercial',h:'合同纠纷：效力认定与违约救济'}
  ],
  'qubaohoushen-quanliucheng.html': [
    {u:'articles/zhapianzui-feifa-zhanyou-mudi.html',t:'Criminal Defense',h:'诈骗罪：非法占有目的的认定与辩护路径'},
    {u:'articles/bangxinzui-mingzhi-rensing.html',t:'Criminal Defense',h:'帮信罪：明知的认定与辩护策略'},
    {u:'articles/weixian-jiashi-zuijia.html',t:'Criminal Defense',h:'危险驾驶罪：情节显著轻微'}
  ],
  'hetongjiufen-xiaoli-weiyue-jiechu.html': [
    {u:'articles/gongsi-zhili-gudong-quanyi.html',t:'Civil & Commercial',h:'公司治理与股权纠纷：股东权益保护'},
    {u:'articles/jianshe-gongcheng-youxian-shouchang.html',t:'Civil & Commercial',h:'建设工程纠纷：价款优先受偿权'},
    {u:'articles/minjian-jiedai-lilv-zhaiwu.html',t:'Civil & Commercial',h:'民间借贷：利率保护与虚假诉讼'}
  ],
  'gongsi-zhili-gudong-quanyi.html': [
    {u:'articles/hetongjiufen-xiaoli-weiyue-jiechu.html',t:'Civil & Commercial',h:'合同纠纷：效力认定与违约救济'},
    {u:'articles/minjian-jiedai-lilv-zhaiwu.html',t:'Civil & Commercial',h:'民间借贷：利率保护与虚假诉讼'},
    {u:'articles/zhiwu-qinzhan-zhuti.html',t:'Criminal Defense',h:'职务侵占罪：主体适格性辩护'}
  ],
  'jianshe-gongcheng-youxian-shouchang.html': [
    {u:'articles/hetongjiufen-xiaoli-weiyue-jiechu.html',t:'Civil & Commercial',h:'合同纠纷：效力认定与违约救济'},
    {u:'articles/haishang-huoyun-chengyunren-zeren.html',t:'Maritime Law',h:'海上货物运输：承运人责任与免责抗辩'}
  ],
  'minjian-jiedai-lilv-zhaiwu.html': [
    {u:'articles/hunyin-caichan-jicheng.html',t:'Civil & Commercial',h:'婚姻财产与继承：分割赠与遗嘱'},
    {u:'articles/laodong-zhengyi-jiechu-buchang.html',t:'Civil & Commercial',h:'劳动争议：认定解除与社保争议'},
    {u:'articles/hetongjiufen-xiaoli-weiyue-jiechu.html',t:'Civil & Commercial',h:'合同纠纷：效力认定与违约救济'}
  ],
  'hunyin-caichan-jicheng.html': [
    {u:'articles/minjian-jiedai-lilv-zhaiwu.html',t:'Civil & Commercial',h:'民间借贷：利率保护与虚假诉讼'},
    {u:'articles/laodong-zhengyi-jiechu-buchang.html',t:'Civil & Commercial',h:'劳动争议：认定解除与社保争议'}
  ],
  'laodong-zhengyi-jiechu-buchang.html': [
    {u:'articles/hunyin-caichan-jicheng.html',t:'Civil & Commercial',h:'婚姻财产与继承：分割赠与遗嘱'},
    {u:'articles/qinquan-zeren-guocuo-peichang.html',t:'Civil & Commercial',h:'侵权责任：过错认定与损害赔偿'}
  ],
  'qinquan-zeren-guocuo-peichang.html': [
    {u:'articles/laodong-zhengyi-jiechu-buchang.html',t:'Civil & Commercial',h:'劳动争议：认定解除与社保争议'},
    {u:'articles/hetongjiufen-xiaoli-weiyue-jiechu.html',t:'Civil & Commercial',h:'合同纠纷：效力认定与违约救济'}
  ],
  'haishang-huoyun-chengyunren-zeren.html': [
    {u:'articles/hetongjiufen-xiaoli-weiyue-jiechu.html',t:'Civil & Commercial',h:'合同纠纷：效力认定与违约救济'},
    {u:'articles/jianshe-gongcheng-youxian-shouchang.html',t:'Civil & Commercial',h:'建设工程纠纷：价款优先受偿权'}
  ]
};

let updated = 0;
for (const [fn, links] of Object.entries(map)) {
  const path = dir + fn;
  if (!files.includes(fn)) { console.log('SKIP: ' + fn); continue; }

  let html = readFileSync(path, 'utf8');
  const cards = links.map(l =>
    '<a href="' + l.u + '" class="related-card"><div class="rc-tag">' + l.t + '</div><h4>' + l.h + '</h4></a>'
  ).join('');

  const newSection = '<section class="related"><h3>相关文章</h3><div class="related-grid">' + cards + '</div></section>';
  html = html.replace(/<section class="related">[\s\S]*?<\/section>/, newSection);
  writeFileSync(path, html, 'utf8');
  console.log('OK: ' + fn + ' -> ' + links.length + ' links');
  updated++;
}
console.log('\nUpdated ' + updated + ' articles.');

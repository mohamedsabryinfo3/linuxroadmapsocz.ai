/* Linux → SOC — CCNA-to-SOC design logic applied to the Linux Roadmap curriculum data. */
var C={
'TananyAcademy':['Tanany · Linux Admin','#0f8a6b'],
'Abdallah Al-Nuaimy':['عبدالله النعيمي','#1c6dd0'],
'Security Jordan':['Security Jordan','#7b3fc4'],
'قناة صحيح':['قناة صحيح · هكر أخلاقي','#b0306a'],
'Ahmed Eid':['Ahmed Eid · Windows','#b8860b'],
'Boot2Root':['Boot2Root · SIEM/EDR','#2c3e91'],
'DefensiveHub':['DefensiveHub · SOC','#0e8fa6'],
'شرح عربي – فيديو تعليمي':['شرح عربي – MITRE','#c0392b'],
'MITRE Engenuity':['MITRE Engenuity','#12a150'],
'Microsoft Learn':['Microsoft Learn','#1c6dd0'],
'MITRE + Microsoft Learn':['MITRE + Microsoft Learn','#2c3e91'],
'Microsoft Learn / Splunk':['Microsoft Learn / Splunk','#b8860b'],
'CISA / NIST':['CISA / NIST','#c0392b'],
'Microsoft Learn / CISA':['Microsoft Learn / CISA','#0e8fa6'],
'Sigma / MITRE / SIEM':['Sigma / MITRE / SIEM','#7b3fc4'],
'Wazuh Documentation + تطبيق ذاتي':['Wazuh Docs + تطبيق','#0f8a6b'],
'تطبيق ذاتي بإرشاد الخطة':['تطبيق ذاتي بإرشاد الخطة','#6b7a99'],
'تطبيق ذاتي':['تطبيق ذاتي','#6b7a99'],
'تطبيق ذاتي + Microsoft Learn':['تطبيق ذاتي + MS Learn','#6b7a99'],
'تطبيق ذاتي – Wazuh / Sysmon':['تطبيق ذاتي – Wazuh/Sysmon','#6b7a99'],
'تطبيق ذاتي – Windows Logs / Sysmon':['تطبيق ذاتي – Win Logs','#6b7a99'],
'تطبيق ذاتي – Wazuh / EDR':['تطبيق ذاتي – Wazuh/EDR','#6b7a99'],
'تطبيق ذاتي – Active Directory Logs':['تطبيق ذاتي – AD Logs','#6b7a99'],
'تطبيق ذاتي – Wireshark / DNS / Firewall':['تطبيق ذاتي – Wireshark','#6b7a99'],
'مشروع تطبيقي مستقل':['مشروع تطبيقي مستقل','#e8590c']
};
var K={m:'مطلوب',s:'اختياري / مراجعة'};
var PC=['#6b7a99','#1c6dd0','#0f8a6b','#7b3fc4','#e8590c','#b8860b','#b0306a','#c0392b','#2c3e91','#12a150','#0e8fa6','#6b7a99','#1c6dd0','#7b3fc4','#e8590c','#12a150'];
var TT={video:'فيديو',reading:'قراءة',lab:'لاب عملي'};
var DURUNK=['غير موثقة','غير مسجلة','افتح المصدر للتحقق','تحقق من يوتيوب'];
var $=function(i){return document.getElementById(i)};
var esc=function(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
var S={},fk='all',fc='all',hd=false,q='';
try{S=JSON.parse(localStorage.getItem('lsocp')||'{}')}catch(e){}
function save(){try{localStorage.setItem('lsocp',JSON.stringify(S))}catch(e){}}
var items=CURRICULUM.map(function(x){return{id:x.id,p:PHASES.findIndex(function(p){return p.id==x.phase}),x:x}});
var pmap={};PHASES.forEach(function(p,i){pmap[p.id]=i});
items.forEach(function(it){it.p=pmap[it.x.phase]});
function durl(x){if(DURUNK.indexOf(x.duration)>-1)return (x.studyTime?'وقت مقترح: '+x.studyTime:'—');return x.duration||'—'}
function stat(){var m=items.filter(function(x){return x.x.required}),d=m.filter(function(x){return S[x.id]}).length,pc=Math.round(d/m.length*100);
$('ring').style.setProperty('--p',pc);$('pc').textContent=pc+'%';
var nx=m.find(function(x){return !S[x.id]});
$('hl').textContent=nx?'التالي: '+((nx.x.ar||nx.x.title)):'خلصت المسار كله';
$('hs').textContent=d+' من '+m.length+' درس منتهي (المطلوب فقط · الاختياري محسوب في المرحلة)';return nx}
function render(){var h='';
items.forEach(function(it){
var x=it.x,done=!!S[it.id];
var vis=(fk=='all'||(fk=='m'&&x.required)||(fk=='s'&&!x.required))&&(fc=='all'||x.instructor==fc)&&!(hd&&done)&&(!q||([x.title,x.ar,x.course,x.instructor,x.sourceNo,x.desc,x.goal].join(' ').toLowerCase()).indexOf(q)>-1);
it.vis=vis});
PHASES.forEach(function(p,pi){
var its=items.filter(function(x){return x.p==pi});
if(!its.length)return;
var dn=its.filter(function(x){return S[x.id]}).length;
var vis=its.filter(function(x){return x.vis});
if(!vis.length)return;
h+='<div class="phase" style="--pc:'+PC[pi%PC.length]+'"><div class="ph"><h2>'+(pi+1)+'. '+p.ar+'</h2><span>'+p.estimate+' · '+p.level+'</span><span>'+dn+'/'+its.length+'</span></div><p class="pgoal">'+p.goal+'</p><div class="bar"><i style="width:'+dn/its.length*100+'%"></i></div><div class="pnote">'+p.note+'</div><ol class="stops">';
vis.forEach(function(it){var x=it.x;
h+='<li class="stop '+(x.required?'m':'s')+(S[it.id]?' done':'')+'" id="s'+it.id+'"><button class="dot" data-id="'+it.id+'" aria-pressed="'+!!S[it.id]+'" aria-label="تم">'+(S[it.id]?'✓':'')+'</button><div class="row" data-id="'+it.id+'"><span class="nm">'+(x.ar||x.title)+(x.title&&x.ar&&x.title!=x.ar?'<small>'+x.title+'</small>':'')+'</span><span class="tag" style="background:'+(C[x.instructor]?C[x.instructor][1]:'#6b7a99')+'">'+(C[x.instructor]?C[x.instructor][0]:x.instructor)+'</span><span class="dur'+(x.type=='lab'?' lab':'')+'">'+(TT[x.type]||x.type)+' · '+durl(x)+'</span><span class="k">'+x.sourceNo+' · '+(x.required?K.m:K.s)+'</span><a class="open" href="'+x.url+'" target="_blank" rel="noopener">افتح ↗</a><div class="det"><b>'+esc(x.course)+' · '+esc(x.instructor)+'</b>'+(x.profile?'<span>'+esc(x.profile)+'</span>':'')+'<p>'+esc(x.desc)+'</p><p><b>ناتج الدرس:</b> '+esc(x.goal)+'</p></div></div></li>'});
h+='</ol></div>'});
$('phases').innerHTML=h||'<p class="empty">مفيش دروس بالفلتر ده. غيّر الفلتر أو امسح البحث.</p>';stat()}
function chips(el,list,cur,cb){el.innerHTML=list.map(function(a){return '<button class="chip" data-v="'+a[0]+'" aria-pressed="'+(cur==a[0])+'">'+a[1]+'</button>'}).join('');
el.onclick=function(e){var b=e.target.closest('.chip');if(!b)return;cb(b.dataset.v);chips(el,list,b.dataset.v,cb);render()}}
chips($('fk'),[['all','كل الأنواع'],['m','المطلوب فقط'],['s','اختياري / مراجعة']],'all',function(v){fk=v});
chips($('fc'),[['all','كل المحاضرين']].concat(Object.keys(C).map(function(k){return[k,C[k][0]]})),'all',function(v){fc=v});
$('q').oninput=function(e){q=e.target.value.toLowerCase();render()};
$('hd').onclick=function(e){hd=!hd;e.target.setAttribute('aria-pressed',hd);render()};
$('rs').onclick=function(){if(confirm('تصفير كل التقدم؟')){S={};save();render()}};
$('phases').onclick=function(e){
var r=e.target.closest('.row');
if(r&&r.dataset.id&&e.target.closest('.det'))return; // ignore clicks inside details
if(r&&r.dataset.id){r.classList.toggle('exp');return}
var b=e.target.closest('.dot');if(!b)return;var id=b.dataset.id;if(S[id])delete S[id];else S[id]=1;save();render()};
$('next').onclick=function(){fk='all';fc='all';q='';hd=false;chips($('fk'),[['all','كل الأنواع'],['m','المطلوب فقط'],['s','اختياري / مراجعة']],'all',function(v){fk=v});chips($('fc'),[['all','كل المحاضرين']].concat(Object.keys(C).map(function(k){return[k,C[k][0]]})),'all',function(v){fc=v});$('q').value='';render();var nx=stat();if(!nx)return;go('path');var el=$('s'+nx.id);el.scrollIntoView({block:'center',behavior:'smooth'});el.classList.remove('flash');void el.offsetWidth;el.classList.add('flash')};
var T=[['path','المسار'],['lists','مصادر المراجعة'],['soc','خطة الأسابيع'],['encor','المصادر الإضافية']];
function go(t){T.forEach(function(x){$('v-'+x[0]).classList.toggle('hide',x[0]!=t)});[].forEach.call($('tabs').children,function(b){b.setAttribute('aria-selected',b.dataset.t==t)})}
$('tabs').innerHTML=T.map(function(x){return '<button role="tab" data-t="'+x[0]+'">'+x[1]+'</button>'}).join('');
$('tabs').onclick=function(e){var b=e.target.closest('button');if(b){go(b.dataset.t);window.scrollTo(0,0)}};
$('v-encor').querySelector('#resList').innerHTML=OPTIONAL_RESOURCES.map(function(r){return '<div class="res"><b>'+esc(r.title)+'</b><p class="k">'+esc(r.instructor)+' · '+esc(r.duration)+' · '+esc(r.decision)+'</p><p>'+esc(r.reason)+'</p><a href="'+r.url+'" target="_blank" rel="noopener">فتح المصدر ↗</a></div>'}).join('');
go('path');render();

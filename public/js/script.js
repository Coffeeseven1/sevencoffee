const CAFE=[{name:"نوشیدنی گرم",icon:"☕",desc:"قهوه و نوشیدنی‌های گرم"},{name:"نوشیدنی سرد",icon:"🥤",desc:"نوشیدنی‌های خنک و دلچسب"},{name:"دسر",icon:"🍰",desc:"یک شیرینی برای حال خوب"},{name:"غذا",icon:"🍔",desc:"برای وقتی که گرسنه‌ای"}];
const GAMES=[{name:"VIP",icon:"👑",desc:"تجربه بازی در فضای VIP"},{name:"بیلیارد",icon:"🎱",desc:"میز بیلیارد و رقابت دوستانه"},{name:"PS5",icon:"🎮",desc:"نسل جدید بازی"},{name:"PS4",icon:"🕹️",desc:"بازی‌های محبوب پلی‌استیشن ۴"},{name:"Xbox",icon:"🎯",desc:"دنیای بازی‌های ایکس‌باکس"},{name:"بردگیم",icon:"♟️",desc:"بازی‌های رومیزی و گروهی"}];
const KEY="sevenMenuDataV5";let selectedImageData='';let currentSection="cafe",currentCategory="",data=loadData(),selectedControllers=1,selectedHours=1,adminAllowed=false;let espressoStage="",selectedEspressoSize="",selectedEspressoBlend="";const ESPRESSO_BLENDS=["80/20","70/30","90/10","50/50","100"];
function loadData(){try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch{return []}}
function saveData(){localStorage.setItem(KEY,JSON.stringify(data))}
function setView(id){document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));document.getElementById(id).classList.add("active");window.scrollTo({top:0,behavior:"smooth"})}
function isAdminPath(){return location.pathname.replace(/\/+$/,'').endsWith('/admin')}
async function route(){if(isAdminPath()){try{const r=await fetch('/api/admin/session',{cache:'no-store',credentials:'same-origin'});const s=await r.json();if(!s.authenticated){location.replace('/admin/login');return}}catch(e){location.replace('/admin/login');return}adminAllowed=true;document.getElementById('adminView').style.display='';renderAdmin();resetForm();setView('adminView')}else{adminAllowed=false;document.getElementById('adminView').style.display='none';showHome()}}
function showHome(){if(isAdminPath()){history.pushState({},'',location.pathname.replace(/\/admin\/?$/,'/')||'/');adminAllowed=false}setView('homeView')}
function switchSection(){openSection(currentSection==='cafe'?'games':'cafe')}
function openSection(section){currentSection=section;const cafe=section==='cafe';document.getElementById('sectionEyebrow').textContent=cafe?'SEVEN CAFE MENU':'SEVEN GAME ZONE';document.getElementById('sectionTitle').innerHTML=(cafe?'منوی کافه':'گیم‌ها')+'<span>.</span>';document.getElementById('sectionDescription').textContent=cafe?'دسته نوشیدنی یا غذای موردنظرت رو انتخاب کن.':'بخش بازی موردنظرت رو انتخاب کن.';document.getElementById('switchSection').textContent=cafe?'گیم‌ها':'منوی کافه';const cats=cafe?CAFE:GAMES;document.getElementById('categoryGrid').innerHTML=cats.map((c,i)=>`<button class="category-card" onclick="openItems(${i})"><span class="category-symbol">${c.icon}</span><span class="category-copy"><strong>${c.name}</strong><small>${c.desc}</small></span><span class="category-arrow">←</span></button>`).join('');setView('categoryView')}
function backToCategories(){
 if(currentSection==='cafe'&&currentCategory==='نوشیدنی گرم'&&espressoStage){
   if(espressoStage==='blend'){espressoStage='size';selectedEspressoBlend='';renderEspressoPicker();return;}
   if(espressoStage==='products'){espressoStage='blend';renderEspressoPicker();renderProducts();return;}
   espressoStage='';renderProducts();document.getElementById('espressoPicker').classList.add('hidden');return;
 }
 espressoStage='';openSection(currentSection);
}
function openItems(i){const cats=currentSection==='cafe'?CAFE:GAMES;currentCategory=cats[i].name;espressoStage='';selectedEspressoSize='';selectedEspressoBlend='';document.getElementById('itemsTitle').innerHTML=currentCategory+'<span>.</span>';document.getElementById('itemsEyebrow').textContent=currentSection==='cafe'?'SEVEN CAFE MENU':'SEVEN GAME ZONE';document.getElementById('itemsDescription').textContent='موارد ثبت‌شده در این دسته';document.getElementById('switchItems').textContent=currentSection==='cafe'?'گیم‌ها':'منوی کافه';document.getElementById('hourPicker').classList.toggle('hidden',currentSection!=='games');selectedControllers=(currentCategory==='بیلیارد'?2:1);selectedHours=1;document.getElementById('espressoPicker').classList.add('hidden');renderProducts();renderGameChoices();setView('itemsView')}
function openEspresso(){espressoStage='size';selectedEspressoSize='';selectedEspressoBlend='';renderEspressoPicker();renderProducts()}
function chooseEspressoSize(size){selectedEspressoSize=size;espressoStage='blend';renderEspressoPicker();renderProducts()}
function chooseEspressoBlend(blend){selectedEspressoBlend=blend;espressoStage='products';renderEspressoPicker();renderProducts()}
function renderEspressoPicker(){
 const box=document.getElementById('espressoPicker');
 if(!(currentSection==='cafe'&&currentCategory==='نوشیدنی گرم')){box.classList.add('hidden');box.innerHTML='';return;}
 if(!espressoStage){box.classList.add('hidden');box.innerHTML='';return;}
 box.classList.remove('hidden');
 if(espressoStage==='size'){
   box.innerHTML=`<div class="espresso-head"><span class="espresso-icon">☕</span><div><h2>اسپرسو</h2><p>نوع سرو رو انتخاب کن</p></div></div><div class="espresso-options"> <button class="espresso-option" onclick="chooseEspressoSize('single')"><strong>تک</strong><small>Single Espresso</small><span>←</span></button><button class="espresso-option" onclick="chooseEspressoSize('double')"><strong>دوبل</strong><small>Double Espresso</small><span>←</span></button></div>`;
 } else if(espressoStage==='blend'){
   box.innerHTML=`<div class="espresso-head"><span class="espresso-icon">☕</span><div><h2>اسپرسو ${selectedEspressoSize==='single'?'تک':'دوبل'}</h2><p>ترکیب قهوه رو انتخاب کن</p></div></div><div class="espresso-options">${ESPRESSO_BLENDS.map(b=>`<button class="espresso-option blend-option" onclick="chooseEspressoBlend('${b}')"><strong>${b}</strong><small>${b==='100'?'۱۰۰٪ قهوه':'ترکیب دانه قهوه'}</small><span>←</span></button>`).join('')}</div>`;
 } else {
   box.innerHTML=`<div class="espresso-head"><span class="espresso-icon">☕</span><div><h2>اسپرسو ${selectedEspressoSize==='single'?'تک':'دوبل'} · ${selectedEspressoBlend}</h2><p>قیمت و مشخصات این ترکیب</p></div></div><button class="espresso-back" onclick="espressoStage='blend';renderEspressoPicker();renderProducts()">تغییر ترکیب</button>`;
 }
}
function renderProducts(){
 const grid=document.getElementById('productGrid');let items=[];
 if(currentSection==='cafe'&&currentCategory==='نوشیدنی گرم'){
   const regular=data.filter(x=>x.section==='cafe'&&x.category==='نوشیدنی گرم');
   const espressoItems=data.filter(x=>x.section==='cafe'&&x.category==='اسپرسو');
   if(!espressoStage){
     grid.innerHTML=`<button class="espresso-category-card" onclick="openEspresso()"><span class="espresso-card-icon">☕</span><span><strong>اسپرسو</strong><small>تک و دوبل · ۵ ترکیب قهوه</small></span><span class="category-arrow">←</span></button>`+regular.map(productCard).join('');
     const empty=document.getElementById('emptyState');empty.classList.toggle('hidden',regular.length>0||true);renderEspressoPicker();return;
   }
   if(espressoStage==='products') items=espressoItems.filter(x=>x.espressoSize===selectedEspressoSize&&x.espressoBlend===selectedEspressoBlend);
   else items=[];
 } else {
   items=data.filter(x=>x.section===currentSection&&x.category===currentCategory);
 }
 grid.innerHTML=items.map(productCard).join('');
 const empty=document.getElementById('emptyState');empty.classList.toggle('hidden',items.length>0||espressoStage!=='products');
 if(!items.length&&currentSection==='games'){empty.classList.remove('hidden');document.querySelector('#emptyState p').textContent='برای نمایش قیمت، تعرفه بازی را از پنل مدیریت ثبت کنید.';}
 if(!items.length&&currentSection==='cafe'&&currentCategory==='نوشیدنی گرم'&&espressoStage==='products'){empty.classList.remove('hidden');document.querySelector('#emptyState p').textContent='برای این نوع اسپرسو هنوز قیمت ثبت نشده است؛ مدیریت می‌تواند آن را اضافه کند.';}
 renderEspressoPicker();
}
function productCard(x){return `<article class="product-card">${x.image?`<img src="${escapeAttr(x.image)}" alt="${escapeAttr(x.name)}" onerror="this.style.display='none'">`:''}<div class="product-info"><h3>${escapeHtml(x.name)}</h3>${x.category==='اسپرسو'?`<p>اسپرسو ${x.espressoSize==='single'?'تک':'دوبل'} · ترکیب ${escapeHtml(x.espressoBlend||'')}</p>`:''}<span class="product-price">${x.price?money(x.price)+' تومان':'قیمت ثبت نشده'}</span></div></article>`}
function renderGameChoices(){
 const controllerChoice=document.getElementById('controllerChoice');
 const controllerLabel=document.getElementById('controllerLabel');
 const controllerButtons=document.getElementById('controllerButtons');
 const isBilliards=currentCategory==='بیلیارد';
 const isBoardGame=currentCategory==='بردگیم';
 if(isBoardGame){controllerChoice.classList.add('hidden');}
 else {
   controllerChoice.classList.remove('hidden');
   controllerLabel.textContent=isBilliards?'۱. تعداد نفرات':'۱. تعداد دسته';
   const options=isBilliards?[2,4]:[1,2,3,4];
   controllerButtons.innerHTML=options.map(n=>`<button class="choice-button ${selectedControllers===n?'active':''}" onclick="selectControllers(${n})">${isBilliards?(n===2?'۲ نفر':'۴ نفر'):(n+' دسته')}</button>`).join('');
 }
 document.getElementById('hourButtons').innerHTML=[1,2,3,4,5].map(h=>`<button class="choice-button ${selectedHours===h?'active':''}" onclick="selectHours(${h})">${h} ساعت</button>`).join('');
 updateFinalPrice();
}
function selectControllers(n){selectedControllers=n;renderGameChoices()}
function selectHours(n){selectedHours=n;renderGameChoices()}
function updateFinalPrice(){
 const result=document.getElementById('priceResult'),value=document.getElementById('finalPriceValue');
 if(!result||!value)return;result.classList.remove('hidden');
 const item=data.find(x=>x.section==='games'&&x.category===currentCategory);
 if(!item){value.textContent='تعرفه ثبت نشده';return}
 const rate=Number(item.rates?.[selectedHours]||0);
 let price=0;
 if(currentCategory==='بیلیارد'||currentCategory==='بردگیم') price=rate;
 else {price=Number(item.controllerRates?.[selectedControllers]?.[selectedHours]||0);if(!price)price=rate?rate*selectedControllers:0;}
 value.textContent=price?money(price)+' تومان':'تعرفه ثبت نشده';
}
function openAdmin(fromRoute=false){if(!fromRoute&&!isAdminPath()){location.href='/admin';return}adminAllowed=true;document.getElementById('adminView').style.display='';renderAdmin();resetForm();setView('adminView')}
function showAdminTab(which,btn){document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));btn.classList.add('active');document.getElementById('adminProducts').classList.toggle('hidden',which!=='products');document.getElementById('adminSettings').classList.toggle('hidden',which!=='settings')}
function updateCategoryOptions(){const sec=document.getElementById('itemSection').value;const cats=sec==='cafe'?[...CAFE,{name:'اسپرسو',icon:'☕',desc:'اسپرسو تک و دوبل'}]:GAMES;const select=document.getElementById('itemCategory');const old=select.value;select.innerHTML=cats.map(c=>`<option value="${c.name}">${c.name}</option>`).join('');if(cats.some(c=>c.name===old))select.value=old;document.getElementById('gameRates').classList.toggle('hidden',sec!=='games');document.getElementById('itemPrice').parentElement.classList.toggle('hidden',sec==='games');toggleEspressoFields()}
function toggleEspressoFields(){const isEspresso=document.getElementById('itemSection').value==='cafe'&&document.getElementById('itemCategory').value==='اسپرسو';document.getElementById('espressoFields').classList.toggle('hidden',!isEspresso);document.getElementById('itemPrice').parentElement.classList.toggle('hidden',document.getElementById('itemSection').value==='games');}
document.getElementById('itemSection').addEventListener('change',updateCategoryOptions);document.getElementById('itemCategory').addEventListener('change',toggleEspressoFields);updateCategoryOptions();
document.getElementById('itemImageFile').addEventListener('change', async function(){
  const file=this.files&&this.files[0];
  if(!file){return;}
  if(!file.type.startsWith('image/')){alert('لطفاً یک فایل تصویری انتخاب کن.');this.value='';return;}
  if(file.size>15*1024*1024){alert('حجم عکس باید کمتر از ۱۵ مگابایت باشد.');this.value='';return;}
  const nameEl=document.getElementById('imageFileName');
  nameEl.textContent='در حال آماده‌سازی تصویر…';
  try{
    selectedImageData=await compressImageFile(file);
    document.getElementById('imagePreview').src=selectedImageData;
    document.getElementById('imagePreviewWrap').classList.remove('hidden');
    nameEl.textContent=file.name+' · آماده ذخیره';
    document.getElementById('itemImage').value='';
  }catch(err){selectedImageData='';nameEl.textContent='خطا در خواندن تصویر';alert('این تصویر قابل خواندن نیست؛ یک عکس دیگر انتخاب کن.');}
});
function compressImageFile(file){return new Promise((resolve,reject)=>{
  const reader=new FileReader();reader.onerror=()=>reject(new Error('read failed'));
  reader.onload=()=>{const img=new Image();img.onerror=()=>reject(new Error('image failed'));img.onload=()=>{
    const max=1200,scale=Math.min(1,max/Math.max(img.width,img.height));
    const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(img.width*scale));canvas.height=Math.max(1,Math.round(img.height*scale));
    const ctx=canvas.getContext('2d');ctx.fillStyle='#ffffff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);
    resolve(canvas.toDataURL('image/jpeg',0.78));
  };img.src=reader.result;};reader.readAsDataURL(file);
});}
function clearSelectedImage(){selectedImageData='';const input=document.getElementById('itemImageFile');if(input)input.value='';const preview=document.getElementById('imagePreview');if(preview)preview.removeAttribute('src');document.getElementById('imagePreviewWrap').classList.add('hidden');document.getElementById('imageFileName').textContent='هنوز تصویری انتخاب نشده';}
document.getElementById('productForm').addEventListener('submit',e=>{e.preventDefault();if(!adminAllowed){alert('پنل مدیریت فقط از مسیر /admin در دسترس است.');return;}const id=document.getElementById('editId').value||String(Date.now()),section=document.getElementById('itemSection').value;const existing=data.find(x=>x.id===id);const image=selectedImageData||document.getElementById('itemImage').value.trim()||(existing?existing.image:'');const category=document.getElementById('itemCategory').value;const item={id,section,category,espressoSize:category==='اسپرسو'?document.getElementById('espressoSize').value:'',espressoBlend:category==='اسپرسو'?document.getElementById('espressoBlend').value:'',name:document.getElementById('itemName').value.trim(),price:Number(document.getElementById('itemPrice').value)||0,image,rates:{1:Number(document.getElementById('rate1').value)||0,2:Number(document.getElementById('rate2').value)||0,3:Number(document.getElementById('rate3').value)||0,4:Number(document.getElementById('rate4').value)||0,5:Number(document.getElementById('rate5').value)||0}};if(!item.name)return;const idx=data.findIndex(x=>x.id===id);if(idx>=0)data[idx]=item;else data.push(item);try{saveData();resetForm();renderAdmin();alert('اطلاعات و تصویر ذخیره شد.');}catch(err){alert('ذخیره انجام نشد؛ احتمالاً فضای ذخیره مرورگر پر شده است. عکس کوچک‌تری انتخاب کن.');}});
function resetForm(){document.getElementById('productForm').reset();document.getElementById('editId').value='';document.getElementById('formTitle').textContent='افزودن محصول / تعرفه';[1,2,3,4,5].forEach(h=>document.getElementById('rate'+h).value='');clearSelectedImage();updateCategoryOptions();document.getElementById('espressoSize').value='single';document.getElementById('espressoBlend').value='80/20'}
function renderAdmin(){if(!adminAllowed)return;const list=document.getElementById('adminList');if(!data.length){list.innerHTML='<div class="empty-state"><p>هنوز محصولی ثبت نشده است.</p></div>';return}list.innerHTML=data.map(x=>`<div class="admin-row">${x.image?`<img src="${escapeAttr(x.image)}" alt="">`:''}<div class="admin-row-info"><strong>${escapeHtml(x.name)}</strong><small>${x.section==='cafe'?'منوی کافه':'گیم‌ها'} · ${escapeHtml(x.category)}${x.category==='اسپرسو'?' · '+(x.espressoSize==='single'?'تک':'دوبل')+' · '+escapeHtml(x.espressoBlend||'') : ''} · ${x.section==='cafe'?money(x.price)+' تومان':'تعرفه ساعتی'}</small></div><div class="row-actions"><button onclick="editItem('${x.id}')">ویرایش</button><button class="delete" onclick="deleteItem('${x.id}')">حذف</button></div></div>`).join('')}
function editItem(id){if(!adminAllowed)return;const x=data.find(v=>v.id===id);if(!x)return;document.getElementById('editId').value=x.id;document.getElementById('itemSection').value=x.section;updateCategoryOptions();document.getElementById('itemCategory').value=x.category;toggleEspressoFields();document.getElementById('espressoSize').value=x.espressoSize||'single';document.getElementById('espressoBlend').value=x.espressoBlend||'80/20';document.getElementById('itemName').value=x.name;document.getElementById('itemPrice').value=x.price||'';document.getElementById('itemImage').value=(x.image||'').startsWith('data:image/')?'':(x.image||'');clearSelectedImage();if(x.image){document.getElementById('imagePreview').src=x.image;document.getElementById('imagePreviewWrap').classList.remove('hidden');document.getElementById('imageFileName').textContent='تصویر فعلی محصول';} [1,2,3,4,5].forEach(h=>document.getElementById('rate'+h).value=x.rates?.[h]||'');document.getElementById('formTitle').textContent='ویرایش: '+x.name;document.getElementById('adminProducts').scrollIntoView({behavior:'smooth'})}
function deleteItem(id){if(!adminAllowed)return;if(confirm('این مورد حذف شود؟')){data=data.filter(x=>x.id!==id);saveData();renderAdmin()}}
function clearAll(){if(!adminAllowed)return;if(confirm('همه محصولات و تعرفه‌ها حذف شوند؟')){data=[];saveData();renderAdmin()}}
function exportData(){if(!adminAllowed)return;const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='seven-menu-data.json';a.click();URL.revokeObjectURL(a.href)}
function importData(e){if(!adminAllowed)return;const file=e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{try{const parsed=JSON.parse(reader.result);if(!Array.isArray(parsed))throw Error();data=parsed;saveData();renderAdmin();alert('اطلاعات وارد شد.')}catch{alert('فایل JSON معتبر نیست.')}};reader.readAsText(file)}
function money(n){return Number(n).toLocaleString('fa-IR')}
function escapeHtml(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function escapeAttr(s){return escapeHtml(s)}
window.addEventListener('popstate',route);route();
async function logoutAdmin(){try{await fetch('/api/admin/logout',{method:'POST',credentials:'same-origin'});}catch(e){}location.assign('/admin/login');}

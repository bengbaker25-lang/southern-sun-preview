const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];

/* Load preview-only polish without touching Shopify */
const polish=document.createElement('link');polish.rel='stylesheet';polish.href='fixes.css?v=5';document.head.appendChild(polish);

const header=$('#header'),progress=$('#scrollProgress');
window.addEventListener('scroll',()=>{header?.classList.toggle('scrolled',scrollY>55);const h=document.documentElement.scrollHeight-innerHeight;if(progress)progress.style.width=(h?scrollY/h*100:0)+'%'});
const obs=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('on')),{threshold:.1});$$('.reveal').forEach(el=>obs.observe(el));

const vid=$('#heroVideo'),toggle=$('#videoToggle');
if(vid){vid.muted=true;vid.defaultMuted=true;vid.playsInline=true;const play=()=>{vid.muted=true;const p=vid.play();if(p?.catch)p.catch(()=>{});};play();vid.addEventListener('canplay',play);window.addEventListener('pageshow',play);document.addEventListener('visibilitychange',()=>{if(!document.hidden)play()});}
if(vid&&toggle)toggle.addEventListener('click',()=>{if(vid.paused){vid.play();toggle.textContent='Ⅱ';toggle.setAttribute('aria-label','Pause video')}else{vid.pause();toggle.textContent='▶';toggle.setAttribute('aria-label','Play video')}});

const search=$('#searchPanel'),searchBtn=$('#searchBtn'),closeSearch=$('#closeSearch');if(searchBtn&&search)searchBtn.onclick=()=>{search.classList.add('open');setTimeout(()=>search.querySelector('input')?.focus(),150)};if(closeSearch&&search)closeSearch.onclick=()=>search.classList.remove('open');document.addEventListener('keydown',e=>{if(e.key==='Escape'){search?.classList.remove('open');closeProductModal();}});

const products={
  'snook-southern-sun-hat':{title:'Snook Hat',price:'$30',kicker:'HEADWEAR',desc:'Steel-blue crown, dark-grey rope, structured polyester shell, and signature snook embroidery.',url:'https://southernsunfishing.com/products/snook-southern-sun-hat',images:['https://cdn.shopify.com/s/files/1/0966/4466/1534/files/DSC00051.jpg?v=1770073306','https://cdn.shopify.com/s/files/1/0966/4466/1534/files/IMG_1378.jpg?v=1770073306','https://cdn.shopify.com/s/files/1/0966/4466/1534/files/IMG_1377.jpg?v=1770073306','https://cdn.shopify.com/s/files/1/0966/4466/1534/files/IMG_1374.jpg?v=1770073306']},
  'signature-southern-sun-hat':{title:'Signature Hat',price:'$30',kicker:'HEADWEAR',desc:'Light-grey crown, dark-grey rope, structured cotton/poly shell, and the Southern Sun signature mark.',url:'https://southernsunfishing.com/products/signature-southern-sun-hat',images:['https://cdn.shopify.com/s/files/1/0966/4466/1534/files/DSC00012.jpg?v=1770073333','https://cdn.shopify.com/s/files/1/0966/4466/1534/files/IMG_1383.jpg?v=1770073333','https://cdn.shopify.com/s/files/1/0966/4466/1534/files/IMG_1385.jpg?v=1770073333','https://cdn.shopify.com/s/files/1/0966/4466/1534/files/IMG_1386.jpg?v=1770073333']},
  'retriever-southern-sun-hat':{title:'Retriever Hat',price:'$30',kicker:'HEADWEAR',desc:'Dark navy crown, gold rope, structured polyester shell, and retriever embroidery.',url:'https://southernsunfishing.com/products/retriever-southern-sun-hat',images:['https://cdn.shopify.com/s/files/1/0966/4466/1534/files/DSC00094.jpg?v=1770073252','https://cdn.shopify.com/s/files/1/0966/4466/1534/files/IMG_1379.jpg?v=1770073252','https://cdn.shopify.com/s/files/1/0966/4466/1534/files/ChatGPTImageFeb2_2026_05_30_17PM.png?v=1770073252']},
  'southern-sun-skiff-tee':{title:'Skiff Tee',price:'$40',kicker:'T-SHIRT',desc:'Garment-dyed Comfort Colors pocket tee with a relaxed fit and skiff-inspired back graphic.',url:'https://southernsunfishing.com/products/southern-sun-skiff-tee',images:['https://cdn.shopify.com/s/files/1/0966/4466/1534/files/DSC01012.jpg?v=1780503051','https://cdn.shopify.com/s/files/1/0966/4466/1534/files/DSC01045.jpg?v=1780503056','https://cdn.shopify.com/s/files/1/0966/4466/1534/files/DSC00998.jpg?v=1780503057','https://cdn.shopify.com/s/files/1/0966/4466/1534/files/DSC01177.jpg?v=1780503057']},
  'southern-sun-mangrove-tee':{title:'Mangrove Tee',price:'$40',kicker:'T-SHIRT',desc:'Garment-dyed Comfort Colors pocket tee with the mangrove waterway artwork on the back.',url:'https://southernsunfishing.com/products/southern-sun-mangrove-tee',images:['https://cdn.shopify.com/s/files/1/0966/4466/1534/files/DSC01289.jpg?v=1780503321','https://cdn.shopify.com/s/files/1/0966/4466/1534/files/DSC01267.jpg?v=1780503321','https://cdn.shopify.com/s/files/1/0966/4466/1534/files/DSC01303.jpg?v=1780503325','https://cdn.shopify.com/s/files/1/0966/4466/1534/files/DSC01338.jpg?v=1780503325']},
  'southern-sun-sportfisher-tee':{title:'Sportfisher Tee',price:'$40',kicker:'T-SHIRT',desc:'Garment-dyed Comfort Colors pocket tee with a relaxed fit and offshore sportfisher artwork.',url:'https://southernsunfishing.com/products/southern-sun-sportfisher-tee',images:['https://cdn.shopify.com/s/files/1/0966/4466/1534/files/DSC01084.jpg?v=1780502824','https://cdn.shopify.com/s/files/1/0966/4466/1534/files/DSC01120.jpg?v=1780502844','https://cdn.shopify.com/s/files/1/0966/4466/1534/files/DSC00930.jpg?v=1780502841','https://cdn.shopify.com/s/files/1/0966/4466/1534/files/DSC01227.jpg?v=1780502845']},
  'untitled-apr28_12-00':{title:'Comfort Hooded Shirt',price:'$55',kicker:'HOODIE / PERFORMANCE',desc:'Lightweight, breathable performance layer in an 88% polyester / 12% lyocell blend.',url:'https://southernsunfishing.com/products/untitled-apr28_12-00',images:['https://cdn.shopify.com/s/files/1/0966/4466/1534/files/DSC00851.jpg?v=1780503482','https://cdn.shopify.com/s/files/1/0966/4466/1534/files/DSC00866.jpg?v=1780503482','https://cdn.shopify.com/s/files/1/0966/4466/1534/files/DSC00768_3034055e-a46b-461c-9199-747f03dfe446.jpg?v=1781561698','https://cdn.shopify.com/s/files/1/0966/4466/1534/files/DSC00796_1752118e-34f9-4275-b475-34eb662cd3f1.jpg?v=1781561698']},
  'southern-sun-hooded-performance-shirt':{title:'Hooded Performance Shirt',price:'$60',kicker:'HOODIE / PERFORMANCE',desc:'UPF 50+ sun protection, quick-dry stretch fabric, built-in hood, and face coverage.',url:'https://southernsunfishing.com/products/southern-sun-hooded-performance-shirt',images:['https://cdn.shopify.com/s/files/1/0966/4466/1534/files/IMG-4379.png?v=1777396117']}
};

let modal;
function ensureProductModal(){
  if(modal)return modal;
  modal=document.createElement('div');modal.className='product-modal';modal.setAttribute('aria-hidden','true');
  modal.innerHTML='<div class="product-modal-card" role="dialog" aria-modal="true" aria-label="Product details"><button class="product-modal-close" aria-label="Close product">×</button><div class="product-modal-layout"><div class="product-modal-gallery"><img class="product-modal-main" alt=""><div class="product-modal-thumbs"></div></div><div class="product-modal-info"><div class="product-modal-kicker"></div><h3></h3><div class="product-modal-price"></div><p class="product-modal-desc"></p><a class="product-modal-shop" target="_blank" rel="noopener">VIEW ON STORE <span>↗</span></a></div></div></div>';
  document.body.appendChild(modal);
  modal.querySelector('.product-modal-close').onclick=closeProductModal;
  modal.addEventListener('click',e=>{if(e.target===modal)closeProductModal();});
  return modal;
}
function openProductModal(product){
  const m=ensureProductModal(),main=m.querySelector('.product-modal-main'),thumbs=m.querySelector('.product-modal-thumbs');
  m.querySelector('.product-modal-kicker').textContent=product.kicker;
  m.querySelector('h3').textContent=product.title;
  m.querySelector('.product-modal-price').textContent=product.price;
  m.querySelector('.product-modal-desc').textContent=product.desc;
  m.querySelector('.product-modal-shop').href=product.url;
  main.src=product.images[0];main.alt=product.title;
  thumbs.innerHTML='';
  product.images.forEach((src,i)=>{const b=document.createElement('button');b.className='product-modal-thumb'+(i===0?' active':'');b.type='button';b.innerHTML=`<img src="${src}" alt="${product.title} view ${i+1}">`;b.onclick=()=>{main.src=src;$$('.product-modal-thumb',thumbs).forEach(x=>x.classList.remove('active'));b.classList.add('active');};thumbs.appendChild(b);});
  if(product.images.length===1)thumbs.style.display='none';else thumbs.style.display='grid';
  m.classList.add('open');m.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
}
function closeProductModal(){if(!modal)return;modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}

$$('.product-card .product-img').forEach(link=>{
  const match=link.href.match(/\/products\/([^?#/]+)/);if(!match)return;const product=products[match[1]];if(!product)return;
  link.addEventListener('click',e=>{e.preventDefault();openProductModal(product);});
  link.closest('.product-card')?.addEventListener('click',e=>{if(e.target.closest('a'))return;openProductModal(product);});
});

/* Email capture section for the preview. Persistence gets connected to the chosen email platform at handoff. */
const footer=$('footer');
if(footer&&!$('.email-signup')){
  const section=document.createElement('section');section.className='email-signup reveal';
  section.innerHTML='<div><div class="eyebrow">GET ON THE LIST</div><h2>FIRST LIGHT.<br>FIRST LOOK.</h2></div><div class="email-signup-copy"><p>New drops, field notes, and first access before everyone else.</p><form class="email-signup-form" novalidate><input type="email" name="email" autocomplete="email" placeholder="EMAIL ADDRESS" aria-label="Email address" required><button type="submit">JOIN →</button></form><div class="email-signup-status" aria-live="polite"></div></div>';
  footer.before(section);obs.observe(section);
  const form=$('.email-signup-form',section),status=$('.email-signup-status',section);
  form.addEventListener('submit',e=>{e.preventDefault();const input=$('input',form),email=input.value.trim();if(!/^\S+@\S+\.\S+$/.test(email)){status.textContent='ENTER A VALID EMAIL.';return;}const saved=JSON.parse(localStorage.getItem('southernSunPreviewEmails')||'[]');if(!saved.includes(email))saved.push(email);localStorage.setItem('southernSunPreviewEmails',JSON.stringify(saved));status.textContent="YOU'RE ON THE LIST.";form.reset();});
}

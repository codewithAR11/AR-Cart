const products = [
  {name:"Aeon Wireless Headphones", cat:"Electronics", price:189, old:239, rating:4.9, img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", badge:"NEW"},
  {name:"Nova Smartwatch X2", cat:"Electronics", price:249, old:null, rating:4.8, img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", badge:null},
  {name:"Drift Sneakers Mono", cat:"Fashion", price:129, old:159, rating:4.7, img:"https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400", badge:"SALE"},
  {name:"Pulse Mechanical Keyboard", cat:"Gaming", price:159, old:null, rating:4.9, img:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400", badge:null},
  {name:"Orbit Smart Speaker", cat:"Smart Home", price:99, old:129, rating:4.6, img:"https://images.unsplash.com/photo-1543512214-318c7553f230?w=400", badge:"SALE"},
  {name:"Halo Leather Backpack", cat:"Accessories", price:139, old:null, rating:4.8, img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400", badge:null},
  {name:"Zen Ceramic Mug Set", cat:"Lifestyle", price:39, old:49, rating:4.5, img:"https://images.unsplash.com/photo-1517705008128-361805f42e86?w=400", badge:null},
  {name:"Flux Gaming Mouse", cat:"Gaming", price:79, old:null, rating:4.9, img:"https://images.unsplash.com/photo-1527814050087-3793815479db?w=400", badge:"NEW"}
];

function starString(r){
  const full = Math.round(r);
  return '★'.repeat(full) + '☆'.repeat(5-full);
}

function renderCard(p){
  return `
  <div class="prod-card reveal">
    <div class="prod-img-wrap">
      ${p.badge ? `<div class="badge-tag">${p.badge}</div>` : ''}
      <div class="wish-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5F8FF" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z"/></svg></div>
      <img src="${p.img}" alt="${p.name}" loading="lazy">
    </div>
    <div class="prod-info">
      <span class="prod-cat">${p.cat}</span>
      <div class="prod-title">${p.name}</div>
      <div class="prod-rating"><span class="stars">${starString(p.rating)}</span> ${p.rating}</div>
      <div class="prod-bottom">
        <div class="price">$${p.price}${p.old ? `<small>$${p.old}</small>` : ''}</div>
        <button class="add-btn" aria-label="Add to cart"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 5v14M5 12h14"/></svg></button>
      </div>
    </div>
  </div>`;
}

document.getElementById('prod-grid').innerHTML = products.slice(0,4).map(renderCard).join('');
document.getElementById('bs-grid').innerHTML = products.slice(4,8).map(renderCard).join('');

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); } });
}, {threshold:0.15});
revealEls.forEach(el=>io.observe(el));

// Count-up stats
const statEls = document.querySelectorAll('.stat-num');
const statsIO = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const el = e.target;
      const target = parseInt(el.dataset.target);
      let cur = 0;
      const step = Math.max(1, Math.ceil(target/60));
      const t = setInterval(()=>{
        cur += step;
        if(cur >= target){ cur = target; clearInterval(t); }
        el.textContent = cur;
      }, 25);
      statsIO.unobserve(el);
    }
  });
}, {threshold:0.4});
statEls.forEach(el=>statsIO.observe(el));

// Mobile hamburger toggle (simple nav slide-down)
const hamburger = document.querySelector('.hamburger');
const navLinksMobile = document.querySelector('.nav-links');
hamburger.addEventListener('click', ()=>{
  const isOpen = navLinksMobile.style.display === 'flex';
  navLinksMobile.style.display = isOpen ? 'none' : 'flex';
  navLinksMobile.style.cssText += isOpen ? '' : 'position:fixed;top:70px;left:20px;right:20px;flex-direction:column;background:rgba(6,10,22,0.97);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:24px;gap:20px;backdrop-filter:blur(20px);';
});

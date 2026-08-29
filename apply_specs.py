import re

# Read current index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add body background texture pseudo-element and custom property CSS
css_additions = """
  body::before {
    content: "";
    position: fixed;
    inset: 0;
    background-image: url('https://images.unsplash.com/photo-1601662528567-526cd06f35a4?q=80&w=2070&auto=format&fit=crop');
    background-size: cover;
    background-position: center;
    opacity: 0.12;
    pointer-events: none;
    z-index: -2;
    mix-blend-mode: multiply;
  }
  html[data-theme="night"] body::before {
    mix-blend-mode: overlay;
    opacity: 0.08;
  }

  /* --- Scroll Reveal Motion --- */
  .scroll-reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.8s var(--ease), transform 0.8s var(--ease); }
  .scroll-reveal.in-view { opacity: 1; transform: translateY(0); }
  
  /* --- Clip Path Reveal for Hero --- */
  .hero-visual { clip-path: inset(15% 15% 15% 15%); transition: clip-path 1.2s cubic-bezier(0.22, 1, 0.36, 1); }
  .hero-visual.in-view { clip-path: inset(0% 0% 0% 0%); }

  /* --- Apple Style Dock --- */
  .nav-links { display: flex; gap: 16px; align-items: center; align-items: flex-end; }
  .nav-links button.navlink {
    transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), margin 0.2s cubic-bezier(0.25, 1, 0.5, 1), color 0.2s;
    transform-origin: bottom center;
    padding: 6px 12px;
  }
  .nav-links:hover button.navlink { transform: scale(0.9); opacity: 0.7; }
  .nav-links button.navlink:hover { transform: scale(1.3) translateY(-2px); opacity: 1; margin: 0 8px; color: var(--accent); }

  /* --- Border Trail --- */
  @property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
  .border-trail-wrapper { position: relative; border-radius: 18px; padding: 1px; z-index: 1; background: var(--bg-soft); }
  .border-trail-wrapper::before {
    content: ''; position: absolute; inset: -1px; border-radius: inherit;
    background: conic-gradient(from var(--angle), transparent 60%, var(--accent) 100%);
    animation: border-trail-spin 4s linear infinite; z-index: -1;
  }
  @keyframes border-trail-spin { from { --angle: 0deg; } to { --angle: 360deg; } }
  .border-trail-wrapper .tool-card { height: 100%; border: none; background: var(--bg); border-radius: 17px; }

  /* --- Spotlight Hover --- */
  .spotlight { position: relative; overflow: hidden; }
  .spotlight::before {
    content: ''; position: absolute; inset: 0; pointer-events: none; z-index: 1;
    background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(225, 34, 41, 0.12) 0%, transparent 60%);
    opacity: 0; transition: opacity 0.3s;
  }
  .spotlight:hover::before { opacity: 1; }
  
  /* --- Shared Background Hover (AnimatedCardBackgroundHover) --- */
  .hover-bg-indicator {
    position: absolute; background: var(--bg-soft); border-radius: 16px; border: 1px solid var(--line);
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1); pointer-events: none; z-index: 0; opacity: 0;
  }
  .cat-card, .product-card { position: relative; z-index: 1; background: transparent; border-color: transparent; }
  .cat-card:hover, .product-card:hover { transform: translateY(-4px); box-shadow: none; border-color: transparent; }
  .cat-grid, .product-grid { position: relative; z-index: 1; }

  /* --- Infinite Slider --- */
  .infinite-slider-wrap {
    overflow: hidden; white-space: nowrap; width: 100%; position: relative;
    padding: 20px 0; background: var(--bg); border-bottom: 1px solid var(--line);
  }
  .infinite-slider {
    display: inline-block; animation: infinite-slide 30s linear infinite;
  }
  .infinite-slider-wrap:hover .infinite-slider { animation-duration: 10s; } /* Speed on hover */
  .infinite-slider .item {
    display: inline-flex; align-items: center; gap: 10px; padding: 0 40px;
    font-size: 0.9rem; font-weight: 600; color: var(--ink-dim);
  }
  @keyframes infinite-slide { from { transform: translateX(0); } to { transform: translateX(-50%); } }
"""

html = html.replace('</style>', css_additions + '\n</style>')

# Replace Marquee with Infinite Slider
marquee_old = """<div class="strip">
  <div class="item"><span class="dot"></span>World Wide Shipping</div>
  <div class="item"><span class="dot"></span>Genuine and Certified Quality</div>
  <div class="item"><span class="dot"></span>24/7 Customer Support</div>
  <div class="item"><span class="dot"></span>Manufacturing Facilities in Oman</div>
</div>"""

marquee_new = """<div class="infinite-slider-wrap">
  <div class="infinite-slider">
    <div class="item"><span class="dot" style="background:var(--accent)"></span>World Wide Shipping</div>
    <div class="item"><span class="dot" style="background:var(--accent-2)"></span>Genuine and Certified Quality</div>
    <div class="item"><span class="dot" style="background:var(--accent-3)"></span>24/7 Customer Support</div>
    <div class="item"><span class="dot" style="background:var(--accent-4)"></span>Manufacturing Facilities in Oman</div>
    <div class="item"><span class="dot" style="background:var(--accent)"></span>World Wide Shipping</div>
    <div class="item"><span class="dot" style="background:var(--accent-2)"></span>Genuine and Certified Quality</div>
    <div class="item"><span class="dot" style="background:var(--accent-3)"></span>24/7 Customer Support</div>
    <div class="item"><span class="dot" style="background:var(--accent-4)"></span>Manufacturing Facilities in Oman</div>
  </div>
</div>"""
html = html.replace(marquee_old, marquee_new)

# Inject scroll-reveal class everywhere
html = html.replace('<div class="section-head">', '<div class="section-head scroll-reveal">')
html = html.replace('<div class="tools-grid">', '<div class="tools-grid scroll-reveal">')
html = html.replace('<div class="serve-grid"', '<div class="serve-grid scroll-reveal"')
html = html.replace('<div class="about-grid">', '<div class="about-grid scroll-reveal">')
html = html.replace('<div class="contact-wrap">', '<div class="contact-wrap scroll-reveal">')

# Wrap tool cards in border trail and spotlight
html = re.sub(r'<div class="tool-card">', r'<div class="border-trail-wrapper"><div class="tool-card spotlight">', html)
html = html.replace('</div>\n\n    <div class="border-trail-wrapper">', '</div></div>\n\n    <div class="border-trail-wrapper">')
# Close the last one properly (manual fix is easier):
html = html.replace('</div>\n  </div>\n</section>\n\n<section id="serve">', '</div></div>\n  </div>\n</section>\n\n<section id="serve">')

# Wrap hero stat numbers in animated number classes
html = html.replace('<b>2009</b>', '<b class="count-up" data-target="2009">0</b>')
html = html.replace('<b>1000+</b>', '<b class="count-up" data-target="1000" data-suffix="+">0</b>')

# Add Shared Background Hover to Cats and Products Grids
html = html.replace('<div class="cat-grid" id="catGrid"></div>', '<div class="cat-grid" id="catGrid"><div class="hover-bg-indicator" id="catHoverBg"></div></div>')
html = html.replace('<div class="product-grid" id="productGrid"></div>', '<div class="product-grid" id="productGrid"><div class="hover-bg-indicator" id="prodHoverBg"></div></div>')


# Replace images logic in the JavaScript
# I will rewrite the renderCats and renderProducts JS to inject actual unsplash image URLs instead of placeholders

js_inject = """
  /* --- Initialize Scroll & Motion Effects --- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        if (entry.target.classList.contains('count-up') && !entry.target.classList.contains('done')) {
           entry.target.classList.add('done');
           animateValue(entry.target, 0, parseInt(entry.target.dataset.target), 2000);
        }
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.scroll-reveal, .hero-visual, .count-up').forEach(el => observer.observe(el));
  setTimeout(() => document.querySelector('.hero-visual').classList.add('in-view'), 100); // trigger hero immediately

  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // spring-like easing
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      obj.innerHTML = Math.floor(easeOutQuart * (end - start) + start) + (obj.dataset.suffix || '');
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }

  /* Spotlight Effect */
  document.querySelectorAll('.spotlight').forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
  });

  /* Shared Background Hover Effect */
  function initSharedHover(gridId, bgId, itemClass) {
    const grid = document.getElementById(gridId);
    const bg = document.getElementById(bgId);
    if (!grid || !bg) return;
    grid.addEventListener('mousemove', (e) => {
      const item = e.target.closest(itemClass);
      if (item) {
        const itemRect = item.getBoundingClientRect();
        const gridRect = grid.getBoundingClientRect();
        bg.style.opacity = '1';
        bg.style.width = `${itemRect.width}px`;
        bg.style.height = `${itemRect.height}px`;
        bg.style.transform = `translate(${itemRect.left - gridRect.left}px, ${itemRect.top - gridRect.top}px)`;
      } else {
        bg.style.opacity = '0';
      }
    });
    grid.addEventListener('mouseleave', () => bg.style.opacity = '0');
  }
  // Initialize after render
  setTimeout(() => {
    initSharedHover('catGrid', 'catHoverBg', '.cat-card');
    initSharedHover('productGrid', 'prodHoverBg', '.product-card');
  }, 1000);

"""

html = html.replace('})();\n</script>', js_inject + '\n})();\n</script>')

# Update the render functions to use proper images
cat_images_b2b = [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&auto=format&fit=crop'
]

cat_images_b2c = [
    'https://images.unsplash.com/photo-1556910103-1c02745a828?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581451006509-bc8d7b3c200c?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1628102491629-778571d893a3?q=80&w=400&auto=format&fit=crop'
]

# Write a replacement for renderCats
new_render_cats = """
  function renderCats(list){
    var catHoverBg = '<div class="hover-bg-indicator" id="catHoverBg"></div>';
    var images = body.getAttribute('data-mode') === 'b2c' ? 
      ['https://images.unsplash.com/photo-1556910103-1c02745a8284?q=80&w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1581451006509-bc8d7b3c200c?q=80&w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1628102491629-778571d893a3?q=80&w=400&auto=format&fit=crop'] : 
      ['https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&auto=format&fit=crop'];
    
    els.catGrid.innerHTML = catHoverBg + list.map(function(c, i){
      return '<div class="cat-card">' +
        '<div class="img-slot" style="background-image:url('+images[i]+'); background-size:cover; background-position:center;"><span style="display:none;"></span></div>' +
        '<div class="body"><span class="num">'+c.n+'</span><h4>'+c.name+'</h4><p>'+c.desc+'</p></div>' +
      '</div>';
    }).join('');
    setTimeout(() => initSharedHover('catGrid', 'catHoverBg', '.cat-card'), 50);
  }
"""
html = re.sub(r'function renderCats\(list\)\{.*?\}\n', new_render_cats, html, flags=re.DOTALL)


# Product Images Replacement
new_products_js = """
  var products = [
    {name:'Paper Baking Moulds', mat:'Paper', meta:'Siliconized, oven safe', img:'https://images.unsplash.com/photo-1579208035860-222a0179d67b?q=80&w=400&auto=format&fit=crop'},
    {name:'Disposable Paper Cups', mat:'Paper', meta:'Hot and cold rated', img:'https://images.unsplash.com/photo-1554316047-9759c8369543?q=80&w=400&auto=format&fit=crop'},
    {name:'Paper Plates', mat:'Paper', meta:'Standard and heavy duty', img:'https://images.unsplash.com/photo-1583258292688-d0b7e289843c?q=80&w=400&auto=format&fit=crop'},
    {name:'Paper Bags', mat:'Paper', meta:'Retail and takeaway sizes', img:'https://images.unsplash.com/photo-1596556535974-909569eddf3d?q=80&w=400&auto=format&fit=crop'},
    {name:'Round Reusable Container', mat:'Plastic', meta:'Stackable, freezer safe', img:'https://images.unsplash.com/photo-1620311242371-331da2944b7d?q=80&w=400&auto=format&fit=crop'},
    {name:'Clingfilm and Plastic Wraps', mat:'Plastic', meta:'Food grade rolls', img:'https://images.unsplash.com/photo-1628102491629-778571d893a3?q=80&w=400&auto=format&fit=crop'},
    {name:'Disposable Cutlery, Biodegradable', mat:'Plastic', meta:'PET and PP options', img:'https://images.unsplash.com/photo-1603594247858-a6264ff656a1?q=80&w=400&auto=format&fit=crop'},
    {name:'Plastic Cups and Tableware', mat:'Plastic', meta:'Catering and retail packs', img:'https://images.unsplash.com/photo-1590214815481-19ce925187e1?q=80&w=400&auto=format&fit=crop'},
    {name:'Aluminium Disposable Containers', mat:'Aluminium', meta:'Cold chain and oven ready', img:'https://images.unsplash.com/photo-1607590867011-3e4b779a5270?q=80&w=400&auto=format&fit=crop'},
    {name:'Aluminium Foils', mat:'Aluminium', meta:'Standard and heavy gauge', img:'https://images.unsplash.com/photo-1616886470479-79860b73c9f2?q=80&w=400&auto=format&fit=crop'},
    {name:'Tamper Proof Food Container', mat:'Aluminium', meta:'Sealed, delivery safe', img:'https://images.unsplash.com/photo-1605230324838-662584e03f0f?q=80&w=400&auto=format&fit=crop'},
    {name:'Foam Reusable Container', mat:'Foam', meta:'Insulated, lightweight', img:'https://images.unsplash.com/photo-1587049352847-8d4e8941554a?q=80&w=400&auto=format&fit=crop'},
    {name:'Foam Food Containers', mat:'Foam', meta:'Hot food rated', img:'https://images.unsplash.com/photo-1587049352847-8d4e8941554a?q=80&w=400&auto=format&fit=crop'},
    {name:'Foam Plates', mat:'Foam', meta:'Disposable, bulk packs', img:'https://images.unsplash.com/photo-1583258292688-d0b7e289843c?q=80&w=400&auto=format&fit=crop'}
  ];
"""
html = re.sub(r'var products = \[.*?\];', new_products_js, html, flags=re.DOTALL)

new_render_products = """
  function renderProducts(filter){
    var prodHoverBg = '<div class="hover-bg-indicator" id="prodHoverBg"></div>';
    var list = filter === 'All' ? products : products.filter(function(p){ return p.mat === filter; });
    productGrid.innerHTML = prodHoverBg + list.map(function(p){
      return '<div class="product-card spotlight">' +
        '<div class="img-slot" style="background-image:url('+p.img+'); background-size:cover; background-position:center;"><span style="display:none;"></span></div>' +
        '<div class="body"><h4>'+p.name+'</h4><div class="meta">'+p.mat+'. '+p.meta+'</div>' +
        '<div class="tier">View volume pricing</div></div>' +
      '</div>';
    }).join('');
    setTimeout(() => initSharedHover('productGrid', 'prodHoverBg', '.product-card'), 50);
  }
"""
html = re.sub(r'function renderProducts\(filter\)\{.*?\}\n', new_render_products, html, flags=re.DOTALL)

# About image
html = html.replace('<div class="img-slot"><span>Add facility or team photo</span></div>', '<div class="img-slot" style="background-image:url(\\\'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop\\\'); background-size:cover; background-position:center;"><span style="display:none;"></span></div>')

# Replace serve grid
html = html.replace('<span>Add icon</span>', '')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

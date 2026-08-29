import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Remove Dark Mode CSS
html = re.sub(r'html\[data-theme="night"\][^{]*\{[^}]*\}', '', html, flags=re.DOTALL)

# 2. Remove Theme Toggle HTML
html = re.sub(r'<div class="theme-toggle" id="themeToggle">.*?</div>', '', html, flags=re.DOTALL)

# 3. Remove Theme Toggle JS
html = re.sub(r'/\* ============ THEME \(day and night\) ============ \*/.*?setTheme\(savedTheme\);', '', html, flags=re.DOTALL)

# 4. Replace Hero Image
hero_img_url = "https://images.unsplash.com/photo-1620311242371-331da2944b7d?q=80&w=1600&auto=format&fit=crop"
html = html.replace('src="hero.jpg"', f'src="{hero_img_url}"')

# 5. Add Custom Cursor CSS
cursor_css = """
  /* --- Custom Cursor --- */
  body, a, button, input, select, textarea, label, .cat-card, .product-card { cursor: none !important; }
  #cursor-circle {
    position: fixed;
    top: 0; left: 0;
    width: 32px; height: 32px;
    border: 2px solid var(--accent);
    border-radius: 50%;
    pointer-events: none;
    z-index: 99999;
    transition: width 0.2s cubic-bezier(.22,.68,0,1), height 0.2s cubic-bezier(.22,.68,0,1), background-color 0.2s cubic-bezier(.22,.68,0,1);
    will-change: transform;
  }
"""
html = html.replace('</style>', cursor_css + '</style>')

# 6. Add Custom Cursor HTML
html = html.replace('<body data-mode="b2b">', '<body data-mode="b2b">\n<div id="cursor-circle"></div>')

# 7. Add Custom Cursor JS
cursor_js = """
  /* --- Cursor Circle --- */
  var cursor = document.getElementById('cursor-circle');
  var mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  var circleX = mouseX, circleY = mouseY;
  var speed = 0.2;
  
  window.addEventListener('mousemove', function(e){
    mouseX = e.clientX; 
    mouseY = e.clientY;
  });
  
  function animateCursor(){
    circleX += (mouseX - circleX) * speed;
    circleY += (mouseY - circleY) * speed;
    /* Adjust transform offset based on current width/height (defaults to 16 for 32px) */
    var offset = cursor.offsetWidth / 2;
    cursor.style.transform = 'translate(' + (circleX - offset) + 'px, ' + (circleY - offset) + 'px)';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  
  /* Add interactive states dynamically using MutationObserver or direct selection */
  function bindCursorInteractions() {
    document.querySelectorAll('a, button, input, select, textarea, label, .cat-card, .product-card, .csv-drop').forEach(function(el){
      el.addEventListener('mouseenter', function(){
        cursor.style.width = '48px';
        cursor.style.height = '48px';
        cursor.style.backgroundColor = 'rgba(225, 34, 41, 0.15)';
      });
      el.addEventListener('mouseleave', function(){
        cursor.style.width = '32px';
        cursor.style.height = '32px';
        cursor.style.backgroundColor = 'transparent';
      });
    });
  }
  bindCursorInteractions();
  // Ensure elements updated by JS also get bound
  setTimeout(bindCursorInteractions, 1500);
"""
html = html.replace('})();\n</script>', cursor_js + '\n})();\n</script>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

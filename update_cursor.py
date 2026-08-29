import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update CSS
old_css = """  #cursor-circle {
    position: fixed;
    top: 0; left: 0;
    width: 32px; height: 32px;
    border: 2px solid var(--accent);
    border-radius: 50%;
    pointer-events: none;
    z-index: 99999;
    transition: width 0.2s cubic-bezier(.22,.68,0,1), height 0.2s cubic-bezier(.22,.68,0,1), background-color 0.2s cubic-bezier(.22,.68,0,1);
    will-change: transform;
  }"""
new_css = """  #cursor-dot {
    position: fixed;
    top: 0; left: 0;
    width: 6px; height: 6px;
    background-color: var(--accent);
    border-radius: 50%;
    pointer-events: none;
    z-index: 100000;
    will-change: transform;
  }
  #cursor-circle {
    position: fixed;
    top: 0; left: 0;
    width: 24px; height: 24px;
    border: 1.5px solid var(--accent);
    border-radius: 50%;
    pointer-events: none;
    z-index: 99999;
    transition: width 0.2s cubic-bezier(.22,.68,0,1), height 0.2s cubic-bezier(.22,.68,0,1), background-color 0.2s cubic-bezier(.22,.68,0,1);
    will-change: transform;
  }"""
html = html.replace(old_css, new_css)

# 2. Update HTML
html = html.replace('<div id="cursor-circle"></div>', '<div id="cursor-dot"></div>\n<div id="cursor-circle"></div>')

# 3. Update JS
old_js = """  /* --- Cursor Circle --- */
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
  }"""
new_js = """  /* --- Cursor Circle --- */
  var cursor = document.getElementById('cursor-circle');
  var dot = document.getElementById('cursor-dot');
  var mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  var circleX = mouseX, circleY = mouseY;
  var speed = 0.2;
  
  window.addEventListener('mousemove', function(e){
    mouseX = e.clientX; 
    mouseY = e.clientY;
    dot.style.transform = 'translate(' + (mouseX - 3) + 'px, ' + (mouseY - 3) + 'px)';
  });
  
  function animateCursor(){
    circleX += (mouseX - circleX) * speed;
    circleY += (mouseY - circleY) * speed;
    var offset = cursor.offsetWidth / 2;
    cursor.style.transform = 'translate(' + (circleX - offset) + 'px, ' + (circleY - offset) + 'px)';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  
  function bindCursorInteractions() {
    document.querySelectorAll('a, button, input, select, textarea, label, .cat-card, .product-card, .csv-drop').forEach(function(el){
      el.addEventListener('mouseenter', function(){
        cursor.style.width = '36px';
        cursor.style.height = '36px';
        cursor.style.backgroundColor = 'rgba(225, 34, 41, 0.12)';
        dot.style.opacity = '0'; // Hide the dot on hover for a cleaner look
      });
      el.addEventListener('mouseleave', function(){
        cursor.style.width = '24px';
        cursor.style.height = '24px';
        cursor.style.backgroundColor = 'transparent';
        dot.style.opacity = '1';
      });
    });
  }"""
html = html.replace(old_js, new_js)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

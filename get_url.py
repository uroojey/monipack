import urllib.request
import re
try:
    req = urllib.request.Request('https://unsplash.com/photos/crumpled-beige-parchment-paper-texture-XFWiZTa2Ub0', headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    m = re.search(r'(https://images\.unsplash\.com/photo-[a-zA-Z0-9\-]+[^\"\'\s\?]+)', html)
    if m:
        print(m.group(1))
    else:
        print('Not found')
except Exception as e:
    print(e)

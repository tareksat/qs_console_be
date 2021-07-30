import webview
import requests
import time
import os
import os.path

kill = os.path.exists("taskkill /f /im node.exe")
ok = os.path.exists("node_modules")
if ok is not True:
    os.system('npm i')

try:
    r =requests.get('http://localhost:3020')
    #print(r)
except:
    os.system('npm start &')
    time.sleep(5)



webview.create_window(
    'MixLine',
     'http://localhost:3020',
     resizable=False, 
     fullscreen=False, 
     width=600,
     height=500,
     min_size=(100, 50), 
     hidden=False, 
     frameless=False,
     minimized=False,
   # on_top=False,
    confirm_close=False,
    background_color='#000', 
    text_select=False
     )
webview.start()
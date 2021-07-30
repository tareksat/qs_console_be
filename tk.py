import webbrowser
import time
import os.path

kill = os.system("taskkill /f /im node.exe")
print(kill)
ok = os.path.exists("node_modules")

if ok is not True:
    os.system('npm i')

os.system('npm start &')
time.sleep(5)
webbrowser.open('http://localhost:3020', new=2)

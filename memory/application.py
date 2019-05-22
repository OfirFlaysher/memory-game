from flask import Flask, render_template, request
import random

app = Flask(__name__)

w = 8 
h = 5  

@app.route("/")
def index():     
    return render_template("index.html")

@app.route("/game", methods=["POST"])
def game():
    l = []
    for i in range(w * h // 2):
        l.append(i + 1)
        l.append(i + 1)    
    l = random.sample(l, len(l))
    
    players = request.form.get("players")
    kind = request.form.get("type")

    return render_template(kind + players + ".html", w=w, h=h, l=l,
                           kind=kind, players=players)

        
        

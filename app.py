from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("dashboard.html")  # ou "index.html", se você criar uma

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/cadastro")
def cadastro():
    return render_template("cadastro.html")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

@app.route("/disciplina")
def disciplina():
    return render_template("disciplina.html")

@app.route("/disciplinas")
def disciplinas():
    return render_template("disciplinas.html")

@app.route("/relogio")
def relogio():
    return render_template("relogio.html")

@app.route("/configuracoes")
def configuracoes():
    return render_template("configuracoes.html")

@app.route("/ajuda")
def ajuda():
    return render_template("ajuda.html")

@app.route("/sidebar")
def sidebar():
    return render_template("sideBar.html")

if __name__ == "__main__":
    app.run(debug=True)
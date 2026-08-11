from flask import Flask, redirect, render_template, url_for

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("login.html")

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/cadastro")
def cadastro():
    return render_template("cadastro.html")

@app.route("/logout")
def logout():
    return redirect(url_for("login"))

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

@app.route("/disciplinas")
def disciplinas():
    return render_template("disciplinas.html")

@app.route("/timer")
def timer():
    return render_template("timer.html")

@app.route("/pomodoro")
def pomodoro():
    return render_template("pomodoro.html")

@app.route("/configuracoes")
def configuracoes():
    return render_template("configuracoes.html")

@app.route("/ajuda")
def ajuda():
    return render_template("ajuda.html")

if __name__ == "__main__":
    app.run(debug=True)

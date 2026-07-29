from flask import Flask, render_template, request, redirect, session
from cs50 import SQL

app = Flask(__name__)
app.secret_key = "testPassword"  # Replace with a secure secret key in production
db = SQL("sqlite:///contact.db")


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/community")
def community():
    return render_template("community.html")


@app.route("/sponsor")
def sponsor():
    return render_template("sponsor.html")


@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        if not request.form.get("name") or not request.form.get("email") or not request.form.get("message"):
            return render_template("contact.html", error="Please fill out all fields!")
        name = request.form.get("name")
        email = request.form.get("email")
        message = request.form.get("message")
        db.execute(
            "INSERT INTO contacts (name, email, message, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)",
            name, email, message
        )
        return render_template("contact.html", success=True, name=name)
    return render_template("contact.html")

@app.route("/messages")
def messages():
    rows = db.execute("SELECT * FROM contacts")
    return rows

@app.route("/admin-login", methods=["GET", "POST"])
def admin_login():
    if request.method == "POST":
        password = request.form.get("password")

        if password == app.secret_key:
            session["admin"] = True
            return redirect("/admin")

        return render_template("admin_login.html", error="Wrong password")

    return render_template("admin_login.html")

@app.route("/admin")
def admin():
    if not session.get("admin"):
        return redirect("/admin-login")
    messages = db.execute("SELECT * FROM contacts ORDER BY created_at DESC")
    return render_template("admin.html", messages=messages)

@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")


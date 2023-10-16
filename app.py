from flask import Flask, render_template, request, redirect, url_for ,jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)

# MongoDB configuration
app.config["MONGO_URI"] = "mongodb://localhost:27017/assignment"  # Replace with your MongoDB URI
mongo = PyMongo(app)

tasks_collection = mongo.db.assignment


@app.route('/')
def index():
    tasks = tasks_collection.find()
    return render_template('index.html', tasks=tasks)

@app.route('/add_task', methods=['POST'])
def add_task():
    task_text = request.form.get('task_text')
    task_status = request.form.get('task_status', 'incomplete')

    new_task = {'text': task_text, 'status': task_status}
    tasks_collection.insert_one(new_task)

    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run()

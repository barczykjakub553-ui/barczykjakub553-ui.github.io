import os
import sqlite3
from flask import Flask, render_template, request, redirect, url_for, abort

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE = os.path.join(BASE_DIR, 'database.db')
SCHEMA = os.path.join(BASE_DIR, 'schema.sql')

app = Flask(__name__)


def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    if not os.path.exists(DATABASE):
        conn = get_db()
        with open(SCHEMA, 'r', encoding='utf-8') as f:
            conn.executescript(f.read())
        conn.commit()
        conn.close()


class Car:
    def __init__(self, id=None, subject=None, content=None, car_model=None):
        self.id = id
        self.subject = subject
        self.content = content
        self.car_model = car_model

    @staticmethod
    def from_row(row):
        return Car(id=row['id'], subject=row['subject'], content=row['content'], car_model=row['car_model'])

    @staticmethod
    def find_all():
        conn = get_db()
        rows = conn.execute('SELECT * FROM cars ORDER BY id').fetchall()
        conn.close()
        return [Car.from_row(r) for r in rows]

    @staticmethod
    def find(car_id):
        conn = get_db()
        row = conn.execute('SELECT * FROM cars WHERE id = ?', (car_id,)).fetchone()
        conn.close()
        return Car.from_row(row) if row else None

    def save(self):
        conn = get_db()
        if self.id:
            conn.execute(
                'UPDATE cars SET subject = ?, content = ?, car_model = ? WHERE id = ?',
                (self.subject, self.content, self.car_model, self.id),
            )
        else:
            cursor = conn.execute(
                'INSERT INTO cars (subject, content, car_model) VALUES (?, ?, ?)',
                (self.subject, self.content, self.car_model),
            )
            self.id = cursor.lastrowid
        conn.commit()
        conn.close()

    @staticmethod
    def delete(car_id):
        conn = get_db()
        conn.execute('DELETE FROM cars WHERE id = ?', (car_id,))
        conn.commit()
        conn.close()


@app.route('/')
def index():
    return render_template('index.html', title='Flask')


@app.route('/cars')
def cars_index():
    cars = Car.find_all()
    return render_template('cars/index.html', title='Cars List', cars=cars)


@app.route('/cars/create', methods=['GET', 'POST'])
def cars_create():
    if request.method == 'POST':
        car = Car(
            subject=request.form.get('subject'),
            content=request.form.get('content'),
            car_model=request.form.get('carModel'),
        )
        car.save()
        return redirect(url_for('cars_index'))
    return render_template('cars/create.html', title='Create New Car', car=None)


@app.route('/cars/<int:car_id>')
def cars_show(car_id):
    car = Car.find(car_id)
    if not car:
        abort(404)
    return render_template('cars/show.html', title=car.subject, car=car)


@app.route('/cars/<int:car_id>/edit', methods=['GET', 'POST'])
def cars_edit(car_id):
    car = Car.find(car_id)
    if not car:
        abort(404)
    if request.method == 'POST':
        car.subject = request.form.get('subject')
        car.content = request.form.get('content')
        car.car_model = request.form.get('carModel')
        car.save()
        return redirect(url_for('cars_index'))
    return render_template('cars/edit.html', title='Edit Car', car=car)


@app.route('/cars/<int:car_id>/delete', methods=['POST'])
def cars_delete(car_id):
    Car.delete(car_id)
    return redirect(url_for('cars_index'))


@app.errorhandler(404)
def not_found(e):
    return render_template('error.html', message='Not Found', status=404), 404


if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=57722, debug=True)

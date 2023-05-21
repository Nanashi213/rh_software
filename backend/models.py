from settings import db
from flask import request, jsonify
from datetime import datetime

class Candidate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    id_card = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    cv = db.Column(db.String(120), nullable=False)
    certificates = db.Column(db.String(120))
    job_offer_id = db.Column(db.Integer, db.ForeignKey('job_offer.id'))

class Application(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    candidate_id = db.Column(db.Integer, db.ForeignKey('candidate.id'))
    application_date = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(20), nullable=False)

class JobOffer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    requirements = db.Column(db.String(120), nullable=False)
    publication_date = db.Column(db.DateTime, nullable=False)
    vacancies = db.Column(db.Integer, nullable=False)
    salary = db.Column(db.Float, nullable=False)

class Test(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    candidate_id = db.Column(db.Integer, db.ForeignKey('candidate.id'))
    test_type = db.Column(db.String(80), nullable=False)
    test_date = db.Column(db.DateTime, nullable=False)
    result = db.Column(db.String(80), nullable=False)

class Contract(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'))
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime)
    salary = db.Column(db.Float, nullable=False)

class Affiliation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'))
    affiliation_type = db.Column(db.String(80), nullable=False)
    affiliation_date = db.Column(db.DateTime, nullable=False)
    details = db.Column(db.String(120), nullable=False)

class Evaluator(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'))
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False)

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    candidate_id = db.Column(db.Integer, db.ForeignKey('candidate.id'))
    hiring_date = db.Column(db.DateTime, nullable=False)

class Settlement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'))
    settlement_date = db.Column(db.DateTime, nullable=False)
    total_amount = db.Column(db.Float, nullable=False)

class Training(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'))
    training_date = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.String(120), nullable=False)

class Performance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'))
    evaluation_date = db.Column(db.DateTime, nullable=False)
    rating = db.Column(db.Float, nullable=False)
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(120), nullable=False)
    image = db.Column(db.String(120), nullable=False)
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'description': self.description,
            'image': self.image
        }


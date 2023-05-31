from settings import db
from enum import Enum


class CandidateStatus(Enum):
    APPLIED = "Applied"
    ACCEPTED = "Accepted"
    REJECTED = "Rejected"
    HIRED = "Hired"

class Candidate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    id_card = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    cv = db.Column(db.String(120), nullable=False)
    certificates = db.Column(db.String(120))
    status = db.Column(db.Enum(CandidateStatus), nullable=False, default=CandidateStatus.APPLIED)
    job_offer_id = db.Column(db.Integer, db.ForeignKey('job_offer.id'))

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'id_card': self.id_card,
            'email': self.email,
            'phone': self.phone,
            'cv': self.cv,
            'certificates': self.certificates,
            'status': self.status.value if self.status else None,
            'job_offer_id': self.job_offer_id
        }



class JobOffer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    requirements = db.Column(db.String(200), nullable=False)
    publication_date = db.Column(db.DateTime, nullable=False)
    vacancies = db.Column(db.Integer, nullable=False)
    salary = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'requirements': self.requirements,
            'publication_date': self.publication_date.isoformat() if self.publication_date else None,
            'vacancies': self.vacancies,
            'salary': self.salary
        }


class Test(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    candidate_id = db.Column(db.Integer, db.ForeignKey('candidate.id'))
    test_type = db.Column(db.String(80), nullable=False)
    test_date = db.Column(db.DateTime, nullable=False)
    result = db.Column(db.String(80), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'candidate_id': self.candidate_id,
            'test_type': self.test_type,
            'test_date': self.test_date.isoformat() if self.test_date else None,
            'result': self.result
        }


class Contract(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'))
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime)
    salary = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'employee_id': self.employee_id,
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'salary': self.salary
        }


class Affiliation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'))
    affiliation_type = db.Column(db.String(80), nullable=False)
    affiliation_date = db.Column(db.DateTime, nullable=False)
    details = db.Column(db.String(120), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'employee_id': self.employee_id,
            'affiliation_type': self.affiliation_type,
            'affiliation_date': self.affiliation_date.isoformat() if self.affiliation_date else None,
            'details': self.details
        }


class Evaluator(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'))
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'employee_id': self.employee_id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email
        }


class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    id_card = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    cv = db.Column(db.String(120), nullable=False)
    certificates = db.Column(db.String(120))
    hiring_date = db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'id_card': self.id_card,
            'email': self.email,
            'phone': self.phone,
            'cv': self.cv,
            'certificates': self.certificates,
            'hiring_date': self.hiring_date.isoformat() if self.hiring_date else None
        }


class Settlement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'))
    settlement_date = db.Column(db.DateTime, nullable=False)
    total_amount = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'employee_id': self.employee_id,
            'settlement_date': self.settlement_date.isoformat() if self.settlement_date else None,
            'total_amount': self.total_amount
        }


class Training(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'))
    training_date = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.String(120), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'employee_id': self.employee_id,
            'training_date': self.training_date.isoformat() if self.training_date else None,
            'description': self.description
        }


class Performance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'))
    evaluation_date = db.Column(db.DateTime, nullable=False)
    rating = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'employee_id': self.employee_id,
            'evaluation_date': self.evaluation_date.isoformat() if self.evaluation_date else None,
            'rating': self.rating
        }


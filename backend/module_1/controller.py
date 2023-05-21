from flask import request, jsonify
from datetime import datetime

import sys
sys.path.append('..')
from settings import db
from models import JobOffer

def setup_routes(app):
    @app.route('/job_offer', methods=['POST'])
    def create_job_offer():
        data = request.get_json()
        publication_date = datetime.strptime(data['publication_date'], "%d/%m/%Y")
        new_job_offer = JobOffer(
            title=data['title'],
            description=data['description'],
            requirements=data['requirements'],
            publication_date=publication_date,
            vacancies=data['vacancies'],
            salary=data['salary']
        )
        db.session.add(new_job_offer)
        db.session.commit()
        return jsonify({'message': 'New job offer created!'})
    
    @app.route('/job_offer', methods=['GET'])
    def get_job_offers():
        job_offers = JobOffer.query.all()
        output = []
        for job_offer in job_offers:
            job_offer_data = {}
            job_offer_data['id'] = job_offer.id
            job_offer_data['title'] = job_offer.title
            job_offer_data['description'] = job_offer.description
            job_offer_data['requirements'] = job_offer.requirements
            job_offer_data['publication_date'] = job_offer.publication_date
            job_offer_data['vacancies'] = job_offer.vacancies
            job_offer_data['salary'] = job_offer.salary
            output.append(job_offer_data)
        return jsonify(output)
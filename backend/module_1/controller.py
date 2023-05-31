from flask import request, jsonify
from datetime import datetime
from flask_jwt_extended import jwt_required
from flask import send_from_directory

import sys
sys.path.append('..')
from settings import db
from models import JobOffer

def setup_routes(app):
    @app.route('/job_offer', methods=['POST'])
    @jwt_required()
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
    @app.route('/job_offer/<id>', methods=['PUT'])
    @jwt_required()
    def update_job_offer(id):
        data = request.get_json()
        offer = JobOffer.query.get(id)
        
        if not offer:
            return jsonify({'message': 'Job offer not found'})

        offer.title = data.get('title', offer.title)
        offer.description = data.get('description', offer.description)
        offer.requirements = data.get('requirements', offer.requirements)
        offer.vacancies = data.get('vacancies', offer.vacancies)
        offer.salary = data.get('salary', offer.salary)

        if 'publication_date' in data:
            offer.publication_date = datetime.strptime(data['publication_date'], "%d/%m/%Y")

        db.session.commit()
        return jsonify({'message': 'Job offer updated'})

    @app.route('/job_offer/<int:id>', methods=['DELETE'])
    @jwt_required()
    def delete_job_offer(id):
        offer = JobOffer.query.get(id)
        
        if not offer:
            return jsonify({'message': 'Job offer not found'})
        
        db.session.delete(offer)
        db.session.commit()
        return jsonify({'message': 'Job offer deleted'})
    
    @app.route('/ApplicantUploads/<filename>')
    def serve_image(filename):
        return send_from_directory(app.config['APPLICANT_UPLOAD_FOLDER'], filename)

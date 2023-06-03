from flask import request, jsonify, send_from_directory, jsonify, request
from datetime import datetime
from flask_jwt_extended import jwt_required
from models import Test, Candidate, CandidateStatus,db
from sqlalchemy import exists, not_
import os
import uuid
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
    

    @app.route('/candidate', methods=['POST'])
    def create_candidate():
        cv_file = request.files['cv']
        cert_file = request.files['certificates']

        # Guardar archivo de CV con nombre único
        _, cv_ext = os.path.splitext(cv_file.filename)
        unique_cv_filename = f"{uuid.uuid4().hex}{cv_ext}"
        cv_file.save(os.path.join(app.config['APPLICANT_UPLOAD_FOLDER'], unique_cv_filename))

        # Guardar archivo de certificado con nombre único
        _, cert_ext = os.path.splitext(cert_file.filename)
        unique_cert_filename = f"{uuid.uuid4().hex}{cert_ext}"
        cert_file.save(os.path.join(app.config['APPLICANT_UPLOAD_FOLDER'], unique_cert_filename))

        new_candidate = Candidate(
            name=request.form['name'],
            last_name=request.form['last_name'],
            id_card=request.form['id_card'],
            email=request.form['email'],
            phone=request.form['phone'],
            cv=unique_cv_filename,
            certificates=unique_cert_filename,
            status='APPLIED',
            job_offer_id=request.form.get('job_offer_id')
        )
        db.session.add(new_candidate)
        db.session.commit()
        return jsonify({'message': 'New candidate created!', 'candidate_id': new_candidate.id}), 201
    
    @app.route('/candidates/applied', methods=['GET'])
    @jwt_required()
    def get_applied_candidates():
        applied_candidates = Candidate.query.filter_by(status=CandidateStatus.APPLIED).all()
        applied_candidates = [candidate.to_dict() for candidate in applied_candidates]
        return jsonify(applied_candidates), 200
    
    @app.route('/candidates/accepted', methods=['GET'])
    @jwt_required()
    def get_accepted_candidates():
        # Subquery for tests related to a candidate
        subquery = exists().where(Test.candidate_id==Candidate.id)

        # Query for candidates with status of ACCEPTED and no related test
        accepted_candidates = Candidate.query.filter(
            Candidate.status==CandidateStatus.ACCEPTED,
            not_(subquery)
        ).all()

        accepted_candidates = [candidate.to_dict() for candidate in accepted_candidates]
        return jsonify(accepted_candidates), 200
    
    @app.route('/candidate/<int:id>', methods=['GET'])
    @jwt_required()
    def get_candidate_by_id(id):
        candidate = Candidate.query.get(id)
        if candidate is None:
            return jsonify({'message': 'Candidate not found'}), 404
        return jsonify(candidate.to_dict()), 200
    
    @app.route('/candidate/status/<int:id>', methods=['PUT'])
    def change_candidate_status(id):
        data = request.get_json()
        new_status = data.get('status')
        # Comprobar que se haya proporcionado un nuevo estado
        if new_status is None:
            return jsonify({'message': 'No status provided'}), 400
        # Comprobar que el nuevo estado es válido
        if new_status not in CandidateStatus.__members__:
            return jsonify({'message': 'Invalid status'}), 400

        # Buscar al candidato
        candidate = Candidate.query.get(id)
        if candidate is None:
            return jsonify({'message': 'Candidate not found'}), 404

        # Actualizar el estado y guardar los cambios
        candidate.status = CandidateStatus[new_status.upper()]
        db.session.commit()

        return jsonify({'message': 'Status updated successfully', 'new_status': new_status}), 200
  
    @app.route('/test', methods=['POST'])
    def create_test():
        data = request.get_json()
        candidate_id = data.get('candidate_id')
        test_type = data.get('test_type')
        test_date_str = data.get('test_date')
        result = data.get('result')

        # Convertir la cadena de texto a un objeto datetime
        test_date = datetime.strptime(test_date_str, "%Y-%m-%d")

        candidate = Candidate.query.get(candidate_id)
        if not candidate:
            return jsonify({'message': 'Candidate not found'}), 404

        new_test = Test(
            candidate_id=candidate_id,
            test_type=test_type,
            test_date=test_date,
            result=result
        )
        db.session.add(new_test)
        db.session.commit()

        return jsonify({'message': 'New test created!', 'test_id': new_test.id}), 201


    @app.route('/candidates/has_test', methods=['GET'])
    def get_candidates_with_test():
        candidates_with_test = Candidate.query.join(Test).filter(Candidate.id == Test.candidate_id).all()
        candidates_data = [candidate.to_dict() for candidate in candidates_with_test]

        return jsonify(candidates_data), 200
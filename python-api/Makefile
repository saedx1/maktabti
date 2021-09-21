
create-env:
	conda create -n maktabti python=3.9

setup:
	pip install -r requirements.txt

run-dev:
	FLASK_ENV=development FLASK_APP=app.py flask run --port 3000

run-prod:
	FLASK_ENV=production uwsgi uwsgi.ini

backup-db:
	sh backup_db.sh &

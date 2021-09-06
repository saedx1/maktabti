run:
	npm run start

build:
	npm run build

deploy:
	scp -r build/* root@maktabti.xyz:/var/www/maktabti/
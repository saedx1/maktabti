FROM python:3.9.7

RUN mkdir /app

COPY . /app

WORKDIR /app

RUN make setup

CMD [ "python", "-m" , "flask", "run", "--host=0.0.0.0", "--port=3000" ]

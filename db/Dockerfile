FROM mysql:8.0

COPY init/01-init.sql /docker-entrypoint-initdb.d/

ENV MYSQL_DATABASE=subscription_automation
ENV MYSQL_USER=app_user
ENV MYSQL_PASSWORD=app_password
ENV MYSQL_ROOT_PASSWORD=rootpassword

EXPOSE 3306 
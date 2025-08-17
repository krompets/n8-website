#!/bin/bash

# Create required directories
mkdir -p data/certbot/conf
mkdir -p data/certbot/www

# Download recommended TLS parameters
if [ ! -e data/certbot/conf/options-ssl-nginx.conf ]; then
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > data/certbot/conf/options-ssl-nginx.conf
fi

if [ ! -e data/certbot/conf/ssl-dhparams.pem ]; then
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > data/certbot/conf/ssl-dhparams.pem
fi

# Request certificate
docker-compose run --rm certbot certonly --webroot -w /var/www/certbot --email contactn8team@gmail.com -d n8.team --rsa-key-size 4096 --agree-tos --force-renewal

# Reload nginx
docker-compose restart frontend 
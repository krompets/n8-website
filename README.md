# n8.team website beta
### Installation app
 - Install Docker
 - run `docker-compose up`

### Configure SSL
1. Go to site folder
 ```
 cd n8-website
 ```
2. Download script
```
curl -L https://raw.githubusercontent.com/wmnnd/nginx-certbot/master/init-letsencrypt.sh > init-letsencrypt.sh
```
3. Modify script with your site and email
4. Run script:
```
chmod +x init-letsencrypt.sh && sudo ./init-letsencrypt.sh
```

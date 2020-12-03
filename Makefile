clear-lib:
	rm -rf node_modules/

nginx-build:
	sh docker/network.sh
	docker-compose -f docker/nginx/docker-compose.yaml build --force-rm
nginx-up:
	docker-compose -f docker/nginx/docker-compose.yaml up -d
nginx-renew:
	docker-compose -f docker/nginx/docker-compose.yaml up -d --build --force-recreate
nginx-down:
	docker-compose -f docker/nginx/docker-compose.yaml down -v --remove-orphans 
nginx-logs:
	sh docker/nginx/logs.sh
nginx-reload:
	sh docker/nginx/reload.sh


web-dev:
	docker-compose -f docker/web/docker-compose.yaml up
web-build:
	sh docker/network.sh
	docker-compose -f docker/web/docker-compose.yaml build --force-rm 
web-down:
	docker-compose -f docker/web/docker-compose.yaml down
web-renew:
	docker-compose -f docker/web/docker-compose.yaml down -v --remove-orphans 
	docker-compose -f docker/nginx/docker-compose.yaml up -d --build --force-recreate
web-logs:
	docker logs 


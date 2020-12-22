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


dev-up:
	docker-compose -f docker/web/docker-compose.yaml up -d --force-recreate
	$(MAKE) dev-logs
dev-build:
	sh docker/network.sh && \
	docker-compose -f docker/web/docker-compose.yaml build --force-rm
dev-down:
	docker-compose -f docker/web/docker-compose.yaml down -v --remove-orphans 
dev-renew:
	docker-compose -f docker/web/docker-compose.yaml down -v --remove-orphans
	docker-compose -f docker/web/docker-compose.yaml up -d --build --force-recreate
	$(MAKE) dev-logs
dev-logs:
	docker logs elderwand-web -f --tail=10


npm-proxy-cache-up:
	docker-compose -f docker/npm-proxy-cache/docker-compose.yaml up -d --force-recreate
set-proxy:
	yarn config set proxy http://rex.com:28080
	yarn config set https-proxy http://rex.com:28080
	yarn config set strict-ssl false

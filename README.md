# G13.ElderWand.Web

## develop method

```cmd
make nginx-build
make nginx-up

make web:build

yarn web:dev or yarn web:dev:install

```

```cmd
curl -sSL https://get.docker.com/ | sh
docker pull folha/npm-proxy-cache
docker run --restart=always --net=host -p 8080:8080 -t folha/npm-proxy-cache --name=npm-proxy-cache
npm --proxy http://npm-proxy-cache:8080 --https-proxy http://npm-proxy-cache:8080 --strict-ssl false install
```

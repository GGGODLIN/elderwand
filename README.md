# G13.ElderWand.Web

## develop in container

1. Pull the main project and the shared project
2. Open shared project and Run yarn install
3. RUN yarn build:server or yarn build:server:w in G13.Web.Shared
4. RUN make npm-proxy-cache-up
5. RUN make set-proxy
6. RUN make nginx-build && make nginx-up
7. Put .env files
8. RUN yarn web:install
9. RUN yarn shared:relink
10. RUN make dev-build
11. RUN make dev-up

# G13.ElderWand.Web

## develop tool

### nvm

```cmd
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

```

### yarn

```cmd

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt update && sudo apt install yarn
sudo apt update && sudo apt install --no-install-recommends yarn

```

## develop in container

1. Pull the main project and the shared project
2. Open shared project and Run yarn install
3. RUN yarn build:server or yarn build:server:w in G13.Web.Shared
4. RUN yarn link in G13.Web.Shared
5. RUN make npm-proxy-cache-up
6. RUN make set-proxy
7. RUN make nginx-build && make nginx-up
8. Put .env files
9. RUN yarn web:install
10. RUN yarn shared:relink
11. RUN make dev-build
12. RUN make dev-up


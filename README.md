# G13.ElderWand.Web

## develop tool

### nvm

```cmd
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
or
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

```

### yarn

```cmd

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt update && sudo apt install yarn
or
sudo apt update && sudo apt install --no-install-recommends yarn

```

## develop

1. Pull the main project and the shared project

```cmd

rm -f yarn.lock yarn-error.log
yarn global add typescript
yarn install

yarn lib:link:install

yarn lib:link:clear
yarn lib:link:create
yarn lib:link

# for localhost dev
yarn web:install
yarn web:dev

```


<!-- 1. Open shared project and Run yarn install
2. RUN yarn build:server or yarn build:server:w in G13.Web.Shared
3. RUN yarn link in G13.Web.Shared
4. RUN make npm-proxy-cache-up
5. RUN make set-proxy
6. RUN make nginx-build && make nginx-up
7.  Put .env files
8.  RUN yarn web:install
9.  RUN yarn shared:relink
10. RUN make dev-build
11. RUN make dev-up
 -->

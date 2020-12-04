const version = require("./package.json").version;
const webpack = require("webpack");
const dotenv = require("dotenv");

const env = dotenv.config({
    path: process.env.NODE_ENV ? `./.env.${process.env.NODE_ENV}` : `./.env`,
}).parsed;

function NextConfig() {
    return (phase, { defaultConfig }) => {

        const config = {
            ...defaultConfig,
            publicRuntimeConfig: {
                staticFolder: "/static",
            },
            // for build time
            env: {
                VERSION: version,
            },
            webpack: (
                config,
                { buildId, dev, isServer, defaultLoaders, webpack }
            ) => {
                console.log("webpack", {
                    buildId,
                    defaultLoaders,
                    dev,
                    isServer,
                });

                config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));

                return config;
            },
            experimental: {
                cpus: 4
            }

        };

        console.log({ config });

        return {
            ...config,
        };
    };
}

module.exports = NextConfig();

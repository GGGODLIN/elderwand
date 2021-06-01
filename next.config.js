const version = require("./package.json").version;
// const webpack = require("webpack");
const dotenv = require("dotenv");

const env = dotenv.config({
    path: process.env.NODE_ENV ? `./.env.${process.env.NODE_ENV}` : `./.env`,
}).parsed;

function NextConfig() {
    return (phase, { defaultConfig }) => {

        const config = {
            ...defaultConfig,
            // for build time
            env: {
                ...env,
                VERSION: version,
            },
            // publicRuntimeConfig: {
            //     staticFolder: "/static",
            // },
            // serverRuntimeConfig: {
            // },
            future: {
                webpack5: true,
            },
            webpack: (
                config,
                { buildId, dev, isServer, defaultLoaders, webpack }
            ) => {
                // console.log("webpack", {
                //     buildId,
                //     defaultLoaders,
                //     dev,
                //     isServer,
                // });

                config.plugins = config.plugins || [];
                config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
                // config.plugins.push(new webpack.DefinePlugin({
                //     'process.env': JSON.stringify(env),
                //     'process.env.VERSION': JSON.stringify(version),
                // }));

                return config;
            },
            // experimental: {
            //     cpus: 8
            // }
        };

        // console.log({ config });

        return config;
    };
}

module.exports = NextConfig();

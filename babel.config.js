module.exports = {
    presets: [
        ["@babel/preset-env", {targets:{node:"current"}}],
        "@babel/preset-typescript"
    ],
    plugins: [
        [
            "module-resolver",
            {
                alias: {
                    "@modules": "./src/modules",
                    "@config": "./src/config",
                    "@shared": "./src/shared",
                    "@errors": "./src/errors",
                    "@utils": "./src/utils"
                }
            }
        ],
        "babel-plugin-transform-typescript-metadata",
        ["@babel/plugin-proposal-decorators", {legacy:true}],
        ["@babel/plugin-proposal-class-properties", {loose:true}],
    ]
}

//quando for passar propriedade usar o colchetes, se for usar só o plugin poem direto
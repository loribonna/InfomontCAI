module.exports = {
    apps: [{
        name: "infomont_cai",
        script: "./index.js",
        env: {
            NODE_ENV: "default",
            DEBUG: true
        },
        env_production: {
            NODE_ENV: "production",
            DEBUG: false
        },
        output: './output.log',
        error: './error.log',
        merge_logs: true,
        log_date_format: "DD-MM-YYYY",
        kill_timeout: 1600
    }]
}
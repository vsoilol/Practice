const PROXY_CONFIG = [
  {
    context: [
      "/api/weatherforecast",
      "/api/user"
    ],
    target: "https://localhost:7020",
    secure: false
  }
]

module.exports = PROXY_CONFIG;

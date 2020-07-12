module.exports = {
  servers: [
    {
      ip: "test.com",
      name: "randomName",
      port: 27015,
      rconPassword: "abc",
    },
    {
      ip: "test.com",
      port: 27016,
      rconPassword: "xyz",
    },
    {
      ip: "randomserver.com",
      port: 27017,
      rconPassword: "xyz",
    },
    {
      ip: "randomservers.com",
      port: 27020,
      rconPassword: "xyz",
    },
  ],
  influxHost: "192.xxx.xxx.xxx",
  influxDatabase: "telegrafCsgo",
  influxUsername: "username",
  influxPassword: "password",
};

const { connect, TimeoutError } = require("working-rcon");
const config = require("./config");
const Influx = require("influx");
const schedule = require("node-schedule");

async function getStats(server) {
  let result;
  try {
    const client = await connect(
      server.ip,
      server.port,
      server.rconPassword,
      5000
    );
    const stats = await client.command("stats");
    await client.disconnect();
    result = stats;
  } catch (err) {
    if (err instanceof TimeoutError) {
      console.error("request timed out");
    } else {
      throw err;
    }
  }
  var resultArray = result.split(/\r?\n/);
  const headers = resultArray[0].split(/\s+/);
  const data = resultArray[1].split(/\s+/);
  headers.shift();
  data.shift();
  const dataRes = { host: server.name || server.ip + ":" + server.port };
  headers.forEach((item, index) => {
    dataRes[item] = data[index] || -1; // set value to -1 if value is undefined/null
  });
  return dataRes;
}

const saveDataToInflux = (data) => {
  const influx = new Influx.InfluxDB({
    host: config.influxHost,
    database: config.influxDatabase,
    username: config.influxUsername,
    password: config.influxPassword,
    schema: [
      {
        measurement: "csgoServerStats",
        fields: {
          CPU: Influx.FieldType.INTEGER,
          NetIn: Influx.FieldType.INTEGER,
          NetOut: Influx.FieldType.INTEGER,
          UpTime: Influx.FieldType.INTEGER,
          Maps: Influx.FieldType.INTEGER,
          FPS: Influx.FieldType.INTEGER,
          Players: Influx.FieldType.INTEGER,
          Ms: Influx.FieldType.INTEGER,
          Tick: Influx.FieldType.INTEGER,
        },
        tags: ["host"],
      },
    ],
  });
  influx.writePoints([
    {
      measurement: "csgoServerStats",
      tags: { host: data.host },
      fields: {
        CPU: data.CPU,
        NetIn: data.NetIn,
        NetOut: data.NetOut,
        UpTime: data.UpTime,
        Maps: data.Maps,
        FPS: data.FPS,
        Players: data.Players,
        Ms: data["+-ms"],
        Tick: data["~tick"],
      },
    },
  ]);
};

schedule.scheduleJob("* * * * *", function () {
  config.servers.forEach((server) => {
    console.log("Running job for: " + server.ip);
    getStats(server).then((result) => {
      saveDataToInflux(result);
    });
  });
});

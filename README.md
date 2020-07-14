# SRCDS InfluxDB exporter

ONLY SUPPORTS CSGO

## How to install

### Method 1 : Download sources and run

You need to have NodeJS installed if you want to run the sources, NVM (Node Version Manager) is a simple tool to get it running : https://github.com/nvm-sh/nvm

1. Download the repo (using git clone or direct zip download)
2. Enter the srcds_exporter directory and run `npm i`, this will install all required dependencies
3. Update the example.config.js and rename it to config.js. For more info see #Config Setup
4. Start the script with node : `node index.js`, you can create a service or run it in a screen to keep it active in background. To script will run once a minute and update InfluxDB with the latest data.

## Grafana dashboard

Is there a Grafana dashboard available ? YES!

https://grafana.com/grafana/dashboards/12645

![alt text](https://user-images.githubusercontent.com/13179116/87427585-4f7b1000-c5e1-11ea-92fd-a674196b3aa6.png)

## Config Setup

1. influxHost = your ip or hostname to your InfluxDB
2. influxDatabase = name of your InfluxDB
3. influxUsername = username to your InfluxDB
4. influxPassword = password to your InfluxDB

5. 
servers is a list of servers. If you got multiple just add another
{
ip: "care-free.net",
port: 27015,
rconPassword: "xyz",
},

and you should be good to go! If you only got 1, remove the remaining onces.

We don't fetch the name of the server so if you want to specificy it instead of the IP:PORT as dashboard info. add "Name" to it like below
{
ip: "care-free.net",
name: "Surf Tier 1-6",
port: 27015,
rconPassword: "xyz",
},

### Support

If you encounter any issue, feel free to open an issue or contact me on Discord!

-Discord : Fragstealern#2543

Original creator, using promethus as datasource.

- Twitter : [@Unyxos](https://twitter.com/Unyxos)
- Discord : Unyxos#1337
- Email : [me@corentincloss.fr](mailto://me@corentincloss.fr)

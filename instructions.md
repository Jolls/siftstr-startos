# Siftstr

## Documentation

- [Siftstr README](https://github.com/Jolls/Siftstr/blob/main/README.md) — what Siftstr is, how sources and destinations work, and how its data is kept
- [Claude scheduled task](https://github.com/Jolls/Siftstr/blob/main/docs/scheduled-task.md) — creating the API key and the morning summarizer task

## What you get on StartOS

Siftstr runs with its database and encryption key on this service's own volume, reachable at the Web Interface address. StartOS creates your admin login and picks the address Siftstr uses for its own links; everything else (sources, destinations, timers, prompts) is set inside Siftstr.

## Getting set up

1. Complete the **Create your admin login** task. It runs **Set Admin Password** and shows your username and password.
2. Complete the **Choose the address Siftstr uses for itself** task by picking the address you will open Siftstr at. The Claude scheduled task has to reach this same address, so pick one it can reach: a public HTTPS address if the task runs in Claude's cloud, or a LAN or VPN address if it runs on a machine on your network.
3. Start the service, open the Web Interface, and sign in.
4. In Siftstr, open **Settings, Destinations** and add your Miniflux connection (plus Karakeep and MeTube if you use them). Run **Show Internal Addresses** to get the address of each of those services on this server, and paste it as the URL. Create the API key in the other service.
5. Create an API key under **Settings, API keys** and set up the Claude scheduled task as described in the documentation above.

## Using Siftstr

### Actions

- **Set Admin Password** — generates a new password for the `admin` account and shows it. Running it again replaces the password.
- **Set Base URL** — changes the address Siftstr uses for its own links. Change it if you switch how you reach Siftstr, and update the address in the Claude task to match.
- **Show Internal Addresses** — shows the addresses of Miniflux, Karakeep and MeTube on this server, for use as destination URLs inside Siftstr.

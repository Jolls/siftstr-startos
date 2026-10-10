<p align="center">
  <img src="icon.svg" alt="Siftstr Logo" width="21%">
</p>

# Siftstr on StartOS

> Everything not listed in this document should behave the same as upstream
> Siftstr. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

Siftstr is a self-hosted daily triage gate for Miniflux and Nostr: a Claude scheduled task summarizes new items each morning and you archive, promote, or keep each one. This package runs the upstream image against a single SQLite database on its own volume. Upstream project: [Jolls/Siftstr](https://github.com/Jolls/Siftstr).

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

One subcontainer, `siftstr-sub`, runs the unmodified upstream image `ghcr.io/jolls/siftstr` through its own entrypoint (`/siftstr serve`). Architectures: x86_64 and aarch64. The image is distroless and has no `chown`, so the daemon runs as root to write the volume; an attached shell is not available, only `/siftstr` subcommands.

## Volume and Data Layout

A single volume, `main`, holds everything. The `data` subpath is mounted at `/data` and holds Siftstr's `siftstr.db` (SQLite, WAL mode), the `secret.key` that encrypts saved upstream credentials, `briefings/` and the daily snapshots in `backups/`. `store.json` at the volume root holds this package's own state.

## File Models

`store.json` on the `main` volume is the only file model. `baseUrl` is written by **Set Base URL** and passed to Siftstr as `SIFTSTR_BASE_URL` on every start, so it is re-asserted on each launch. `adminCreated` records that the admin user exists. A hand edit of `baseUrl` survives only until the action is run again. Siftstr's own settings live in its database and are never written by the package.

## Dependencies

None declared. Siftstr connects to Miniflux, Karakeep and MeTube through destinations configured inside its own UI, using the address and API key the user enters; the package does not read or write them.

## Network Access and Interfaces

One interface, `ui` (type `ui`), serves plain HTTP on port 8080: the web app, `GET /healthz`, and the JSON API under `/api/v1/` used by the Claude scheduled task. The API shares the interface, so the Claude task reaches it at the same address as the browser.

## Installation and First-Run Flow

Install does not create a user and the service does not start until both critical tasks are cleared, so there is no window in which an unconfigured instance is reachable. **Set Admin Password** creates the `admin` user with `siftstr user add --admin` on its first run and uses `siftstr user set-password` afterwards; both read the password from stdin.

## Actions

- **Set Admin Password** — run it for first setup, or to replace a lost password. It changes only the `admin` row in `siftstr.db`, takes a few seconds, and works whether the service is running or stopped. Each run replaces the password and returns the new one; sessions already signed in are not touched by the package.
- **Set Base URL** — run it to change the address Siftstr uses for absolute links and the `Secure` cookie flag. It writes `baseUrl` in `store.json`, which the daemon reads reactively.
- **Show Internal Addresses** — read-only and safe to repeat. Resolves the bridge address and assigned port of Miniflux (`ui`, 8080), Karakeep (`ui`, 3000) and MeTube (`ui-multi`, 8081) when installed. The port can change if that service is reinstalled, so re-run it when a destination stops connecting.

## Tasks

- **Create your admin login** — `critical`. Raised while `adminCreated` is false. Cleared by running **Set Admin Password**; it does not return unless `store.json` is lost.
- **Choose the address Siftstr uses for itself** — `critical`. Raised while `baseUrl` is empty, and again if the chosen address is no longer one of the interface's addresses. Cleared by running **Set Base URL**.

## Health Checks

`Web Interface` requests `/healthz` on port 8080 and succeeds on a 200. A failure right after start usually means the database is still opening; one that persists points to a problem with `/data`, so read the service logs.

## Backups and Restore

The whole `main` volume is copied, including `briefings/`, `backups/`, `secret.key` and the live `siftstr.db`. Siftstr also writes a consistent snapshot to `/data/backups/` every day and keeps the newest seven, so a copy of the live WAL database is not the only recovery point. After a restore the user signs in with the password that was current at backup time; the saved connections still decrypt because `secret.key` is restored with them.

## Limitations and Differences

1. `SIFTSTR_ADMIN_USER` and `SIFTSTR_ADMIN_PASSWORD` are never set; the admin is created through **Set Admin Password**.
2. `SIFTSTR_SECRET_KEY` is not set; Siftstr generates `/data/secret.key` itself.
3. Siftstr terminates no TLS and the package does not either; HTTPS comes from the StartOS address chosen in **Set Base URL**.
4. Mounting a private CA through `SSL_CERT_DIR` is not offered.

---

## Quick Reference for AI Consumers

```yaml
package_id: siftstr
image: ghcr.io/jolls/siftstr
architectures: [x86_64, aarch64]
subcontainers: [siftstr-sub]
volumes:
  main: /data # subpath data
file_models:
  - store.json
startos_managed_env_vars:
  - SIFTSTR_BASE_URL
dependencies: none
interfaces:
  ui: { type: ui, port: 8080 }
actions:
  - set-admin-password
  - set-base-url
  - show-internal-addresses
tasks:
  - { action: set-admin-password, severity: critical }
  - { action: set-base-url, severity: critical }
health_checks:
  - siftstr
```

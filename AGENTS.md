# AGENTS.md

- Never add a migration, oneshot, or init step that deletes, recreates, or restores `/data`: users run live databases there.
- The daemon runs as `root` because the distroless image has no `chown`; do not drop `user: 'root'` from `main.ts` or the admin action without testing a fresh volume.

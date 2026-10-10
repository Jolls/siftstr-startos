# Updating the upstream version

Upstream is `Jolls/Siftstr`. The package runs its published image unmodified, pinned by tag in `startos/manifest/index.ts` (`images.siftstr.source.dockerTag`).

## Determining the upstream version

```bash
gh api repos/Jolls/Siftstr/tags -q '.[].name'
docker manifest inspect ghcr.io/jolls/siftstr:<version> | jq -r '.manifests[].platform | "\(.os)/\(.architecture)"'
```

Tags are `vX.Y.Z` in git and `X.Y.Z` on ghcr.io. Confirm both `linux/amd64` and `linux/arm64` are listed before bumping.

## Applying the bump

1. Set the tag in `startos/manifest/index.ts`.
2. Set `version` in `startos/versions/current.ts` to `<upstream version>:0`, and update the release notes in all five locales.
3. Never add a migration that touches `/data`: users keep live databases there.

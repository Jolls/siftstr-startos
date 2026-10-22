import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'siftstr',
  title: 'Siftstr',
  license: 'AGPL-3.0',
  packageRepo: 'https://github.com/Jolls/siftstr-startos',
  upstreamRepo: 'https://github.com/Jolls/Siftstr',
  marketingUrl: 'https://github.com/Jolls/Siftstr',
  donationUrl: null,
  description: { short, long },
  volumes: ['main'],
  images: {
    siftstr: {
      source: { dockerTag: 'ghcr.io/jolls/siftstr:0.2.13' },
      arch: ['x86_64', 'aarch64'],
    },
  },
})

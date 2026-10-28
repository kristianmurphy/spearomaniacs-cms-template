import {defineCliConfig} from 'sanity/cli'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || ''
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const appId = process.env.SANITY_STUDIO_APP_ID

if (projectId === '5v60gbu6') {
  throw new Error(
    'This is the CMS template. Create your own Sanity project and replace SANITY_STUDIO_PROJECT_ID; do not use the Spearomaniacs production project.',
  )
}

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  ...(appId
    ? {
        deployment: {
          appId,
          /**
           * Enable auto-updates for studios.
           * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
           */
          autoUpdates: true,
        },
      }
    : {}),
})

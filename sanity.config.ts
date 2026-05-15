import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {SubmitOrderToPrintfulAction} from './components/order-submit-to-printful-action'
import {NewsletterSyncTool} from './components/newsletter-sync-tool'
import {PrintfulImportTool} from './components/printful-import-tool'
import {schemaTypes} from './schemaTypes'

const API_VERSION = '2024-06-01'
const studioTitle = import.meta.env.SANITY_STUDIO_TITLE || 'Storefront Template CMS'
const projectId = import.meta.env.SANITY_STUDIO_PROJECT_ID || ''
const dataset = import.meta.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: studioTitle,

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings'),
              ),
            S.listItem()
              .title('Shop Page Settings')
              .child(
                S.documentTypeList('page')
                  .apiVersion(API_VERSION)
                  .title('Shop Page Settings')
                  .filter('slug.current == "shop"'),
              ),
            S.listItem()
              .title('Shop Products')
              .child(
                S.documentTypeList('product').title('Shop Products'),
              ),
            S.listItem()
              .title('Orders')
              .child(
                S.documentTypeList('order').title('Orders'),
              ),
            S.listItem()
              .title('Newsletter Audience')
              .child(
                S.documentTypeList('newsletterSubscriber').title('Newsletter Audience'),
              ),
            S.listItem()
              .title('Sync Newsletter to Resend')
              .child(
                S.component(NewsletterSyncTool).title('Sync Newsletter to Resend'),
              ),
            S.listItem()
              .title('Account Newsletter Opt-Ins')
              .child(
                S.documentTypeList('user')
                  .apiVersion(API_VERSION)
                  .title('Account Newsletter Opt-Ins')
                  .filter('newsletterOptIn == true'),
              ),
            S.listItem()
              .title('Users')
              .child(
                S.documentTypeList('user').title('Users'),
              ),
            S.listItem()
              .title('Updates')
              .child(
                S.documentTypeList('update').title('Updates'),
              ),
            S.listItem()
              .title('Updates Page Settings')
              .child(
                S.documentTypeList('page')
                  .apiVersion(API_VERSION)
                  .title('Updates Page Settings')
                  .filter('slug.current == "updates"'),
              ),
            S.listItem()
              .title('Recipes')
              .child(
                S.documentTypeList('recipe').title('Recipes'),
              ),
            S.listItem()
              .title('Recipes Page Settings')
              .child(
                S.documentTypeList('page')
                  .apiVersion(API_VERSION)
                  .title('Recipes Page Settings')
                  .filter('slug.current == "recipes"'),
              ),
            S.listItem()
              .title('Import Printful Products')
              .child(
                S.component(PrintfulImportTool).title('Import Printful Products'),
              ),
            S.listItem()
              .title('Explore Page (/explore)')
              .child(
                S.documentTypeList('page')
                  .apiVersion(API_VERSION)
                  .title('Explore Page')
                  .filter('slug.current == "explore"'),
              ),
            S.listItem()
              .title('All Pages')
              .child(
                S.documentTypeList('page').title('Pages'),
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (previousActions, context) =>
      context.schemaType === 'order'
        ? [SubmitOrderToPrintfulAction, ...previousActions]
        : previousActions,
  },
})

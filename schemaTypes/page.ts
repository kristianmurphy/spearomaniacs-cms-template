import {defineField, defineType} from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    {name: 'basics', title: 'Basics', default: true},
    {name: 'preview', title: 'Landing Preview'},
    {name: 'body', title: 'Body Content'},
    {name: 'media', title: 'Photo Galleries'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'basics',
    }),
    defineField({
      name: 'pageTabTitle',
      title: 'Page Tab Title',
      type: 'string',
      group: 'basics',
      description: 'Used in the browser tab title after the site name, for example "Home" or "Explore".',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
      group: 'basics',
      description: 'Used in the page URL, for example /shop or /about.',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'preview',
      description: 'Short summary used on the landing page and as the page intro.',
    }),
    defineField({
      name: 'tagline',
      title: 'Page Tagline',
      type: 'string',
      group: 'basics',
      description: 'Optional short line shown under the main page heading.',
    }),
    defineField({
      name: 'previewImage',
      title: 'Preview Image',
      type: 'image',
      options: {hotspot: true},
      group: 'preview',
      description: 'Optional image shown on the landing page preview card.',
    }),
    defineField({
      name: 'bannerImage',
      title: 'Banner Image',
      type: 'image',
      options: {hotspot: true},
      group: 'preview',
      description: 'Optional black-and-white style image used in the top page banner.',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
      group: 'body',
      description: 'Main page content shown on the page detail view.',
    }),
    defineField({
      name: 'photoGalleries',
      title: 'Photo Galleries',
      type: 'array',
      group: 'media',
      description: 'Optional titled galleries shown as carousels on pages like Explore.',
      of: [
        defineField({
          name: 'photoGallery',
          title: 'Photo Gallery',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Gallery Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'photos',
              title: 'Photos',
              type: 'array',
              of: [
                defineField({
                  name: 'photo',
                  title: 'Photo',
                  type: 'image',
                  options: {hotspot: true},
                }),
              ],
              validation: (rule) => rule.min(1),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'photos.0',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
  },
})

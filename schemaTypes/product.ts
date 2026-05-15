import {defineField, defineType} from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    {name: 'basics', title: 'Basics', default: true},
    {name: 'shop', title: 'Shop Display'},
    {name: 'printful', title: 'Printful'},
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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
      group: 'basics',
    }),
    defineField({
      name: 'isVisible',
      title: 'Show In Shop',
      type: 'boolean',
      initialValue: true,
      group: 'basics',
      description: 'Turn this off to keep the product hidden from the storefront.',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false,
      group: 'shop',
      description: 'Featured products are shown first in the shop grid.',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 10,
      group: 'shop',
      description: 'Lower numbers appear first.',
    }),
    defineField({
      name: 'priceLabel',
      title: 'Price Label',
      type: 'string',
      group: 'shop',
      description: 'Optional storefront override like "$42" or "From $42". Leave blank to use the imported Printful price.',
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      group: 'shop',
      description: 'Optional short label such as New, Limited, or Best Seller.',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      group: 'shop',
      description: 'Short copy shown on the shop listing card.',
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {hotspot: true},
      group: 'shop',
      description: 'Optional override image. If empty, the storefront can fall back to the imported Printful thumbnail.',
    }),
    defineField({
      name: 'hoverImage',
      title: 'Hover Image',
      type: 'image',
      options: {hotspot: true},
      group: 'shop',
      description: 'Optional second storefront image shown on hover in the shop grid.',
    }),
    defineField({
      name: 'storefrontMockupGallery',
      title: 'Storefront Mockup Gallery',
      type: 'array',
      group: 'shop',
      description:
        'Ordered storefront gallery. Image #1 is the default product image. Image #2 is used for hover in the shop grid.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              validation: (rule) => rule.required(),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Optional short label used for accessibility and gallery controls.',
            },
          ],
          preview: {
            select: {
              title: 'label',
              media: 'image',
            },
            prepare({title, media}) {
              return {
                title: title || 'Storefront image',
                media,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'additionalMockupImages',
      title: 'Additional Mockup Images',
      type: 'array',
      group: 'shop',
      description: 'Extra storefront images used across all color options.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              validation: (rule) => rule.required(),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Optional short label used for accessibility and gallery controls.',
            },
          ],
          preview: {
            select: {
              title: 'label',
              media: 'image',
            },
            prepare({title, media}) {
              return {
                title: title || 'Additional mockup',
                media,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'colorMockupGroups',
      title: 'Color Mockup Galleries',
      type: 'array',
      group: 'shop',
      description: 'Optional color-specific galleries. These images are shown first when that color is selected.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'color',
              title: 'Color Name',
              type: 'string',
              validation: (rule) => rule.required(),
              description: 'Match the imported color name, for example White or Black.',
            },
            {
              name: 'images',
              title: 'Images',
              type: 'array',
              validation: (rule) => rule.min(1),
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'image',
                      title: 'Image',
                      type: 'image',
                      options: {hotspot: true},
                      validation: (rule) => rule.required(),
                    },
                    {
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      description: 'Optional short label used for accessibility and gallery controls.',
                    },
                  ],
                  preview: {
                    select: {
                      title: 'label',
                      media: 'image',
                    },
                    prepare({title, media}) {
                      return {
                        title: title || 'Color mockup',
                        media,
                      }
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'color',
            },
            prepare({title}) {
              return {
                title: title || 'Color gallery',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'printfulSyncProductId',
      title: 'Printful Sync Product ID',
      type: 'string',
      group: 'printful',
      description: 'The Printful sync product ID for this item.',
      readOnly: true,
    }),
    defineField({
      name: 'printfulExternalId',
      title: 'Printful External ID',
      type: 'string',
      group: 'printful',
      description: 'Optional external reference used by your storefront sync logic.',
      readOnly: true,
    }),
    defineField({
      name: 'printfulThumbnailUrl',
      title: 'Printful Thumbnail URL',
      type: 'url',
      group: 'printful',
      description: 'Imported storefront thumbnail from Printful.',
      readOnly: true,
    }),
    defineField({
      name: 'printfulBaseImageUrl',
      title: 'Printful Base Image URL',
      type: 'url',
      group: 'printful',
      description: 'Imported base garment image from Printful variants.',
      readOnly: true,
    }),
    defineField({
      name: 'printfulVariantCount',
      title: 'Printful Variant Count',
      type: 'number',
      group: 'printful',
      description: 'Number of synced variants currently available in Printful.',
      readOnly: true,
    }),
    defineField({
      name: 'printfulPriceLabel',
      title: 'Printful Price Label',
      type: 'string',
      group: 'printful',
      description: 'Imported price label from Printful, used as a fallback when no manual price label is set.',
      readOnly: true,
    }),
    defineField({
      name: 'productType',
      title: 'Product Type',
      type: 'string',
      group: 'printful',
      description: 'Imported product type used for storefront filters.',
      readOnly: true,
    }),
    defineField({
      name: 'audienceTags',
      title: 'Audience Tags',
      type: 'array',
      of: [{type: 'string'}],
      group: 'printful',
      description: 'Imported audience tags used for storefront filters.',
      readOnly: true,
    }),
    defineField({
      name: 'availableSizes',
      title: 'Available Sizes',
      type: 'array',
      of: [{type: 'string'}],
      group: 'printful',
      description: 'Imported sizes used for storefront filters.',
      readOnly: true,
    }),
    defineField({
      name: 'availableColors',
      title: 'Available Colors',
      type: 'array',
      of: [{type: 'string'}],
      group: 'printful',
      description: 'Imported colors used for storefront filters.',
      readOnly: true,
    }),
    defineField({
      name: 'printfulVariants',
      title: 'Printful Variants',
      type: 'array',
      group: 'printful',
      readOnly: true,
      of: [
        {
          type: 'object',
          fields: [
            {name: 'syncVariantId', title: 'Sync Variant ID', type: 'string', readOnly: true},
            {name: 'externalId', title: 'External ID', type: 'string', readOnly: true},
            {name: 'name', title: 'Name', type: 'string', readOnly: true},
            {name: 'catalogVariantId', title: 'Catalog Variant ID', type: 'string', readOnly: true},
            {name: 'retailPrice', title: 'Retail Price', type: 'string', readOnly: true},
            {name: 'currency', title: 'Currency', type: 'string', readOnly: true},
            {name: 'sku', title: 'SKU', type: 'string', readOnly: true},
            {name: 'size', title: 'Size', type: 'string', readOnly: true},
            {name: 'color', title: 'Color', type: 'string', readOnly: true},
            {name: 'availabilityStatus', title: 'Availability Status', type: 'string', readOnly: true},
          ],
        },
      ],
      description: 'Imported Printful size and color combinations with sync variant IDs.',
    }),
    defineField({
      name: 'printfulMockups',
      title: 'Printful Mockups',
      type: 'array',
      group: 'printful',
      readOnly: true,
      of: [
        {
          type: 'object',
          fields: [
            {name: 'url', title: 'URL', type: 'url', readOnly: true},
            {name: 'thumbnailUrl', title: 'Thumbnail URL', type: 'url', readOnly: true},
            {name: 'type', title: 'Type', type: 'string', readOnly: true},
            {name: 'label', title: 'Label', type: 'string', readOnly: true},
            {name: 'isVisible', title: 'Visible', type: 'boolean', readOnly: true},
            {
              name: 'syncVariantIds',
              title: 'Sync Variant IDs',
              type: 'array',
              of: [{type: 'string'}],
              readOnly: true,
            },
          ],
        },
      ],
      description: 'Imported preview and mockup URLs from Printful.',
    }),
    defineField({
      name: 'lastImportedAt',
      title: 'Last Imported At',
      type: 'datetime',
      group: 'printful',
      description: 'Timestamp of the most recent import from Printful.',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      priceLabel: 'priceLabel',
      isVisible: 'isVisible',
      isFeatured: 'isFeatured',
    },
    prepare({title, media, priceLabel, isVisible, isFeatured}) {
      const flags = [isFeatured ? 'Featured' : null, isVisible === false ? 'Hidden' : null]
        .filter(Boolean)
        .join(' • ')

      return {
        title,
        media,
        subtitle: [priceLabel, flags].filter(Boolean).join(' • '),
      }
    },
  },
})

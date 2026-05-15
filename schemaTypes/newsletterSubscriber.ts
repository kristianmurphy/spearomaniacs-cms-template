import {defineField, defineType} from 'sanity'

export const newsletterSubscriberType = defineType({
  name: 'newsletterSubscriber',
  title: 'Newsletter Audience',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'emailNormalized',
      title: 'Email Normalized',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      initialValue: 'site-footer',
      readOnly: true,
    }),
    defineField({
      name: 'subscribedAt',
      title: 'Subscribed At',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'source',
    },
  },
})

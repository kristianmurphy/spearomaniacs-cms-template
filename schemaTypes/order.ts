import {defineField, defineType} from 'sanity'

function formatFulfillmentStatusLabel(status?: string) {
  switch (status) {
    case 'processing':
      return 'Under Review'
    case 'submission_failed':
      return 'Action Needed'
    case 'submitted_to_printful':
      return 'In Production'
    case 'fulfilled':
      return 'Completed'
    case 'cancelled':
      return 'Cancelled'
    default:
      return status || 'Under Review'
  }
}

export const orderType = defineType({
  name: 'order',
  title: 'Orders',
  type: 'document',
  fields: [
    defineField({
      name: 'stripeSessionId',
      title: 'Stripe Session ID',
      type: 'string',
      validation: (rule) => rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'paymentIntentId',
      title: 'Payment Intent ID',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'cardBrand',
      title: 'Card Brand',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'cardLast4',
      title: 'Card Last 4',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'fulfillmentStatus',
      title: 'Fulfillment Status',
      type: 'string',
      initialValue: 'processing',
      options: {
        list: [
          {title: 'Under Review', value: 'processing'},
          {title: 'Action Needed', value: 'submission_failed'},
          {title: 'In Production', value: 'submitted_to_printful'},
          {title: 'Completed', value: 'fulfilled'},
          {title: 'Cancelled', value: 'cancelled'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'amountTotal',
      title: 'Amount Total',
      type: 'number',
      readOnly: true,
    }),
    defineField({
      name: 'rewardsPointsEarned',
      title: 'Rewards Points Earned',
      type: 'number',
      readOnly: true,
    }),
    defineField({
      name: 'rewardsPointsRedeemed',
      title: 'Rewards Points Redeemed',
      type: 'number',
      readOnly: true,
    }),
    defineField({
      name: 'rewardsDiscountAmount',
      title: 'Rewards Discount Amount',
      type: 'number',
      readOnly: true,
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'customerEmail',
      title: 'Customer Email',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'customerEmailNormalized',
      title: 'Customer Email Normalized',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'customerPhone',
      title: 'Customer Phone',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'shippingName',
      title: 'Shipping Name',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'shippingPhone',
      title: 'Shipping Phone',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'shippingAddress',
      title: 'Shipping Address',
      type: 'object',
      readOnly: true,
      fields: [
        defineField({name: 'line1', title: 'Line 1', type: 'string'}),
        defineField({name: 'line2', title: 'Line 2', type: 'string'}),
        defineField({name: 'city', title: 'City', type: 'string'}),
        defineField({name: 'state', title: 'State / Region', type: 'string'}),
        defineField({name: 'postalCode', title: 'Postal Code', type: 'string'}),
        defineField({name: 'country', title: 'Country', type: 'string'}),
      ],
    }),
    defineField({
      name: 'printfulOrderId',
      title: 'Printful Order ID',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'printfulExternalId',
      title: 'Printful External ID',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'printfulStatus',
      title: 'Printful Status',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'printfulSubmittedAt',
      title: 'Printful Submitted At',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'printfulSubmissionError',
      title: 'Printful Submission Error',
      type: 'text',
      rows: 3,
      readOnly: true,
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        defineField({
          name: 'orderItem',
          title: 'Order Item',
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string', readOnly: true}),
            defineField({name: 'slug', title: 'Slug', type: 'string', readOnly: true}),
            defineField({name: 'description', title: 'Description', type: 'string', readOnly: true}),
            defineField({name: 'syncVariantId', title: 'Sync Variant ID', type: 'string', readOnly: true}),
            defineField({name: 'size', title: 'Size', type: 'string', readOnly: true}),
            defineField({name: 'color', title: 'Color', type: 'string', readOnly: true}),
            defineField({name: 'quantity', title: 'Quantity', type: 'number', readOnly: true}),
            defineField({name: 'unitAmount', title: 'Unit Amount', type: 'number', readOnly: true}),
            defineField({name: 'totalAmount', title: 'Total Amount', type: 'number', readOnly: true}),
            defineField({name: 'currency', title: 'Currency', type: 'string', readOnly: true}),
            defineField({name: 'imageUrl', title: 'Image URL', type: 'url', readOnly: true}),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'stripeCreatedAt',
      title: 'Stripe Created At',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'customerName',
      subtitle: 'stripeSessionId',
      amountTotal: 'amountTotal',
      currency: 'currency',
      fulfillmentStatus: 'fulfillmentStatus',
    },
    prepare({title, subtitle, amountTotal, currency, fulfillmentStatus}) {
      const amountLabel =
        typeof amountTotal === 'number' && currency
          ? `${currency.toUpperCase()} ${(amountTotal / 100).toFixed(2)}`
          : 'Unknown total'

      return {
        title: title || 'Order',
        subtitle: `${amountLabel} • ${formatFulfillmentStatusLabel(fulfillmentStatus)} • ${subtitle || 'no session id'}`,
      }
    },
  },
})

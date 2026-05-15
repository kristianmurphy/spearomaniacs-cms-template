import {useState} from 'react'
import type {DocumentActionComponent, DocumentActionProps} from 'sanity'

const STOREFRONT_URL =
  import.meta.env.SANITY_STUDIO_STOREFRONT_URL ??
  import.meta.env.SANITY_STUDIO_FRONTEND_URL ??
  'http://localhost:3000'

export const SubmitOrderToPrintfulAction: DocumentActionComponent = (props: DocumentActionProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const order = props.draft || props.published

  if (!order?._id) {
    return null
  }

  const paymentStatus = typeof order.paymentStatus === 'string' ? order.paymentStatus : ''
  const fulfillmentStatus = typeof order.fulfillmentStatus === 'string' ? order.fulfillmentStatus : ''
  const alreadySubmitted = typeof order.printfulOrderId === 'string' && order.printfulOrderId.length > 0
  const canSubmit =
    paymentStatus === 'paid' &&
    !alreadySubmitted &&
    (
      fulfillmentStatus === 'processing' ||
      fulfillmentStatus === 'submission_failed' ||
      fulfillmentStatus === 'pending_review'
    )

  if (!canSubmit) {
    return null
  }

  return {
    label: isSubmitting ? 'Submitting…' : 'Approve & Send to Printful',
    tone: 'primary',
    disabled: isSubmitting,
    onHandle: async () => {
      setIsSubmitting(true)

      try {
        const response = await fetch(`${STOREFRONT_URL}/api/orders/submit-to-printful`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({orderId: order._id}),
        })
        const payload = (await response.json()) as {error?: string}

        if (!response.ok) {
          throw new Error(payload.error || 'Printful submission failed.')
        }

        props.onComplete()
        window.location.reload()
      } catch (error) {
        window.alert(error instanceof Error ? error.message : 'Printful submission failed.')
        setIsSubmitting(false)
      }
    },
  }
}

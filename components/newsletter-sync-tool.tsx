import {useEffect, useState} from 'react'
import {Button, Card, Flex, Stack, Text, TextInput} from '@sanity/ui'

const STOREFRONT_URL =
  import.meta.env.SANITY_STUDIO_STOREFRONT_URL ??
  import.meta.env.SANITY_STUDIO_FRONTEND_URL ??
  'http://localhost:3000'

const STORAGE_KEY = 'spearomaniacs.newsletterAdminToken'

type SyncResponse = {
  ok?: boolean
  synced?: number
  audienceId?: string
  error?: string
}

export function NewsletterSyncTool() {
  const [adminToken, setAdminToken] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<SyncResponse | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const storedToken = window.sessionStorage.getItem(STORAGE_KEY)

    if (storedToken) {
      setAdminToken(storedToken)
    }
  }, [])

  async function handleSync() {
    setIsLoading(true)
    setResult(null)

    try {
      const trimmedToken = adminToken.trim()

      if (!trimmedToken) {
        throw new Error('Enter your newsletter admin token first.')
      }

      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(STORAGE_KEY, trimmedToken)
      }

      const response = await fetch(`${STOREFRONT_URL}/api/newsletter/resend/sync`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${trimmedToken}`,
        },
      })

      const payload = (await response.json()) as SyncResponse

      if (!response.ok) {
        throw new Error(payload.error || 'Newsletter sync failed.')
      }

      setResult(payload)
    } catch (error) {
      const message =
        error instanceof TypeError
          ? `Could not reach ${STOREFRONT_URL}. Start the storefront there or set SANITY_STUDIO_STOREFRONT_URL to the correct origin.`
          : error instanceof Error
            ? error.message
            : 'Newsletter sync failed.'

      setResult({error: message})
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Flex padding={4} justify="center">
      <Card
        padding={[4, 5]}
        radius={4}
        shadow={1}
        style={{width: '100%', maxWidth: '46rem'}}
      >
        <Stack space={5}>
          <Stack space={3}>
            <Text size={4} weight="semibold">
              Sync Newsletter Audience to Resend
            </Text>
            <Text muted size={2}>
              Push the central Sanity newsletter audience into your Resend audience. This is also
              the easiest way to backfill older opted-in accounts.
            </Text>
            <Text muted size={1}>
              Sync endpoint: {STOREFRONT_URL}/api/newsletter/resend/sync
            </Text>
          </Stack>

          <Stack space={2}>
            <Text size={1} weight="medium">
              Newsletter Admin Token
            </Text>
            <TextInput
              type="password"
              value={adminToken}
              onChange={(event) => setAdminToken(event.currentTarget.value)}
            />
            <Text muted size={1}>
              Stored in this browser session only so you don&apos;t need to re-paste it every click.
            </Text>
          </Stack>

          <Flex gap={3} wrap="wrap">
            <Button
              fontSize={2}
              mode="default"
              padding={[3, 3, 4]}
              text={isLoading ? 'Syncing…' : 'Sync Audience'}
              tone="primary"
              disabled={isLoading}
              onClick={handleSync}
            />
          </Flex>

          {result?.error ? (
            <Card padding={4} radius={3} tone="critical">
              <Text size={2}>{result.error}</Text>
            </Card>
          ) : null}

          {result?.ok ? (
            <Card padding={4} radius={3} tone="positive">
              <Stack space={2}>
                <Text size={2}>Synced {result.synced ?? 0} contact(s) to Resend.</Text>
                {result.audienceId ? (
                  <Text muted size={1}>
                    Audience ID: {result.audienceId}
                  </Text>
                ) : null}
              </Stack>
            </Card>
          ) : null}
        </Stack>
      </Card>
    </Flex>
  )
}

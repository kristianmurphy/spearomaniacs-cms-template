import {useState} from 'react'
import {Button, Card, Flex, Stack, Text} from '@sanity/ui'

const STOREFRONT_IMPORT_URL =
  import.meta.env.SANITY_STUDIO_STOREFRONT_URL ??
  import.meta.env.SANITY_STUDIO_FRONTEND_URL ??
  'http://localhost:3000'

type ImportResponse = {
  imported?: number
  products?: Array<{id: number; title: string; slug: string}>
  error?: string
}

export function PrintfulImportTool() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<ImportResponse | null>(null)

  async function handleImport() {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch(`${STOREFRONT_IMPORT_URL}/api/printful/import-products`, {
        method: 'POST',
      })

      const payload = (await response.json()) as ImportResponse

      if (!response.ok) {
        throw new Error(payload.error || 'Import failed.')
      }

      setResult(payload)
    } catch (error) {
      const message =
        error instanceof TypeError
          ? `Could not reach ${STOREFRONT_IMPORT_URL}. Start the storefront there or set SANITY_STUDIO_STOREFRONT_URL to the correct origin.`
          : error instanceof Error
            ? error.message
            : 'Import failed.'

      setResult({
        error: message,
      })
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
              Import Printful Products
            </Text>
            <Text muted size={2}>
              Pull all products from your Printful API store into Sanity. Existing products are
              updated without overwriting your manual visibility, featured, summary, badge, or
              image choices.
            </Text>
            <Text muted size={1}>
              Import endpoint: {STOREFRONT_IMPORT_URL}/api/printful/import-products
            </Text>
          </Stack>

          <Flex gap={3} wrap="wrap">
            <Button
              fontSize={2}
              mode="default"
              padding={[3, 3, 4]}
              text={isLoading ? 'Importing…' : 'Import Products'}
              tone="primary"
              disabled={isLoading}
              onClick={handleImport}
            />
          </Flex>

          {result?.error ? (
            <Card padding={4} radius={3} tone="critical">
              <Text size={2}>{result.error}</Text>
            </Card>
          ) : null}

          {typeof result?.imported === 'number' ? (
            <Stack space={3}>
              <Card padding={4} radius={3} tone="positive">
                <Text size={2}>Imported {result.imported} product(s).</Text>
              </Card>
              {result.products && result.products.length > 0 ? (
                <Card padding={4} radius={3} tone="transparent">
                  <Stack space={2}>
                    {result.products.slice(0, 8).map((product) => (
                      <Text key={product.id} size={2}>
                        {product.title} ({product.slug})
                      </Text>
                    ))}
                    {result.products.length > 8 ? (
                      <Text muted size={1}>
                        And {result.products.length - 8} more.
                      </Text>
                    ) : null}
                  </Stack>
                </Card>
              ) : null}
            </Stack>
          ) : null}
        </Stack>
      </Card>
    </Flex>
  )
}

import fetcher from '@/src/lib/swr'
import theme from '@/src/theme'
import { NextPageWithLayout } from '@/src/types/app/next'
import createEmotionCache from '@/src/utils/createEmotionCache'
import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ReactElement } from 'react'
import { SWRConfig } from 'swr'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache
    Component: NextPageWithLayout
}

export default function MyApp({
    Component,
    pageProps,
    emotionCache = clientSideEmotionCache,
}: MyAppProps) {
    const getLayout = Component.getLayout || ((page: ReactElement) => page)

    return (
        <SWRConfig
            value={{
                revalidateOnFocus: false,
                refreshInterval: 0,
                fetcher: (url: string) => fetcher(url),
            }}
        >
            <CacheProvider value={emotionCache}>
                <Head>
                    <title>Fibonalabs</title>
                    <meta name="description" content="Home" />
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width"
                    />
                </Head>
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={theme}>
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline />
                        {getLayout(<Component {...pageProps} />)}
                    </ThemeProvider>
                </StyledEngineProvider>
            </CacheProvider>
        </SWRConfig>
    )
}

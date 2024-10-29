import { ConvexClientProvider } from '@/components/convex-client-provider'
import { JotaiProvider } from '@/components/jotai-provider'
import Modals from '@/components/modals'
import { Toaster } from '@/components/ui/sonner'
import { ConvexAuthNextjsServerProvider } from '@convex-dev/auth/nextjs/server'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import './globals.css'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export const metadata: Metadata = {
	title: 'Slacki',
	description: 'A Slack clone built with Next.js and Convex',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ConvexAuthNextjsServerProvider>
			<html lang="en">
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
					<ConvexClientProvider>
						<JotaiProvider>
							<NuqsAdapter>
								<Modals /> {children}
							</NuqsAdapter>
							<Toaster />
						</JotaiProvider>
					</ConvexClientProvider>
				</body>
			</html>
		</ConvexAuthNextjsServerProvider>
	)
}

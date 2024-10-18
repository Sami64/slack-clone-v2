'use client'

import { Button } from '@/components/ui/button'
import { useGetWorkspaceInfo } from '@/features/workspaces/api/use-get-workspace-info'
import { useJoin } from '@/features/workspaces/api/use-join'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { Loader } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import VerificationInput from 'react-verification-input'
import { toast } from 'sonner'

const JoinPage = () => {
	const router = useRouter()
	const workspaceId = useWorkspaceId()
	const { mutate, isPending } = useJoin()
	const { data, isLoading } = useGetWorkspaceInfo({ id: workspaceId })

	const isMember = useMemo(() => data?.isMember, [data?.isMember])

	useEffect(() => {
		if (isMember) {
			router.push(`/workspace/${workspaceId}`)
		}
	}, [isMember, router, workspaceId])

	if (isLoading) {
		return (
			<div className="h-full flex items-center justify-center">
				<Loader className="size-6 animate-spin text-muted-foreground" />
			</div>
		)
	}

	const handleComplete = (value: string) => {
		mutate(
			{ workspaceId, joinCode: value },
			{
				onSuccess: (id) => {
					router.replace(`/workspace/${id}`)
					toast.success('Successfully joined workspace')
				},
				onError: () => {
					toast.error('Failed to join workspace')
				},
			}
		)
	}

	return (
		<div className="h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8 rounded-lg shadow-md">
			<Image
				src="/logo.png"
				alt="Logo"
				width={60}
				height={60}
			/>
			<div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
				<div className="flex flex-col gap-y-2 items-center justify-center">
					<h1 className="text-2xl font-bold">Join your workspace</h1>
					<p className="text-muted-foreground text-md">
						Enter your workspace ID to join
					</p>
				</div>
				<VerificationInput
					onComplete={handleComplete}
					length={6}
					classNames={{
						container: 'flex gap-x-2',
						character:
							'uppercase h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium text-gray-500',
						characterInactive: 'bg-muted',
						characterSelected: 'bg-white text-black',
						characterFilled: 'bg-white text-black',
					}}
					autoFocus
				/>
			</div>
			<div className="flex gap-x-4">
				<Button
					size="lg"
					variant="outline"
					asChild>
					<Link href="/">Back to home</Link>
				</Button>
			</div>
		</div>
	)
}
export default JoinPage

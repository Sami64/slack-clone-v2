'use client'

import { useGetChannel } from '@/features/channels/api/use-get-channel'
import { useChannelId } from '@/hooks/use-channel-id'
import { Loader, TriangleAlert } from 'lucide-react'
import ChatInput from './chat-input'
import Header from './header'

const ChannelIdPage = () => {
	const channelId = useChannelId()

	const { data: channel, isLoading: channelLoading } = useGetChannel({
		id: channelId,
	})

	if (channelLoading) {
		return (
			<div className="h-full flex-1 flex items-center justify-center">
				<Loader className="animate-spin size-5 text-muted-foreground" />
			</div>
		)
	}

	if (!channel) {
		return (
			<div className="h-full flex-1 flex flex-col gap-y-2 items-center justify-center">
				<TriangleAlert className="size-6 text-muted-foreground" />
				<span className="text-sm text-muted-foreground">No Channel Found</span>
			</div>
		)
	}

	return (
		<div className="flex flex-col h-full">
			<Header title={channel.name} />
			<div className="flex-1" />
			<ChatInput
				placeholder={`What are you thinking about?... Message # ${channel.name}`}
			/>
		</div>
	)
}
export default ChannelIdPage

import { GetMessagesReturnType } from '@/features/messages/api/use-get-messages'
import { differenceInMinutes, format, isToday, isYesterday } from 'date-fns'
import Message from './message'

const TIME_THRESHOLD = 5

interface MessagelistProps {
	memberName?: string
	memberImage?: string
	channelName?: string
	channelCreationTime?: number
	variant?: 'channel' | 'thread' | 'conversation'
	data: GetMessagesReturnType | undefined
	loadMore: () => void
	isLoadingMore: boolean
	canLoadMore: boolean
}

const formatDateLabel = (dateKey: string) => {
	const date = new Date(dateKey)

	if (isToday(date)) {
		return 'Today'
	}

	if (isYesterday(date)) {
		return 'Yesterday'
	}

	return format(date, 'EEEE, MMMM d')
}

const MessageList = ({
	memberName,
	memberImage,
	channelName,
	channelCreationTime,
	variant = 'channel',
	data,
	loadMore,
	isLoadingMore,
	canLoadMore,
}: MessagelistProps) => {
	const groupedMessages = data?.reduce(
		(groups, message) => {
			const data = new Date(message._creationTime)
			const dateKey = format(data, 'yyyy-MM-dd')

			if (!groups[dateKey]) {
				groups[dateKey] = []
			}
			groups[dateKey].unshift(message)
			return groups
		},
		{} as Record<string, typeof data>
	)
	return (
		<div className="flex flex-1 flex-col-reverse pb-4 overflow-y-auto messages-scrollbar">
			{Object.entries(groupedMessages || {})?.map(([dateKey, messages]) => (
				<div key={dateKey}>
					<div className="text-center my-2 relative">
						<hr className="absolute top-1/2 left-0 right-0 border-t border-gray-300" />
						<span className="relative inline-block bg-white px-4 py-1 rounded-full text-xs border border-gray-300 shadow-sm">
							{formatDateLabel(dateKey)}
						</span>
					</div>
					{messages.map((message, index) => {
						const previousMessage = messages[index - 1]
						const isCompact =
							previousMessage &&
							previousMessage.user?._id === message.user?._id &&
							differenceInMinutes(
								new Date(message._creationTime),
								new Date(previousMessage._creationTime)
							) < TIME_THRESHOLD
						return (
							<Message
								key={message._id}
								id={message._id}
								memberId={message.memberId}
								authorImage={message.user.image}
								authorName={message.user.name}
								isAuthor={false}
								reactions={message.reactions}
								body={message.body}
								image={message.image}
								updatedAt={message.updatedAt}
								isEditing={false}
								setEditingId={() => {}}
								isCompact={isCompact}
								hideThreadButton={false}
								createdAt={message._creationTime}
								threadCount={message.threadCount}
								threadImage={message.threadImage}
								threadTimestamp={message.threadTimestamp}
							/>
						)
					})}
				</div>
			))}
		</div>
	)
}
export default MessageList

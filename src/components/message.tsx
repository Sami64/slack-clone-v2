import { useRemoveMessage } from '@/features/messages/api/use-remove-message'
import { useUpdateMessage } from '@/features/messages/api/use-update-message'
import { useToggleReaction } from '@/features/reactions/api/use-toggle-reaction'
import { useConfirm } from '@/hooks/use-confirm'
import { cn } from '@/lib/utils'
import { format, isToday, isYesterday } from 'date-fns'
import dynamic from 'next/dynamic'
import { toast } from 'sonner'
import { Doc, Id } from '../../convex/_generated/dataModel'
import Hint from './hint'
import Reactions from './reactions'
import Thumbnail from './thumbnail'
import Toolbar from './toolbar'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Renderer = dynamic(() => import('@/components/renderer'), { ssr: false })
const Editor = dynamic(() => import('@/components/editor'), { ssr: false })

interface MessageProps {
	id: Id<'messages'>
	memberId: Id<'members'>
	authorImage?: string
	authorName?: string
	isAuthor: boolean
	reactions: Array<
		Omit<Doc<'reactions'>, 'memberId'> & {
			count: number
			memberIds: Id<'members'>[]
		}
	>
	body: Doc<'messages'>['body']
	image: string | null | undefined
	createdAt: Doc<'messages'>['_creationTime']
	updatedAt: Doc<'messages'>['updatedAt']
	isEditing: boolean
	isCompact?: boolean
	setEditingId: (Id: Id<'messages'> | null) => void
	hideThreadButton?: boolean
	threadCount?: number
	threadImage?: string
	threadTimestamp?: number
}

const formatFullTime = (date: Date) => {
	return `${isToday(date) ? 'Today' : isYesterday(date) ? 'Yesterday' : format(date, 'EEEE, MMMM d')} at ${format(date, 'hh:mm a')}`
}

const Message = ({
	id,
	isAuthor,
	memberId,
	authorImage,
	authorName = 'Member',
	reactions,
	body,
	image,
	createdAt,
	updatedAt,
	isEditing,
	isCompact,
	setEditingId,
	hideThreadButton,
	threadCount,
	threadImage,
	threadTimestamp,
}: MessageProps) => {
	const [ConfirmDialog, confirm] = useConfirm(
		'Delete message',
		'Are you sure you want to delete this message?'
	)
	const { mutate: updateMessage, isPending: isUpdatingMessage } =
		useUpdateMessage()

	const { mutate: removeMessage, isPending: isRemovingMessage } =
		useRemoveMessage()

	const { mutate: toggleReaction, isPending: isTogglingReaction } =
		useToggleReaction()

	const isPending = isUpdatingMessage

	const handleUpdate = ({ body }: { body: string }) => {
		updateMessage(
			{ id, body },
			{
				onSuccess: () => {
					toast.success('Message updated')
					setEditingId(null)
				},
				onError: (error) => {
					toast.error('Failed to update message')
				},
			}
		)
	}

	const handleRemove = async () => {
		const ok = await confirm()

		if (!ok) return

		removeMessage(
			{ id },
			{
				onSuccess: () => {
					toast.success('Message deleted')
				},
				onError: () => {
					toast.error('Failed to delete message')
				},
			}
		)
	}

	const handleReaction = async (value: string) => {
		toggleReaction(
			{ messageId: id, value },
			{
				onError: () => {
					toast.error('Failed to add reaction')
				},
			}
		)
	}

	if (isCompact) {
		return (
			<>
				<ConfirmDialog />
				<div
					className={cn(
						'flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative',
						isEditing && 'bg-[#f2c74433] hover:bg-[#f2c74433]',
						isRemovingMessage &&
							'bg-rose-500/50 transform transition-all scale-y-0 origin-bottom duration-200'
					)}>
					<div className="flex items-start gap-2">
						<Hint label={formatFullTime(new Date(createdAt))}>
							<button className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 w-[40px] leading-[22px] text-center hover:underline">
								{format(new Date(createdAt), 'hh:mm')}
							</button>
						</Hint>
						{isEditing ? (
							<div className="w-full h-full">
								<Editor
									onSubmit={handleUpdate}
									disabled={isPending}
									defaultValue={JSON.parse(body)}
									onCancel={() => setEditingId(null)}
									variant="update"
								/>
							</div>
						) : (
							<div className="flex flex-col w-full">
								<Renderer value={body} />
								<Thumbnail url={image} />
								{updatedAt ? (
									<span className="text-xs text-muted-foreground">
										(edited)
									</span>
								) : null}
								<Reactions
									data={reactions}
									onChange={handleReaction}
								/>
							</div>
						)}
					</div>
					{!isEditing && (
						<Toolbar
							isAuthor={isAuthor}
							isPending={isPending}
							handleEdit={() => setEditingId(id)}
							handleThread={() => {}}
							handleDelete={handleRemove}
							hideThreadButton={hideThreadButton}
							handleReaction={handleReaction}
						/>
					)}
				</div>
			</>
		)
	}

	const avatarFallback = authorName.charAt(0).toUpperCase()

	return (
		<>
			<ConfirmDialog />
			<div
				className={cn(
					'flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative',
					isEditing && 'bg-[#f2c74433] hover:bg-[#f2c74433]',
					isRemovingMessage &&
						'bg-rose-500/50 transform transition-all scale-y-0 origin-bottom duration-200'
				)}>
				<div className="flex items-start gap-2">
					<button>
						<Avatar>
							<AvatarImage
								src={authorImage}
								alt={authorName}
							/>
							<AvatarFallback className=" bg-sky-500 text-white text-xs">
								{avatarFallback}
							</AvatarFallback>
						</Avatar>
					</button>
					{isEditing ? (
						<div className="w-full h-full">
							<Editor
								onSubmit={handleUpdate}
								disabled={isPending}
								defaultValue={JSON.parse(body)}
								onCancel={() => setEditingId(null)}
								variant="update"
							/>
						</div>
					) : (
						<div className="flex flex-col w-full overflow-hidden">
							<div className="text-sm">
								<button
									className="font-bold text-primary hover:underline"
									onClick={() => {}}>
									{authorName}
								</button>
								<span>&nbsp;&nbsp;</span>
								<Hint label={formatFullTime(new Date(createdAt))}>
									<button className="text-xs text-muted-foreground hover:underline">
										{format(new Date(createdAt), 'h:mm a')}
									</button>
								</Hint>
							</div>
							<Renderer value={body} />
							<Thumbnail url={image} />
							{updatedAt ? (
								<span className="text-xs text-muted-foreground">(edited)</span>
							) : null}
							<Reactions
								data={reactions}
								onChange={handleReaction}
							/>
						</div>
					)}
				</div>
				{!isEditing && (
					<Toolbar
						isAuthor={isAuthor}
						isPending={isPending}
						handleEdit={() => setEditingId(id)}
						handleThread={() => {}}
						handleDelete={handleRemove}
						hideThreadButton={hideThreadButton}
						handleReaction={handleReaction}
					/>
				)}
			</div>
		</>
	)
}
export default Message

import { MessageSquareTextIcon, Pencil, Smile, Trash } from 'lucide-react'
import EmojiPopover from './emoji-popover'
import Hint from './hint'
import { Button } from './ui/button'

interface ToolbarProps {
	isAuthor: boolean
	isPending: boolean
	handleEdit: () => void
	handleDelete: () => void
	handleThread: () => void
	handleReaction: (value: string) => void
	hideThreadButton?: boolean
}

const Toolbar = ({
	isAuthor,
	isPending,
	handleEdit,
	handleDelete,
	handleThread,
	handleReaction,
	hideThreadButton,
}: ToolbarProps) => {
	return (
		<div className="absolute top-0 right-5">
			<div className="group-hover:opacity-100 opacity-0 transition-opacity border bg-white rounded-md shadow-sm">
				<EmojiPopover
					onEmojiSelect={(emoji) => handleReaction(emoji.native)}
					hint="Add reaction">
					<Button
						variant="ghost"
						size="iconSm"
						disabled={isPending}>
						<Smile className="size-4" />
					</Button>
				</EmojiPopover>
				{!hideThreadButton && (
					<Hint label="Reply in thread">
						<Button
							variant="ghost"
							onClick={handleThread}
							size="iconSm"
							disabled={isPending}>
							<MessageSquareTextIcon className="size-4" />
						</Button>
					</Hint>
				)}
				{isAuthor && (
					<>
						<Hint label="Edit message">
							<Button
								variant="ghost"
								size="iconSm"
								onClick={handleEdit}
								disabled={isPending}>
								<Pencil className="size-4" />
							</Button>
						</Hint>
						<Hint label="Delete message">
							<Button
								variant="ghost"
								onClick={handleDelete}
								size="iconSm"
								disabled={isPending}>
								<Trash className="size-4" />
							</Button>
						</Hint>
					</>
				)}
			</div>
		</div>
	)
}
export default Toolbar

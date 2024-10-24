import { Id } from '../../../../../../convex/_generated/dataModel'

interface ConversationProps {
	id: Id<'conversations'>
}

const Conversations = ({ id }: ConversationProps) => {
	return <div>Conversations</div>
}
export default Conversations

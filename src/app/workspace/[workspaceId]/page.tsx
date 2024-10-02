'use client'

import { useWorkspaceId } from '@/hooks/use-workspace-id'

const WorkspacePage = () => {
	const workspaceId = useWorkspaceId()

	return <div>WorkspacePage </div>
}
export default WorkspacePage

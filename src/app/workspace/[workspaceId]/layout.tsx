'use client'

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable'
import Thread from '@/features/messages/components/thread'
import { usePanel } from '@/hooks/use-panel'
import { Loader } from 'lucide-react'
import { Id } from '../../../../convex/_generated/dataModel'
import Sidebar from './sidebar'
import WorkspaceToolbar from './toolbar'
import WorkspaceSidebar from './workspace-sidebar'
import Profile from '@/features/members/components/profile'

const WorkspaceIdLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	const { parentMessageId, profileMemberId, onClose } = usePanel()

	const showPanel = !!parentMessageId || !!profileMemberId

	return (
		<div className="h-full">
			<WorkspaceToolbar />
			<div className="flex h-[calc(100vh-40px)]">
				<Sidebar />
				<ResizablePanelGroup
					direction="horizontal"
					autoSaveId="jk-workspace-layout">
					<ResizablePanel
						defaultSize={20}
						minSize={11}
						className="bg-[#5E2C5F]">
						<WorkspaceSidebar />
					</ResizablePanel>
					<ResizableHandle withHandle></ResizableHandle>
					<ResizablePanel minSize={20}>{children}</ResizablePanel>
					{showPanel && (
						<>
							<ResizableHandle withHandle />
							<ResizablePanel
								minSize={20}
								defaultSize={29}>
								{parentMessageId ? (
									<Thread
										messageId={parentMessageId as Id<'messages'>}
										onClose={onClose}
									/>
								) : profileMemberId ? (
									<Profile
										memberId={profileMemberId as Id<'members'>}
										onClose={onClose}
									/>
								) : (
									<div className="flex h-full items-center justify-center">
										<Loader className="size-5 animate-spin text-muted-foreground" />
									</div>
								)}
							</ResizablePanel>
						</>
					)}
				</ResizablePanelGroup>
			</div>
		</div>
	)
}
export default WorkspaceIdLayout

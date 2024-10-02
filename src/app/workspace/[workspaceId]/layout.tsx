'use client'

import Sidebar from './sidebar'
import WorkspaceToolbar from './toolbar'

const WorkspaceIdLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	return (
		<div className="h-full">
			<WorkspaceToolbar />
			<div className="flex h-[calc(100vh-40px)]">
				<Sidebar />
				{children}
			</div>
		</div>
	)
}
export default WorkspaceIdLayout

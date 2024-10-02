import UserButton from '@/features/auth/components/user-button'
import { Bell, HomeIcon, MessagesSquare, MoreHorizontal } from 'lucide-react'
import { usePathname } from 'next/navigation'
import SidebarButton from './sidebar-button'
import WorkspaceSwitcher from './workspace-switcher'

const Sidebar = () => {
	const pahtname = usePathname()

	return (
		<aside className="w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-[9px] pb-[4px]">
			<WorkspaceSwitcher />
			<SidebarButton
				icon={HomeIcon}
				label="Home"
				isActive={pahtname.includes('/workspace')}
			/>
			<SidebarButton
				icon={MessagesSquare}
				label="DMs"
			/>
			<SidebarButton
				icon={Bell}
				label="Activity"
			/>
			<SidebarButton
				icon={MoreHorizontal}
				label="More"
			/>
			<div className="flex flex-cl items-center justify-center gap-y-1 mt-auto">
				<UserButton />
			</div>
		</aside>
	)
}
export default Sidebar

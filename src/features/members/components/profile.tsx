import { Button } from '@/components/ui/button'
import { AlertTriangle, Loader, XIcon } from 'lucide-react'
import { Id } from '../../../../convex/_generated/dataModel'
import { useGetMember } from '../api/use-get-member'

interface ProfileProps {
	memberId: Id<'members'>
	onClose: () => void
}

const Profile = ({ memberId, onClose }: ProfileProps) => {
	const { data: member, isLoading: isLoadingMember } = useGetMember({
		id: memberId,
	})

	if (isLoadingMember) {
		return (
			<div className="h-full flex flex-col">
				<div className="flex justify-between items-center px-4 h-[49px] border-b">
					<p className="text-lg font-bold">Profile</p>
					<Button
						onClick={onClose}
						size="iconSm"
						variant="ghost">
						<XIcon className="size-5 stroke-[1.5]" />
					</Button>
				</div>
				<div className="h-full flex items-center justify-center">
					<Loader className="size-5 animate-spin text-muted-foreground" />
				</div>
			</div>
		)
	}

	if (!member) {
		return (
			<div className="h-full flex flex-col">
				<div className="flex justify-between items-center px-4 h-[49px] border-b">
					<p className="text-lg font-bold">Profile</p>
					<Button
						onClick={onClose}
						size="iconSm"
						variant="ghost">
						<XIcon className="size-5 stroke-[1.5]" />
					</Button>
				</div>
				<div className="h-full flex flex-col gap-y-2 items-center justify-center">
					<AlertTriangle className="size-5 text-muted-foreground" />
					<p className="text-sm text-muted-foreground">Profile doesn&apos;t exist</p>
				</div>
			</div>
		)
	}

	return (
		<div className="h-full flex flex-col">
			<div className="flex justify-between items-center px-4 h-[49px] border-b">
				<p className="text-lg font-bold">Profile</p>
				<Button
					onClick={onClose}
					size="iconSm"
					variant="ghost">
					<XIcon className="size-5 stroke-[1.5]" />
				</Button>
			</div>
			<div className="h-full flex flex-col gap-y-2 items-center justify-center">
				
			</div>
		</div>
	)
}
export default Profile

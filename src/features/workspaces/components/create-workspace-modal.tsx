import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { useCreateWorkspace } from '../api/use-create-workspace'
import { useCreateWorkspaceModal } from '../store/use-create-workspace-modal'

const CreateWorkspaceModal = () => {
	const [name, setName] = useState('')
	const router = useRouter()
	const [open, setOpen] = useCreateWorkspaceModal()

	const { mutate, isPending } = useCreateWorkspace()

	const handleClose = () => {
		setOpen(false)
		setName('')
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		mutate(
			{ name },
			{
				onSuccess: (data) => {
					toast.success('Workspace created')
					router.push(`/workspace/${data}`)
					handleClose()
				},
			}
		)
	}

	return (
		<Dialog
			open={open}
			onOpenChange={handleClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add a workspace</DialogTitle>
				</DialogHeader>
				<form
					className="space-y-4"
					onSubmit={handleSubmit}>
					<Input
						disabled={isPending}
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						autoFocus
						minLength={3}
						placeholder="Workspace Name e.g 'Work', 'Personal', 'Home'"
					/>
					<div className="flex justify-end">
						<Button disabled={isPending}>Create</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}
export default CreateWorkspaceModal

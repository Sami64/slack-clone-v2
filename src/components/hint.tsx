'use client'

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from './ui/tooltip'

interface HintProps {
	label: string
	children: React.ReactNode
	side?: 'top' | 'bottom' | 'left' | 'right'
	align?: 'start' | 'center' | 'end'
}

const Hint = ({ label, children, side, align }: HintProps) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={50}>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent
					side={side}
					align={align}
					className="bg-black text-white border border-white/5">
					<p className='font-medium text-sm'>{label}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
export default Hint
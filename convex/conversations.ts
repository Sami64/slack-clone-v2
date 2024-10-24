import { getAuthUserId } from '@convex-dev/auth/server'
import { v } from 'convex/values'
import { mutation } from './_generated/server'

export const createOrGet = mutation({
	args: { memberId: v.id('members'), workspaceId: v.id('workspaces') },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx)

		if (!userId) {
			throw new Error('Unauthorized')
		}

		const currentMember = await ctx.db
			.query('members')
			.withIndex('by_workspace_id_user_id', (q) =>
				q.eq('workspaceId', args.workspaceId).eq('userId', userId)
			)
			.unique()

		const othermember = await ctx.db.get(args.memberId)

		if (!currentMember || !othermember) {
			throw new Error('Member not found')
		}

		const existingConversation = await ctx.db
			.query('conversations')
			.filter((q) => q.eq(q.field('workspaceId'), args.workspaceId))
			.filter((q) =>
				q.or(
					q.and(
						q.eq(q.field('memberOneId'), currentMember._id),
						q.eq(q.field('memberTwoId'), othermember._id)
					),
					q.and(
						q.eq(q.field('memberOneId'), othermember._id),
						q.eq(q.field('memberTwoId'), currentMember._id)
					)
				)
			)
			.unique()

		if (existingConversation) {
			return existingConversation._id
		}

		const conversationId = await ctx.db.insert('conversations', {
			workspaceId: args.workspaceId,
			memberOneId: currentMember._id,
			memberTwoId: othermember._id,
		})

		return conversationId
	},
})

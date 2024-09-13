import {
	convexAuthNextjsMiddleware,
	createRouteMatcher,
	isAuthenticatedNextjs,
	nextjsMiddlewareRedirect,
} from '@convex-dev/auth/nextjs/server'

const isPublicRoute = createRouteMatcher(['/auth'])

export default convexAuthNextjsMiddleware((request) => {
	if (isPublicRoute(request) && isAuthenticatedNextjs()) {
		return nextjsMiddlewareRedirect(request, '/')
	}

	if (!isPublicRoute(request) && !isAuthenticatedNextjs()) {
		return nextjsMiddlewareRedirect(request, '/auth')
	}
})

export const config = {
	// The following matcher runs middleware on all routes
	// except static assets.
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}

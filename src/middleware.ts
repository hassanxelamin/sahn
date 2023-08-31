  import { NextRequest, NextResponse } from 'next/server';
  
  // CORS middleware function
  async function corsMiddleware(req: NextRequest) {
    console.log('CORS middleware triggered', req.method, req.url);

    const response = NextResponse.next()
  
    // If the response from the Clerk middleware is a NextResponse, add the CORS headers
    if (response) {
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
      );
      response.headers.set(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
      );
      response.headers.set('Access-Control-Max-Age', '86400');
    }
  
    // Return the response
    return response;
  }
  
  export default corsMiddleware;
  
  export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
  };
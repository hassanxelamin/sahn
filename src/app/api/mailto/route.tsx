import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    return NextResponse.redirect('mailto:sahn@whatareyouwaitingfor.com')
  } catch (error: any) {
    console.error(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

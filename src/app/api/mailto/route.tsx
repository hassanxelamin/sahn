import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    return NextResponse.redirect('mailto:email@yahoo.com')
  } catch (error: any) {
    console.error(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const AIRTABLE_API_URL = `https://api.airtable.com/v0/appEkeW5cWZXSWY7i/tblYsIEBM4bJD8xEi`;
    const AIRTABLE_API_KEY = "patLIY3CibHLVVKzW.5ceea50c2804f5f5492cf78d9fcd4a38617d2a7907605e394ec8251412438fbd";
    
    // I'm assuming you want to pass the body of the incoming request to the Airtable API. 
    // Modify as needed.
    const requestBody = await request.json();

    const response = await fetch(AIRTABLE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    return NextResponse.json(data);

  } catch (error: any) {
    console.error(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

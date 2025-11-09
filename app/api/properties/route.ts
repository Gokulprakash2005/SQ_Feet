import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      include: {
        owner: true,
        bookings: true,
      },
    });
    return NextResponse.json(properties);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, sqFeet, price, location, ownerId } = body;
    
    const property = await prisma.property.create({
      data: {
        title,
        sqFeet: parseInt(sqFeet),
        price,
        location,
        ownerId,
      },
    });

    
    
    return NextResponse.json(property);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 });
  }
}
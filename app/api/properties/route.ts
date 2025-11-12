import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');

  try {
    const properties = await prisma.property.findMany({
      where: search ? {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { location: { contains: search, mode: 'insensitive' } },
        ]
      } : {},
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(properties);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch properties', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const property = await prisma.property.create({
      data: body
    });
    return NextResponse.json(property);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to create property', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const property = await prisma.property.update({
      where: { id },
      data: body
    });
    return NextResponse.json(property);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Failed to update property', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.property.delete({
      where: { id }
    });
    return NextResponse.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Failed to delete property', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
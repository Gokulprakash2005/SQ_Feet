import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// PUT update property by id
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // no await
    const body = await request.json();
    const property = await prisma.property.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(property, { headers: corsHeaders });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: 'Failed to update property', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// DELETE property by id
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // no await
    await prisma.property.delete({ where: { id } });
    return NextResponse.json({ message: 'Property deleted successfully' }, { headers: corsHeaders });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete property', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500, headers: corsHeaders }
    );
  }
}

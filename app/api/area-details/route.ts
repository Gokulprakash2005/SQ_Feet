import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const areaDetails = await prisma.areaDetails.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(areaDetails || [])
  } catch (error) {
    console.error('Area details fetch error:', error)
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const areaDetails = await prisma.areaDetails.create({
      data: {
        builtUpArea: data.builtUpArea,
        undividedShare: data.undividedShare,
        amenities: data.amenities,
        features: data.features
      }
    })
    
    return NextResponse.json(areaDetails)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create area details' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    
    const areaDetails = await prisma.areaDetails.update({
      where: { id: data.id },
      data: {
        builtUpArea: data.builtUpArea,
        undividedShare: data.undividedShare,
        amenities: data.amenities,
        features: data.features
      }
    })
    
    return NextResponse.json(areaDetails)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update area details' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    await prisma.areaDetails.delete({
      where: { id: parseInt(id!) }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete area details' }, { status: 500 })
  }
}
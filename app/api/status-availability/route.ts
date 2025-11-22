import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const statusAvailability = await prisma.statusAvailability.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(statusAvailability || [])
  } catch (error) {
    console.error('Status availability fetch error:', error)
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const statusAvailability = await prisma.statusAvailability.create({
      data: {
        propertyStatus: data.propertyStatus,
        ageOfProperty: data.ageOfProperty,
        availableFrom: new Date(data.availableFrom),
        furnishingStatus: data.furnishingStatus
      }
    })
    
    return NextResponse.json(statusAvailability)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create status availability' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    
    const statusAvailability = await prisma.statusAvailability.update({
      where: { id: data.id },
      data: {
        propertyStatus: data.propertyStatus,
        ageOfProperty: data.ageOfProperty,
        availableFrom: new Date(data.availableFrom),
        furnishingStatus: data.furnishingStatus
      }
    })
    
    return NextResponse.json(statusAvailability)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update status availability' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    await prisma.statusAvailability.delete({
      where: { id: parseInt(id!) }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete status availability' }, { status: 500 })
  }
}
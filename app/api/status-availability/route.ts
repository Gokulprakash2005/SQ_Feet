import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { corsHeaders } from '@/lib/cors'

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (id) {
      const statusAvailability = await prisma.statusAvailability.findUnique({
        where: { id: parseInt(id) }
      })
      if (!statusAvailability) {
        return NextResponse.json({ error: `Status availability not found with ID ${id}` }, { status: 404, headers: corsHeaders })
      }
      return NextResponse.json(statusAvailability, { headers: corsHeaders })
    }
    
    const statusAvailability = await prisma.statusAvailability.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(statusAvailability || [], { headers: corsHeaders })
  } catch (error) {
    console.error('Status availability fetch error:', error)
    return NextResponse.json([], { headers: corsHeaders })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const statusAvailability = await prisma.statusAvailability.create({
      data: {
        id: parseInt(data.id),
        propertyStatus: data.propertyStatus,
        ageOfProperty: data.ageOfProperty,
        availableFrom: new Date(data.availableFrom),
        furnishingStatus: data.furnishingStatus
      }
    })
    
    return NextResponse.json(statusAvailability, { headers: corsHeaders })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create status availability' }, { status: 500, headers: corsHeaders })
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
    
    return NextResponse.json(statusAvailability, { headers: corsHeaders })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update status availability' }, { status: 500, headers: corsHeaders })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    await prisma.statusAvailability.delete({
      where: { id: parseInt(id!) }
    })
    
    return NextResponse.json({ success: true }, { headers: corsHeaders })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete status availability' }, { status: 500, headers: corsHeaders })
  }
}
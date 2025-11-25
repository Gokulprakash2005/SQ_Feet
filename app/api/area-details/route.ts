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
      const areaDetail = await prisma.areaDetails.findUnique({
        where: { id: parseInt(id) }
      })
      if (!areaDetail) {
        return NextResponse.json({ error: `Area details not found with ID ${id}` }, { status: 404, headers: corsHeaders })
      }
      return NextResponse.json(areaDetail, { headers: corsHeaders })
    }
    
    const areaDetails = await prisma.areaDetails.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(areaDetails || [], { headers: corsHeaders })
  } catch (error) {
    console.error('Area details fetch error:', error)
    return NextResponse.json([], { headers: corsHeaders })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const areaDetails = await prisma.areaDetails.create({
      data: {
        id: parseInt(data.id),
        builtUpArea: data.builtUpArea,
        undividedShare: data.undividedShare,
        amenities: data.amenities,
        features: data.features
      }
    })
    
    return NextResponse.json(areaDetails, { headers: corsHeaders })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create area details' }, { status: 500, headers: corsHeaders })
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
    
    return NextResponse.json(areaDetails, { headers: corsHeaders })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update area details' }, { status: 500, headers: corsHeaders })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    await prisma.areaDetails.delete({
      where: { id: parseInt(id!) }
    })
    
    return NextResponse.json({ success: true }, { headers: corsHeaders })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete area details' }, { status: 500, headers: corsHeaders })
  }
}
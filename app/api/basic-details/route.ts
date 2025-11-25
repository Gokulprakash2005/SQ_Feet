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
      const basicDetail = await prisma.basicDetails.findUnique({
        where: { id: parseInt(id) }
      })
      return NextResponse.json(basicDetail || null, { headers: corsHeaders })
    }
    
    const basicDetails = await prisma.basicDetails.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(basicDetails || [], { headers: corsHeaders })
  } catch (error) {
    console.error('Basic details fetch error:', error)
    const id = new URL(request.url).searchParams.get('id')
    return NextResponse.json(id ? null : [], { headers: corsHeaders })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const basicDetails = await prisma.basicDetails.create({
      data: {
        id: parseInt(data.id),
        propertyType: data.propertyType,
        propertySize: data.propertySize,
        bedrooms: parseInt(data.bedrooms),
        bathrooms: parseInt(data.bathrooms),
        balconies: parseInt(data.balconies),
        totalFloors: parseInt(data.totalFloors),
        floorNumber: parseInt(data.floorNumber)
      }
    })
    
    return NextResponse.json(basicDetails, { headers: corsHeaders })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create basic details' }, { status: 500, headers: corsHeaders })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    
    const basicDetails = await prisma.basicDetails.update({
      where: { id: data.id },
      data: {
        propertyType: data.propertyType,
        propertySize: data.propertySize,
        bedrooms: parseInt(data.bedrooms),
        bathrooms: parseInt(data.bathrooms),
        balconies: parseInt(data.balconies),
        totalFloors: parseInt(data.totalFloors),
        floorNumber: parseInt(data.floorNumber)
      }
    })
    
    return NextResponse.json(basicDetails, { headers: corsHeaders })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update basic details' }, { status: 500, headers: corsHeaders })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    await prisma.basicDetails.delete({
      where: { id: parseInt(id!) }
    })
    
    return NextResponse.json({ success: true }, { headers: corsHeaders })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete basic details' }, { status: 500, headers: corsHeaders })
  }
}
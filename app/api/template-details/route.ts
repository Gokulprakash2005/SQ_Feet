import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const title = searchParams.get('title')
    
    if (title) {
      const templateDetail = await prisma.templateDetails.findFirst({
        where: { propertyTitle: title }
      })
      return NextResponse.json(templateDetail, { headers: corsHeaders })
    }
    
    const templateDetails = await prisma.templateDetails.findMany({
      where: search ? {
        OR: [
          { propertyTitle: { contains: search, mode: 'insensitive' } },
          { city: { contains: search, mode: 'insensitive' } }
        ]
      } : {},
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json(templateDetails || [], { headers: corsHeaders })
  } catch (error) {
    console.error('Template details fetch error:', error)
    return NextResponse.json([], { headers: corsHeaders })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const templateDetails = await prisma.templateDetails.create({
      data: {
        id: parseInt(data.id),
        propertyTitle: data.propertyTitle,
        locationAddress: data.locationAddress,
        city: data.city,
        price: parseInt(data.price),
        imageUrl: data.imageUrl
      }
    })
    
    return NextResponse.json(templateDetails, { headers: corsHeaders })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create template details' }, { status: 500, headers: corsHeaders })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    
    const templateDetails = await prisma.templateDetails.update({
      where: { id: data.id },
      data: {
        propertyTitle: data.propertyTitle,
        locationAddress: data.locationAddress,
        city: data.city,
        price: parseInt(data.price),
        imageUrl: data.imageUrl
      }
    })
    
    return NextResponse.json(templateDetails, { headers: corsHeaders })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update template details' }, { status: 500, headers: corsHeaders })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    await prisma.templateDetails.delete({
      where: { id: parseInt(id!) }
    })
    
    return NextResponse.json({ success: true }, { headers: corsHeaders })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete template details' }, { status: 500, headers: corsHeaders })
  }
}
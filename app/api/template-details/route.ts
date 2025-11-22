import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    
    const templateDetails = await prisma.templateDetails.findMany({
      where: search ? {
        OR: [
          { propertyTitle: { contains: search, mode: 'insensitive' } },
          { city: { contains: search, mode: 'insensitive' } }
        ]
      } : {},
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json(templateDetails || [])
  } catch (error) {
    console.error('Template details fetch error:', error)
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const templateDetails = await prisma.templateDetails.create({
      data: {
        propertyTitle: data.propertyTitle,
        locationAddress: data.locationAddress,
        city: data.city,
        price: parseInt(data.price)
      }
    })
    
    return NextResponse.json(templateDetails)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create template details' }, { status: 500 })
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
        price: parseInt(data.price)
      }
    })
    
    return NextResponse.json(templateDetails)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update template details' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    await prisma.templateDetails.delete({
      where: { id: parseInt(id!) }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete template details' }, { status: 500 })
  }
}
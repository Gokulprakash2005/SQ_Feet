import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const basicDetails = await prisma.basicDetails.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(basicDetails)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch basic details' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const basicDetails = await prisma.basicDetails.create({
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
    
    return NextResponse.json(basicDetails)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create basic details' }, { status: 500 })
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
    
    return NextResponse.json(basicDetails)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update basic details' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    await prisma.basicDetails.delete({
      where: { id: parseInt(id!) }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete basic details' }, { status: 500 })
  }
}
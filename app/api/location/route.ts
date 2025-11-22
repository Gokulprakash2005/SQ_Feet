import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const locations = await prisma.location.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(locations)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const location = await prisma.location.create({
      data: {
        address: data.address,
        city: data.city,
        pincode: parseInt(data.pincode)
      }
    })
    
    return NextResponse.json(location)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create location' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    
    const location = await prisma.location.update({
      where: { id: data.id },
      data: {
        address: data.address,
        city: data.city,
        pincode: parseInt(data.pincode)
      }
    })
    
    return NextResponse.json(location)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update location' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    await prisma.location.delete({
      where: { id: parseInt(id!) }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete location' }, { status: 500 })
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { corsHeaders } from '@/lib/cors'

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title')
    
    if (title) {
      const location = await prisma.location.findFirst({
        where: { city: { contains: title, mode: 'insensitive' } }
      })
      return NextResponse.json(location, { headers: corsHeaders })
    }
    
    const locations = await prisma.location.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(locations || [], { headers: corsHeaders })
  } catch (error) {
    console.error('Location fetch error:', error)
    return NextResponse.json([], { headers: corsHeaders })
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
    
    return NextResponse.json(location, { headers: corsHeaders })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create location' }, { status: 500, headers: corsHeaders })
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
    
    return NextResponse.json(location, { headers: corsHeaders })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update location' }, { status: 500, headers: corsHeaders })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    await prisma.location.delete({
      where: { id: parseInt(id!) }
    })
    
    return NextResponse.json({ success: true }, { headers: corsHeaders })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete location' }, { status: 500, headers: corsHeaders })
  }
}
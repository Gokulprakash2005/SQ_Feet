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
      const location = await prisma.location.findUnique({
        where: { id: parseInt(id) }
      })
      if (!location) {
        return NextResponse.json({ error: `Location not found with ID ${id}` }, { status: 404, headers: corsHeaders })
      }
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
    const formData = await request.formData()
    
    const location = await prisma.location.create({
      data: {
        id: parseInt(formData.get('id') as string),
        address: formData.get('address') as string,
        city: formData.get('city') as string,
        pincode: parseInt(formData.get('pincode') as string)
      }
    })
    
    return NextResponse.json(location, { headers: corsHeaders })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create location' }, { status: 500, headers: corsHeaders })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData()
    const oldId = parseInt(formData.get('oldId') as string) || parseInt(formData.get('id') as string)
    const newId = parseInt(formData.get('id') as string)
    
    const updateData = {
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      pincode: parseInt(formData.get('pincode') as string)
    }
    
    if (oldId !== newId) {
      await prisma.location.delete({ where: { id: oldId } })
      const location = await prisma.location.create({
        data: { id: newId, ...updateData }
      })
      return NextResponse.json(location, { headers: corsHeaders })
    } else {
      const location = await prisma.location.update({
        where: { id: oldId },
        data: updateData
      })
      return NextResponse.json(location, { headers: corsHeaders })
    }
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
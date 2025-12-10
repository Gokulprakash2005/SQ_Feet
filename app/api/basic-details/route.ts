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
    const formData = await request.formData()
    
    const basicDetails = await prisma.basicDetails.create({
      data: {
        id: parseInt(formData.get('id') as string),
        propertyType: formData.get('propertyType') as string,
        propertySize: formData.get('propertySize') as string,
        bedrooms: parseInt(formData.get('bedrooms') as string),
        bathrooms: parseInt(formData.get('bathrooms') as string),
        balconies: parseInt(formData.get('balconies') as string),
        totalFloors: parseInt(formData.get('totalFloors') as string),
        floorNumber: parseInt(formData.get('floorNumber') as string)
      }
    })
    
    return NextResponse.json(basicDetails, { headers: corsHeaders })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create basic details' }, { status: 500, headers: corsHeaders })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData()
    const oldId = parseInt(formData.get('oldId') as string) || parseInt(formData.get('id') as string)
    const newId = parseInt(formData.get('id') as string)
    
    const updateData = {
      propertyType: formData.get('propertyType') as string,
      propertySize: formData.get('propertySize') as string,
      bedrooms: parseInt(formData.get('bedrooms') as string),
      bathrooms: parseInt(formData.get('bathrooms') as string),
      balconies: parseInt(formData.get('balconies') as string),
      totalFloors: parseInt(formData.get('totalFloors') as string),
      floorNumber: parseInt(formData.get('floorNumber') as string)
    }
    
    if (oldId !== newId) {
      await prisma.basicDetails.delete({ where: { id: oldId } })
      const basicDetails = await prisma.basicDetails.create({
        data: { id: newId, ...updateData }
      })
      return NextResponse.json(basicDetails, { headers: corsHeaders })
    } else {
      const basicDetails = await prisma.basicDetails.update({
        where: { id: oldId },
        data: updateData
      })
      return NextResponse.json(basicDetails, { headers: corsHeaders })
    }
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
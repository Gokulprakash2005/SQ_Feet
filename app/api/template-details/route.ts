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
    const id = searchParams.get('id')
    
    if (id) {
      const templateDetail = await prisma.templateDetails.findUnique({
        where: { id: parseInt(id) }
      })
      if (!templateDetail) {
        return NextResponse.json({ error: `Template details not found with ID ${id}` }, { status: 404, headers: corsHeaders })
      }
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
    const formData = await request.formData()
    const image = formData.get('image') as File
    
    let imageUrl = ''
    if (image && image.size > 0) {
      // Convert image to base64 for simple storage
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      imageUrl = `data:${image.type};base64,${buffer.toString('base64')}`
    }
    
    const templateDetails = await prisma.templateDetails.create({
      data: {
        id: parseInt(formData.get('id') as string),
        propertyTitle: formData.get('propertyTitle') as string,
        locationAddress: formData.get('locationAddress') as string,
        city: formData.get('city') as string,
        price: parseInt(formData.get('price') as string),
        imageUrl: imageUrl || null
      }
    })
    
    return NextResponse.json(templateDetails, { headers: corsHeaders })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create template details' }, { status: 500, headers: corsHeaders })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File
    const oldId = parseInt(formData.get('oldId') as string)
    const newId = parseInt(formData.get('id') as string)
    
    let imageUrl = ''
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      imageUrl = `data:${image.type};base64,${buffer.toString('base64')}`
    }
    
    const updateData = {
      propertyTitle: formData.get('propertyTitle') as string,
      locationAddress: formData.get('locationAddress') as string,
      city: formData.get('city') as string,
      price: parseInt(formData.get('price') as string),
      ...(imageUrl && { imageUrl })
    }
    
    if (oldId !== newId) {
      await prisma.templateDetails.delete({ where: { id: oldId } })
      const templateDetails = await prisma.templateDetails.create({
        data: { id: newId, ...updateData }
      })
      return NextResponse.json(templateDetails, { headers: corsHeaders })
    } else {
      const templateDetails = await prisma.templateDetails.update({
        where: { id: oldId },
        data: updateData
      })
      return NextResponse.json(templateDetails, { headers: corsHeaders })
    }
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
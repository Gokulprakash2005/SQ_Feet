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
    const id = searchParams.get('id')
    
    if (id) {
      const description = await prisma.description.findUnique({
        where: { id: parseInt(id) }
      })
      return NextResponse.json(description || null, { headers: corsHeaders })
    }
    
    const descriptions = await prisma.description.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(descriptions || [], { headers: corsHeaders })
  } catch (error) {
    console.error('Description fetch error:', error)
    const id = new URL(request.url).searchParams.get('id')
    return NextResponse.json(id ? null : [], { headers: corsHeaders })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const description = await prisma.description.create({
      data: {
        id: parseInt(formData.get('id') as string),
        realSecurity: formData.get('realSecurity') as string,
        ampleParking: formData.get('ampleParking') as string,
        smartHomeIntegration: formData.get('smartHomeIntegration') as string,
        verifiedSafety: formData.get('verifiedSafety') as string
      }
    })
    
    return NextResponse.json(description, { headers: corsHeaders })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create description' }, { status: 500, headers: corsHeaders })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData()
    const oldId = parseInt(formData.get('oldId') as string) || parseInt(formData.get('id') as string)
    const newId = parseInt(formData.get('id') as string)
    
    const updateData = {
      realSecurity: formData.get('realSecurity') as string,
      ampleParking: formData.get('ampleParking') as string,
      smartHomeIntegration: formData.get('smartHomeIntegration') as string,
      verifiedSafety: formData.get('verifiedSafety') as string
    }
    
    if (oldId !== newId) {
      await prisma.description.delete({ where: { id: oldId } })
      const description = await prisma.description.create({
        data: { id: newId, ...updateData }
      })
      return NextResponse.json(description, { headers: corsHeaders })
    } else {
      const description = await prisma.description.update({
        where: { id: oldId },
        data: updateData
      })
      return NextResponse.json(description, { headers: corsHeaders })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update description' }, { status: 500, headers: corsHeaders })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    await prisma.description.delete({
      where: { id: parseInt(id!) }
    })
    
    return NextResponse.json({ success: true }, { headers: corsHeaders })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete description' }, { status: 500, headers: corsHeaders })
  }
}
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

export async function GET() {
  try {
    const descriptions = await prisma.description.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(descriptions || [], { headers: corsHeaders })
  } catch (error) {
    console.error('Description fetch error:', error)
    return NextResponse.json([], { headers: corsHeaders })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const description = await prisma.description.create({
      data: {
        realSecurity: data.realSecurity,
        ampleParking: data.ampleParking,
        smartHomeIntegration: data.smartHomeIntegration,
        verifiedSafety: data.verifiedSafety
      }
    })
    
    return NextResponse.json(description, { headers: corsHeaders })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create description' }, { status: 500, headers: corsHeaders })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    
    const description = await prisma.description.update({
      where: { id: data.id },
      data: {
        realSecurity: data.realSecurity,
        ampleParking: data.ampleParking,
        smartHomeIntegration: data.smartHomeIntegration,
        verifiedSafety: data.verifiedSafety
      }
    })
    
    return NextResponse.json(description, { headers: corsHeaders })
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
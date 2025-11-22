import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const descriptions = await prisma.description.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(descriptions)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch descriptions' }, { status: 500 })
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
    
    return NextResponse.json(description)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create description' }, { status: 500 })
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
    
    return NextResponse.json(description)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update description' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    await prisma.description.delete({
      where: { id: parseInt(id!) }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete description' }, { status: 500 })
  }
}
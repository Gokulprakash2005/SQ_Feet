import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  const owner1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      type: 'OWNER',
      status: 'ACTIVE',
    },
  });

  const tenant1 = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      type: 'TENANT',
      status: 'ACTIVE',
    },
  });

  // Create properties
  const property1 = await prisma.property.create({
    data: {
      title: 'Luxury Villa Downtown',
      sqFeet: 2500,
      price: '$2,500/month',
      location: 'Downtown',
      status: 'AVAILABLE',
      ownerId: owner1.id,
    },
  });

  const property2 = await prisma.property.create({
    data: {
      title: 'Modern Apartment',
      sqFeet: 1200,
      price: '$1,800/month',
      location: 'Midtown',
      status: 'RENTED',
      ownerId: owner1.id,
    },
  });

  // Create booking
  const booking1 = await prisma.booking.create({
    data: {
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-07-15'),
      amount: '$2,500',
      status: 'ACTIVE',
      propertyId: property1.id,
      tenantId: tenant1.id,
    },
  });

  // Create payment
  await prisma.payment.create({
    data: {
      amount: '$2,500',
      method: 'Credit Card',
      status: 'COMPLETED',
      bookingId: booking1.id,
      userId: tenant1.id,
    },
  });

  // Create message
  await prisma.message.create({
    data: {
      subject: 'Property Inquiry',
      message: 'I am interested in renting the luxury villa downtown.',
      type: 'INQUIRY',
      status: 'UNREAD',
      senderId: tenant1.id,
    },
  });

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
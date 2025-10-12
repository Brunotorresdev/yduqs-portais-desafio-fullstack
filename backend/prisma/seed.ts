import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.courseOptionTourn.deleteMany({});
  await prisma.courseOption.deleteMany({});
  await prisma.tourn.deleteMany({});

  console.log('Creating Tourn records...');
  await prisma.tourn.createMany({
    data: [{ name: 'Presencial | Manhã' }, { name: 'Digital (EaD)' }],
  });
  console.log('Tourn records created.');

  console.log('Creating CourseOption records...');
  const courseOptionsData = [
    {
      name: 'Curso Campinas',
      value: 4752,
      cash_value: 2613.6,
      city: 'CAMPINAS',
      street: 'RUA DR.SALES DE OLIVEIRA',
      street_number: '1661',
      street_neighborhood: 'VILA INDUSTRIAL',
      is_default: true,
    },
    {
      name: 'Curso Barra da Tijuca',
      value: null,
      cash_value: null,
      city: 'BARRA DA TIJUCA',
      street: 'AV. DAS AMÉRICAS, 4.200',
      street_number: 'BLOCO 11',
      street_neighborhood: 'TOM JOB...',
      is_default: true,
    },
  ];

  for (const course of courseOptionsData) {
    await prisma.courseOption.create({ data: course });
  }
  console.log('CourseOption records created.');

  console.log('Associating CourseOptions with Tourns...');
  const campinasCourse = await prisma.courseOption.findFirst({ where: { name: 'Curso Campinas' } });
  const barraCourse = await prisma.courseOption.findFirst({ where: { name: 'Curso Barra da Tijuca' } });
  const presencialTourn = await prisma.tourn.findFirst({ where: { name: 'Presencial | Manhã' } });
  const eadTourn = await prisma.tourn.findFirst({ where: { name: 'Digital (EaD)' } });

  if (campinasCourse && presencialTourn) {
    await prisma.courseOptionTourn.create({
      data: { course_option_id: campinasCourse.id, tourn_id: presencialTourn.id },
    });
  }

  if (barraCourse && eadTourn) {
    await prisma.courseOptionTourn.create({
      data: { course_option_id: barraCourse.id, tourn_id: eadTourn.id },
    });
  }

  console.log('Seed completed successfully!');
}

main()

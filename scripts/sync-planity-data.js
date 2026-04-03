import postgres from 'postgres';
import { PLANITY_SERVICES, PLANITY_FORMATIONS } from '../data/planityCatalog.js';

const connectionString = process.env.SUPABASE_DB_URL;

if (!connectionString) {
  throw new Error('SUPABASE_DB_URL is required to sync Planity data.');
}

const sql = postgres(connectionString, {
  ssl: { rejectUnauthorized: false },
  max: 1,
  connect_timeout: 15,
});

const iconForCategory = (category) => {
  if (category.includes('Épilations') || category.includes('lissages')) return 'Scissors';
  if (category.includes('Microneedling') || category.includes('Peel') || category.includes('Détatouage')) return 'Syringe';
  if (category.includes('Hammam') || category.includes('Head Spa') || category.includes('Modelage') || category.includes('corps') || category.includes('pieds')) return 'Wind';
  return 'Sparkles';
};

const imageForCategory = (category) => {
  if (category.includes('Hammam')) return 'category:hammam';
  if (category.includes('Head Spa') || category.includes('cheveux')) return 'category:hair';
  if (category.includes('visage') || category.includes('Microneedling') || category.includes('Peel')) return 'category:face';
  if (category.includes('ongles') || category.includes('mains')) return 'category:nails';
  return 'category:signature';
};

async function sync() {
  try {
    await sql.begin(async (tx) => {
      await tx`
        alter table public.services
          add column if not exists category text,
          add column if not exists sort_order integer
      `;

      await tx`
        alter table public.formations
          add column if not exists sort_order integer
      `;

      await tx`delete from public.services`;
      await tx`delete from public.formations`;

      for (const [index, item] of PLANITY_SERVICES.entries()) {
        await tx`
          insert into public.services (
            category,
            title,
            description,
            benefits,
            duration,
            price,
            icon_name,
            image_url,
            sort_order
          ) values (
            ${item.category},
            ${item.title},
            ${item.description},
            ${[item.category, item.duration, item.price]},
            ${item.duration},
            ${item.price},
            ${iconForCategory(item.category)},
            ${imageForCategory(item.category)},
            ${index + 1}
          )
        `;
      }

      for (const [index, item] of PLANITY_FORMATIONS.entries()) {
        await tx`
          insert into public.formations (
            title,
            description,
            price,
            duration,
            image_url,
            program,
            sort_order
          ) values (
            ${item.title},
            ${item.description},
            ${item.price},
            ${item.duration},
            ${'category:formations'},
            ${item.program},
            ${index + 1}
          )
        `;
      }
    });

    console.log(`Synced ${PLANITY_SERVICES.length} services and ${PLANITY_FORMATIONS.length} formations.`);
  } finally {
    await sql.end();
  }
}

sync().catch((error) => {
  console.error(error);
  process.exit(1);
});

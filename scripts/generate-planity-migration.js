import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PLANITY_SERVICES, PLANITY_FORMATIONS } from '../data/planityCatalog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const escapeSql = (value) => String(value).replace(/'/g, "''");

const categoryIcon = (category) => {
  if (category.includes('Épilations') || category.includes('lissages')) return 'Scissors';
  if (category.includes('Microneedling') || category.includes('Peel') || category.includes('Détatouage')) return 'Syringe';
  if (category.includes('Hammam') || category.includes('Head Spa') || category.includes('Modelage') || category.includes('corps') || category.includes('pieds')) return 'Wind';
  return 'Sparkles';
};

const servicesValues = PLANITY_SERVICES.map((item, index) => `(
  '${escapeSql(item.category)}',
  '${escapeSql(item.title)}',
  '${escapeSql(item.description)}',
  ARRAY['${escapeSql(item.category)}', '${escapeSql(item.duration)}', '${escapeSql(item.price)}']::text[],
  '${escapeSql(item.duration)}',
  '${escapeSql(item.price)}',
  '${categoryIcon(item.category)}',
  'category:${escapeSql(item.category)}',
  ${index + 1}
)`).join(',\n');

const formationsValues = PLANITY_FORMATIONS.map((item, index) => {
  const program = item.program.map((entry) => `'${escapeSql(entry)}'`).join(', ');
  return `(
  '${escapeSql(item.title)}',
  '${escapeSql(item.description)}',
  ${item.price},
  '${escapeSql(item.duration)}',
  'category:formations',
  ARRAY[${program}]::text[],
  ${index + 1}
)`;
}).join(',\n');

const sql = `alter table public.services
  add column if not exists category text,
  add column if not exists sort_order integer;

alter table public.formations
  add column if not exists sort_order integer;

delete from public.services;
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
) values
${servicesValues};

delete from public.formations;
insert into public.formations (
  title,
  description,
  price,
  duration,
  image_url,
  program,
  sort_order
) values
${formationsValues};
`;

const outputPath = path.join(
  __dirname,
  '..',
  'supabase',
  'migrations',
  '20260403000009_sync_planity_catalog.sql'
);

fs.writeFileSync(outputPath, sql);
console.log(`Migration generated at ${outputPath}`);

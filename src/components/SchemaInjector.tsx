// src/components/SchemaInjector.tsx
import React from 'react';
import { generateSchema, type SchemaType, type SchemaInputData } from '@/app/lib/schemaGenerator';

interface SchemaInjectorProps {
  type: SchemaType;
  data: SchemaInputData;
}

export default function SchemaInjector({ type, data }: SchemaInjectorProps) {
  const schema = generateSchema(type, data);

  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}

import React from "react";
import { generateSchema, SchemaType, SchemaInputData } from "@/app/lib/schemaGenerator";

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
      // Karena ini JSON, harus stringify agar valid di DOM
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

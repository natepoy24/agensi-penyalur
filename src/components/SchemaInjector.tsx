// src/components/SchemaInjector.tsx
import React from 'react';

type SchemaInjectorProps = {
  schema: object | null;
};

export default function SchemaInjector({ schema }: SchemaInjectorProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}
=======
// src/components/SchemaInjector.tsx
import React from 'react';

type SchemaInjectorProps = {
  schema: object | null;
};

export default function SchemaInjector({ schema }: SchemaInjectorProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}

=======
export default function SchemaInjector({ schema }: SchemaInjectorProps) {
>>>>>>> new-beta
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}
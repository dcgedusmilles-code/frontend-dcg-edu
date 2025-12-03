import React from 'react';
import { Button } from '@/components/ui/button';

export default function FiltrosContaPagar({ onFilter }) {
  return (
    <div className="flex gap-2 mb-4">
      <input className="border p-2" placeholder="Fornecedor" />
      <input className="border p-2" placeholder="Status" />
      <Button>Filtrar</Button>
    </div>
  );
}

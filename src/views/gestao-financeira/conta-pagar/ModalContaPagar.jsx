
// -----------------------------------------------------------------------------
// components/ModalContaPagar.jsx
// -----------------------------------------------------------------------------
import React, { useEffect, useState } from 'react';
import { createAccount, updateAccount } from '@/services/accountsPayableService';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ModalContaPagar({ open, setOpen, selected, refresh }) {
  const [form, setForm] = useState({
    fornecedor_id: '',
    descricao: '',
    valor: '',
    data_vencimento: '',
    data_pagamento: '',
    status: ''
  });

  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleSubmit = async () => {
    if (selected) await updateAccount(selected.id, form);
    else await createAccount(form);
    refresh();
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg p-4">
        <CardContent className="space-y-4">
          <h2 className="text-lg font-bold">{selected ? 'Editar Conta' : 'Nova Conta'}</h2>

          <input
            className="border p-2 w-full"
            placeholder="Fornecedor ID"
            value={form.fornecedor_id}
            onChange={(e) => setForm({ ...form, fornecedor_id: e.target.value })}
          />
          <input
            className="border p-2 w-full"
            placeholder="Descrição"
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
          />
          <input
            className="border p-2 w-full"
            placeholder="Valor"
            value={form.valor}
            onChange={(e) => setForm({ ...form, valor: e.target.value })}
          />
          <input
            className="border p-2 w-full"
            type="date"
            value={form.data_vencimento}
            onChange={(e) => setForm({ ...form, data_vencimento: e.target.value })}
          />
          <input
            className="border p-2 w-full"
            type="date"
            value={form.data_pagamento}
            onChange={(e) => setForm({ ...form, data_pagamento: e.target.value })}
          />
          <input
            className="border p-2 w-full"
            placeholder="Status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          />

          <div className="flex justify-end space-x-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={handleSubmit}>Salvar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
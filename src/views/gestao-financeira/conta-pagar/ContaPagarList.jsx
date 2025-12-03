
import React, { useEffect, useState } from 'react';
import { getAccountsPayable, deleteAccount } from '../../../services/accountsPayableService';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ModalContaPagar from './ModalContaPagar';
import FiltrosContaPagar from './FiltrosContaPagar';

export default function ContaPagarList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchData = () => {
    setLoading(true);
    getAccountsPayable()
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (item) => {
    setSelected(item);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteAccount(id);
    fetchData();
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Contas a Pagar</h1>

      <FiltrosContaPagar onFilter={() => {}} />

      <Button className="mb-4" onClick={() => { setSelected(null); setOpen(true); }}>
        Nova Conta
      </Button>

      <Card>
        <CardContent>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <table className="w-full border">
              <thead>
                <tr className="border-b">
                  <th>Fornecedor</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Vencimento</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className="border-b text-sm">
                    <td>{item.fornecedor?.nome || '-'}</td>
                    <td>{item.descricao}</td>
                    <td>{item.valor}</td>
                    <td>{item.data_vencimento}</td>
                    <td>{item.status}</td>
                    <td className="space-x-2">
                      <Button size="sm" onClick={() => handleEdit(item)}>Editar</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>Apagar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {open && (
        <ModalContaPagar
          open={open}
          setOpen={setOpen}
          selected={selected}
          refresh={fetchData}
        />
      )}
    </div>
  );
}



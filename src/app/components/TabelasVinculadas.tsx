'use client'

import React, { useState } from 'react';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { Box, Paper, Typography, Button } from '@mui/material';

// Tipos de dados para cada tabela
interface NotaFiscal {
  id: number;
  numero: string;
  data: string;
}

interface ItemNota {
  id: number;
  descricao: string;
  quantidade: number;
}

interface CategoriaProduto {
  id: number;
  categoria: string;
}

// Colunas para cada DataGrid
const colunasNotas: GridColDef[] = [
  { field: 'numero', headerName: 'Número da Nota', width: 200 },
  { field: 'data', headerName: 'Data', width: 200 },
];

const colunasItens: GridColDef[] = [
  { field: 'descricao', headerName: 'Descrição', width: 200 },
  { field: 'quantidade', headerName: 'Quantidade', width: 200 },
];

const colunasCategorias: GridColDef[] = [
  { field: 'categoria', headerName: 'Categoria', width: 200 },
];

// Componente principal
const TabelasVinculadas = () => {
  const [notaSelecionada, setNotaSelecionada] = useState<NotaFiscal | null>(null);
  const [itemSelecionado, setItemSelecionado] = useState<ItemNota | null>(null);

// Dados fictícios para as tabelas de Notas Fiscais
const notas: NotaFiscal[] = [
    { id: 1, numero: 'NF123456', data: '2024-01-01' },
    { id: 2, numero: 'NF123457', data: '2024-01-02' },
    { id: 3, numero: 'NF123458', data: '2024-01-03' },
  ];
  
  // Dados fictícios para os itens de uma Nota Fiscal selecionada
  const itens: ItemNota[] = [
    { id: 1, descricao: '100kg de batatas', quantidade: 100 },
    { id: 2, descricao: '50kg de cebolas', quantidade: 50 },
    { id: 3, descricao: '30kg de tomates', quantidade: 30 },
  ];
  
  // Dados fictícios para as categorias de um item selecionado
  const categorias: CategoriaProduto[] = [
    { id: 1, categoria: 'Legumes' },
    { id: 2, categoria: 'Frutas' },
    { id: 3, categoria: 'Verduras' },
  ];
  

  const handleRowClickNota = (params: GridRowParams) => {
    const nota = params.row as NotaFiscal;
    setNotaSelecionada(nota);
  };

  const handleRowClickItem = (params: GridRowParams) => {
    const item = params.row as ItemNota;
    setItemSelecionado(item);
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      {!notaSelecionada && (
        <DataGrid
          rows={notas}
          columns={colunasNotas}
          onRowClick={handleRowClickNota}
        />
      )}
      {notaSelecionada && !itemSelecionado && (
  <Paper elevation={3}>
    <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography variant="h6" component="h2">
        Nota Fiscal: {notaSelecionada.numero}
      </Typography>
      <Typography variant="subtitle1">
        Data: {notaSelecionada.data}
      </Typography>
      {/* Botão para voltar à lista de notas fiscais, se necessário */}
      <Button onClick={() => setNotaSelecionada(null)}>
        Voltar às Notas Fiscais
      </Button>
    </Box>
    <DataGrid
      rows={itens}
      columns={colunasItens}
      onRowClick={handleRowClickItem}
    />
  </Paper>
)}
{itemSelecionado && (
  <Paper elevation={3}>
    <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography variant="h6" component="h2">
        Item: {itemSelecionado.descricao}
      </Typography>
      <Typography variant="subtitle1">
        Quantidade: {itemSelecionado.quantidade}
      </Typography>
      {/* Botão para voltar à lista de itens da nota fiscal, se necessário */}
      <Button onClick={() => setItemSelecionado(null)}>
        Voltar aos Itens da Nota
      </Button>
    </Box>
    {/* Supondo que você teria uma função para buscar categorias com base no item selecionado */}
    <DataGrid
      rows={categorias}
      columns={colunasCategorias}
    />
  </Paper>
)}
    </Box>
  );
};

export default TabelasVinculadas;

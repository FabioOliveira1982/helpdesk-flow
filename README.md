# HelpDesk Flow

Sistema web demonstrativo de gerenciamento de chamados de suporte técnico.

## Objetivo
Simular a rotina de uma equipe de Help Desk, permitindo registrar, acompanhar, filtrar e atualizar solicitações de suporte.

## Funcionalidades
- Cadastro de chamados com solicitante, assunto, categoria e descrição.
- Classificação por prioridade.
- Controle de status: Aberto, Em andamento e Resolvido.
- Pesquisa por número, solicitante, assunto e categoria.
- Filtros por status e prioridade.
- Indicadores de atendimento.
- Exclusão de chamados.
- Persistência local com LocalStorage.
- Interface responsiva.

## Tecnologias
HTML5, CSS3, JavaScript e LocalStorage API.

## Como executar
1. Clone ou baixe este repositório.
2. Abra `index.html` em um navegador moderno.
3. Cadastre um chamado e teste filtros e alteração de status.

Não são necessárias dependências ou instalação de servidor.

## Armazenamento e limitações
Os registros ficam no LocalStorage do navegador. Não há autenticação, banco de dados centralizado, sincronização entre dispositivos ou controle de acesso. Os registros iniciais são dados fictícios de demonstração.

## Melhorias futuras
- Autenticação e perfis de usuário.
- API e banco de dados.
- Histórico de alterações e comentários.
- SLA, relatórios e exportação.
- Testes automatizados.

## Autor
Fábio Oliveira  
GitHub: https://github.com/FabioOliveira1982  
LinkedIn: https://www.linkedin.com/in/fabio-oliveira-br/
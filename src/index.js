import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Contas from './layouts/contas';
import Vitrine from './layouts/vitrine';
import AppProvider from './providers/AppProvider';
import { AuthProvider } from './providers/AuthProvider';
import reportWebVitals from './reportWebVitals';
import Cadastrar from './routes/contas/cadastrar';
import Entrar from './routes/contas/entrar';
import Home, { loader as homeLoader, ServidorIndisponivel } from './routes/home';
import Perfil, { loader as perfilLoader } from './routes/perfil';
import MeusPedidos, { loader as MeusPedidosLoader } from './routes/MeusPedidos';
import Pedido, { loader as pedidoLoader } from './routes/Pedido';
import Produto, { loader as produtoLoader, ProdutoNaoEncontrado } from './routes/produto';
import Relatorio, { loader as relatorioLoader } from './routes/Relatorio';
import RecuperarAcesso from './routes/contas/recuperar-acesso';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'contas',
        element: <Contas />,
        children: [
          {
            path: 'entrar',
            element: <Entrar />
          },
          {
            path: 'cadastrar',
            element: <Cadastrar />
          },
          {
            path: 'recuperar-acesso',
            element: <RecuperarAcesso />
          },
        ],
      },
      {
        path: '',
        element: <Vitrine />,
        children: [
          {
            path: 'perfil',
            element: <Perfil />,
            loader: perfilLoader,
          },
          {
            path: '/admin/relatorio-de-pedidos', //ROTA DOS RELATÓRIOS
            element: <Relatorio />,
            loader: relatorioLoader,
            loader: pedidoLoader,
            loader: MeusPedidosLoader,
          },
          //Criação da rota dos "MeusPedidos"
          {
            path: 'MeusPedidos',
            element: <MeusPedidos />,
            loader: MeusPedidosLoader,
          },
          {
            path: 'MeusPedidos/:idPedido',
            element: <Pedido />,
            loader: pedidoLoader,
          },
          {
            path: 'produtos/:idProduto',
            loader: produtoLoader,
            errorElement: <ProdutoNaoEncontrado />,
            element: <Produto />
          },
          {
            path: '',
            loader: homeLoader,
            element: <Home />,
            errorElement: <ServidorIndisponivel />,
          }
        ]
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

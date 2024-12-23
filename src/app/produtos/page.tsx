"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Produto = {
  codigo: string;
  descricaoCurta: string;
  formato: string;
  id: string;
  imagemURL: string;
  nome: string;
  preco: string;
  situacao: string;
  tipo: string;
};

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  //Busca Produtos Cadastrados no Bling
  async function getProdutos() {
    if (localStorage.getItem("tokenBling")) {
      const response = await axios.get(`/api/bling-produtos?token=${localStorage.getItem("tokenBling")}`);
      setProdutos(response.data.data);
    }
  }

  useEffect(() => {
    axios.get(`/api/bling-produtos?token=${localStorage.getItem("tokenBling")}`).then((response) => {
      setProdutos(response.data.data);
    });
  }, []);

  return (
    <div className="relative flex flex-col h-full w-full gap-4 bg-gradient-to-r from-zinc-800 to-zinc-950 overflow-hidden">
      <div className="container mx-auto mt-20">
        <div className="relative flex justify-center">
          <h1 className="text-3xl text-center font-bold text-slate-100 shadow-2xl">Página de Produtos</h1>
          <span className="absolute -top-24 text-slate-400/5 text-[10rem] font-bold">4529</span>
        </div>

        <div itemID="container-produtos" className="grid pt-10 grid-cols-3">
          <div id="box-produto" className="relative flex flex-col w-96 justify-center items-center">
            <div className="codigo absolute -left-[4.5rem] -rotate-90 bottom-1/4">
              <span className="text-3xl font-bold text-slate-100/10">C0255</span>
            </div>

            <div className="relative flex bg-slate-200 p-4 box-image rounded-3xl translate-y-20">
              <span className="absolute -top-6 -right-4 bg-slate-200 text-slate-700 p-[.8rem] font-bold border-2 rounded-full shadow-lg">50</span>
              <img className="w-48" src="https://res.cloudinary.com/daruxsllg/image/upload/v1721918032/brk/1_xevdbj.png" alt="" />
            </div>

            <div className="flex flex-col justify-center items-center text-center p-8 pt-24 pb-24 border border-slate-200/25 rounded-lg">
              <h3 className="text-slate-100/85 font-bold my-6">Camisa Brk Agro Cursos e Profissôes Agronomia com Proteção UV50+</h3>

              <div className="w-full gap-y-3 infos">
                <table className="w-full table text-slate-100/70">
                  <tbody>
                    <tr className="border-b border-slate-500/45">
                      <td className="text-left">
                        <strong>Marca:</strong>
                      </td>
                      <td className="text-right">Marine Sports</td>
                    </tr>
                    <tr className="border-b border-slate-500/45">
                      <td className="text-left">
                        <strong>Peso:</strong>
                      </td>
                      <td className="text-right">0,250Kg</td>
                    </tr>
                    <tr className="border-b border-slate-500/45">
                      <td className="text-left">
                        <strong>Largura:</strong>
                      </td>
                      <td className="text-right">0,80cm</td>
                    </tr>
                    <tr className="border-b border-slate-500/45">
                      <td className="text-left">
                        <strong>Altura:</strong>
                      </td>
                      <td className="text-right">0,80cm</td>
                    </tr>
                    <tr className="border-b border-slate-500/45">
                      <td className="text-left">
                        <strong>Profundidade:</strong>
                      </td>
                      <td className="text-right">0,80cm</td>
                    </tr>
                    <tr className="border-b border-slate-500/45">
                      <td className="text-left">
                        <strong>Unidade:</strong>
                      </td>
                      <td className="text-right">UN</td>
                    </tr>
                    <tr className="border-b border-slate-500/45">
                      <td className="text-left">
                        <strong>Volumes:</strong>
                      </td>
                      <td className="text-right">1</td>
                    </tr>

                    <tr className="border-b border-slate-500/45">
                      <td className="text-left">
                        <strong>Item:</strong>
                      </td>
                      <td className="text-right">1</td>
                    </tr>

                    <tr className="border-b border-slate-500/45">
                      <td className="text-left">
                        <strong>EAN:</strong>
                      </td>
                      <td className="text-right">1</td>
                    </tr>

                    <tr className="border-b border-slate-500/45">
                      <td className="text-left">
                        <strong>Descrição:</strong>
                      </td>
                      <td className="text-right">Completa</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="absolute -bottom-6 font-bold text-slate-100 bg-gradient-to-r from-zinc-700 to-zinc-800 py-4 px-10 border border-slate-100/15 rounded-lg shadow-lg">
                <p>
                  <span>R$</span>154,90
                </p>
              </div>
            </div>
          </div>

          <div id="box-produto" className="relative flex flex-col w-96 justify-center items-center">
            <div className="codigo absolute -left-[4.5rem] -rotate-90 bottom-1/4">
              <span className="text-3xl font-bold text-slate-100/10">BA103</span>
            </div>

            <div className="relative flex bg-[url('https://res.cloudinary.com/daruxsllg/image/upload/v1722015735/brk/bc9oonibwjvfotx1ltc6.jpg')] p-4 box-image rounded-3xl translate-y-20">
              <span className="absolute -top-6 -right-4 bg-slate-200 text-slate-700 p-[.8rem] font-bold border-2 rounded-full shadow-lg">50</span>
              <img className="w-48 rounded-lg" src="https://res.cloudinary.com/daruxsllg/image/upload/v1722015735/brk/bc9oonibwjvfotx1ltc6.jpg" alt="" />
            </div>

            <div className="flex flex-col justify-center items-center text-center p-8 pt-24 pb-24 border border-green-400 rounded-lg shadow-green-400/10 shadow-md">
              <h3 className="text-slate-100/85 font-bold my-6">Boné Trucker Brk Agro São Bento Vermelho e Azul</h3>

              <div className="w-full gap-y-3 infos">
                <table className="w-full table text-slate-100/70">
                  <tbody>
                    <tr className="border-b border-slate-500/45">
                      <td className="text-left">
                        <strong>Marca:</strong>
                      </td>
                      <td className="text-right">Marine Sports</td>
                    </tr>
                    <tr className="border-b border-slate-500/45">
                      <td className="text-left">
                        <strong>Peso:</strong>
                      </td>
                      <td className="text-right">0,250Kg</td>
                    </tr>
                    <tr className="border-b border-slate-500/45">
                      <td className="text-left">
                        <strong>Largura:</strong>
                      </td>
                      <td className="text-right">0,80cm</td>
                    </tr>
                    <tr className="border-b border-slate-500/45">
                      <td className="text-left">
                        <strong>Altura:</strong>
                      </td>
                      <td className="text-right">0,80cm</td>
                    </tr>
                    <tr className="border-b border-slate-500/45">
                      <td className="text-left">
                        <strong>Profundidade:</strong>
                      </td>
                      <td className="text-right">0,80cm</td>
                    </tr>
                    <tr className="border-b border-slate-500/45">
                      <td className="text-left">
                        <strong>Unidade:</strong>
                      </td>
                      <td className="text-right">UN</td>
                    </tr>
                    <tr className="border-b border-slate-500/45">
                      <td className="text-left">
                        <strong>Volumes:</strong>
                      </td>
                      <td className="text-right">1</td>
                    </tr>

                    <tr className="border-b border-slate-500/45">
                      <td className="text-left">
                        <strong>Item:</strong>
                      </td>
                      <td className="text-right">1</td>
                    </tr>

                    <tr className="border-b border-slate-500/45">
                      <td className="text-left">
                        <strong>EAN:</strong>
                      </td>
                      <td className="text-right">1</td>
                    </tr>

                    <tr className="border-b border-slate-500/45">
                      <td className="text-left">
                        <strong>Descrição:</strong>
                      </td>
                      <td className="text-right">Completa</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="absolute -bottom-6 font-bold text-slate-100 bg-gradient-to-r from-zinc-700 to-zinc-800 py-4 px-10 border border-slate-100/15 rounded-lg shadow-lg">
                <p>
                  <span>R$</span>129,90
                </p>
              </div>
            </div>
          </div>

          <div id="box-produto" className="relative flex flex-col w-96 justify-center items-center">
            <div className="codigo absolute -left-[5rem] -rotate-90 bottom-1/4">
              <span className="text-3xl font-bold text-slate-100/10">APC205</span>
            </div>

            <div className="relative flex bg-slate-200 p-4 box-image rounded-3xl translate-y-20">
              <span className="absolute -top-6 -right-4 bg-slate-200 text-slate-700 p-[.8rem] font-bold border-2 rounded-full shadow-lg">50</span>
              <img className="w-48 rounded-lg" src="https://res.cloudinary.com/daruxsllg/image/upload/v1722016097/brk/syzx0h99stq5qh6xyrls.jpg" alt="" />
            </div>

            <div className="flex flex-col justify-center items-center text-center p-8 pt-24 pb-24 border border-red-400 rounded-lg shadow-red-400/10 shadow-md bg-[#1B0A0A]">
              <h3 className="text-slate-100/85 font-bold my-6">Camiseta Brk Fishing ESTD 2012 com Algodão Egípcio</h3>

              <div className="w-full gap-y-3 infos">
                <table className="w-full table text-slate-100/70">
                  <tbody>
                    <tr className="border-b border-slate-500/45">
                      <td className="text-left">
                        <strong>Marca:</strong>
                      </td>
                      <td className="text-right">Brk Fishing</td>
                    </tr>
                    <tr className="border-b border-slate-500/45">
                      <td className="text-left">
                        <strong>Peso:</strong>
                      </td>
                      <td className="text-right">0,250Kg</td>
                    </tr>
                    <tr className="border-b border-slate-500/45">
                      <td className="text-left">
                        <strong>Largura:</strong>
                      </td>
                      <td className="text-right">0,80cm</td>
                    </tr>
                    <tr className="border-b border-slate-500/45">
                      <td className="text-left">
                        <strong>Altura:</strong>
                      </td>
                      <td className="text-right">0,80cm</td>
                    </tr>
                    <tr className="border-b border-slate-500/45">
                      <td className="text-left">
                        <strong>Profundidade:</strong>
                      </td>
                      <td className="text-right">0,80cm</td>
                    </tr>
                    <tr className="border-b border-slate-500/45">
                      <td className="text-left">
                        <strong>Unidade:</strong>
                      </td>
                      <td className="text-right">UN</td>
                    </tr>
                    <tr className="border-b border-slate-500/45">
                      <td className="text-left">
                        <strong>Volumes:</strong>
                      </td>
                      <td className="text-right">1</td>
                    </tr>

                    <tr className="border-b border-slate-500/45">
                      <td className="text-left">
                        <strong>Item:</strong>
                      </td>
                      <td className="text-right">1</td>
                    </tr>

                    <tr className="border-b border-slate-500/45">
                      <td className="text-left">
                        <strong>EAN:</strong>
                      </td>
                      <td className="text-right">1</td>
                    </tr>

                    <tr className="border-b border-slate-500/45">
                      <td className="text-left">
                        <strong>Descrição:</strong>
                      </td>
                      <td className="text-right">Completa</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="absolute -bottom-6 font-bold text-slate-100 bg-gradient-to-r from-zinc-700 to-zinc-800 py-4 px-10 border border-slate-100/15 rounded-lg shadow-lg">
                <p>
                  <span>R$</span>129,90
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import {
  CircleNotch,
  FileArrowDown,
  Hoodie,
  Link,
  ListPlus,
  Tree,
} from "@phosphor-icons/react";
import { SubmitHandler, useForm } from "react-hook-form";

import { utils, readFile } from "xlsx";
import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

type esquemaDeDadosFormulario = {
  codigo: string;
  titulo: string;
  estoque: string;
  preco: string;
  imagens: any;

  tamanho_masculino: string;
  tamanho_feminino: string;
  tamanho_infantil: string;

  cor_branco: string;
  cor_preto: string;
  cor_azul: string;

  metatitle: string;
  metadescription: string;
  metakeywords: string;
};

const relacaoDeTamanhos = [
  {
    masculino: {
      tamanhos: [
        {
          nome: "PP",
          sigla_camisa: "PP",
        },
        {
          nome: "P",
          sigla_camisa: "P",
        },
        {
          nome: "M",
          sigla_camisa: "M",
        },
        {
          nome: "G",
          sigla_camisa: "G",
        },
        {
          nome: "GG",
          sigla_camisa: "GG",
        },
        {
          nome: "G1",
          sigla_camisa: "G1",
        },
        {
          nome: "G2",
          sigla_camisa: "G2",
        },
      ],
    },
    feminino: {
      tamanhos: [
        {
          nome: "PP",
          sigla_camisa: "BLPP",
        },
        {
          nome: "P",
          sigla_camisa: "BLP",
        },
        {
          nome: "M",
          sigla_camisa: "BLM",
        },
        {
          nome: "G",
          sigla_camisa: "BLG",
        },
        {
          nome: "GG",
          sigla_camisa: "BLGG",
        },
        {
          nome: "G1",
          sigla_camisa: "BLG1",
        },
        {
          nome: "G2",
          sigla_camisa: "BLG2",
        },
      ],
    },
    infantil: {
      tamanhos: [
        {
          nome: "PP",
          sigla_camisa: "IPP",
        },
        {
          nome: "P",
          sigla_camisa: "IP",
        },
        {
          nome: "M",
          sigla_camisa: "IM",
        },
        {
          nome: "G",
          sigla_camisa: "IG",
        },
        {
          nome: "GG",
          sigla_camisa: "IGG",
        },
        {
          nome: "G1",
          sigla_camisa: "IG1",
        },
        {
          nome: "G2",
          sigla_camisa: "IG2",
        },
      ],
    },
  },
];

const relacaoDeCores = [
  {
    branco: {
      tamanhos: [
        {
          cor_nome: "Branco",
          tamanho: "P",
        },
        {
          cor_nome: "Branco",
          tamanho: "M",
        },
        {
          cor_nome: "Branco",
          tamanho: "G",
        },
        {
          cor_nome: "Branco",
          tamanho: "GG",
        },
        {
          cor_nome: "Branco",
          tamanho: "G1",
        },
      ],
    },
    preto: {
      tamanhos: [
        {
          cor_nome: "Preto",
          tamanho: "P",
        },
        {
          cor_nome: "Preto",
          tamanho: "M",
        },
        {
          cor_nome: "Preto",
          tamanho: "G",
        },
        {
          cor_nome: "Preto",
          tamanho: "GG",
        },
        {
          cor_nome: "Preto",
          tamanho: "G1",
        },
      ],
    },
    azul: {
      tamanhos: [
        {
          cor_nome: "Azul",
          tamanho: "PP",
        },
        {
          cor_nome: "Azul",
          tamanho: "P",
        },
        {
          cor_nome: "Azul",
          tamanho: "M",
        },
        {
          cor_nome: "Azul",
          tamanho: "G",
        },
        {
          cor_nome: "Azul",
          tamanho: "GG",
        },
        {
          cor_nome: "Azul",
          tamanho: "G1",
        },
      ],
    },
  },
];

export default function Home() {
  const [files, setFiles] = useState<any[]>([]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const [tipoDeProduto, setTipoDeProduto] = useState("camisa");
  const [tipoAlgodao, setTipoAlgodao] = useState("comalgodao");
  const [tipoCadastro, setTipoCadastro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const [textToCopy, setTextToCopy] = useState("Texto a ser copiado");
  const [todasImagensData, setTodasImagensData] = useState<any[]>([]);
  const [imagensMasculinasData, setImagensMasculinasData] = useState<any[]>([]);
  const [imagensFemininasData, setImagensFemininasData] = useState<any[]>([]);
  const [imagensInfantisData, setImagensInfantisDataData] = useState<any[]>([]);

  useEffect(() => {
    () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  });

  //Captura do Formulário
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<esquemaDeDadosFormulario>();

  const onSubmit: SubmitHandler<esquemaDeDadosFormulario> = async (data) => {
    setCarregando(true);

    //Imagens Planilha
    var todasAsImagens: any = [];
    var imagensMasculinas: any = [];
    var imagensFemininas: any = [];
    var imagensInfantis: any = [];

    var imagensCorBranco: any = [];
    var imagensCorPreto: any = [];
    var imagensCorAzul: any = [];

    const qtdFiles = Object.keys(files).length;

    //Ordena as Imagens em Ordem Ascendente
    const filesOrdenados = files.toSorted((a, b) => {
      const numA = parseInt(a.name.split("_")[0], 10);
      const numB = parseInt(b.name.split("_")[0], 10);

      return numA - numB;
    });

    for (let i = 0; i < qtdFiles; i++) {
      const file = filesOrdenados[i];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response:any = await axios.post("/api/upload-image-s3",formData);
        const urlDaImagem = response.data.file.location;

        // Imagens por Gênero
        if (file.name.toLowerCase().includes("masc")) {
          imagensMasculinas.push(urlDaImagem);
        }

        if (file.name.toLowerCase().includes("fem")) {
          imagensFemininas.push(urlDaImagem);
        }

        if (file.name.toLowerCase().includes("inf")) {
          imagensInfantis.push(urlDaImagem);
        }

        // Imagens por Cores
        if (file.name.toLowerCase().includes("branco")) {
          imagensCorBranco.push(urlDaImagem);
        }

        if (file.name.toLowerCase().includes("preto")) {
          imagensCorPreto.push(urlDaImagem);
        }

        if (file.name.toLowerCase().includes("azul")) {
          imagensCorAzul.push(urlDaImagem);
        }

        todasAsImagens.push(urlDaImagem);
      } catch (error) {
        console.error("Erro no Upload da Imagem: ", error);
      }
    }

    try {
      if (tipoCadastro === "planilha") {
        setTodasImagensData(todasAsImagens.join("|"));
        setImagensMasculinasData(imagensMasculinas.join("|"));
        setImagensFemininasData(imagensFemininas.join("|"));
        setImagensInfantisDataData(imagensInfantis.join("|"));
      }
    } catch (error) {
      alert(`Opa, tem algum problema rolando... Chama o dev 😒: ${error}`);
      setCarregando(false);
    } finally {
      setCarregando(false);
    }
  };

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <Image
        className="rounded-lg"
        width={90}
        height={90}
        src={file.preview}
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
        alt=""
      />
    </div>
  ));

  const copyToClipboard = (text: any) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Texto copiado com sucesso!");
      })
      .catch((err) => {
        console.error("Erro ao copiar o texto: ", err);
      });
  };

  // const handleFileUpload = (event: any) => {
  //   console.log(event)
  //   const file = event.target.files[0];
  //   const reader = new FileReader();

  //   reader.onload = (e: any) => {
  //     const arrayBuffer = e.target.result;
  //     const workbook = readFile(arrayBuffer, { type: "array" });
  //     const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  //     const jsonData = utils.sheet_to_json(worksheet, { header: 1 });

  //     const columnCData = jsonData.slice(1).map((row: any) => row[1]);

  //     setData(columnCData);
  //   };

  //   reader.readAsArrayBuffer(file);
  // };

  return (
    <>
      <div className="relative flex flex-col min-h-screen h-full w-full items-center justify-center gap-4 py-10 overflow-y-clip">
        {carregando ? (
          <>
            <div className="fixed w-screen h-screen top-0 left-0 z-20 bg-zinc-100/10 backdrop-blur-[1px] blur-[1px]"></div>
            <div className="fixed w-[520px] z-30 bg-zinc-800 p-20 rounded-md">
              <span className="flex justify-center items-center text-zinc-200">
                <CircleNotch size={50} className="animate-spin mr-4 text-zinc-200" />
                Processando...
              </span>
            </div>
          </>
        ) : (
          <></>
        )}

        {/* Imagens Background Dinâmicas por Produtos */}
        <Image
          src={`/camisa.png`}
          className={`absolute ease-in-out -left-60 -bottom-96 z-0 ${
            tipoDeProduto === "camisa"
              ? "translate-x-0 translate-y-0 placeholder-opacity-75"
              : "opacity-0 translate-x-10 translate-y-10"
          }`}
          width={900}
          height={900}
          alt=""
          priority
        />
        <Image
          src={`/camiseta.png`}
          className={`absolute ease-in-out -left-60 -bottom-80 z-0 ${
            tipoDeProduto === "camiseta"
              ? "translate-x-0 translate-y-0 placeholder-opacity-75"
              : "opacity-0 translate-x-10 translate-y-10"
          }`}
          width={900}
          height={900}
          alt=""
        />

        {/* Escolha do Produto */}
        <div className="fixed right-0 top-[50%] translate-y-[-50%] hidden flex-col justify-center align-center divide-y z-10">
          <button
            onClick={() => setTipoDeProduto("camisa")}
            type="button"
            className={`flex flex-col gap-2 items-center justify-center py-4 px-1 rounded-tl-lg text-sm ${
              tipoDeProduto === "camisa"
                ? "bg-slate-200 text-zinc-950"
                : "text-zinc-200 hover:bg-slate-200 hover:text-slate-950"
            }`}
          >
            <Hoodie size={32} />
            Camisas
          </button>
          <button
            onClick={() => setTipoDeProduto("camiseta")}
            type="button"
            className={`flex flex-col gap-1 items-center justify-center py-4 px-1 text-sm ${
              tipoDeProduto === "camiseta"
                ? "bg-slate-200 text-zinc-950"
                : "text-zinc-200 hover:bg-slate-200 hover:text-slate-950"
            }`}
          >
            <Tree size={32} />
            Algodão
          </button>
        </div>

        {/* Formulários */}
        <div className="flex container justify-center w-full z-10">
          <form
            className="flex flex-col justify-center items-center gap-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            {tipoDeProduto === "camisa" && (
              <>
                <section className="container">
                  <label
                    htmlFor="imagens"
                    {...getRootProps({
                      className:
                        "dropzone flex bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 border-dashed w-full justify-center items-center cursor-pointer mb-10 mt-4 p-8 rounded-lg",
                    })}
                  >
                    <input
                      className="cursor-pointer text-zinc-200"
                      type="file"
                      id="imagens"
                      multiple
                      {...register("imagens")}
                      {...getInputProps()}
                    />

                    <div className="flex flex-col sm:min-w-full md:min-w-[1020px] max-w-[1020px] gap-1 text-slate-100">
                      <h4>
                        {files.length === 0 ? (
                          <div className="flex flex-col gap-4 justify-center items-center text-slate-100/45">
                            <FileArrowDown size={32} />
                            <p>Selecione as Imagens ou Solte Aqui</p>
                          </div>
                        ) : (
                          "Imagens"
                        )}
                      </h4>
                      <ul className="flex flex-wrap text-slate-100/45 gap-4">{thumbs}</ul>
                    </div>
                  </label>
                </section>

                {/* Variações de Gêneros */}
                <div className="flex-1 w-full hidden">
                  <fieldset className="flex justify-center border border-slate-200/10 p-10 gap-10">
                    <legend className="text-slate-200 font-bold text-lg px-4">
                      Variações
                    </legend>
                    <label
                      className="flex gap-4 border border-zinc-800 py-4 px-10 rounded-lg cursor-pointer"
                      htmlFor="tamanho-masculino"
                    >
                      <input
                        id="tamanho-masculino"
                        type="checkbox"
                        {...register("tamanho_masculino")}
                        defaultChecked={true}
                      />
                      <span className="text-zinc-200">Masculino</span>
                    </label>
                    <label
                      className="flex gap-4 border border-zinc-800 py-4 px-10 rounded-lg cursor-pointer"
                      htmlFor="tamanho-feminino"
                    >
                      <input
                        id="tamanho-feminino"
                        type="checkbox"
                        {...register("tamanho_feminino")}
                        defaultChecked={true}
                      />
                      <span className="text-zinc-200">Feminino</span>
                    </label>
                    <label
                      className="flex gap-4 border border-zinc-800 py-4 px-10 rounded-lg cursor-pointer"
                      htmlFor="tamanho-infantil"
                    >
                      <input
                        id="tamanho-infantil"
                        type="checkbox"
                        {...register("tamanho_infantil")}
                        defaultChecked={true}
                      />
                      <span className="text-zinc-200">Infantil</span>
                    </label>
                  </fieldset>
                </div>

                {/* Links */}
                <div className="flex flex-col w-full">
                  <fieldset className="border border-slate-200/10 p-10">
                    <legend className="text-slate-200 font-bold text-lg px-4">
                      Links
                    </legend>

                    <label
                      className="relative flex flex-col gap-2 text-zinc-200 mb-8"
                      htmlFor="principal"
                    >
                      Imagens Principais
                      <input
                        className="bg-transparent text-zinc-400 placeholder:text-zinc-400/25 placeholder:text-sm border-b border-b-zinc-700 py-1.5"
                        id="principal"
                        type="text"
                        placeholder=""
                        defaultValue={todasImagensData}
                      />
                      <button
                        type="button"
                        onClick={() => copyToClipboard(todasImagensData)}
                        className="absolute right-0 bottom-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm p-2 rounded-lg"
                      >
                        Copiar
                      </button>
                    </label>

                    <label
                      className="relative flex flex-col gap-2 text-zinc-200 mb-8"
                      htmlFor="masculinas"
                    >
                      Imagens Masculina
                      <input
                        className="bg-transparent text-zinc-400 placeholder:text-zinc-400/25 placeholder:text-sm border-b border-b-zinc-700 py-1.5"
                        id="masculinas"
                        type="text"
                        placeholder=""
                        defaultValue={imagensMasculinasData}
                      />
                      <button
                        type="button"
                        onClick={() => copyToClipboard(imagensMasculinasData)}
                        className="absolute right-0 bottom-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm p-2 rounded-lg"
                      >
                        Copiar
                      </button>
                    </label>

                    <label
                      className="relative flex flex-col gap-2 text-zinc-200 mb-8"
                      htmlFor="femininas"
                    >
                      Imagens Feminina
                      <input
                        className="bg-transparent text-zinc-400 placeholder:text-zinc-400/25 placeholder:text-sm border-b border-b-zinc-700 py-1.5"
                        id="femininas"
                        type="text"
                        placeholder=""
                        defaultValue={imagensFemininasData}
                      />
                      <button
                        type="button"
                        onClick={() => copyToClipboard(imagensFemininasData)}
                        className="absolute right-0 bottom-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm p-2 rounded-lg"
                      >
                        Copiar
                      </button>
                    </label>

                    <label
                      className="relative flex flex-col gap-2 text-zinc-200"
                      htmlFor="infantis"
                    >
                      Imagens Infantil
                      <input
                        className="bg-transparent text-zinc-400 placeholder:text-zinc-400/25 placeholder:text-sm border-b border-b-zinc-700 py-1.5"
                        id="infantis"
                        type="text"
                        placeholder=""
                        defaultValue={imagensInfantisData}
                      />
                      <button
                        type="button"
                        onClick={() => copyToClipboard(imagensInfantisData)}
                        className="absolute right-0 bottom-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm p-2 rounded-lg"
                      >
                        Copiar
                      </button>
                    </label>
                  </fieldset>
                </div>
              </>
            )}

            {tipoDeProduto !== "" && (
              <div className="flex container items-center justify-center mt-10 pt-10 py-2 px-10 border-t border-zinc-800 gap-8">
                <button
                  onClick={() => {
                    setTipoCadastro("planilha");
                  }}
                  type="submit"
                  className={`py-2 px-10 border border-transparent hover:border-zinc-400 rounded-lg text-zinc-200 ${
                    carregando &&
                    "pointer-events-none cursor-not-allowed opacity-5"
                  }`}
                >
                  <span className="flex justify-center items-center gap-2">
                    <Link size={32} /> Gerar Links
                  </span>
                </button>

                <button
                  onClick={() => {
                    setTipoCadastro("bling");
                  }}
                  type="submit"
                  className={`hidden py-2 px-10 border border-transparent hover:border-zinc-400 rounded-lg text-zinc-200 ${
                    carregando &&
                    "pointer-events-none cursor-not-allowed opacity-5"
                  }`}
                >
                  {carregando ? (
                    <span className="flex justify-center items-center">
                      <CircleNotch size={20} className="animate-spin mr-4" />
                      Processando...
                    </span>
                  ) : (
                    <span className="flex justify-center items-center gap-2">
                      <ListPlus size={32} /> Cadastrar
                    </span>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

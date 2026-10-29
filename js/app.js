const FIREBASE_BASE = "https://materiais-complementares-default-rtdb.firebaseio.com";
function MaterialsApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [senha, setSenha] = useState("");
  const [erroLogin, setErroLogin] = useState("");
  const [usuario, setUsuario] = useState("");
  const [janelaSenha, setJanelaSenha] = useState(null); // {perfil, modo}
  const modalSenha = janelaSenha && React.createElement(JanelaSenhaPerfil, {
    perfil: janelaSenha.perfil,
    modo: janelaSenha.modo,
    onCancelar: () => setJanelaSenha(null),
    onOk: () => {
      if (janelaSenha.modo === "entrar") setUsuario(janelaSenha.perfil);
      setJanelaSenha(null);
    },
  });
  const [projetoAtual, setProjetoAtual] = useState("");
  const [listaProjetos, setListaProjetos] = useState([]);
  const [loadingProjetos, setLoadingProjetos] = useState(false);
  const [statusSalvamento, setStatusSalvamento] = useState("");

  // O Catálogo agora é um state, carregado do banco (ou do padrão se não existir)
  const [catalogo, setCatalogo] = useState(initialMaterialsData);
  const [obra, setObra] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [data, setData] = useState(() => new Date().toISOString().slice(0, 10));
  const [inputs, setInputs] = useState(defaultInputs);
  const [quant, setQuant] = useState({});
  const [overrides, setOverrides] = useState({});
  const [galvanizados, setGalvanizados] = useState({}); // NOVO ESTADO AQUI

  const [comentarios, setComentarios] = useState({});
  const [fotos, setFotos] = useState({});
  const [precos, setPrecos] = useState({});
  const [incluirValores, setIncluirValores] = useState(false);
  const [filtro, setFiltro] = useState("todos");
  const [photoModal, setPhotoModal] = useState(null);
  const [commentModal, setCommentModal] = useState(null);
  const [newItemModal, setNewItemModal] = useState(null);
  const [newItemForm, setNewItemForm] = useState({
    cod: "",
    desc: "",
    pedido: "FÁBRICA",
    complementar: "",
  });

  // Helper para gerar a lista de quantidades iniciais baseada no catálogo atual
  const buildInitialQuant = (cat) => {
    const map = {};
    for (const s of cat) {
      for (const r of s.rows) {
        if (r.isSubheader) continue;
        if (isComputed(r.row)) continue;
        map[r.row] = r.default !== "" && r.default != null ? String(r.default) : "";
      }
    }
    return map;
  };

  // Carrega Catálogo, Fotos e Preços globalmente
  useEffect(() => {
    if (!isAuthenticated) return;
    fetch(`${FIREBASE_BASE}/catalogo.json`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          setCatalogo(data);
          setQuant((prev) => (Object.keys(prev).length > 0 ? prev : buildInitialQuant(data)));
        } else {
          setQuant(buildInitialQuant(initialMaterialsData));
        }
      });
    fetch(`${FIREBASE_BASE}/fotos.json`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => setFotos(data || {}));
    fetch(`${FIREBASE_BASE}/precos.json`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => setPrecos(data || {}));
    const timer = setInterval(() => {
      fetch(`${FIREBASE_BASE}/precos.json`, {
        cache: "no-store",
      })
        .then((res) => res.json())
        .then((data) => setPrecos(data || {}));
    }, 15000);
    return () => clearInterval(timer);
  }, [isAuthenticated]);

  // Carrega Comentários e Projetos do Usuário logado
  useEffect(() => {
    if (!usuario) return;
    fetch(`${FIREBASE_BASE}/usuarios/${usuario}/comentarios.json`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => setComentarios(data || {}));
    setLoadingProjetos(true);
    fetch(`${FIREBASE_BASE}/usuarios/${usuario}/projetos.json`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        setListaProjetos(data ? Object.keys(data) : []);
        setLoadingProjetos(false);
      })
      .catch(() => setLoadingProjetos(false));
  }, [usuario]);
  const handleBlurCatalogo = () => {
    fetch(`${FIREBASE_BASE}/catalogo.json`, {
      method: "PUT",
      body: JSON.stringify(catalogo),
    });
  };
  const handleSaveNewItem = () => {
    const newCat = [...catalogo];
    newCat[newItemModal.sectionIndex].rows.push({
      row: Date.now(),
      cod: newItemForm.cod,
      desc: newItemForm.desc,
      pedido: newItemForm.pedido,
      complementar: newItemForm.complementar,
      formula: null,
      default: "",
      isSubheader: false,
    });
    setCatalogo(newCat);
    fetch(`${FIREBASE_BASE}/catalogo.json`, {
      method: "PUT",
      body: JSON.stringify(newCat),
    });
    setNewItemModal(null);
  };
  const criarProjeto = () => {
    let nome = prompt("Digite o nome do novo projeto:");
    if (!nome) return;
    nome = nome.replace(/[.#$\[\]]/g, "").trim();
    if (nome === "") return;
    if (listaProjetos.includes(nome)) {
      alert("Já existe um projeto com este nome!");
      return;
    }
    setStatusSalvamento("Criando...");
    const dadosIniciais = {
      obra: nome,
      responsavel: usuario,
      data: new Date().toISOString().slice(0, 10),
      inputs: defaultInputs,
      quant: buildInitialQuant(catalogo),
      overrides: {},
      galvanizados: {},
    };
    fetch(`${FIREBASE_BASE}/usuarios/${usuario}/projetos/${nome}.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosIniciais),
    }).then(() => {
      setListaProjetos([...listaProjetos, nome]);
      setStatusSalvamento("");
      selecionarProjeto(nome);
    });
  };
  const deletarProjeto = (nome) => {
    if (confirm(`Tem certeza que deseja apagar permanentemente o projeto "${nome}"?`)) {
      fetch(`${FIREBASE_BASE}/usuarios/${usuario}/projetos/${nome}.json`, {
        method: "DELETE",
      }).then(() => {
        setListaProjetos(listaProjetos.filter((p) => p !== nome));
      });
    }
  };
  const selecionarProjeto = (nome) => {
    setStatusSalvamento("Carregando projeto...");
    fetch(`${FIREBASE_BASE}/usuarios/${usuario}/projetos/${nome}.json`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((d) => {
        if (d) {
          setObra(d.obra || nome);
          setResponsavel(d.responsavel || usuario);
          setData(d.data || new Date().toISOString().slice(0, 10));
          setInputs(d.inputs || defaultInputs);
          setQuant(d.quant || buildInitialQuant(catalogo));
          setOverrides(d.overrides || {});
          setGalvanizados(d.galvanizados || {});
        } else {
          setObra(nome);
          setResponsavel(usuario);
          setData(new Date().toISOString().slice(0, 10));
          setInputs(defaultInputs);
          setQuant(buildInitialQuant(catalogo));
          setOverrides({});
          setGalvanizados({});
        }
        setProjetoAtual(nome);
        setStatusSalvamento("");
      });
  };
  const salvarDados = () => {
    setStatusSalvamento("Salvando...");
    const projectData = {
      obra,
      responsavel,
      data,
      inputs,
      quant,
      overrides,
      galvanizados,
    };
    if (obra !== projetoAtual && obra.trim() !== "") {
      fetch(`${FIREBASE_BASE}/usuarios/${usuario}/projetos/${obra}.json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      }).then(() => {
        fetch(`${FIREBASE_BASE}/usuarios/${usuario}/projetos/${projetoAtual}.json`, {
          method: "DELETE",
        }).then(() => {
          // Leva junto as baixas do almoxarifado para o novo nome
          fetch(`${FIREBASE_BASE}/baixas/${usuario}/${projetoAtual}.json`, { cache: "no-store" })
            .then((r) => r.json())
            .then((b) => {
              if (!b) return;
              fetch(`${FIREBASE_BASE}/baixas/${usuario}/${obra}.json`, { method: "PUT", body: JSON.stringify(b) }).then(() =>
                fetch(`${FIREBASE_BASE}/baixas/${usuario}/${projetoAtual}.json`, { method: "DELETE" }),
              );
            });
          setListaProjetos((prev) => [...prev.filter((p) => p !== projetoAtual), obra]);
          setProjetoAtual(obra);
          setStatusSalvamento("Salvo na nuvem!");
          setTimeout(() => setStatusSalvamento(""), 2000);
        });
      });
    } else {
      fetch(`${FIREBASE_BASE}/usuarios/${usuario}/projetos/${projetoAtual}.json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      }).then(() => {
        setStatusSalvamento("Salvo na nuvem!");
        setTimeout(() => setStatusSalvamento(""), 2000);
      });
    }
  };
  const atualizarComentario = (row, texto) => {
    const novos = {
      ...comentarios,
    };
    if (!texto.trim()) delete novos[row];
    else novos[row] = texto;
    setComentarios(novos);
    fetch(`${FIREBASE_BASE}/usuarios/${usuario}/comentarios.json`, {
      method: "PUT",
      body: JSON.stringify(novos),
    });
  };
  const atualizarFoto = (row, base64) => {
    const novas = {
      ...fotos,
    };
    if (!base64) delete novas[row];
    else novas[row] = base64;
    setFotos(novas);
    fetch(`${FIREBASE_BASE}/fotos.json`, {
      method: "PUT",
      body: JSON.stringify(novas),
    });
  };
  const atualizarPreco = (row, valor) => {
    const novos = {
      ...precos,
    };
    if (valor === "" || valor === null || valor === undefined) delete novos[row];
    else novos[row] = String(valor);
    setPrecos(novos);
    fetch(`${FIREBASE_BASE}/precos.json`, {
      method: "PUT",
      body: JSON.stringify(novos),
    });
  };
  const parsePreco = (v) => {
    if (v === undefined || v === null || v === "") return 0;
    const n = parseFloat(String(v).replace(",", "."));
    return Number.isFinite(n) ? n : 0;
  };
  const formatBRL = (n) => {
    if (!Number.isFinite(n)) n = 0;
    return n.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };
  const computedQty = useMemo(() => {
    const map = {};
    for (const s of catalogo) {
      for (const r of s.rows) {
        if (r.isSubheader) continue;
        if (!isComputed(r.row)) {
          const v = parseFloat((quant[r.row] ?? "").toString().replace(",", "."));
          map[r.row] = Number.isFinite(v) ? v : 0;
        }
      }
    }
    const computedRows = Object.keys(computedFormulas)
      .map(Number)
      .sort((a, b) => a - b);
    for (const r of computedRows) {
      if (overrides[r] !== undefined && overrides[r] !== "") {
        map[r] = parseFloat(overrides[r].toString().replace(",", ".")) || 0;
      } else {
        map[r] = computedFormulas[r].compute(map, inputs);
      }
    }
    return map;
  }, [quant, inputs, overrides, catalogo]);
  const totalGeral = useMemo(() => {
    let total = 0;
    for (const sec of catalogo) {
      for (const r of sec.rows) {
        if (r.isSubheader) continue;
        const qty = computedQty[r.row] ?? 0;
        const preco = parsePreco(precos[r.row]);
        total += qty * preco;
      }
    }
    return total;
  }, [computedQty, precos, catalogo]);
  const totalLinhasPreenchidas = catalogo.reduce(
    (acc, s) => acc + s.rows.filter((r) => !r.isSubheader && (computedQty[r.row] ?? 0) > 0).length,
    0,
  );
  const reset = () => {
    if (confirm("Limpar todos os campos da lista deste projeto?")) {
      setInputs(defaultInputs);
      setQuant(buildInitialQuant(catalogo));
      setOverrides({});
      setGalvanizados({});
    }
  };
  const updateInput = (key, value) =>
    setInputs((p) => ({
      ...p,
      [key]: value,
    }));
  const exportarExcel = () => {
    const ws_data = [];
    const merges = [];
    let rowIndex = 0;
    const withVals = incluirValores;
    const numCols = withVals ? 6 : 3;
    const lastCol = numCols - 1;
    const titleStyle = {
      font: {
        bold: true,
      },
      alignment: {
        vertical: "center",
      },
    };
    ws_data.push([
      {
        v: "Obra:",
        s: titleStyle,
      },
      {
        v: obra || "-",
      },
    ]);
    ws_data.push([
      {
        v: "Responsável:",
        s: titleStyle,
      },
      {
        v: responsavel || "-",
      },
    ]);
    ws_data.push([
      {
        v: "Data:",
        s: titleStyle,
      },
      {
        v: data || "-",
      },
    ]);
    if (withVals)
      ws_data.push([
        {
          v: "Valor total do projeto:",
          s: titleStyle,
        },
        {
          v: totalGeral,
          t: "n",
          z: '"R$" #,##0.00',
        },
      ]);
    ws_data.push([]);
    rowIndex += withVals ? 5 : 4;
    const headerStyle = {
      font: {
        bold: true,
        color: {
          rgb: "FFFFFF",
        },
      },
      fill: {
        fgColor: {
          rgb: "4F81BD",
        },
      },
      border: {
        top: {
          style: "thin",
        },
        bottom: {
          style: "thin",
        },
        left: {
          style: "thin",
        },
        right: {
          style: "thin",
        },
      },
      alignment: {
        horizontal: "center",
        vertical: "center",
      },
    };
    const groupStyle = {
      font: {
        bold: true,
      },
      fill: {
        fgColor: {
          rgb: "DCE6F1",
        },
      },
      border: {
        top: {
          style: "thin",
        },
        bottom: {
          style: "thin",
        },
        left: {
          style: "thin",
        },
        right: {
          style: "thin",
        },
      },
      alignment: {
        vertical: "center",
      },
    };
    const cellStyle = {
      border: {
        top: {
          style: "thin",
        },
        bottom: {
          style: "thin",
        },
        left: {
          style: "thin",
        },
        right: {
          style: "thin",
        },
      },
      alignment: {
        vertical: "center",
      },
    };
    const numStyle = {
      border: {
        top: {
          style: "thin",
        },
        bottom: {
          style: "thin",
        },
        left: {
          style: "thin",
        },
        right: {
          style: "thin",
        },
      },
      alignment: {
        horizontal: "right",
        vertical: "center",
      },
    };
    const moneyStyle = {
      ...numStyle,
      numFmt: '"R$" #,##0.00',
    };
    const totalRowStyle = {
      font: {
        bold: true,
        color: {
          rgb: "FFFFFF",
        },
      },
      fill: {
        fgColor: {
          rgb: "2E7D32",
        },
      },
      border: {
        top: {
          style: "medium",
        },
        bottom: {
          style: "medium",
        },
        left: {
          style: "thin",
        },
        right: {
          style: "thin",
        },
      },
      alignment: {
        horizontal: "right",
        vertical: "center",
      },
    };
    const padGroup = (arr) => {
      while (arr.length < numCols)
        arr.push({
          v: "",
          s: groupStyle,
        });
      return arr;
    };
    catalogo.forEach((s) => {
      const grpRow = padGroup([
        {
          v: "GRUPO: " + s.title,
          s: groupStyle,
        },
      ]);
      ws_data.push(grpRow);
      merges.push({
        s: {
          r: rowIndex,
          c: 0,
        },
        e: {
          r: rowIndex,
          c: lastCol,
        },
      });
      rowIndex++;
      const hdr = [
        {
          v: "CÓDIGO",
          s: headerStyle,
        },
        {
          v: "DESCRIÇÃO",
          s: headerStyle,
        },
        {
          v: "QUANTIDADE",
          s: headerStyle,
        },
      ];
      if (withVals) {
        hdr.push({
          v: "VALOR UNIT.",
          s: headerStyle,
        });
        hdr.push({
          v: "VALOR TOTAL",
          s: headerStyle,
        });
        hdr.push({
          v: "REPRESENT.",
          s: headerStyle,
        });
      }
      ws_data.push(hdr);
      rowIndex++;
      (s.rows || []).forEach((r) => {
        if (r.isSubheader) {
          ws_data.push(
            padGroup([
              {
                v: r.desc,
                s: groupStyle,
              },
            ]),
          );
          merges.push({
            s: {
              r: rowIndex,
              c: 0,
            },
            e: {
              r: rowIndex,
              c: lastCol,
            },
          });
          rowIndex++;
        } else {
          const qty = computedQty[r.row] || 0;

          // Tratamento da linha se for galvanizada:
          const isGalv = !!galvanizados[r.row];
          const finalDesc = isGalv ? `${r.desc} - GALVANIZADO À FOGO` : r.desc;
          const row = [
            {
              v: r.cod || "-",
              s: cellStyle,
            },
            {
              v: finalDesc,
              s: isGalv
                ? {
                    ...cellStyle,
                    font: {
                      color: {
                        rgb: "DC2626",
                      },
                      bold: true,
                    },
                  }
                : cellStyle,
            },
            {
              v: qty,
              t: "n",
              s: numStyle,
            },
          ];
          if (withVals) {
            const unit = parsePreco(precos[r.row]);
            const tot = qty * unit;
            const rep = totalGeral > 0 ? tot / totalGeral : 0;
            row.push({
              v: unit,
              t: "n",
              s: {
                ...moneyStyle,
                numFmt: '"R$" #,##0.00',
              },
              z: '"R$" #,##0.00',
            });
            row.push({
              v: tot,
              t: "n",
              s: {
                ...moneyStyle,
                numFmt: '"R$" #,##0.00',
              },
              z: '"R$" #,##0.00',
            });
            row.push({
              v: rep,
              t: "n",
              s: {
                ...numStyle,
                numFmt: "0.00%",
              },
              z: "0.00%",
            });
          }
          ws_data.push(row);
          rowIndex++;
        }
      });
      ws_data.push([]);
      rowIndex++;
    });
    if (withVals) {
      const totalRow = [
        {
          v: "TOTAL GERAL DO PROJETO",
          s: totalRowStyle,
        },
        {
          v: "",
          s: totalRowStyle,
        },
        {
          v: "",
          s: totalRowStyle,
        },
        {
          v: "",
          s: totalRowStyle,
        },
        {
          v: totalGeral,
          t: "n",
          s: {
            ...totalRowStyle,
            numFmt: '"R$" #,##0.00',
          },
          z: '"R$" #,##0.00',
        },
        {
          v: 1,
          t: "n",
          s: {
            ...totalRowStyle,
            numFmt: "0.00%",
          },
          z: "0.00%",
        },
      ];
      ws_data.push(totalRow);
      merges.push({
        s: {
          r: rowIndex,
          c: 0,
        },
        e: {
          r: rowIndex,
          c: 3,
        },
      });
      rowIndex++;
    }
    const worksheet = XLSX.utils.aoa_to_sheet(ws_data);
    worksheet["!merges"] = merges;
    worksheet["!cols"] = withVals
      ? [
          {
            wch: 15,
          },
          {
            wch: 60,
          },
          {
            wch: 15,
          },
          {
            wch: 15,
          },
          {
            wch: 18,
          },
          {
            wch: 14,
          },
        ]
      : [
          {
            wch: 15,
          },
          {
            wch: 60,
          },
          {
            wch: 15,
          },
        ];
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Quantitativos");
    const nomeArquivo = `${obra ? obra.replace(/[^a-z0-9]/gi, "_") : "Projeto"}_Quantitativos.xlsx`;
    XLSX.writeFile(workbook, nomeArquivo);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (senha === "PROD2026") {
      setIsAuthenticated(true);
      setErroLogin("");
    } else {
      setErroLogin("Senha incorreta. Acesso bloqueado.");
    }
  };
  if (!isAuthenticated) {
    return /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "min-h-screen w-full flex items-center justify-center bg-slate-50 p-4",
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-200 p-8",
        },
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "text-center mb-6",
          },
          /*#__PURE__*/ React.createElement(
            "h2",
            {
              className: "text-2xl font-bold text-slate-900 tracking-tight",
            },
            "Sistema Próprio",
          ),
          /*#__PURE__*/ React.createElement(
            "p",
            {
              className: "text-sm text-slate-500 mt-2",
            },
            "Engenharia de Produção - Quantitativos",
          ),
        ),
        /*#__PURE__*/ React.createElement(
          "form",
          {
            onSubmit: handleLogin,
            className: "space-y-4",
          },
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "space-y-2",
            },
            /*#__PURE__*/ React.createElement(
              "label",
              {
                className: "text-sm font-medium text-slate-700 block",
              },
              "Senha de Acesso",
            ),
            /*#__PURE__*/ React.createElement("input", {
              type: "password",
              value: senha,
              onChange: (e) => setSenha(e.target.value),
              className:
                "w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm bg-white text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all",
              placeholder: "Insira sua senha",
            }),
          ),
          erroLogin &&
            /*#__PURE__*/ React.createElement(
              "p",
              {
                className: "text-sm font-medium text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-100",
              },
              erroLogin,
            ),
          /*#__PURE__*/ React.createElement(
            "button",
            {
              type: "submit",
              className:
                "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-colors shadow-sm mt-2",
            },
            "Acessar Ferramenta",
          ),
        ),
      ),
    );
  }
  if (!usuario) {
    return /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4",
      },
      modalSenha,
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "max-w-sm w-full bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center",
        },
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "mx-auto w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6",
          },
          /*#__PURE__*/ React.createElement(IconUser, null),
        ),
        /*#__PURE__*/ React.createElement(
          "h1",
          {
            className: "text-2xl font-bold text-slate-800 mb-2",
          },
          "Quem está acessando?",
        ),
        /*#__PURE__*/ React.createElement(
          "p",
          {
            className: "text-slate-500 mb-8 text-sm",
          },
          "Selecione seu perfil para ver seus projetos",
        ),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "space-y-3",
          },
          /*#__PURE__*/ React.createElement(
            "button",
            {
              onClick: () => setJanelaSenha({ perfil: "Uesley", modo: "entrar" }),
              className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition",
            },
            "Acessar como Uesley",
          ),
          /*#__PURE__*/ React.createElement(
            "button",
            {
              onClick: () => setJanelaSenha({ perfil: "Gabriel", modo: "entrar" }),
              className: "w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-lg transition",
            },
            "Acessar como Gabriel",
          ),
          /*#__PURE__*/ React.createElement(
            "button",
            {
              onClick: () => setUsuario("Almoxarifado"),
              className: "w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg transition",
            },
            "Acessar como Almoxarifado",
          ),
        ),
      ),
    );
  }
  if (usuario === "Almoxarifado") {
    return React.createElement(AlmoxarifadoApp, { catalogo, onSair: () => setUsuario("") });
  }
  if (!projetoAtual) {
    return /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "min-h-screen bg-slate-50 p-6 md:p-12",
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "max-w-4xl mx-auto",
        },
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "flex items-center justify-between mb-8",
          },
          /*#__PURE__*/ React.createElement(
            "div",
            null,
            /*#__PURE__*/ React.createElement(
              "h1",
              {
                className: "text-3xl font-bold text-slate-800",
              },
              "Meus Projetos",
            ),
            /*#__PURE__*/ React.createElement(
              "p",
              {
                className: "text-slate-500 mt-1",
              },
              "Bem-vindo(a), ",
              usuario,
              ". Gerencie suas obras abaixo.",
            ),
          ),
          React.createElement(
            "div",
            { className: "flex items-center gap-4" },
            modalSenha,
            React.createElement(
              "button",
              {
                onClick: () => setJanelaSenha({ perfil: usuario, modo: "mudar" }),
                className: "text-sm font-medium text-slate-500 hover:text-blue-600 transition",
              },
              "Mudar Senha",
            ),
            React.createElement(
              "button",
              {
                onClick: () => setUsuario(""),
                className: "text-sm font-medium text-slate-500 hover:text-red-600 transition",
              },
              "Trocar Usuário",
            ),
          ),
        ),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden",
          },
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50",
            },
            /*#__PURE__*/ React.createElement(
              "span",
              {
                className: "font-semibold text-slate-700",
              },
              "Lista de Obras",
            ),
            /*#__PURE__*/ React.createElement(
              "button",
              {
                onClick: criarProjeto,
                className:
                  "flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition font-medium",
              },
              /*#__PURE__*/ React.createElement(IconPlus, null),
              " Novo Projeto",
            ),
          ),
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "divide-y divide-slate-100",
            },
            loadingProjetos
              ? /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    className: "p-8 text-center text-slate-500",
                  },
                  "Carregando projetos...",
                )
              : listaProjetos.length === 0
                ? /*#__PURE__*/ React.createElement(
                    "div",
                    {
                      className: "p-12 text-center text-slate-400",
                    },
                    /*#__PURE__*/ React.createElement("p", null, "Nenhum projeto encontrado."),
                    /*#__PURE__*/ React.createElement(
                      "p",
                      {
                        className: "text-sm mt-1",
                      },
                      'Clique em "Novo Projeto" para começar.',
                    ),
                  )
                : listaProjetos.map((proj) =>
                    /*#__PURE__*/ React.createElement(
                      "div",
                      {
                        key: proj,
                        className: "flex items-center justify-between p-4 hover:bg-slate-50 transition group",
                      },
                      /*#__PURE__*/ React.createElement(
                        "button",
                        {
                          onClick: () => selecionarProjeto(proj),
                          className: "flex-1 text-left font-semibold text-slate-700 text-lg group-hover:text-blue-600 transition",
                        },
                        proj,
                      ),
                      /*#__PURE__*/ React.createElement(
                        "button",
                        {
                          onClick: () => deletarProjeto(proj),
                          className: "text-slate-400 hover:text-red-500 p-2 rounded-md hover:bg-red-50 transition",
                          title: "Excluir projeto",
                        },
                        /*#__PURE__*/ React.createElement(IconTrash, null),
                      ),
                    ),
                  ),
          ),
        ),
      ),
    );
  }
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "min-h-screen bg-white text-slate-900",
    },
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "print:hidden",
      },
      /*#__PURE__*/ React.createElement(
        "header",
        {
          className: "border-b border-slate-200 bg-white sticky top-0 z-10 shadow-sm",
        },
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-4",
          },
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "flex items-center gap-4",
            },
            /*#__PURE__*/ React.createElement(
              "button",
              {
                onClick: () => setProjetoAtual(""),
                className: "p-2 -ml-2 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition",
                title: "Voltar para projetos",
              },
              /*#__PURE__*/ React.createElement(IconArrowLeft, null),
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "h-10 w-10 rounded-lg bg-blue-600 text-white flex items-center justify-center",
              },
              /*#__PURE__*/ React.createElement(IconCalculator, null),
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              null,
              /*#__PURE__*/ React.createElement(
                "h1",
                {
                  className: "text-xl font-bold leading-tight",
                },
                projetoAtual,
              ),
              /*#__PURE__*/ React.createElement(
                "p",
                {
                  className: "text-xs text-slate-500",
                },
                "Logado como ",
                usuario,
              ),
            ),
          ),
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "flex items-center gap-2",
            },
            /*#__PURE__*/ React.createElement(
              "label",
              {
                className:
                  "hidden md:inline-flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-100 border border-slate-200 px-3 py-2 rounded cursor-pointer hover:bg-slate-200 transition",
                title: "Se marcado, exporta as colunas Valor Unitário, Valor Total e Representatividade no PDF e Excel",
              },
              /*#__PURE__*/ React.createElement("input", {
                type: "checkbox",
                checked: incluirValores,
                onChange: (e) => setIncluirValores(e.target.checked),
                className: "w-4 h-4 accent-blue-600",
              }),
              "Incluir valores no PDF/Excel",
            ),
            statusSalvamento &&
              /*#__PURE__*/ React.createElement(
                "span",
                {
                  className: "hidden md:inline text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded",
                },
                statusSalvamento,
              ),
            /*#__PURE__*/ React.createElement(
              "button",
              {
                onClick: salvarDados,
                className:
                  "inline-flex items-center gap-2 rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700 transition shadow-sm",
              },
              /*#__PURE__*/ React.createElement(IconSave, null),
              " Salvar",
            ),
            /*#__PURE__*/ React.createElement(
              "button",
              {
                onClick: reset,
                className:
                  "inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50 transition",
              },
              /*#__PURE__*/ React.createElement(IconRotate, null),
              " Limpar",
            ),
            /*#__PURE__*/ React.createElement(
              "button",
              {
                onClick: exportarExcel,
                className:
                  "hidden md:inline-flex items-center gap-2 rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition",
              },
              /*#__PURE__*/ React.createElement(IconExcel, null),
              " Excel",
            ),
            /*#__PURE__*/ React.createElement(
              "button",
              {
                onClick: () => window.print(),
                className:
                  "hidden md:inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 transition",
              },
              /*#__PURE__*/ React.createElement(IconPrinter, null),
              " PDF",
            ),
          ),
        ),
      ),
      /*#__PURE__*/ React.createElement(
        "main",
        {
          className: "mx-auto max-w-7xl px-6 py-8 space-y-6",
        },
        /*#__PURE__*/ React.createElement(
          "section",
          {
            className: "rounded-lg border border-slate-200 bg-white p-5 shadow-sm",
          },
          /*#__PURE__*/ React.createElement(
            "h2",
            {
              className: "text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4",
            },
            "Identificação da Obra",
          ),
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "grid grid-cols-1 md:grid-cols-3 gap-4",
            },
            /*#__PURE__*/ React.createElement(
              Field,
              {
                label: "Nome da obra",
              },
              /*#__PURE__*/ React.createElement("input", {
                value: obra,
                onChange: (e) => setObra(e.target.value),
                className: "w-full border border-slate-300 rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500",
              }),
            ),
            /*#__PURE__*/ React.createElement(
              Field,
              {
                label: "Responsável",
              },
              /*#__PURE__*/ React.createElement("input", {
                value: responsavel,
                onChange: (e) => setResponsavel(e.target.value),
                className: "w-full border border-slate-300 rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500",
              }),
            ),
            /*#__PURE__*/ React.createElement(
              Field,
              {
                label: "Data",
              },
              /*#__PURE__*/ React.createElement("input", {
                type: "date",
                value: data,
                onChange: (e) => setData(e.target.value),
                className: "w-full border border-slate-300 rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500",
              }),
            ),
          ),
        ),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "flex items-center gap-2",
          },
          /*#__PURE__*/ React.createElement(
            "span",
            {
              className: "text-xs uppercase tracking-wider text-slate-500",
            },
            "Filtrar:",
          ),
          ["todos", "FÁBRICA", "ESTOQUE"].map((f) =>
            /*#__PURE__*/ React.createElement(
              "button",
              {
                key: f,
                onClick: () => setFiltro(f),
                className: `px-3 py-1 rounded-md text-xs font-medium border transition ${filtro === f ? "bg-blue-600 text-white border-blue-600" : "bg-white border-slate-200 hover:bg-slate-50"}`,
              },
              f === "todos" ? "Todos" : f,
            ),
          ),
        ),
        catalogo.map((s, idx) =>
          /*#__PURE__*/ React.createElement(SectionCard, {
            key: s.title || idx,
            section: s,
            sectionIndex: idx,
            catalogo: catalogo,
            setCatalogo: setCatalogo,
            handleBlurCatalogo: handleBlurCatalogo,
            quant: quant,
            setQuant: setQuant,
            overrides: overrides,
            setOverrides: setOverrides,
            galvanizados: galvanizados,
            setGalvanizados: setGalvanizados,
            computedQty: computedQty,
            filtro: filtro,
            inputs: inputs,
            updateInput: updateInput,
            comentarios: comentarios,
            fotos: fotos,
            setPhotoModal: setPhotoModal,
            setCommentModal: setCommentModal,
            setNewItemModal: setNewItemModal,
            precos: precos,
            atualizarPreco: atualizarPreco,
            totalGeral: totalGeral,
            parsePreco: parsePreco,
            formatBRL: formatBRL,
          }),
        ),
        /*#__PURE__*/ React.createElement(
          "section",
          {
            className: "rounded-lg border-2 border-emerald-500 bg-emerald-50 p-5 shadow-sm",
          },
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "flex items-center justify-between flex-wrap gap-3",
            },
            /*#__PURE__*/ React.createElement(
              "div",
              null,
              /*#__PURE__*/ React.createElement(
                "h2",
                {
                  className: "text-sm font-semibold uppercase tracking-wider text-emerald-700",
                },
                "Valor Total do Projeto",
              ),
              /*#__PURE__*/ React.createElement(
                "p",
                {
                  className: "text-xs text-emerald-600 mt-1",
                },
                "Soma de todos os itens (Quantidade × Valor Unitário)",
              ),
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "text-3xl font-bold text-emerald-800 font-mono",
              },
              formatBRL(totalGeral),
            ),
          ),
        ),
        /*#__PURE__*/ React.createElement(
          "footer",
          {
            className: "text-center text-xs text-slate-500 py-6",
          },
          totalLinhasPreenchidas,
          " itens preenchidos neste projeto.",
        ),
      ),
      photoModal &&
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4",
          },
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col",
            },
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50",
              },
              /*#__PURE__*/ React.createElement(
                "h3",
                {
                  className: "font-semibold text-slate-800 text-sm",
                },
                photoModal.desc,
              ),
              /*#__PURE__*/ React.createElement(
                "button",
                {
                  onClick: () => setPhotoModal(null),
                  className: "text-slate-400 hover:text-slate-700",
                },
                /*#__PURE__*/ React.createElement(IconClose, null),
              ),
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "p-4 flex-1 flex flex-col items-center justify-center min-h-[300px] bg-slate-100",
              },
              fotos[photoModal.row]
                ? /*#__PURE__*/ React.createElement("img", {
                    src: fotos[photoModal.row],
                    alt: "Anexo",
                    className: "max-w-full max-h-[350px] object-contain rounded border border-slate-200 shadow-sm bg-white",
                  })
                : /*#__PURE__*/ React.createElement(
                    "div",
                    {
                      className: "text-slate-400 flex flex-col items-center gap-2",
                    },
                    /*#__PURE__*/ React.createElement(IconCamera, null),
                    /*#__PURE__*/ React.createElement(
                      "p",
                      {
                        className: "text-sm",
                      },
                      "Nenhuma foto anexada",
                    ),
                  ),
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "p-4 border-t border-slate-100 bg-slate-50 flex justify-between",
              },
              /*#__PURE__*/ React.createElement(
                "div",
                null,
                /*#__PURE__*/ React.createElement("input", {
                  type: "file",
                  accept: "image/*",
                  id: "photo-upload",
                  className: "hidden",
                  onChange: (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      const img = new Image();
                      img.onload = () => {
                        const canvas = document.createElement("canvas");
                        const MAX_WIDTH = 800;
                        let scaleSize = 1;
                        if (img.width > MAX_WIDTH) {
                          scaleSize = MAX_WIDTH / img.width;
                        }
                        canvas.width = img.width * scaleSize;
                        canvas.height = img.height * scaleSize;
                        const ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        const base64 = canvas.toDataURL("image/jpeg", 0.6);
                        atualizarFoto(photoModal.row, base64);
                      };
                      img.src = ev.target.result;
                    };
                    reader.readAsDataURL(file);
                  },
                }),
                /*#__PURE__*/ React.createElement(
                  "label",
                  {
                    htmlFor: "photo-upload",
                    className:
                      "cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition",
                  },
                  fotos[photoModal.row] ? "Trocar Foto" : "Anexar Foto",
                ),
              ),
              fotos[photoModal.row] &&
                /*#__PURE__*/ React.createElement(
                  "button",
                  {
                    onClick: () => {
                      if (confirm("Apagar esta foto permanentemente para todos?")) {
                        atualizarFoto(photoModal.row, null);
                      }
                    },
                    className: "px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-md hover:bg-red-100 transition",
                  },
                  "Apagar",
                ),
            ),
          ),
        ),
      commentModal &&
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4",
          },
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col",
            },
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50",
              },
              /*#__PURE__*/ React.createElement(
                "h3",
                {
                  className: "font-semibold text-slate-800 text-sm",
                },
                "Adicionar Comentário",
              ),
              /*#__PURE__*/ React.createElement(
                "button",
                {
                  onClick: () => setCommentModal(null),
                  className: "text-slate-400 hover:text-slate-700",
                },
                /*#__PURE__*/ React.createElement(IconClose, null),
              ),
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "p-4 bg-white",
              },
              /*#__PURE__*/ React.createElement("textarea", {
                autoFocus: true,
                className:
                  "w-full border border-slate-300 rounded-md p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-none",
                placeholder: "Escreva seu comentário aqui...",
                value: commentModal.current,
                onChange: (e) =>
                  setCommentModal({
                    ...commentModal,
                    current: e.target.value,
                  }),
              }),
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "p-4 border-t border-slate-100 bg-slate-50 flex justify-between",
              },
              /*#__PURE__*/ React.createElement(
                "button",
                {
                  onClick: () => {
                    atualizarComentario(commentModal.row, "");
                    setCommentModal(null);
                  },
                  className: "px-4 py-2 text-red-600 bg-red-50 text-sm font-medium rounded-md hover:bg-red-100 transition",
                },
                "Apagar",
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  className: "flex gap-2",
                },
                /*#__PURE__*/ React.createElement(
                  "button",
                  {
                    onClick: () => setCommentModal(null),
                    className: "px-4 py-2 text-slate-600 bg-slate-200 text-sm font-medium rounded-md hover:bg-slate-300 transition",
                  },
                  "Cancelar",
                ),
                /*#__PURE__*/ React.createElement(
                  "button",
                  {
                    onClick: () => {
                      atualizarComentario(commentModal.row, commentModal.current);
                      setCommentModal(null);
                    },
                    className: "px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition",
                  },
                  "Salvar",
                ),
              ),
            ),
          ),
        ),
      newItemModal &&
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4",
          },
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col",
            },
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50",
              },
              /*#__PURE__*/ React.createElement(
                "h3",
                {
                  className: "font-semibold text-slate-800 text-sm",
                },
                "Novo item em: ",
                catalogo[newItemModal.sectionIndex].title,
              ),
              /*#__PURE__*/ React.createElement(
                "button",
                {
                  onClick: () => setNewItemModal(null),
                  className: "text-slate-400 hover:text-slate-700",
                },
                /*#__PURE__*/ React.createElement(IconClose, null),
              ),
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "p-4 bg-white flex flex-col gap-3",
              },
              /*#__PURE__*/ React.createElement(
                "div",
                null,
                /*#__PURE__*/ React.createElement(
                  "label",
                  {
                    className: "block text-xs font-medium text-slate-500 mb-1",
                  },
                  "Código",
                ),
                /*#__PURE__*/ React.createElement("input", {
                  className: "w-full border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2 text-sm",
                  value: newItemForm.cod,
                  onChange: (e) =>
                    setNewItemForm({
                      ...newItemForm,
                      cod: e.target.value,
                    }),
                  placeholder: "Ex: 12345",
                }),
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                null,
                /*#__PURE__*/ React.createElement(
                  "label",
                  {
                    className: "block text-xs font-medium text-slate-500 mb-1",
                  },
                  "Descrição",
                ),
                /*#__PURE__*/ React.createElement("input", {
                  className: "w-full border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2 text-sm",
                  value: newItemForm.desc,
                  onChange: (e) =>
                    setNewItemForm({
                      ...newItemForm,
                      desc: e.target.value,
                    }),
                  placeholder: "Nome da peça",
                }),
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                null,
                /*#__PURE__*/ React.createElement(
                  "label",
                  {
                    className: "block text-xs font-medium text-slate-500 mb-1",
                  },
                  "Pedido",
                ),
                /*#__PURE__*/ React.createElement(
                  "select",
                  {
                    className:
                      "w-full border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2 text-sm font-semibold text-slate-700",
                    value: newItemForm.pedido,
                    onChange: (e) =>
                      setNewItemForm({
                        ...newItemForm,
                        pedido: e.target.value,
                      }),
                  },
                  /*#__PURE__*/ React.createElement(
                    "option",
                    {
                      value: "FÁBRICA",
                    },
                    "FÁBRICA",
                  ),
                  /*#__PURE__*/ React.createElement(
                    "option",
                    {
                      value: "ESTOQUE",
                    },
                    "ESTOQUE",
                  ),
                ),
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                null,
                /*#__PURE__*/ React.createElement(
                  "label",
                  {
                    className: "block text-xs font-medium text-slate-500 mb-1",
                  },
                  "Complementar",
                ),
                /*#__PURE__*/ React.createElement("input", {
                  className: "w-full border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2 text-sm",
                  value: newItemForm.complementar,
                  onChange: (e) =>
                    setNewItemForm({
                      ...newItemForm,
                      complementar: e.target.value,
                    }),
                  placeholder: "Onde é usado?",
                }),
              ),
            ),
            /*#__PURE__*/ React.createElement(
              "div",
              {
                className: "p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-2",
              },
              /*#__PURE__*/ React.createElement(
                "button",
                {
                  onClick: () => setNewItemModal(null),
                  className: "px-4 py-2 text-slate-600 bg-slate-200 text-sm font-medium rounded-md hover:bg-slate-300 transition",
                },
                "Cancelar",
              ),
              /*#__PURE__*/ React.createElement(
                "button",
                {
                  onClick: handleSaveNewItem,
                  className: "px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition",
                },
                "Adicionar Peça",
              ),
            ),
          ),
        ),
    ),
    /*#__PURE__*/ React.createElement(PrintReport, {
      obra: obra,
      responsavel: responsavel,
      data: data,
      sections: catalogo,
      computedQty: computedQty,
      precos: precos,
      incluirValores: incluirValores,
      galvanizados: galvanizados,
      totalGeral: totalGeral,
      parsePreco: parsePreco,
      formatBRL: formatBRL,
    }),
  );
}

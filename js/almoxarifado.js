// ==========================================
// PERFIL ALMOXARIFADO
// Só visualiza as obras de todos e registra BAIXAS (saída de material).
// Cada baixa grava data e hora automaticamente.
// As baixas ficam salvas em: baixas/{dono}/{projeto}  (separado do projeto,
// assim o "Salvar" do Uesley/Gabriel nunca apaga as baixas).
// ==========================================
const DONOS_OBRAS = ["Uesley", "Gabriel"];
const h = React.createElement;

// Calcula a quantidade prevista de cada item de um projeto (mesma lógica da tela principal)
const calcularPrevisto = (catalogo, proj) => {
  const quant = proj.quant || {};
  const overrides = proj.overrides || {};
  const inputs = proj.inputs || defaultInputs;
  const map = {};
  for (const s of catalogo) {
    for (const r of s.rows) {
      if (r.isSubheader || isComputed(r.row)) continue;
      map[r.row] = num(quant[r.row]);
    }
  }
  Object.keys(computedFormulas)
    .map(Number)
    .sort((a, b) => a - b)
    .forEach((r) => {
      map[r] =
        overrides[r] !== undefined && overrides[r] !== ""
          ? num(overrides[r])
          : computedFormulas[r].compute(map, inputs);
    });
  return map;
};

const fmtDataHora = (iso) => {
  const d = new Date(iso);
  return {
    data: d.toLocaleDateString("pt-BR"),
    hora: d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
  };
};

function AlmoxarifadoApp({ catalogo, onSair }) {
  const [obras, setObras] = React.useState([]); // [{dono, nome}]
  const [carregando, setCarregando] = React.useState(true);
  const [atual, setAtual] = React.useState(null); // {dono, nome, dados}
  const [baixas, setBaixas] = React.useState({}); // {id: {row, qtd, quando}}
  const [entrada, setEntrada] = React.useState({}); // {row: "qtd digitada"}
  const [histRow, setHistRow] = React.useState(null);
  const [status, setStatus] = React.useState("");

  React.useEffect(() => {
    Promise.all(
      DONOS_OBRAS.map((dono) =>
        fetch(`${FIREBASE_BASE}/usuarios/${dono}/projetos.json?shallow=true`, { cache: "no-store" })
          .then((r) => r.json())
          .then((d) => Object.keys(d || {}).map((nome) => ({ dono, nome })))
          .catch(() => []),
      ),
    ).then((listas) => {
      setObras(listas.flat());
      setCarregando(false);
    });
  }, []);

  const abrirObra = (o) => {
    setStatus("Carregando obra...");
    Promise.all([
      fetch(`${FIREBASE_BASE}/usuarios/${o.dono}/projetos/${o.nome}.json`, { cache: "no-store" }).then((r) => r.json()),
      fetch(`${FIREBASE_BASE}/baixas/${o.dono}/${o.nome}.json`, { cache: "no-store" }).then((r) => r.json()),
    ]).then(([dados, b]) => {
      setAtual({ ...o, dados: dados || {} });
      setBaixas(b || {});
      setEntrada({});
      setStatus("");
    });
  };

  const previsto = React.useMemo(() => (atual ? calcularPrevisto(catalogo, atual.dados) : {}), [atual, catalogo]);

  const retiradoPorItem = React.useMemo(() => {
    const m = {};
    Object.values(baixas).forEach((b) => (m[b.row] = (m[b.row] || 0) + num(b.qtd)));
    return m;
  }, [baixas]);

  // Itens que aparecem: previstos > 0 ou que já tiveram baixa
  const secoes = React.useMemo(
    () =>
      catalogo
        .map((s) => ({
          ...s,
          rows: s.rows.filter((r) => !r.isSubheader && ((previsto[r.row] || 0) > 0 || retiradoPorItem[r.row])),
        }))
        .filter((s) => s.rows.length > 0),
    [catalogo, previsto, retiradoPorItem],
  );

  const descItem = (row) => {
    for (const s of catalogo) for (const r of s.rows) if (String(r.row) === String(row)) return r;
    return { cod: "", desc: "Item removido" };
  };

  const darBaixa = (row) => {
    const qtd = num(entrada[row]);
    if (qtd <= 0) {
      alert("Digite uma quantidade maior que zero.");
      return;
    }
    const item = descItem(row);
    const saldoDepois = (previsto[row] || 0) - (retiradoPorItem[row] || 0) - qtd;
    if (saldoDepois < 0 && !confirm(`Atenção: isso passa ${formatQty(-saldoDepois)} un. do previsto para "${item.desc}". Confirmar baixa?`)) return;
    const registro = { row, cod: item.cod || "", desc: item.desc || "", qtd, quando: new Date().toISOString(), por: "Almoxarifado" };
    setStatus("Registrando...");
    fetch(`${FIREBASE_BASE}/baixas/${atual.dono}/${atual.nome}.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registro),
    })
      .then((r) => r.json())
      .then((res) => {
        setBaixas((p) => ({ ...p, [res.name]: registro }));
        setEntrada((p) => ({ ...p, [row]: "" }));
        setStatus("Baixa registrada!");
        setTimeout(() => setStatus(""), 2000);
      })
      .catch(() => setStatus("Erro ao registrar. Verifique a internet."));
  };

  // DEVOLUÇÃO: volta material ao estoque (corrige baixa errada ou sobra da obra).
  // Grava um registro com quantidade NEGATIVA, com data e hora, sem apagar o histórico.
  const devolver = (row) => {
    const qtd = num(entrada[row]);
    if (qtd <= 0) {
      alert("Digite no campo a quantidade que está voltando ao estoque.");
      return;
    }
    const item = descItem(row);
    const jaRetirado = retiradoPorItem[row] || 0;
    if (qtd > jaRetirado) {
      alert(`Não dá para devolver ${formatQty(qtd)}: só saíram ${formatQty(jaRetirado)} de "${item.desc}".`);
      return;
    }
    const motivo = prompt(`Devolver ${formatQty(qtd)} de "${item.desc}" ao estoque.\nMotivo (opcional):`, "");
    if (motivo === null) return;
    const registro = { row, cod: item.cod || "", desc: item.desc || "", qtd: -qtd, tipo: "devolucao", motivo: motivo.trim(), quando: new Date().toISOString(), por: "Almoxarifado" };
    setStatus("Registrando devolução...");
    fetch(`${FIREBASE_BASE}/baixas/${atual.dono}/${atual.nome}.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registro),
    })
      .then((r) => r.json())
      .then((res) => {
        setBaixas((p) => ({ ...p, [res.name]: registro }));
        setEntrada((p) => ({ ...p, [row]: "" }));
        setStatus("Devolução registrada!");
        setTimeout(() => setStatus(""), 2000);
      })
      .catch(() => setStatus("Erro ao registrar. Verifique a internet."));
  };

  const historicoOrdenado = (filtroRow) =>
    Object.entries(baixas)
      .filter(([, b]) => filtroRow == null || String(b.row) === String(filtroRow))
      .sort((a, b) => (a[1].quando < b[1].quando ? 1 : -1));

  // ---------- EXCEL ----------
  const exportarExcel = () => {
    const borda = { style: "thin", color: { rgb: "CBD5E1" } };
    const bordas = { top: borda, bottom: borda, left: borda, right: borda };
    const titulo = { font: { bold: true, sz: 16, color: { rgb: "FFFFFF" } }, fill: { fgColor: { rgb: "1E3A8A" } }, alignment: { horizontal: "center", vertical: "center" } };
    const sub = { font: { italic: true, sz: 10, color: { rgb: "334155" } }, fill: { fgColor: { rgb: "E2E8F0" } }, alignment: { horizontal: "center" } };
    const cab = { font: { bold: true, color: { rgb: "FFFFFF" } }, fill: { fgColor: { rgb: "2563EB" } }, alignment: { horizontal: "center", vertical: "center", wrapText: true }, border: bordas };
    const secao = { font: { bold: true, color: { rgb: "1E3A8A" } }, fill: { fgColor: { rgb: "DBEAFE" } }, border: bordas };
    const cel = (zebra) => ({ border: bordas, fill: { fgColor: { rgb: zebra ? "F8FAFC" : "FFFFFF" } }, alignment: { vertical: "center" } });
    // Inteiro sem casas decimais (evita a vírgula sobrando no final); fracionado com 2 casas
    const numCel = (zebra, extra = {}, v = 0) => ({ ...cel(zebra), alignment: { horizontal: "center" }, numFmt: Number.isInteger(v) ? "#,##0" : "#,##0.00", ...extra });
    const agora = fmtDataHora(new Date().toISOString());
    const subtitulo = `Responsável: ${atual.dono}   •   Gerado em ${agora.data} às ${agora.hora}`;

    // Aba 1: Resumo
    const r1 = [
      [{ v: `CONTROLE DE BAIXAS — ${atual.nome}`, s: titulo }, "", "", "", "", ""].map((c) => (typeof c === "string" ? { v: "", s: titulo } : c)),
      Array(6).fill(0).map((_, i) => ({ v: i === 0 ? subtitulo : "", s: sub })),
      [],
      ["CÓDIGO", "DESCRIÇÃO", "PREVISTO", "RETIRADO", "SALDO", "SITUAÇÃO"].map((v) => ({ v, s: cab })),
    ];
    const m1 = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }, { s: { r: 1, c: 0 }, e: { r: 1, c: 5 } }];
    let z = false;
    secoes.forEach((s) => {
      m1.push({ s: { r: r1.length, c: 0 }, e: { r: r1.length, c: 5 } });
      r1.push(Array(6).fill(0).map((_, i) => ({ v: i === 0 ? s.title || s.titulo || s.nome || "" : "", s: secao })));
      s.rows.forEach((r) => {
        z = !z;
        const p = previsto[r.row] || 0;
        const ret = retiradoPorItem[r.row] || 0;
        const saldo = p - ret;
        const neg = saldo < 0;
        const vermelho = { font: { bold: true, color: { rgb: "DC2626" } }, fill: { fgColor: { rgb: "FEE2E2" } } };
        const situacao = neg ? "EXCEDIDO" : saldo === 0 ? "COMPLETO" : ret > 0 ? "PARCIAL" : "PENDENTE";
        const corSit = { EXCEDIDO: "DC2626", COMPLETO: "16A34A", PARCIAL: "D97706", PENDENTE: "64748B" }[situacao];
        r1.push([
          { v: r.cod || "", s: { ...cel(z), alignment: { horizontal: "center" } } },
          { v: r.desc || "", s: cel(z) },
          { v: p, t: "n", s: numCel(z, {}, p) },
          { v: ret, t: "n", s: numCel(z, {}, ret) },
          { v: saldo, t: "n", s: numCel(z, neg ? vermelho : { font: { bold: true } }, saldo) },
          { v: situacao, s: { ...cel(z), alignment: { horizontal: "center" }, font: { bold: true, color: { rgb: corSit } } } },
        ]);
      });
    });
    const ws1 = XLSX.utils.aoa_to_sheet(r1);
    ws1["!merges"] = m1;
    ws1["!cols"] = [{ wch: 14 }, { wch: 55 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 13 }];
    ws1["!rows"] = [{ hpt: 30 }];

    // Aba 2: Histórico
    const r2 = [
      Array(9).fill(0).map((_, i) => ({ v: i === 0 ? `HISTÓRICO DE BAIXAS — ${atual.nome}` : "", s: titulo })),
      Array(9).fill(0).map((_, i) => ({ v: i === 0 ? subtitulo : "", s: sub })),
      [],
      ["DATA", "HORA", "CÓDIGO", "DESCRIÇÃO", "MOVIMENTO", "QUANTIDADE", "SALDO APÓS", "REGISTRADO POR", "MOTIVO"].map((v) => ({ v, s: cab })),
    ];
    const acumulado = {};
    const cronologico = historicoOrdenado(null).reverse();
    const linhas = cronologico.map(([, b]) => {
      acumulado[b.row] = (acumulado[b.row] || 0) + num(b.qtd);
      return { b, saldo: (previsto[b.row] || 0) - acumulado[b.row] };
    });
    linhas.reverse().forEach(({ b, saldo }, i) => {
      const zz = i % 2 === 1;
      const dh = fmtDataHora(b.quando);
      const it = descItem(b.row);
      r2.push([
        { v: dh.data, s: { ...cel(zz), alignment: { horizontal: "center" } } },
        { v: dh.hora, s: { ...cel(zz), alignment: { horizontal: "center" } } },
        { v: b.cod || it.cod || "", s: { ...cel(zz), alignment: { horizontal: "center" } } },
        { v: b.desc || it.desc || "", s: cel(zz) },
        { v: num(b.qtd) < 0 ? "DEVOLUÇÃO" : "BAIXA", s: { ...cel(zz), alignment: { horizontal: "center" }, font: { bold: true, color: { rgb: num(b.qtd) < 0 ? "16A34A" : "2563EB" } } } },
        { v: Math.abs(num(b.qtd)), t: "n", s: numCel(zz, { font: { bold: true } }, Math.abs(num(b.qtd))) },
        { v: saldo, t: "n", s: numCel(zz, saldo < 0 ? { font: { bold: true, color: { rgb: "DC2626" } }, fill: { fgColor: { rgb: "FEE2E2" } } } : {}, saldo) },
        { v: b.por || "Almoxarifado", s: { ...cel(zz), alignment: { horizontal: "center" } } },
        { v: b.motivo || "", s: cel(zz) },
      ]);
    });
    if (linhas.length === 0) r2.push([{ v: "Nenhuma baixa registrada ainda." }]);
    const ws2 = XLSX.utils.aoa_to_sheet(r2);
    ws2["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 8 } }, { s: { r: 1, c: 0 }, e: { r: 1, c: 8 } }];
    ws2["!cols"] = [{ wch: 12 }, { wch: 10 }, { wch: 14 }, { wch: 50 }, { wch: 13 }, { wch: 13 }, { wch: 12 }, { wch: 16 }, { wch: 30 }];
    ws2["!rows"] = [{ hpt: 30 }];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws1, "Resumo");
    XLSX.utils.book_append_sheet(wb, ws2, "Histórico de Baixas");
    XLSX.writeFile(wb, `${atual.nome.replace(/[^a-z0-9]/gi, "_")}_Baixas_Almoxarifado.xlsx`);
  };

  // ---------- TELA: LISTA DE OBRAS ----------
  if (!atual) {
    return h(
      "div",
      { className: "min-h-screen bg-slate-50 p-6 md:p-12" },
      h(
        "div",
        { className: "max-w-4xl mx-auto" },
        h(
          "div",
          { className: "flex items-center justify-between mb-8" },
          h("div", null,
            h("h1", { className: "text-3xl font-bold text-slate-800" }, "Almoxarifado"),
            h("p", { className: "text-slate-500 mt-1" }, "Todas as obras. Somente visualização e registro de baixas."),
          ),
          h("button", { onClick: onSair, className: "text-sm font-medium text-slate-500 hover:text-red-600" }, "Trocar Usuário"),
        ),
        status && h("p", { className: "mb-4 text-sm text-blue-600" }, status),
        DONOS_OBRAS.map((dono) => {
          const lista = obras.filter((o) => o.dono === dono);
          return h(
            "div",
            { key: dono, className: "bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6" },
            h("div", { className: "p-4 border-b border-slate-100 bg-slate-50 font-semibold text-slate-700" }, `Obras de ${dono}`),
            carregando
              ? h("div", { className: "p-6 text-center text-slate-500" }, "Carregando...")
              : lista.length === 0
                ? h("div", { className: "p-6 text-center text-slate-400" }, "Nenhuma obra.")
                : lista.map((o) =>
                    h("button", {
                      key: o.nome,
                      onClick: () => abrirObra(o),
                      className: "block w-full text-left p-4 border-b border-slate-100 font-semibold text-slate-700 text-lg hover:bg-slate-50 hover:text-blue-600",
                    }, o.nome),
                  ),
          );
        }),
      ),
    );
  }

  // ---------- TELA: OBRA ABERTA ----------
  const histModal =
    histRow != null &&
    h(
      "div",
      { className: "fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50", onClick: () => setHistRow(null) },
      h(
        "div",
        { className: "bg-white rounded-xl shadow-xl max-w-lg w-full p-6 max-h-[80vh] overflow-auto", onClick: (e) => e.stopPropagation() },
        h("h3", { className: "font-bold text-lg text-slate-800 mb-1" }, "Histórico de baixas e devoluções"),
        h("p", { className: "text-sm text-slate-500 mb-4" }, descItem(histRow).desc),
        historicoOrdenado(histRow).length === 0
          ? h("p", { className: "text-slate-400 text-sm" }, "Nenhuma baixa ainda.")
          : h("table", { className: "w-full text-sm" },
              h("thead", null, h("tr", { className: "text-left text-slate-500" }, h("th", null, "Data"), h("th", null, "Hora"), h("th", null, "Tipo"), h("th", { className: "text-right" }, "Qtd"))),
              h("tbody", null,
                historicoOrdenado(histRow).map(([id, b]) => {
                  const dh = fmtDataHora(b.quando);
                  return h("tr", { key: id, className: "border-t border-slate-100" },
                    h("td", { className: "py-1.5" }, dh.data), h("td", null, dh.hora),
                    h("td", { className: num(b.qtd) < 0 ? "text-green-600 font-medium" : "text-blue-600 font-medium", title: b.motivo || "" }, num(b.qtd) < 0 ? "Devolução" + (b.motivo ? " *" : "") : "Baixa"),
                    h("td", { className: "text-right font-semibold" }, formatQty(Math.abs(num(b.qtd)))));
                }),
              ),
            ),
        h("button", { onClick: () => setHistRow(null), className: "mt-5 w-full bg-slate-800 text-white py-2 rounded-lg font-semibold" }, "Fechar"),
      ),
    );

  return h(
    "div",
    { className: "min-h-screen bg-slate-50 p-4 md:p-8" },
    histModal,
    h(
      "div",
      { className: "max-w-5xl mx-auto" },
      h(
        "div",
        { className: "flex flex-wrap items-center justify-between gap-3 mb-6" },
        h("div", null,
          h("button", { onClick: () => setAtual(null), className: "text-sm text-slate-500 hover:text-blue-600 mb-1" }, "← Voltar às obras"),
          h("h1", { className: "text-2xl font-bold text-slate-800" }, atual.nome),
          h("p", { className: "text-sm text-slate-500" }, `Responsável: ${atual.dono} • Modo Almoxarifado (somente baixas)`),
        ),
        h("div", { className: "flex items-center gap-3" },
          status && h("span", { className: "text-sm text-blue-600 font-medium" }, status),
          h("button", { onClick: exportarExcel, className: "bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg text-sm" }, "Exportar Excel"),
        ),
      ),
      secoes.length === 0 && h("div", { className: "bg-white rounded-xl p-10 text-center text-slate-400 border" }, "Esta obra ainda não tem materiais previstos."),
      secoes.map((s, si) =>
        h(
          "div",
          { key: si, className: "bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-5" },
          h("div", { className: "px-4 py-3 bg-blue-50 border-b border-blue-100 font-bold text-blue-900" }, s.title || s.titulo || s.nome || ""),
          h("div", { className: "overflow-x-auto" },
            h("table", { className: "w-full text-sm" },
              h("thead", null,
                h("tr", { className: "text-slate-500 text-xs uppercase bg-slate-50" },
                  h("th", { className: "text-left p-2" }, "Código"),
                  h("th", { className: "text-left p-2" }, "Descrição"),
                  h("th", { className: "p-2" }, "Previsto"),
                  h("th", { className: "p-2" }, "Retirado"),
                  h("th", { className: "p-2" }, "Saldo"),
                  h("th", { className: "p-2" }, "Baixa / Devolução"),
                ),
              ),
              h("tbody", null,
                s.rows.map((r) => {
                  const p = previsto[r.row] || 0;
                  const ret = retiradoPorItem[r.row] || 0;
                  const saldo = p - ret;
                  return h("tr", { key: r.row, className: "border-t border-slate-100" },
                    h("td", { className: "p-2 text-slate-500 whitespace-nowrap" }, r.cod),
                    h("td", { className: "p-2 text-slate-800" }, r.desc),
                    h("td", { className: "p-2 text-center font-medium" }, formatQty(p)),
                    h("td", { className: "p-2 text-center" },
                      h("button", { onClick: () => setHistRow(r.row), className: "underline decoration-dotted hover:text-blue-600", title: "Ver histórico" }, formatQty(ret))),
                    h("td", { className: "p-2 text-center font-bold " + (saldo < 0 ? "text-red-600 bg-red-50" : saldo === 0 ? "text-green-600" : "text-slate-800") }, formatQty(saldo)),
                    h("td", { className: "p-2" },
                      h("div", { className: "flex gap-1 justify-center" },
                        h("input", {
                          type: "number", min: "0", step: "any", placeholder: "Qtd",
                          value: entrada[r.row] || "",
                          onChange: (e) => setEntrada((x) => ({ ...x, [r.row]: e.target.value })),
                          onKeyDown: (e) => e.key === "Enter" && darBaixa(r.row),
                          className: "w-20 px-2 py-1 border border-slate-300 rounded text-center",
                        }),
                        h("button", { onClick: () => darBaixa(r.row), className: "bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded font-semibold" }, "Baixa"),
                        h("button", { onClick: () => devolver(r.row), title: "Devolver ao estoque", className: "bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded font-semibold" }, "Devolver"),
                      ),
                    ),
                  );
                }),
              ),
            ),
          ),
        ),
      ),
    ),
  );
}

function Field({ label, children }) {
  return /*#__PURE__*/ React.createElement(
    "label",
    {
      className: "block",
    },
    /*#__PURE__*/ React.createElement(
      "span",
      {
        className: "block text-xs font-medium text-slate-500 mb-1",
      },
      label,
    ),
    children,
  );
}
function ParamInput({ param, inputs, updateInput }) {
  if (param.kind === "select") {
    return /*#__PURE__*/ React.createElement(
      "label",
      {
        className: "block",
      },
      /*#__PURE__*/ React.createElement(
        "span",
        {
          className: "block text-[11px] font-medium text-slate-500 mb-1",
        },
        param.label,
      ),
      /*#__PURE__*/ React.createElement(
        "select",
        {
          value: String(inputs[param.key] || ""),
          onChange: (e) => updateInput(param.key, e.target.value),
          className: "w-full border border-slate-300 rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500",
        },
        (param.options || []).map((o) =>
          /*#__PURE__*/ React.createElement(
            "option",
            {
              key: o.value,
              value: o.value,
            },
            o.label,
          ),
        ),
      ),
    );
  }
  const value = inputs[param.key];
  return /*#__PURE__*/ React.createElement(
    "label",
    {
      className: "block",
    },
    /*#__PURE__*/ React.createElement(
      "span",
      {
        className: "block text-[11px] font-medium text-slate-500 mb-1",
      },
      param.label,
      param.hint &&
        /*#__PURE__*/ React.createElement(
          "span",
          {
            className: "text-slate-400 font-normal ml-1",
          },
          "(",
          param.hint,
          ")",
        ),
    ),
    /*#__PURE__*/ React.createElement("input", {
      type: "number",
      inputMode: "decimal",
      step: "any",
      min: 0,
      value: value === 0 ? "" : value || "",
      onChange: (e) => updateInput(param.key, parseFloat(e.target.value) || 0),
      placeholder: "0",
      className: "w-full border border-slate-300 rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 font-mono",
    }),
  );
}
function SectionCard({
  section,
  sectionIndex,
  catalogo,
  setCatalogo,
  handleBlurCatalogo,
  quant,
  setQuant,
  overrides,
  setOverrides,
  galvanizados,
  setGalvanizados,
  computedQty,
  filtro,
  inputs,
  updateInput,
  comentarios,
  fotos,
  setPhotoModal,
  setCommentModal,
  precos,
  atualizarPreco,
  totalGeral,
  parsePreco,
  formatBRL,
  setNewItemModal,
}) {
  const visibleRows = (section.rows || []).filter((r) => r.isSubheader || filtro === "todos" || r.pedido === filtro);
  if (visibleRows.filter((r) => !r.isSubheader).length === 0) return null;
  return /*#__PURE__*/ React.createElement(
    "details",
    {
      open: true,
      className: "rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden mb-4",
    },
    /*#__PURE__*/ React.createElement(
      "summary",
      {
        className: "cursor-pointer list-none px-5 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition",
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "flex items-center gap-3",
        },
        /*#__PURE__*/ React.createElement(
          "span",
          {
            className: "font-mono text-xs text-slate-500 tabular-nums",
          },
          String(sectionIndex + 1).padStart(2, "0"),
        ),
        /*#__PURE__*/ React.createElement(
          "h2",
          {
            className: "text-lg font-semibold",
          },
          section.title,
        ),
      ),
      /*#__PURE__*/ React.createElement(
        "span",
        {
          className: "text-xs text-slate-500 font-mono",
        },
        section.rows.filter((r) => !r.isSubheader).length,
        " itens",
      ),
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "overflow-x-auto",
      },
      /*#__PURE__*/ React.createElement(
        "table",
        {
          className: "w-full text-sm",
        },
        /*#__PURE__*/ React.createElement(
          "thead",
          {
            className: "bg-slate-50 border-y border-slate-200",
          },
          /*#__PURE__*/ React.createElement(
            "tr",
            {
              className: "text-left text-slate-500 text-xs uppercase tracking-wider",
            },
            /*#__PURE__*/ React.createElement(
              "th",
              {
                className: "px-3 py-2 font-medium w-20",
              },
              "Cód",
            ),
            /*#__PURE__*/ React.createElement(
              "th",
              {
                className: "px-3 py-2 font-medium",
              },
              "Descrição",
            ),
            /*#__PURE__*/ React.createElement(
              "th",
              {
                className: "px-3 py-2 font-medium w-32",
              },
              "Quant",
            ),
            /*#__PURE__*/ React.createElement(
              "th",
              {
                className: "px-3 py-2 font-medium w-24",
              },
              "Pedido",
            ),
            /*#__PURE__*/ React.createElement(
              "th",
              {
                className: "px-3 py-2 font-medium hidden md:table-cell",
              },
              "Complementar",
            ),
            /*#__PURE__*/ React.createElement(
              "th",
              {
                className: "px-3 py-2 font-medium w-16 text-center",
              },
              "Coment",
            ),
            /*#__PURE__*/ React.createElement(
              "th",
              {
                className: "px-3 py-2 font-medium w-32 bg-amber-50 text-amber-700",
              },
              "Valor Unit. (R$)",
            ),
            /*#__PURE__*/ React.createElement(
              "th",
              {
                className: "px-3 py-2 font-medium w-32 bg-emerald-50 text-emerald-700",
              },
              "Valor Total",
            ),
            /*#__PURE__*/ React.createElement(
              "th",
              {
                className: "px-3 py-2 font-medium w-24 bg-blue-50 text-blue-700 text-center",
              },
              "Representat.",
            ),
          ),
        ),
        /*#__PURE__*/ React.createElement(
          "tbody",
          null,
          (section.rows || []).map((r, rowIndex) => {
            const isVisible = r.isSubheader || filtro === "todos" || r.pedido === filtro;
            if (!isVisible) return null;
            if (r.isSubheader) {
              return /*#__PURE__*/ React.createElement(
                "tr",
                {
                  key: r.row,
                  className: "bg-slate-100 border-t border-slate-200",
                },
                /*#__PURE__*/ React.createElement(
                  "td",
                  {
                    colSpan: "9",
                    className: "px-3 py-2 font-semibold text-sm uppercase tracking-wide",
                  },
                  /*#__PURE__*/ React.createElement("input", {
                    type: "text",
                    className:
                      "w-full bg-transparent border-transparent hover:border-slate-300 focus:bg-white focus:ring-1 focus:ring-blue-400 rounded outline-none transition-all",
                    value: r.desc || "",
                    onChange: (e) => {
                      const newCat = [...catalogo];
                      newCat[sectionIndex].rows[rowIndex].desc = e.target.value;
                      setCatalogo(newCat);
                    },
                    onBlur: handleBlurCatalogo,
                  }),
                ),
              );
            }
            const computed = isComputed(r.row);
            const meta = computed ? computedFormulas[r.row] : null;
            const params = rowParams[r.row];
            const hasOverride = overrides[r.row] !== undefined && overrides[r.row] !== "";
            const value = computed ? (hasOverride ? overrides[r.row] : computedQty[r.row]) : (quant[r.row] ?? "");
            return /*#__PURE__*/ React.createElement(
              Fragment,
              {
                key: r.row,
              },
              /*#__PURE__*/ React.createElement(
                "tr",
                {
                  className: "border-t border-slate-200 hover:bg-slate-50 transition",
                },
                /*#__PURE__*/ React.createElement(
                  "td",
                  {
                    className: "px-3 py-2 font-mono text-xs text-slate-500 tabular-nums",
                  },
                  /*#__PURE__*/ React.createElement("input", {
                    type: "text",
                    className:
                      "w-full bg-transparent border-transparent hover:border-slate-300 focus:bg-white focus:ring-1 focus:ring-blue-400 rounded px-1 outline-none transition-all",
                    value: r.cod || "",
                    onChange: (e) => {
                      const newCat = [...catalogo];
                      newCat[sectionIndex].rows[rowIndex].cod = e.target.value;
                      setCatalogo(newCat);
                    },
                    onBlur: handleBlurCatalogo,
                  }),
                ),
                /*#__PURE__*/ React.createElement(
                  "td",
                  {
                    className: "px-3 py-2",
                  },
                  /*#__PURE__*/ React.createElement(
                    "div",
                    {
                      className: "flex flex-col gap-1",
                    },
                    /*#__PURE__*/ React.createElement(
                      "div",
                      {
                        className: "flex items-center gap-2",
                      },
                      /*#__PURE__*/ React.createElement("input", {
                        type: "text",
                        className:
                          "w-full font-medium bg-transparent border-transparent hover:border-slate-300 focus:bg-white focus:ring-1 focus:ring-blue-400 rounded px-1 outline-none transition-all",
                        value: r.desc || "",
                        onChange: (e) => {
                          const newCat = [...catalogo];
                          newCat[sectionIndex].rows[rowIndex].desc = e.target.value;
                          setCatalogo(newCat);
                        },
                        onBlur: handleBlurCatalogo,
                      }),
                      /*#__PURE__*/ React.createElement(
                        "label",
                        {
                          className: `flex-shrink-0 flex items-center gap-1 cursor-pointer px-1.5 py-1 rounded transition-all border ${galvanizados[r.row] ? "bg-red-50 text-red-700 border-red-200 hover:bg-red-100" : "bg-transparent text-slate-400 hover:text-red-500 border-transparent hover:bg-slate-100"}`,
                          title: galvanizados[r.row] ? "Remover Galvanização" : "Marcar como Galvanizado à Fogo",
                        },
                        /*#__PURE__*/ React.createElement("input", {
                          type: "checkbox",
                          className: "w-3.5 h-3.5 accent-red-600 cursor-pointer",
                          checked: !!galvanizados[r.row],
                          onChange: (e) =>
                            setGalvanizados((prev) => ({
                              ...prev,
                              [r.row]: e.target.checked,
                            })),
                        }),
                      ),
                      /*#__PURE__*/ React.createElement(
                        "button",
                        {
                          onClick: () =>
                            setPhotoModal({
                              row: r.row,
                              desc: r.desc,
                            }),
                          className: "text-slate-400 hover:text-blue-600 transition",
                          title: "Anexar ou ver foto",
                        },
                        fotos[r.row]
                          ? /*#__PURE__*/ React.createElement(IconCamera, null)
                          : /*#__PURE__*/ React.createElement(IconClip, null),
                      ),
                    ),
                    galvanizados[r.row] &&
                      /*#__PURE__*/ React.createElement(
                        "div",
                        {
                          className: "px-1",
                        },
                        /*#__PURE__*/ React.createElement(
                          "span",
                          {
                            className:
                              "text-[9px] font-bold uppercase tracking-wider text-red-700 bg-red-100 px-1.5 py-0.5 rounded border border-red-200",
                          },
                          "Galvanizado à Fogo",
                        ),
                      ),
                  ),
                ),
                /*#__PURE__*/ React.createElement(
                  "td",
                  {
                    className: "px-3 py-2",
                  },
                  computed
                    ? /*#__PURE__*/ React.createElement("input", {
                        type: "text",
                        inputMode: "decimal",
                        value: value === 0 && !hasOverride ? "" : value,
                        onChange: (e) => {
                          const val = e.target.value;
                          setOverrides((p) => {
                            const newO = {
                              ...p,
                            };
                            if (val === "") delete newO[r.row];
                            else newO[r.row] = val;
                            return newO;
                          });
                        },
                        placeholder: meta?.formula ? "Auto" : "—",
                        className: `w-full rounded-md px-2 py-1.5 font-mono text-sm font-semibold tabular-nums text-right outline-none transition-all ${hasOverride ? "bg-yellow-100 text-yellow-900 border border-yellow-400 focus:ring-2 focus:ring-yellow-500" : "bg-slate-100 text-slate-800 border border-transparent focus:ring-2 focus:ring-blue-500"}`,
                        title: hasOverride ? "Forçado manualmente. Apague para restaurar a fórmula." : (meta?.formula ?? ""),
                      })
                    : /*#__PURE__*/ React.createElement("input", {
                        type: "text",
                        inputMode: "decimal",
                        value: value,
                        onChange: (e) =>
                          setQuant((p) => ({
                            ...p,
                            [r.row]: e.target.value,
                          })),
                        placeholder: "—",
                        className:
                          "w-full border border-slate-300 rounded-md px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 font-mono text-right",
                      }),
                ),
                /*#__PURE__*/ React.createElement(
                  "td",
                  {
                    className: "px-3 py-2",
                  },
                  r.pedido &&
                    /*#__PURE__*/ React.createElement(
                      "span",
                      {
                        className: `inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${r.pedido === "FÁBRICA" ? "bg-blue-100 text-blue-700" : "bg-slate-200 text-slate-700"}`,
                      },
                      r.pedido,
                    ),
                ),
                /*#__PURE__*/ React.createElement(
                  "td",
                  {
                    className: "px-3 py-2 text-xs text-slate-500 hidden md:table-cell",
                  },
                  /*#__PURE__*/ React.createElement("input", {
                    type: "text",
                    className:
                      "w-full bg-transparent border-transparent hover:border-slate-300 focus:bg-white focus:ring-1 focus:ring-blue-400 rounded px-1 outline-none transition-all",
                    value: r.complementar || "",
                    onChange: (e) => {
                      const newCat = [...catalogo];
                      newCat[sectionIndex].rows[rowIndex].complementar = e.target.value;
                      setCatalogo(newCat);
                    },
                    onBlur: handleBlurCatalogo,
                  }),
                  meta &&
                    /*#__PURE__*/ React.createElement(
                      "div",
                      {
                        className: "text-[10px] mt-0.5 italic opacity-70 px-1",
                      },
                      meta.formula,
                    ),
                ),
                /*#__PURE__*/ React.createElement(
                  "td",
                  {
                    className: "px-3 py-2 text-center",
                  },
                  /*#__PURE__*/ React.createElement(
                    "button",
                    {
                      onClick: () =>
                        setCommentModal({
                          row: r.row,
                          current: comentarios[r.row] || "",
                        }),
                      title: comentarios[r.row] || "Adicionar comentário",
                      className: `p-1.5 rounded-md transition ${comentarios[r.row] ? "text-blue-600 bg-blue-50" : "text-slate-300 hover:bg-slate-100 hover:text-slate-500"}`,
                    },
                    /*#__PURE__*/ React.createElement(IconComment, null),
                  ),
                ),
                /*#__PURE__*/ React.createElement(
                  "td",
                  {
                    className: "px-3 py-2 bg-amber-50/40",
                  },
                  /*#__PURE__*/ React.createElement("input", {
                    type: "text",
                    inputMode: "decimal",
                    value: precos[r.row] ?? "",
                    onChange: (e) => atualizarPreco(r.row, e.target.value),
                    placeholder: "0,00",
                    title:
                      "Preço unitário compartilhado entre todos os usuários e projetos. Se você ou o Gabriel alterar aqui, muda em todas as planilhas.",
                    className:
                      "w-full border border-amber-300 rounded-md px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-amber-500 font-mono text-right bg-white",
                  }),
                ),
                /*#__PURE__*/ React.createElement(
                  "td",
                  {
                    className: "px-3 py-2 bg-emerald-50/40 text-right font-mono text-sm font-semibold text-emerald-800 tabular-nums",
                  },
                  formatBRL((computedQty[r.row] ?? 0) * parsePreco(precos[r.row])),
                ),
                /*#__PURE__*/ React.createElement(
                  "td",
                  {
                    className: "px-3 py-2 bg-blue-50/40 text-right font-mono text-xs text-blue-800 tabular-nums",
                  },
                  totalGeral > 0
                    ? ((((computedQty[r.row] ?? 0) * parsePreco(precos[r.row])) / totalGeral) * 100).toLocaleString("pt-BR", {
                        maximumFractionDigits: 2,
                      }) + "%"
                    : "—",
                ),
              ),
              params &&
                /*#__PURE__*/ React.createElement(
                  "tr",
                  {
                    key: `${r.row}-params`,
                    className: "bg-slate-50 border-t border-dashed border-slate-200",
                  },
                  /*#__PURE__*/ React.createElement("td", null),
                  /*#__PURE__*/ React.createElement(
                    "td",
                    {
                      colSpan: "8",
                      className: "px-3 py-3",
                    },
                    /*#__PURE__*/ React.createElement(
                      "div",
                      {
                        className: "text-[10px] uppercase tracking-wider text-slate-500 mb-2",
                      },
                      "Parâmetros para o cálculo desta linha",
                    ),
                    /*#__PURE__*/ React.createElement(
                      "div",
                      {
                        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-2xl",
                      },
                      params.map((p) =>
                        /*#__PURE__*/ React.createElement(ParamInput, {
                          key: p.key,
                          param: p,
                          inputs: inputs,
                          updateInput: updateInput,
                        }),
                      ),
                    ),
                  ),
                ),
            );
          }),
          /*#__PURE__*/ React.createElement(
            "tr",
            null,
            /*#__PURE__*/ React.createElement(
              "td",
              {
                colSpan: "9",
                className: "px-3 py-3 bg-slate-50/50 border-t border-slate-200",
              },
              /*#__PURE__*/ React.createElement(
                "button",
                {
                  onClick: () => {
                    setNewItemModal({
                      sectionIndex,
                    });
                  },
                  className:
                    "text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center justify-center gap-1 w-full p-2 border border-dashed border-blue-200 rounded hover:bg-blue-50 transition",
                },
                /*#__PURE__*/ React.createElement(IconPlus, null),
                " Adicionar nova peça em ",
                section.title,
              ),
            ),
          ),
        ),
      ),
    ),
  );
}

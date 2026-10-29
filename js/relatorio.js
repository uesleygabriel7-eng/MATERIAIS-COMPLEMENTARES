function PrintReport({
  obra,
  responsavel,
  data,
  sections,
  computedQty,
  precos,
  incluirValores,
  galvanizados,
  totalGeral,
  parsePreco,
  formatBRL,
}) {
  const items = sections.flatMap((s) =>
    (s.rows || [])
      .filter((r) => !r.isSubheader && (computedQty[r.row] ?? 0) > 0)
      .map((r) => {
        const qty = computedQty[r.row] ?? 0;
        const unit = parsePreco(precos[r.row]);
        const totalItem = qty * unit;
        const isGalv = !!galvanizados[r.row];
        return {
          section: s.title,
          cod: r.cod,
          desc: r.desc,
          qty,
          unit,
          totalItem,
          isGalv,
        };
      }),
  );
  const colSpan = incluirValores ? 6 : 3;
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "hidden print:block text-black font-sans text-sm",
    },
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "border-b-2 border-black pb-2 mb-4",
      },
      /*#__PURE__*/ React.createElement(
        "h1",
        {
          className: "text-2xl font-bold mb-2",
        },
        "Lista de Materiais",
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "grid grid-cols-2 gap-2 text-xs",
        },
        /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("strong", null, "Obra:"), " ", obra || "—"),
        /*#__PURE__*/ React.createElement(
          "div",
          null,
          /*#__PURE__*/ React.createElement("strong", null, "Responsável:"),
          " ",
          responsavel || "—",
        ),
        /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("strong", null, "Data:"), " ", data),
        /*#__PURE__*/ React.createElement(
          "div",
          null,
          /*#__PURE__*/ React.createElement("strong", null, "Total de itens:"),
          " ",
          items.length,
        ),
        incluirValores &&
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "col-span-2",
            },
            /*#__PURE__*/ React.createElement("strong", null, "Valor total do projeto:"),
            " ",
            formatBRL(totalGeral),
          ),
      ),
    ),
    /*#__PURE__*/ React.createElement(
      "table",
      {
        className: "w-full border-collapse",
      },
      /*#__PURE__*/ React.createElement(
        "thead",
        null,
        /*#__PURE__*/ React.createElement(
          "tr",
          {
            className: "border-b border-black text-left uppercase text-xs",
          },
          /*#__PURE__*/ React.createElement(
            "th",
            {
              className: "pb-1 w-20",
            },
            "Código",
          ),
          /*#__PURE__*/ React.createElement(
            "th",
            {
              className: "pb-1",
            },
            "Descrição",
          ),
          /*#__PURE__*/ React.createElement(
            "th",
            {
              className: "pb-1 w-24 text-right",
            },
            "Quantidade",
          ),
          incluirValores &&
            /*#__PURE__*/ React.createElement(
              "th",
              {
                className: "pb-1 w-24 text-right",
              },
              "Valor Unit.",
            ),
          incluirValores &&
            /*#__PURE__*/ React.createElement(
              "th",
              {
                className: "pb-1 w-28 text-right",
              },
              "Valor Total",
            ),
          incluirValores &&
            /*#__PURE__*/ React.createElement(
              "th",
              {
                className: "pb-1 w-20 text-right",
              },
              "Repres.",
            ),
        ),
      ),
      /*#__PURE__*/ React.createElement(
        "tbody",
        null,
        items.map((it, i) =>
          /*#__PURE__*/ React.createElement(
            "tr",
            {
              key: i,
              className: "border-b border-gray-300",
            },
            /*#__PURE__*/ React.createElement(
              "td",
              {
                className: "py-1 font-mono",
              },
              it.cod || "—",
            ),
            /*#__PURE__*/ React.createElement(
              "td",
              {
                className: "py-1",
              },
              it.desc,
              it.isGalv &&
                /*#__PURE__*/ React.createElement(
                  "span",
                  {
                    className: "ml-2 text-[9px] font-bold text-red-700 bg-red-100 border border-red-300 px-1 py-0.5 rounded align-middle",
                    style: {
                      WebkitPrintColorAdjust: "exact",
                      printColorAdjust: "exact",
                    },
                  },
                  "GALVANIZADO À FOGO",
                ),
            ),
            /*#__PURE__*/ React.createElement(
              "td",
              {
                className: "py-1 font-mono text-right font-semibold",
              },
              formatQty(it.qty),
            ),
            incluirValores &&
              /*#__PURE__*/ React.createElement(
                "td",
                {
                  className: "py-1 font-mono text-right",
                },
                formatBRL(it.unit),
              ),
            incluirValores &&
              /*#__PURE__*/ React.createElement(
                "td",
                {
                  className: "py-1 font-mono text-right font-semibold",
                },
                formatBRL(it.totalItem),
              ),
            incluirValores &&
              /*#__PURE__*/ React.createElement(
                "td",
                {
                  className: "py-1 font-mono text-right",
                },
                totalGeral > 0
                  ? ((it.totalItem / totalGeral) * 100).toLocaleString("pt-BR", {
                      maximumFractionDigits: 2,
                    }) + "%"
                  : "—",
              ),
          ),
        ),
        items.length === 0 &&
          /*#__PURE__*/ React.createElement(
            "tr",
            null,
            /*#__PURE__*/ React.createElement(
              "td",
              {
                colSpan: colSpan,
                className: "text-center py-6",
              },
              "Nenhum item com quantidade preenchida.",
            ),
          ),
        incluirValores &&
          items.length > 0 &&
          /*#__PURE__*/ React.createElement(
            "tr",
            {
              className: "border-t-2 border-black font-bold",
            },
            /*#__PURE__*/ React.createElement(
              "td",
              {
                className: "py-2",
                colSpan: "4",
              },
              "TOTAL GERAL",
            ),
            /*#__PURE__*/ React.createElement(
              "td",
              {
                className: "py-2 font-mono text-right",
              },
              formatBRL(totalGeral),
            ),
            /*#__PURE__*/ React.createElement(
              "td",
              {
                className: "py-2 font-mono text-right",
              },
              "100%",
            ),
          ),
      ),
    ),
    /*#__PURE__*/ React.createElement("style", null, `@media print { @page { margin: 18mm 14mm; size: A4; } }`),
  );
}

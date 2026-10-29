// ==========================================
// FÓRMULAS E LÓGICA DE CÁLCULO
// ==========================================
const defaultInputs = {
  telhaCompPredio: 0,
  telhaNumApoios: 0,
  telhaNumCaimentos: 1,
  costuraCompPredio: 0,
  costuraNumEspacamentos: 0,
  costuraNumCaimentos: 1,
  secaoCalha: "40x62",
  metragemMetalao: 0,
  consolesHorizontal: 0,
  consolesVerticalInterna: 0,
  consolesVerticalExterna: 0,
};

const num = (v) => {
  const n = typeof v === "number" ? v : parseFloat(String(v ?? "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
};

const rowParams = {
  73: [
    { kind: "number", key: "telhaCompPredio", label: "Comprimento do prédio (m)" },
    { kind: "number", key: "telhaNumApoios", label: "N° de apoios" },
    { kind: "number", key: "telhaNumCaimentos", label: "N° de caimentos" },
  ],
  75: [
    { kind: "number", key: "costuraCompPredio", label: "Comprimento do prédio (m)" },
    { kind: "number", key: "costuraNumEspacamentos", label: "N° de espaçamentos" },
    { kind: "number", key: "costuraNumCaimentos", label: "N° de caimentos" },
  ],
  93: [
    {
      kind: "select",
      key: "secaoCalha",
      label: "Seção da calha",
      options: [
        { value: "40x62", label: "40x62 (2,15m por junção)" },
        { value: "40x60", label: "40x60 (2,65m por junção)" },
        { value: "outro", label: "Outra (não calcula manta)" },
      ],
    },
  ],
  128: [
    { kind: "number", key: "metragemMetalao", label: "Metragem linear metalão (terça + calha) — m" },
  ],
  132: [
    { kind: "number", key: "consolesHorizontal", label: "Consoles horiz. int/ext", hint: "× 2" },
    { kind: "number", key: "consolesVerticalInterna", label: "Consoles vert. interna", hint: "× 4" },
    { kind: "number", key: "consolesVerticalExterna", label: "Consoles vert. externa", hint: "× 3" },
  ],
};

const computedFormulas = {
  33: { formula: "= Chapa União de Terça", compute: (q) => num(q[32]) },
  34: { formula: "= Cartola × 2", compute: (q) => num(q[31]) * 2 },
  35: { formula: "= Haste União Terça + Haste Cartola", compute: (q) => num(q[33]) + num(q[34]) },
  37: { formula: "= Chumbador 1/2''", compute: (q) => num(q[36]) },
  38: { formula: "= Chumbador 1/2''", compute: (q) => num(q[36]) },
  73: {
    formula: "ROUNDUP((Comp/0,98 × 3) × Apoios × 1,1 × Caimentos)",
    compute: (_q, i) => Math.ceil(((i.telhaCompPredio / 0.98) * 3) * i.telhaNumApoios * 1.1 * i.telhaNumCaimentos),
  },
  75: {
    formula: "ROUNDUP((Comp/0,98 × 3) × Espaçamentos × 1,1 × Caimentos)",
    compute: (_q, i) => Math.ceil(((i.costuraCompPredio / 0.98) * 3) * i.costuraNumEspacamentos * 1.1 * i.costuraNumCaimentos),
  },
  81: { formula: "= Haste 1\" 1200×100", compute: (q) => num(q[80]) },
  82: { formula: "= Haste 1\" 1200×100", compute: (q) => num(q[80]) },
  90: { formula: "= Chapa União Calha", compute: (q) => num(q[87]) },
  91: { formula: "= Chapa União Calha ÷ 10", compute: (q) => num(q[87]) / 10 },
  92: {
    formula: 'SE seção="40x62": Haste União Calha × 2,15',
    compute: (q, i) => (i.secaoCalha === "40x62" ? num(q[90]) * 2.15 : 0),
  },
  93: {
    formula: 'SE seção="40x60": Haste União Calha × 2,65',
    compute: (q, i) => (i.secaoCalha === "40x60" ? num(q[90]) * 2.65 : 0),
  },
  125: {
    formula: "= (CalhaFix10 + CalhaFix10-20 + CalhaFix12) × 3",
    compute: (q) => (num(q[105]) + num(q[106]) + num(q[107])) * 3,
  },
  126: {
    formula: "= Fixação Individual + Fixação União",
    compute: (q) => num(q[111]) + num(q[112]),
  },
  127: { formula: "= Matajunta × 2", compute: (q) => num(q[108]) * 2 },
  128: {
    formula: "ROUND(Metragem metalão ÷ 6)",
    compute: (_q, i) => Math.round(i.metragemMetalao / 6),
  },
  129: {
    formula: "ROUNDUP(Parabolt 3/8 ÷ 40)",
    compute: (q) => Math.ceil(num(q[127]) / 40),
  },
  130: {
    formula: "ROUNDUP(Parabolt 1/2 ÷ 40)",
    compute: (q) => Math.ceil(num(q[126]) / 40),
  },
  132: {
    formula: "ROUNDUP((H×2 + Vint×4 + Vext×3) ÷ 2)",
    compute: (_q, i) => Math.ceil((i.consolesHorizontal * 2 + i.consolesVerticalInterna * 4 + i.consolesVerticalExterna * 3) / 2),
  },
};

const isComputed = (row) => row in computedFormulas;

const formatQty = (n) => {
  if (!Number.isFinite(n)) return "—";
  if (Number.isInteger(n)) return n.toLocaleString("pt-BR");
  return n.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
};

// ==========================================
// SENHAS DOS PERFIS (Uesley e Gabriel)
// A senha nunca é salva em texto: guardamos só um "código embaralhado" (hash)
// em config/senhas/{perfil} no Firebase.
// No primeiro acesso, o perfil sem senha pede para CRIAR uma.
// ==========================================
const PERFIS_COM_SENHA = ["Uesley", "Gabriel"];

// Embaralha a senha (funciona abrindo o arquivo direto da pasta)
const embaralharSenha = (perfil, senha) => {
  const str = `mc2026|${perfil}|${senha}`;
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0).toString(16).padStart(8, "0") + (h1 >>> 0).toString(16).padStart(8, "0");
};

const urlSenha = (perfil) => `${FIREBASE_BASE}/config/senhas/${perfil}.json`;

// Janela de senha. modo: "entrar" ou "mudar"
function JanelaSenhaPerfil({ perfil, modo, onOk, onCancelar }) {
  const h = React.createElement;
  const [hashSalvo, setHashSalvo] = React.useState(undefined); // undefined = carregando, null = sem senha
  const [atual, setAtual] = React.useState("");
  const [nova, setNova] = React.useState("");
  const [conf, setConf] = React.useState("");
  const [erro, setErro] = React.useState("");

  React.useEffect(() => {
    fetch(urlSenha(perfil), { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setHashSalvo(d || null))
      .catch(() => setErro("Sem conexão com a internet."));
  }, [perfil]);

  const criando = hashSalvo === null; // ainda não tem senha
  const pedeAtual = !criando;
  const pedeNova = criando || modo === "mudar";

  const salvar = (e) => {
    e.preventDefault();
    setErro("");
    if (pedeAtual && embaralharSenha(perfil, atual) !== hashSalvo) return setErro("Senha incorreta.");
    if (!pedeNova) return onOk();
    if (nova.length < 4) return setErro("A nova senha precisa ter pelo menos 4 caracteres.");
    if (nova !== conf) return setErro("As duas senhas novas não são iguais.");
    fetch(urlSenha(perfil), { method: "PUT", body: JSON.stringify(embaralharSenha(perfil, nova)) })
      .then((r) => {
        if (!r.ok) throw new Error();
        if (modo === "mudar") alert("Senha alterada com sucesso!");
        onOk();
      })
      .catch(() => setErro("Não foi possível salvar. Verifique a internet."));
  };

  const campo = (label, valor, setValor, foco) =>
    h("div", { className: "text-left" },
      h("label", { className: "block text-xs font-semibold text-slate-500 mb-1" }, label),
      h("input", { type: "password", value: valor, autoFocus: foco, onChange: (e) => setValor(e.target.value), className: "w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" }));

  const titulo = criando ? `Criar senha para ${perfil}` : modo === "mudar" ? `Mudar senha de ${perfil}` : `Senha de ${perfil}`;

  return h("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50", onClick: onCancelar },
    h("form", { onSubmit: salvar, onClick: (e) => e.stopPropagation(), className: "bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 space-y-4" },
      h("h2", { className: "text-xl font-bold text-slate-800" }, titulo),
      criando && h("p", { className: "text-sm text-slate-500" }, "Este perfil ainda não tem senha. Crie uma agora; ela será pedida em todo acesso."),
      hashSalvo === undefined && !erro
        ? h("p", { className: "text-slate-500 text-sm" }, "Carregando...")
        : h(React.Fragment, null,
            pedeAtual && campo(modo === "mudar" ? "Senha atual" : "Senha", atual, setAtual, true),
            pedeNova && campo("Nova senha", nova, setNova, !pedeAtual),
            pedeNova && campo("Repita a nova senha", conf, setConf, false)),
      erro && h("p", { className: "text-sm text-red-600 font-medium" }, erro),
      h("div", { className: "flex gap-2 pt-2" },
        h("button", { type: "button", onClick: onCancelar, className: "flex-1 py-2 rounded-lg border border-slate-300 text-slate-600 font-semibold" }, "Cancelar"),
        h("button", { type: "submit", disabled: hashSalvo === undefined, className: "flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50" }, pedeNova ? "Salvar" : "Entrar"))));
}

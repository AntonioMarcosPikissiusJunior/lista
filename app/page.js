
"use client";

import { useState } from "react";

export default function Home() {
  const [tarefas, setTarefas] = useState([]);
  const [texto, setTexto] = useState("");
  const [filtro, setFiltro] = useState("todas");

  function adicionarTarefa(e) {
    e.preventDefault();

    if (texto.trim() === "") return;

    const nova = {
      id: Date.now(),
      nome: texto,
      feita: false
    };

    setTarefas([...tarefas, nova]);
    setTexto("");
  }

  function marcarTarefa(id) {
    const atualizadas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        return { ...tarefa, feita: !tarefa.feita };
      }

      return tarefa;
    });

    setTarefas(atualizadas);
  }

  function apagarTarefa(id) {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  }

  const lista = tarefas.filter((tarefa) => {
    if (filtro === "pendentes") return !tarefa.feita;
    if (filtro === "feitas") return tarefa.feita;
    return true;
  });

  const concluidas = tarefas.filter((tarefa) => tarefa.feita).length;

  return (
    <main className="pagina">
      <header className="topo">
        <div className="marca">DAY<span>LIST</span></div>
        <p>ORGANIZAÇÃO SIMPLES, DIA MAIS LEVE.</p>
      </header>

      <section className="conteudo">
        <div className="boas-vindas">
          <div>
            <span className="etiqueta">MINHA ROTINA</span>
            <h1>Vamos organizar<br />seu dia?</h1>
            <p>Adicione suas atividades e acompanhe seu progresso.</p>
          </div>

          <div className="progresso">
            <strong>{tarefas.length === 0 ? 0 : Math.round((concluidas / tarefas.length) * 100)}%</strong>
            <span>concluído</span>
          </div>
        </div>

        <form className="adicionar" onSubmit={adicionarTarefa}>
          <input
            type="text"
            placeholder="Digite uma nova atividade..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
          <button type="submit">Adicionar +</button>
        </form>

        <div className="barra">
          <h2>Minhas atividades</h2>

          <div className="filtros">
            <button className={filtro === "todas" ? "selecionado" : ""} onClick={() => setFiltro("todas")}>Todas</button>
            <button className={filtro === "pendentes" ? "selecionado" : ""} onClick={() => setFiltro("pendentes")}>Pendentes</button>
            <button className={filtro === "feitas" ? "selecionado" : ""} onClick={() => setFiltro("feitas")}>Feitas</button>
          </div>
        </div>

        <div className="lista">
          {lista.length === 0 ? (
            <div className="mensagem">
              <span>✦</span>
              <p>Nenhuma atividade encontrada.</p>
              <small>Que tal adicionar uma tarefa?</small>
            </div>
          ) : (
            lista.map((tarefa) => (
              <div className="item" key={tarefa.id}>
                <button
                  className={tarefa.feita ? "check marcado" : "check"}
                  onClick={() => marcarTarefa(tarefa.id)}
                >
                  {tarefa.feita ? "✓" : ""}
                </button>

                <span className={tarefa.feita ? "nome feita" : "nome"}>
                  {tarefa.nome}
                </span>

                <button className="excluir" onClick={() => apagarTarefa(tarefa.id)}>
                  Excluir
                </button>
              </div>
            ))
          )}
        </div>

        <footer>
          <span>{tarefas.length} atividades no total</span>
          <span>{concluidas} concluídas</span>
        </footer>
      </section>

      <p className="rodape">DAYLIST — SEU DIA, NO SEU RITMO.</p>
    </main>
  );
}

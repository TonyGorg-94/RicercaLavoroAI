import React, { useState } from "react";

export default function JobhuntAIDashboard() {
  const [companyUrl, setCompanyUrl] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [extraFiles, setExtraFiles] = useState([]);
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState([]);

  const handleAnalyze = async () => {
    setOutput("Analisi in corso...");
    setTimeout(() => {
      const analysisResult = `✅ Analisi completata per: ${companyUrl}

🌐 Sito aziendale:
- Mission: Innovazione sostenibile per il futuro
- Valori: Integrità, collaborazione, impatto sociale
- Cosa fa: Soluzioni digitali per la logistica e supply chain
- Settori: IT, Trasporti, AI, Smart Cities
- Sostenibilità: Obiettivo net-zero entro il 2030

📄 Job Description:
- Skills richieste: Python, analisi dati, project management
- Keywords rilevanti: innovazione, automazione, stakeholder

📂 CV e File Analizzati:
- Esperienza coerente con ruolo richiesto
- Suggerimento: Aggiungere certificazione su sostenibilità o AI
- Lettera motivazionale: enfatizzare progetti a impatto positivo

🎤 Domande da colloquio:
1. Come ti allinei ai nostri valori aziendali?
2. Racconta un'esperienza in cui hai gestito un progetto complesso.
3. Come unisci tecnologia e sostenibilità nel tuo lavoro?
4. Perché pensi che ${companyUrl} sia l'ambiente giusto per te?
5. Quali dei tuoi progetti passati si allineano con la mission dell'azienda?

📌 File personali utilizzati:
- ${cvFile ? cvFile.name : "Nessun CV caricato"}
- ${extraFiles.length > 0 ? extraFiles.map(f => f.name).join(", ") : "Nessun file aggiuntivo"}

🗃️ Sessione salvata. Puoi consultare lo storico in basso.`;

      setOutput(analysisResult);
      setHistory(prev => [
        {
          timestamp: new Date().toLocaleString(),
          url: companyUrl,
          result: analysisResult
        },
        ...prev
      ]);
    }, 2000);
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>🔍 JobHunt AI Dashboard</h1>
      <input
        placeholder="🔗 Link del sito aziendale"
        value={companyUrl}
        onChange={(e) => setCompanyUrl(e.target.value)}
        style={{ width: "100%", padding: 10, margin: "10px 0" }}
      />
      <textarea
        placeholder="📄 Incolla la Job Description"
        rows={6}
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        style={{ width: "100%", padding: 10, margin: "10px 0" }}
      />
      <input
        type="file"
        onChange={(e) => setCvFile(e.target.files[0])}
      />
      <input
        type="file"
        multiple
        onChange={(e) => setExtraFiles([...e.target.files])}
        style={{ marginTop: 10 }}
      />
      <button onClick={handleAnalyze} style={{ marginTop: 20, padding: 10 }}>🚀 Analizza</button>
      <textarea value={output} readOnly rows={12} style={{ width: "100%", marginTop: 20 }} />
      {history.length > 0 && (
        <div style={{ marginTop: 30 }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>📚 Storico analisi</h2>
          {history.map((item, index) => (
            <div key={index} style={{ background: "#eee", padding: 10, marginTop: 10 }}>
              <p style={{ fontSize: "0.8rem", color: "#555" }}>{item.timestamp}</p>
              <p><strong>🔗 {item.url}</strong></p>
              <pre style={{ whiteSpace: "pre-wrap", fontSize: "0.85rem" }}>{item.result}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
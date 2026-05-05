import { useState } from 'react'
import './App.css'

function App() {
  const [tips, setTips] = useState([
    { tip: 'Organiza tu dia con una lista de tareas.', votos: 0 },
    { tip: 'Toma descansos regulares para mantener la concentracion.', votos: 0 },
    { tip: 'Elimina distracciones mientras trabajas.', votos: 0 },
    { tip: 'Prioriza tus tareas segun su importancia y urgencia.', votos: 0 },
  ])
  const [selected, setSelected] = useState(0)

  const nextRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * tips.length)
    let nextIndex = randomIndex

    while (tips.length > 1 && nextIndex === selected) {
      nextIndex = Math.floor(Math.random() * tips.length)
    }

    setSelected(nextIndex)
  }

  const voteCurrentTip = () => {
    setTips((previousTips) =>
      previousTips.map((tip, index) =>
        index === selected ? { ...tip, votos: tip.votos + 1 } : tip,
      ),
    )
  }

  let mostVotedTip = tips[0]

  for (let index = 1; index < tips.length; index += 1) {
    if (tips[index].votos > mostVotedTip.votos) {
      mostVotedTip = tips[index]
    }
  }

  const hasVotes = mostVotedTip.votos > 0

  return (
    <div className='app'>
      <header className='app-header'>
        <h1>💡 Tips de Productividad</h1>
        <p>Pequenas acciones, grandes resultados</p>
      </header>

      <main className='content'>
        <section className='tip-card'>
          <h2>🗓️ Tip actual</h2>
          <blockquote>{tips[selected].tip}</blockquote>
          <p className='votes'>⭐ Votos: {tips[selected].votos}</p>

          <div className='actions'>
            <button className='btn vote' type='button' onClick={voteCurrentTip}>
              Me sirvio 👍
            </button>
            <button className='btn next' type='button' onClick={nextRandomTip}>
              Siguiente tip 🎲
            </button>
          </div>
        </section>

        <section className='tip-card top-tip'>
          <h2>🏆 Tip mas votado</h2>
          {hasVotes ? (
            <>
              <blockquote>{mostVotedTip.tip}</blockquote>
              <p className='votes best'>⭐ Votos: {mostVotedTip.votos}</p>
            </>
          ) : (
            <p className='empty'>Aun no hay votos.</p>
          )}
        </section>
      </main>
    </div>
  )
}

export default App

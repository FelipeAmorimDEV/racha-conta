const initialFriends = [
  {
    id: crypto.randomUUID(),
    name: 'Alessandra',
    imgUrl: '/friends/alessandra-48.jpg',
    balance: 100,
  },
  {
    id: crypto.randomUUID(),
    name: 'Antonio',
    imgUrl: '/friends/antonio-48.jpg',
    balance: -50,
  },
  {
    id: crypto.randomUUID(),
    name: 'Renata',
    imgUrl: 'friends/renata-48.jpg',
    balance: 0,
  },
]

const getStatusMsg = (balance) =>
  balance < 0
    ? { color: 'red-debit', msg: `Você deve ${Math.abs(balance)} reais` }
    : balance > 0
      ? { color: 'green-credit', msg: `Te deve ${balance} reais` }
      : { color: 'white-neutral', msg: 'Estão quites' }

function App() {
  return (
    <main className="app">
      <aside className="sidebar">
        <ul>
          {initialFriends.map((friend) => {
            const { color, msg } = getStatusMsg(friend.balance)
            return (
              <li key={friend.id}>
                <img src={friend.imgUrl} alt={`Foto de ${friend.name}`} />
                <h3>{friend.name}</h3>
                <p className={color}>{msg}</p>
                <button className="button">Selecionar</button>
              </li>
            )
          })}
        </ul>
      </aside>
    </main>
  )
}

export { App }

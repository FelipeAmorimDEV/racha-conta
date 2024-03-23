import { useState } from 'react'

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
  const [selectedFriend, setSelectedFriend] = useState(null)
  const [friends, setFriends] = useState(initialFriends)
  const [splitBillForm, setSplitBillForm] = useState({
    totalBill: 0,
    mySpent: 0,
    whoWillPay: 'you',
  })

  const handleSelectFriend = (friend) =>
    setSelectedFriend((sf) => (sf?.id === friend.id ? null : friend))

  const handleChangeTotalBill = (e) =>
    setSplitBillForm((sbf) => ({ ...sbf, totalBill: e.target.value }))
  const handleChangeMySpent = (e) =>
    setSplitBillForm((sbf) => ({ ...sbf, mySpent: e.target.value }))
  const handleChangeWhoWillPay = (e) =>
    setSplitBillForm((sbf) => ({ ...sbf, whoWillPay: e.target.value }))

  const handleSplitBill = (e) => {
    e.preventDefault()

    const { totalBill, mySpent, whoWillPay } = splitBillForm

    const transactionValue =
      whoWillPay === 'you' ? +totalBill - +mySpent : -mySpent

    setFriends((f) =>
      f.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + transactionValue }
          : friend,
      ),
    )
    setSplitBillForm({ totalBill: 0, mySpent: 0, whoWillPay: 'you' })
    setSelectedFriend(null)
  }

  return (
    <main className="app">
      <aside className="sidebar">
        <ul>
          {friends.map((friend) => {
            const { color, msg } = getStatusMsg(friend.balance)
            const isUserOpen = selectedFriend?.id === friend.id

            return (
              <li key={friend.id}>
                <img src={friend.imgUrl} alt={`Foto de ${friend.name}`} />
                <h3>{friend.name}</h3>
                <p className={color}>{msg}</p>
                <button
                  className={`button ${isUserOpen ? 'button-close' : ''}`}
                  onClick={() => handleSelectFriend(friend)}
                >
                  {isUserOpen ? 'Fechar' : 'Selecionar'}
                </button>
              </li>
            )
          })}
        </ul>
      </aside>
      {selectedFriend && (
        <form className="form-split-bill" onSubmit={handleSplitBill}>
          <h2>Rache a conta com {selectedFriend.name}</h2>
          <label>
            💰 Valor total{' '}
            <input
              type="number"
              value={splitBillForm.totalBill}
              onChange={handleChangeTotalBill}
            />
          </label>
          <label>
            🤸‍♂️ Seus gastos{' '}
            <input
              type="number"
              value={splitBillForm.mySpent}
              onChange={handleChangeMySpent}
            />
          </label>
          <label>
            🤑 Quem vai pagar{' '}
            <select
              value={splitBillForm.whoWillPay}
              onChange={handleChangeWhoWillPay}
            >
              <option value="you">Você</option>
              <option value={selectedFriend.name}>{selectedFriend.name}</option>
            </select>
          </label>
          <button type="submit" className="button">
            Rachar conta
          </button>
        </form>
      )}
    </main>
  )
}

export { App }

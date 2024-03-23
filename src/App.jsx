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

function Header() {
  return (
    <header className="header">
      <a href="/">
        <img src="logo-racha-conta.png" alt="Logo Racha Conta" />
      </a>
    </header>
  )
}

function Friend({ friend, selectedFriend, onOpenSplitBillModal }) {
  const { color, msg } = getStatusMsg(friend.balance)
  const isUserOpen = selectedFriend?.id === friend.id

  return (
    <li key={friend.id}>
      <img src={friend.imgUrl} alt={`Foto de ${friend.name}`} />
      <h3>{friend.name}</h3>
      <p className={color}>{msg}</p>
      <button
        className={`button ${isUserOpen ? 'button-close' : ''}`}
        onClick={() => onOpenSplitBillModal(friend)}
      >
        {isUserOpen ? 'Fechar' : 'Selecionar'}
      </button>
    </li>
  )
}

function SplitBillModal({ selectedFriend, onSplitBill }) {
  const [splitBillForm, setSplitBillForm] = useState({
    totalBill: '',
    mySpent: '',
    whoWillPay: 'you',
  })

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

    setSplitBillForm({ totalBill: 0, mySpent: 0, whoWillPay: 'you' })
    onSplitBill(transactionValue)
  }

  return (
    <form className="form-split-bill" onSubmit={handleSplitBill}>
      <h2>Rache a conta com {selectedFriend.name}</h2>
      <label>
        💰 Valor total{' '}
        <input
          type="number"
          value={splitBillForm.totalBill}
          onChange={handleChangeTotalBill}
          min={0}
          required
        />
      </label>
      <label>
        🤸‍♂️ Seus gastos{' '}
        <input
          type="number"
          value={splitBillForm.mySpent}
          onChange={handleChangeMySpent}
          min={0}
          required
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
  )
}

function AddFriendModal({ onAddNewFriend }) {
  const [addFriendForm, setAddFriendForm] = useState({
    name: '',
    imgUrl: '',
  })

  const handleChangeFriendName = (e) =>
    setAddFriendForm((f) => ({ ...f, name: e.target.value }))
  const handleChangeFriendPicture = (e) =>
    setAddFriendForm((f) => ({ ...f, imgUrl: e.target.value }))

  const handleAddNewFriend = (e) => {
    e.preventDefault()

    onAddNewFriend(addFriendForm)
    setAddFriendForm({ name: '', imgUrl: '' })
  }

  return (
    <form className="form-add-friend" onSubmit={handleAddNewFriend}>
      <label>
        🧍‍♂️ Nome{' '}
        <input
          name="friendName"
          value={addFriendForm.name}
          onChange={handleChangeFriendName}
          required
        />
      </label>
      <label>
        📷 Foto{' '}
        <input
          name="pictureUrl"
          value={addFriendForm.imgUrl}
          onChange={handleChangeFriendPicture}
          required
        />
      </label>
      <button className="button" type="submit">
        Adicionar
      </button>
    </form>
  )
}

function App() {
  const [selectedFriend, setSelectedFriend] = useState(null)
  const [friends, setFriends] = useState(initialFriends)

  const [addFriendModal, setAddFriendModal] = useState(false)

  const selectFriend = (friend) =>
    setSelectedFriend((sf) => (sf?.id === friend.id ? null : friend))

  const splitBill = (transactionValue) => {
    setFriends((f) =>
      f.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + transactionValue }
          : friend,
      ),
    )
    setSelectedFriend(null)
  }

  const addNewFriend = (friendInputs) => {
    const { name, imgUrl } = friendInputs

    setFriends((f) => [
      ...f,
      { id: crypto.randomUUID(), balance: 0, name, imgUrl },
    ])

    setAddFriendModal(false)
  }

  const handleOpenFriendModal = () => {
    setAddFriendModal((adm) => !adm)
    setSelectedFriend(null)
  }
  const handleOpenSplitBillModal = (friend) => {
    selectFriend(friend)
    setAddFriendModal(false)
  }

  return (
    <>
      <Header />
      <main className="app">
        <aside className="sidebar">
          <ul>
            {friends.map((friend) => (
              <Friend
                key={friend.id}
                friend={friend}
                onOpenSplitBillModal={handleOpenSplitBillModal}
                selectedFriend={selectedFriend}
              />
            ))}
          </ul>
          {addFriendModal && <AddFriendModal onAddNewFriend={addNewFriend} />}
          <button
            className={`button ${addFriendModal ? 'button-close' : ''}`}
            onClick={handleOpenFriendModal}
          >
            {addFriendModal ? 'Fechar' : 'Adicionar amigo(a)'}
          </button>
        </aside>
        {selectedFriend && (
          <SplitBillModal
            selectedFriend={selectedFriend}
            onSplitBill={splitBill}
          />
        )}
      </main>
    </>
  )
}

export { App }

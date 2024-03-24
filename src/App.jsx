import { useState } from 'react'

import { Header } from './components/header'
import { Friend } from './components/friend'
import { AddFriendModal } from './components/add-friend-modal'
import { SplitBillModal } from './components/split-bill-modal'

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

function App() {
  const [selectedFriend, setSelectedFriend] = useState(null)
  const [friends, setFriends] = useState(initialFriends)
  const [addFriendModal, setAddFriendModal] = useState(false)

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
    setSelectedFriend((sf) => (sf?.id === friend.id ? null : friend))
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

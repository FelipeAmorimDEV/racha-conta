import { Header } from './components/header'
import { Friend } from './components/friend'
import { AddFriendModal } from './components/add-friend-modal'
import { SplitBillModal } from './components/split-bill-modal'

import { useSplitBill } from './hooks/use-split-bill'
import { useEffect } from 'react'

function App() {
  const {
    friends,
    selectedFriend,
    addFriendModal,
    addNewFriend,
    splitBill,
    openFriendModal,
    openSplitBillModal,
  } = useSplitBill()

  useEffect(() => {
    const pageTitle = selectedFriend
      ? `${selectedFriend.name} foi selecionado(a)`
      : 'Racha-conta'

    document.title = pageTitle
  }, [selectedFriend])

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
                onOpenSplitBillModal={openSplitBillModal}
                selectedFriend={selectedFriend}
              />
            ))}
          </ul>
          {addFriendModal && <AddFriendModal onAddNewFriend={addNewFriend} />}
          <button
            className={`button ${addFriendModal ? 'button-close' : ''}`}
            onClick={openFriendModal}
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

import { Header } from './components/header'
import { Friend } from './components/friend'
import { AddFriendModal } from './components/add-friend-modal'
import { SplitBillModal } from './components/split-bill-modal'
import { AddFriendButton } from './components/add-friend-button'

import { useSplitBill } from './hooks/use-split-bill'

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
          <AddFriendButton
            addFriendModal={addFriendModal}
            openFriendModal={openFriendModal}
          />
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

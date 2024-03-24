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

function useSplitBill() {
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

  const openFriendModal = () => {
    setAddFriendModal((adm) => !adm)
    setSelectedFriend(null)
  }

  const openSplitBillModal = (friend) => {
    setSelectedFriend((sf) => (sf?.id === friend.id ? null : friend))
    setAddFriendModal(false)
  }

  return {
    selectedFriend,
    friends,
    addFriendModal,
    addNewFriend,
    openFriendModal,
    openSplitBillModal,
    splitBill,
  }
}

export { useSplitBill }

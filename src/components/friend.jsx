const getStatusMsg = (balance) =>
  balance < 0
    ? { color: 'red-debit', msg: `Você deve ${Math.abs(balance)} reais` }
    : balance > 0
      ? { color: 'green-credit', msg: `Te deve ${balance} reais` }
      : { color: 'white-neutral', msg: 'Estão quites' }

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

export { Friend }

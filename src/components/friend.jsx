const getStatusMsg = (balance) =>
  balance < 0
    ? { color: 'text-red-400', msg: `Você deve ${Math.abs(balance)} reais` }
    : balance > 0
      ? { color: 'text-green-400', msg: `Te deve ${balance} reais` }
      : { color: 'text-neutral-50', msg: 'Estão quites' }

function Friend({ friend, selectedFriend, onOpenSplitBillModal }) {
  const { color, msg } = getStatusMsg(friend.balance)
  const isUserOpen = selectedFriend?.id === friend.id

  return (
    <li
      key={friend.id}
      className={`grid grid-cols-[4.8rem_1fr_auto] items-center gap-x-6 p-5 rounded-lg transition delay-150 duration-200 ease-in-out hover:bg-slate-700`}
    >
      <img
        src={friend.imgUrl}
        alt={`Foto de ${friend.name}`}
        className="rounded-3xl row-span-2"
      />
      <h3 className="row-start-1 col-start-2 font-semibold">{friend.name}</h3>
      <p className={`row-start-2 col-start-2 ${color}`}>{msg}</p>
      <button
        className={`cursor-pointer font-semibold border-none rounded-lg px-5 py-3  bg-cyan-500 row-span-2 col-start-3 ${isUserOpen ? 'bg-red-500' : ''}`}
        onClick={() => onOpenSplitBillModal(friend)}
      >
        {isUserOpen ? 'Fechar' : 'Selecionar'}
      </button>
    </li>
  )
}

export { Friend }

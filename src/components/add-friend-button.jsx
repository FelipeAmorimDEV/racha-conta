function AddFriendButton({ addFriendModal, openFriendModal }) {
  return (
    <button
      className={`cursor-pointer font-bold border-none rounded-lg px-5 py-4  bg-cyan-500 row-span-2 col-start-3 text-xl ${addFriendModal ? 'bg-red-500' : ''}`}
      onClick={openFriendModal}
    >
      {addFriendModal ? 'Fechar' : 'Adicionar amigo(a)'}
    </button>
  )
}

export { AddFriendButton }

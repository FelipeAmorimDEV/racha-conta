function AddFriendButton({ addFriendModal, openFriendModal }) {
  return (
    <button
      className={`button ${addFriendModal ? 'button-close' : ''}`}
      onClick={openFriendModal}
    >
      {addFriendModal ? 'Fechar' : 'Adicionar amigo(a)'}
    </button>
  )
}

export { AddFriendButton }

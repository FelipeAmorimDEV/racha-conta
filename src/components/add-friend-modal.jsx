import { useState } from 'react'

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

export { AddFriendModal }

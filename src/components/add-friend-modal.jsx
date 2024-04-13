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
    <form
      className="mb-6 p-5 flex flex-col rounded-md bg-slate-700 text-2xl"
      onSubmit={handleAddNewFriend}
    >
      <label className="flex justify-between">
        🧍‍♂️ Nome{' '}
        <input
          name="friendName"
          className="text-inherit text-2xl p-3 text-center rounded-md text-slate-800 focus:outline-none"
          value={addFriendForm.name}
          onChange={handleChangeFriendName}
          required
        />
      </label>
      <label className="flex justify-between mt-2 mb-2">
        📷 Foto{' '}
        <input
          name="pictureUrl"
          className="text-inherit text-2xl p-3 text-center rounded-md text-slate-800 focus:outline-none"
          value={addFriendForm.imgUrl}
          onChange={handleChangeFriendPicture}
          required
        />
      </label>
      <button
        className="cursor-pointer font-bold border-none rounded-lg px-5 py-3  bg-cyan-500 row-span-2 col-start-3"
        type="submit"
      >
        Adicionar
      </button>
    </form>
  )
}

export { AddFriendModal }

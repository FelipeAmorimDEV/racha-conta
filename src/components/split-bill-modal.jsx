import { useState, useEffect } from 'react'

function SplitBillModal({ selectedFriend, onSplitBill }) {
  const [splitBillForm, setSplitBillForm] = useState({
    totalBill: '',
    mySpent: '',
    whoWillPay: 'you',
  })

  useEffect(() => {
    document.title = `${selectedFriend.name} foi selecionado(a)`

    return () => (document.title = 'Racha-conta')
  }, [selectedFriend])

  const handleChangeTotalBill = (e) =>
    setSplitBillForm((sbf) => ({ ...sbf, totalBill: e.target.value }))
  const handleChangeMySpent = (e) =>
    setSplitBillForm((sbf) => ({ ...sbf, mySpent: e.target.value }))
  const handleChangeWhoWillPay = (e) =>
    setSplitBillForm((sbf) => ({ ...sbf, whoWillPay: e.target.value }))

  const handleSplitBill = (e) => {
    e.preventDefault()

    const { totalBill, mySpent, whoWillPay } = splitBillForm

    const transactionValue =
      whoWillPay === 'you' ? +totalBill - +mySpent : -mySpent

    setSplitBillForm({ totalBill: 0, mySpent: 0, whoWillPay: 'you' })
    onSplitBill(transactionValue)
  }

  return (
    <form
      className="px-16 py-14 flex flex-col rounded-md bg-slate-700 text-2xl"
      onSubmit={handleSplitBill}
    >
      <h2 className="text-4xl trackiing-[-0.5px] mb-6">
        Rache a conta com {selectedFriend.name}
      </h2>
      <label className="flex justify-between first-letter:inline-block first-letter:mr-1 first-letter:text-3xl">
        💰 Valor total{' '}
        <input
          type="number"
          className="text-inherit text-2xl p-3 text-center rounded-md text-slate-800 focus:outline-none"
          value={splitBillForm.totalBill}
          onChange={handleChangeTotalBill}
          min={0}
          required
        />
      </label>
      <label className="flex justify-between mt-2 mb-2 first-letter:inline-block first-letter:mr-1 first-letter:text-3xl">
        🤸‍♂️ Seus gastos{' '}
        <input
          type="number"
          className="text-inherit text-2xl p-3 text-center rounded-md text-slate-800 focus:outline-none"
          value={splitBillForm.mySpent}
          onChange={handleChangeMySpent}
          min={0}
          required
        />
      </label>
      <label className="flex justify-between first-letter:inline-block first-letter:mr-1 first-letter:text-3xl">
        🤑 Quem vai pagar{' '}
        <select
          className="text-inherit text-2xl p-3 text-center rounded-md text-slate-800 focus:outline-none"
          value={splitBillForm.whoWillPay}
          onChange={handleChangeWhoWillPay}
        >
          <option value="you">Você</option>
          <option value={selectedFriend.name}>{selectedFriend.name}</option>
        </select>
      </label>
      <button
        type="submit"
        className="cursor-pointer font-bold border-none rounded-lg px-5 py-3  bg-cyan-500 mt-2"
      >
        Rachar conta
      </button>
    </form>
  )
}

export { SplitBillModal }

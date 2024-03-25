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
    <form className="form-split-bill" onSubmit={handleSplitBill}>
      <h2>Rache a conta com {selectedFriend.name}</h2>
      <label>
        💰 Valor total{' '}
        <input
          type="number"
          value={splitBillForm.totalBill}
          onChange={handleChangeTotalBill}
          min={0}
          required
        />
      </label>
      <label>
        🤸‍♂️ Seus gastos{' '}
        <input
          type="number"
          value={splitBillForm.mySpent}
          onChange={handleChangeMySpent}
          min={0}
          required
        />
      </label>
      <label>
        🤑 Quem vai pagar{' '}
        <select
          value={splitBillForm.whoWillPay}
          onChange={handleChangeWhoWillPay}
        >
          <option value="you">Você</option>
          <option value={selectedFriend.name}>{selectedFriend.name}</option>
        </select>
      </label>
      <button type="submit" className="button">
        Rachar conta
      </button>
    </form>
  )
}

export { SplitBillModal }

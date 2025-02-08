import { useState } from "react"

interface IEditSeminarData {
  title: string,
  description: string,
  date: string,
  time: string,
}

interface IEditSeminarModal {
  handleSaveEditData: (id: number, updatedData: IEditSeminarData) => void;
  closeEditModal: () => void,
  seminarId: number,
}
export const EditSeminarModal = ({ seminarId, closeEditModal, handleSaveEditData }: IEditSeminarModal) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSave = () => {
    handleSaveEditData(seminarId, { title, description, date, time });
    closeEditModal();
  }

  return <div className="seminar-modal">
    <div className="modal-content">
      <img src="./assets/close.png" alt="close" onClick={closeEditModal} />

      <form onSubmit={handleSave}>
        <div className="seminar-edit-block">
          <label htmlFor="title">Заголовок семинара</label>
          <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Заголовок семинара" />
        </div>

        <div className="seminar-edit-block">
          <label htmlFor="description">Описание семинара</label>
          <input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Описание семинара" />
        </div>

        <div className="seminar-edit-block">
          <label htmlFor="data">Дата семинара</label>
          <input id="data" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="seminar-edit-block">
          <label htmlFor="time">Время семинара</label>
          <input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>

        <button type="submit">Сохранить данные</button>
      </form>
    </div>
  </div>
}

interface IDeleteSeminarModal {
  deleteSeminarId: (seminarId: number) => void,
  closeDeleteModal: () => void,
  seminarId: number,
  title: string,
  description: string
}
export const DeleteSeminarModal = ({ seminarId, title, description, deleteSeminarId, closeDeleteModal }: IDeleteSeminarModal) => {
  return <div className="seminar-modal">
    <div className="modal-content">
      <img src="./assets/close.png" alt="close" onClick={closeDeleteModal} />
      <h2>Вы действительно хотите удалить эти данные</h2>
      <p>{title}</p>
      <p>{description}</p>
      <div className="seminar-button">
        <button onClick={() => deleteSeminarId(seminarId)}>Да</button><button onClick={closeDeleteModal}>Нет</button>
      </div>
    </div>
  </div>
}
import { useState, useEffect, useMemo } from "react";
import { DeleteSeminarModal } from "./DeleteSeminarModal";
import { EditSeminarModal } from "./EditSeminarModal";

const API_URL = "http://localhost:5000/seminars/";

interface ISeminars {
  id: number,
  title: string,
  description: string,
  date: string,
  time: string,
  photo: string,
}

interface ISeminarData extends Omit<ISeminars, "date" | "time" | "photo"> { }

interface IEditSeminarData extends Omit<ISeminars, "id" | "photo"> { }


export const App = () => {
  const [seminars, setSeminars] = useState<ISeminars[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [seminarData, setSeminarData] = useState<ISeminarData>({
    id: 0,
    title: "",
    description: ""
  });

  console.log(seminarData.id)

  const getAllDataSeminars = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Ошибка при загрузке данных');
      const data = await res.json();
      setSeminars(data);
    }
    catch (error) {
      setError(error instanceof Error ? error.message : "Что то пошло не так");
    }
    finally {
      setLoading(false);
    }
  }

  const openSeminarModal = (title: string, description: string, seminarId: number, action: string) => {
    setSeminarData({ title, description, id: seminarId });
    if (action === "delete") {
      setIsDeleteModalOpen(true);
    }
    else if (action === "edit") {
      setIsEditModalOpen(true);
    }
  }


  const filterSeminarData = (id: number) => {
    // setSeminars(seminars.filter((seminar) => seminar.id !== id))
    setSeminars((prev) => prev.filter((seminar) => seminar.id !== id));
  }

  const deleteSeminarId = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete seminar data");

      setIsDeleteModalOpen(false);
      filterSeminarData(id)

    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleSaveEditData = async (id: number, updatedSeminarData: IEditSeminarData) => {
    try {
      const response = await fetch(`${API_URL}${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSeminarData),
      });

      if (!response.ok) throw new Error('Ошибка при обновлении данных');

      setSeminars((prev) =>
        prev.map((seminar) => (seminar.id === id ? { ...seminar, ...updatedSeminarData } : seminar))
      );
    }
    catch (error) {
      console.error('Ошибка: ', error);
    }
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  }

  const seminarsList = useMemo(() =>
    <ul>
      {seminars.map((seminar) => <li key={seminar.id}>
        <div className="seminar-info">
          <p>{seminar.title}</p>
          <p>{seminar.description}</p>
          <p>Data: {seminar.date}</p>
          <p>Time: {seminar.time}</p>
          <button onClick={() => openSeminarModal(seminar.title, seminar.description, seminar.id, 'delete')}>Удалить данные</button>
          <button onClick={() => openSeminarModal(seminar.title, seminar.description, seminar.id, 'edit')}>Редактировать данные</button>
        </div>
        <div className="seminar-photo">
          <img src={seminar.photo} alt={`seminar ${seminar.id}`} />
        </div>
      </li>
      )}

    </ul>, [seminars])

  useEffect(() => {
    getAllDataSeminars();
  }, [])

  return (
    <>
      <div className="container">
        <h1>Itstart test asssignment</h1>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      {!loading && !error && seminars.length > 0 && (
        <>
          <p>Total seminars {seminars.length}</p>
          {seminarsList}
        </>
      )}
      {isDeleteModalOpen && <DeleteSeminarModal seminarId={seminarData.id} title={seminarData.title} description={seminarData.description} closeDeleteModal={closeDeleteModal} deleteSeminarId={deleteSeminarId} />}
      {isEditModalOpen && <EditSeminarModal seminarId={seminarData.id} closeEditModal={closeEditModal} handleSaveEditData={handleSaveEditData} />}
    </>
  )
}

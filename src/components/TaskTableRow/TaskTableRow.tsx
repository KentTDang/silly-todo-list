import { useState } from "react";
import { firestore } from "../../firebase";
import { getAuth } from "firebase/auth";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";

interface TaskTableRowProps {
  id: string;
  name: string;
  completed: boolean;
}

export const TaskTableRow = ({ id, name, completed }: TaskTableRowProps) => {
  const [taskName, setTaskName] = useState(name);
  const [taskStatus, setTaskStatus] = useState(completed);
  const [editing, setEditing] = useState(false);

  const buildDocRef = (props: { completed: boolean } = { completed }) => {
    const collectionRef = collection(
      firestore,
      getAuth().currentUser!.uid,
      "tasks",
      props.completed ? "complete" : "incomplete"
    );
    return doc(collectionRef, id);
  };

  const updateTask = async () => {
    const docRef = buildDocRef();
    await setDoc(docRef, { task: taskName });
  };

  const markTaskAsComplete = async () => {
    deleteTask();
    const docRef = buildDocRef({ completed: true });
    await setDoc(docRef, { task: taskName });
  };

  const deleteTask = async () => {
    const docRef = buildDocRef();
    await deleteDoc(docRef);
  };

  return (
    <tr>
      <td>
        {editing ? (
          <input
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        ) : (
          taskName
        )}
      </td>
      <td>{taskStatus ? "✅" : ""}</td>
      <td>
        <button
          disabled={taskStatus}
          onClick={() => {
            setEditing(!editing);

            // Save action
            if (editing) {
              updateTask();
            }
          }}
        >
          {editing ? "Save" : "Edit"}
        </button>
        <button disabled={taskStatus} onClick={deleteTask}>
          Delete
        </button>
        {!taskStatus && (
          <button
            onClick={() => {
              setTaskStatus(true);
              markTaskAsComplete();
            }}
          >
            Complete
          </button>
        )}
      </td>
    </tr>
  );
};

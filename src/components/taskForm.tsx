import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../firebase";
import { getAuth } from "firebase/auth";

export const CreateTaskForm = (): JSX.Element => {
  const { currentUser } = getAuth();

  const incompleteCollectionRef = collection(
    firestore,
    currentUser!.uid,
    "tasks",
    "incomplete"
  );

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        // Create Form Data
        const data = new FormData(e.currentTarget);
        const task = data.get("task");

        if (task === undefined || task?.toString().length === 0) {
          return;
        }

        // Transform the data to an object
        const doc = { task };

        try {
          const uploadTask = await addDoc(incompleteCollectionRef, doc);
        } catch (err) {
          throw err;
        }
      }}
    >
      <input
        type="text"
        name="task"
        required
        placeholder="Enter a Task"
      ></input>
      <button>Submit</button>
    </form>
  );
};

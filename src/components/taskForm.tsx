import { addDoc, collection } from 'firebase/firestore'
import { firestore } from '../firebase'

export const CreateTaskForm = (): JSX.Element => {

  const collectionRef = collection(firestore, "todo")
  return (
    <form
      onSubmit={async(e) => {

        e.preventDefault();

        // Create Form Data
        const data = new FormData(e.currentTarget);
        const task = data.get("task");

        // Transform the data to an object 
        const doc = { task }  

        try {
          console.log("Hit the try");
          const uploadTask = await addDoc(collectionRef, doc);
        } catch(err) {
          throw(err)
        }

      }}
    >
      <input type="text" name="task" required placeholder='Enter a Task'></input>
      <button>Submit</button>
    </form>
  )
}
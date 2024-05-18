import { collection, getDocs } from "firebase/firestore";
import { CreateTaskForm } from "../../components/taskForm";
import { firestore } from "../../firebase";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import TaskTable from "../../components/TaskTable";

export const Index = (): JSX.Element => {
  const [tasks, setTasks] = useState<any[]>([]);
  const collectionRef = collection(
    firestore,
    getAuth().currentUser!.uid,
    "tasks",
    "incomplete"
  );

  useEffect(() => {
    (async () => {
      const { docs } = await getDocs(collectionRef);
      setTasks(docs.map((doc) => doc.data()));
    })();
  }, []);

  return (
    <div>
      <CreateTaskForm />

      <TaskTable incompleteTasks={tasks} completeTasks={[]}/>
    </div>
  );
};
  
import { collection, getDocs } from "firebase/firestore";
import { CreateTaskForm } from "../../components/taskForm";
import { firestore } from "../../firebase";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import TaskTable from "../../components/TaskTable";
import { Task, Tasks } from "../../types";

export const Index = (): JSX.Element => {
  const [incompleteTasks, setIncompleteTasks] = useState<Tasks>({});
  const [completeTasks, setCompleteTasks] = useState<Tasks>({});

  const incompleteCollectionRef = collection(
    firestore,
    getAuth().currentUser!.uid,
    "tasks",
    "incomplete"
  );
  const completeCollectionRef = collection(
    firestore,
    getAuth().currentUser!.uid,
    "tasks",
    "complete"
  );

  useEffect(() => {
    (async () => {
      const { docs: incompleteDocs } = await getDocs(incompleteCollectionRef);
      let _incompleteTasks: Tasks = {};
      incompleteDocs.forEach(
        (doc) => (_incompleteTasks[doc.id] = doc.data() as Task)
      );
      setIncompleteTasks(_incompleteTasks);

      const { docs: completeDocs } = await getDocs(completeCollectionRef);
      let _completeTasks: Tasks = {};
      completeDocs.forEach(
        (doc) => (_completeTasks[doc.id] = doc.data() as Task)
      );
      setCompleteTasks(_completeTasks);
    })();
  }, [incompleteTasks] || [completeTasks]);

  return (
    <div>
      <CreateTaskForm />

      <TaskTable
        incompleteTasks={incompleteTasks}
        completeTasks={completeTasks}
      />
    </div>
  );
};

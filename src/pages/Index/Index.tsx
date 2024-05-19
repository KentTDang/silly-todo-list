import { collection, getDocs } from "firebase/firestore";
import { CreateTaskForm } from "../../components/taskForm";
import { firestore } from "../../firebase";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import TaskTable from "../../components/TaskTable";
import { Tasks } from "../../types";

export const Index = (): JSX.Element => {
  const [incompleteTasks, setIncompleteTasks] = useState<Tasks>({});
  const [completeTasks, setCompleteTasks] = useState<Tasks>({});

  const loadTasks = async (props: {
    state: "complete" | "incomplete";
  }): Promise<Tasks> => {
    const collectionRef = collection(
      firestore,
      getAuth().currentUser!.uid,
      "tasks",
      props.state
    );
    const { docs } = await getDocs(collectionRef);
    return docs.reduce(
      (tasks, doc) => Object.assign(tasks, { [doc.id]: doc.data() }),
      {}
    );
  };

  const fetchTableData = async () => {
    try {
      setIncompleteTasks(await loadTasks({ state: "incomplete" }));
    } catch (error) {
      // TODO handle error
      console.error(error);
    }

    try {
      setCompleteTasks(await loadTasks({ state: "complete" }));
    } catch (error) {
      // TODO: handle error
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

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

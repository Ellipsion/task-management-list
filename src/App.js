import { useState } from "react";

import { DragDropContext } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "./components/Droppable/StrictModeDroppable"; // custom Droppable to use with strict mode
import initialData from "./utils/initialData";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Column from "./components/Column";

function App() {
  const [data, setdata] = useState(initialData);
  const handleDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    if (type === "task") {

      // start and finish are the columns
      const start = data.columns[source.droppableId];
      const finish = data.columns[destination.droppableId];

      if (start === finish) {
        // copy the taskIds array
        const newTaskIds = Array.from(start.taskIds);
        // remove the dragged item
        newTaskIds.splice(source.index, 1);
        // insert the dragged item at the new position
        newTaskIds.splice(destination.index, 0, draggableId);

        // update the column with the new taskIds
        const newColumn = {
          ...start,
          taskIds: newTaskIds
        };

        const newState = {
          ...data,
          columns: {
            ...data.columns,
            [newColumn.id]: newColumn
          }
        }

        setdata(newState);
        return;
      } else {
        // copy the taskIds array
        const newTaskIdsStart = Array.from(start.taskIds);
        const newTaskIdsFinish = Array.from(finish.taskIds);

        // remove the dragged item
        newTaskIdsStart.splice(source.index, 1);

        // insert the dragged item at the new position
        newTaskIdsFinish.splice(destination.index, 0, draggableId);

        // update the columns with the new taskIds
        const newColumnStart = {
          ...start,
          taskIds: newTaskIdsStart
        };

        const newColumnFinish = {
          ...finish,
          taskIds: newTaskIdsFinish
        };

        const newState = {
          ...data,
          columns: {
            ...data.columns,
            [newColumnStart.id]: newColumnStart,
            [newColumnFinish.id]: newColumnFinish
          }
        }

        setdata(newState);
        return;
      }

    }

    if (type === "column") {
      // copy the columnOrder array
      const newColumnOrder = Array.from(data.columnOrder);
      // remove the dragged item
      newColumnOrder.splice(source.index, 1);
      // insert the dragged item at the new position
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...data,
        columnOrder: newColumnOrder
      }

      setdata(newState);
      return;
    }

  }
  return (
    <div className="App">

      <Row className="w-100 py-4 my-1 bg-light text-center">
        <h1 className="mt-2">Drag and Drop Task List </h1>
        <p className="mt-2">with</p>
        <h5 className=""><i>react-beautiful-dnd library</i></h5>
      </Row>

      <DragDropContext onDragEnd={handleDragEnd}>

        <Container fluid>
          <Droppable droppableId="container" direction="horizontal" type="column">
            {(provided, snapshot) => (
              <Row
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="justify-content-sm-center mt-3 py-5"
                style={{
                  backgroundColor: snapshot.isDraggingOver ? "rgba(238, 156, 255, 0.08)" : "inherit",
                  transition: "background-color 0.2s ease"
                }}
              >
                {data.columnOrder.map((columnId, index) => {
                  const column = data.columns[columnId];
                  const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

                  return <Column key={column.id} index={index} column={column} tasks={tasks} />;
                })}
                {provided.placeholder}
              </Row>)}
          </Droppable>

        </Container>
      </DragDropContext>
    </div>

  );
}

export default App;

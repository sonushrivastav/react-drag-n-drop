import { useState } from 'react'
import './App.css';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import {Card, Container} from "react-bootstrap"

const ArrayData = [
  {id:1, name:"FC Barcelona"},
  {id:2, name:"manchester united"},
  {id:3, name:"Real Madrid"},
  {id:4, name:"PSG"},
  {id:5, name:"Manchester City"},
]
function App() {
  const [items,setItems]=useState(ArrayData)

  const datamap = items?.map((ele, i) => {
    return (
      <Draggable key={ele.id} draggableId={ele.id.toString()} index={i}>
        {
          (provided) => {
            return (
              <div  {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}>
                <Card style={{width:"100%", padding:50, margin:20}}>
                  {ele.name}
               </Card>
              </div>
            )
          }
          }
      </Draggable>
    )
  })

  const handleOndragEnd = (res) => {
    const itemsCopy = [...items];
    const [reorderedzitem] = itemsCopy.splice(res.source.index, 1)
    itemsCopy.splice(res.destination.index, 0, reorderedzitem)
    setItems(itemsCopy)
  }
  return (
    <div className="App">
      <Container>
        <DragDropContext onDragEnd={handleOndragEnd}>
          <Droppable droppableId='items'>
            {
              (provided) => {
                return (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {datamap}
                    {provided.placeholder}
                  </div>
                )
              }
            }
        </Droppable>

        </DragDropContext>
     </Container>
    </div>
  )
}

export default App

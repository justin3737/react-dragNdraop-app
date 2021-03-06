import React, { Component } from 'react'
import uuid from 'uuid/v4'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
const container_amount = 3

const makeList = count => {
  return Array.from({ length: count }, () => ({ [uuid()]: [] }))
}

const Content = styled.div`
  margin-right: 50%;
`

const Item = styled.div`
  display: flex;
  user-select: none;
  padding: 0.5rem;
  margin: 0 0 0.5rem 0;
  align-items: flex-start;
  align-content: flex-start;
  line-height: 1.5;
  border-radius: 3px;
  background: #fff;
  border: 1px ${props => (props.isDragging ? 'dashed #000' : 'solid #ddd')};
`

const Clone = styled(Item)`
  + div {
    display: none !important;
  }
`

const List = styled.div`
  border: 1px ${props => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')};
  background: #fff;
  padding: 0.5rem 0.5rem 0;
  border-radius: 3px;
  flex: 0 0 150px;
  font-family: sans-serif;
  min-height: 56px;
`

const KioskContainer = styled(List)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 50%;
`

const Kiosk = styled(List)`
  position: relative;
  border: 0px;
`

const Container = styled(List)`
  margin: 0.5rem;
`

const Notice = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  padding: 0.5rem;
  margin: 0 0.5rem 0.5rem;
  border: 1px solid transparent;
  line-height: 1.5;
  color: #aaa;
`

const ITEMS = [
  {
    id: uuid(),
    content: 'id',
  },
  {
    id: uuid(),
    content: 'title',
  },
  {
    id: uuid(),
    content: 'desc',
  },
  {
    id: uuid(),
    content: 'price',
  },
  {
    id: uuid(),
    content: 'oriprice',
  },
  {
    id: uuid(),
    content: 'discount',
  },
]

const ITEMS2 = [
  {
    id: uuid(),
    content: 'id2',
  },
  {
    id: uuid(),
    content: 'title2',
  },
  {
    id: uuid(),
    content: 'desc2',
  },
]

const ITEMS3 = [
  {
    id: uuid(),
    content: 'price3',
  },
  {
    id: uuid(),
    content: 'oriprice3',
  },
  {
    id: uuid(),
    content: 'discount3',
  },
]

const _data = {
  nodata: 'aaa',
  ITEMS: ITEMS,
  ITEMS2: ITEMS2,
  ITEMS3: ITEMS3,
}

const setData = (source, destination, droppableSource) => {
  const sourceClone = Object.assign({}, source)
  const destClone = Array.from(destination)
  const item = sourceClone[droppableSource.droppableId][droppableSource.index]
  destClone.splice(0, 1, { ...item, id: uuid() })
  return destClone
}

class DragGroups extends Component {
  render() {
    const { data } = this.props
    return (
      <KioskContainer>
        {Object.keys(data).map((itm, idx) => {
          return !Array.isArray(data[itm])?
            (<li>{data[itm]}</li>):
            (<React.Fragment key={itm}>
              <li>{itm}</li>
              <Droppable
                key={idx}
                droppableId={itm}
                isDropDisabled={true}
                isCombineEnabled={true}>
                {(provided, snapshot) => (
                  <Kiosk
                    innerRef={provided.innerRef}
                    isDraggingOver={snapshot.isDraggingOver}>
                    {_data[itm].map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}>
                        {(provided, snapshot) => (
                          <React.Fragment>
                            <Item
                              key={item.id}
                              innerRef={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              isDragging={snapshot.isDragging}
                              style={provided.draggableProps.style}>
                              {item.content}
                            </Item>
                            {snapshot.isDragging && (
                              <Clone>{item.content}</Clone>
                            )}
                          </React.Fragment>
                        )}
                      </Draggable>
                    ))}
                  </Kiosk>
                )}
              </Droppable>
            </React.Fragment>)
        })}
      </KioskContainer>
    )
  }
}

export default class App extends Component {
  state = { ...makeList(container_amount) }
  onDragEnd = result => {
    const { source, destination } = result

    // dropped outside the list
    if (!destination) {
      return
    }
    this.setState({
      [destination.droppableId]: setData(
        _data,
        this.state[destination.droppableId],
        source
      ),
    })
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    console.log(this.state)
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <DragGroups data={_data}></DragGroups>
        <Content>
          {Object.keys(this.state).map((list, i) => (
            <Droppable key={list} droppableId={list}>
              {(provided, snapshot) => (
                <Container
                  innerRef={provided.innerRef}
                  isDraggingOver={snapshot.isDraggingOver}>
                  {this.state[list].length
                    ? this.state[list].map((item, index) => (
                        <Item key={index}>{item.content}</Item>
                      ))
                    : !provided.placeholder && <Notice>Drop items here</Notice>}
                </Container>
              )}
            </Droppable>
          ))}
        </Content>
      </DragDropContext>
    )
  }
}

const jsonData = `
{
    "data": {
      "items": [
        {
          "id": 13,
          "name": "生活用品",
          "products": [
            {
              "campaign_special": "",
              "cash_amount_maximum": 268,
              "cathay_point_minimum": 0,
              "cathay_point_usetype": "general",
              "id": 152,
              "img_url": [
                "https://at-uat-static.orca-vec-dev.com/vec_at_uat/static/media/products/152/d2a66d0b-9e5a-40c7-bfd0-24887b744232.png"
              ],
              "market_price": 890,
              "name": "DF Queenin - 出國馬上走!超輕超大容量旅行袋可掛行李桿-共6色(微笑大象)",
              "price": 268
            },
            {
              "campaign_special": "",
              "cash_amount_maximum": 300,
              "cathay_point_minimum": 99,
              "cathay_point_usetype": "pointandcash",
              "id": 151,
              "img_url": [
                "https://at-uat-static.orca-vec-dev.com/vec_at_uat/static/media/products/151/77315237-f158-4f27-adae-5243ec973e45.png",
                "https://at-uat-static.orca-vec-dev.com/vec_at_uat/static/media/products/151/78e4a27c-3577-491d-b053-aa9bb8a1ff6e.png",
                "https://at-uat-static.orca-vec-dev.com/vec_at_uat/static/media/products/151/0aac20cc-b859-46f7-8d76-9b3f4ef5cbc2.png"
              ],
              "market_price": 1299,
              "name": "德國Medisana-純白幾何體重計PS437(白色)",
              "price": 399
            },
            {
              "campaign_special": "",
              "cash_amount_maximum": 0,
              "cathay_point_minimum": 379,
              "cathay_point_usetype": "point",
              "id": 150,
              "img_url": [
                "https://at-uat-static.orca-vec-dev.com/vec_at_uat/static/media/products/150/cb25b530-2a0e-4334-b981-0a956283bd3d.png",
                "https://at-uat-static.orca-vec-dev.com/vec_at_uat/static/media/products/150/73f62d6b-04ff-4d5a-841e-cfeefa9cf51e.png",
                "https://at-uat-static.orca-vec-dev.com/vec_at_uat/static/media/products/150/359f9bbe-0ff7-4254-98a5-fd867cd441e9.png",
                "https://at-uat-static.orca-vec-dev.com/vec_at_uat/static/media/products/150/5ae116f6-a079-4304-bf68-c470d05a90d5.png"
              ],
              "market_price": 980,
              "name": "【日本濱川佐櫻-慢活.藍】活性無印風超柔涼被",
              "price": 379
            },
            {
              "campaign_special": "",
              "cash_amount_maximum": 680,
              "cathay_point_minimum": 0,
              "cathay_point_usetype": "general",
              "id": 149,
              "img_url": [
                "https://at-uat-static.orca-vec-dev.com/vec_at_uat/static/media/products/149/073e0a60-5ff7-4754-9d3c-5bc4ef8d2cba.png"
              ],
              "market_price": 1580,
              "name": "【角落小夥伴】慢回彈蝶形護頸枕/記憶枕/兒童枕頭50x30cm(枕套可拆洗)",
              "price": 680
            }
          ]
        },
        {
          "id": 14,
          "name": "測試專區",
          "products": [
            {
              "campaign_special": "",
              "cash_amount_maximum": 519,
              "cathay_point_minimum": 0,
              "cathay_point_usetype": "general",
              "id": 136,
              "img_url": [
                "https://at-uat-static.orca-vec-dev.com/vec_at_uat/static/media/products/136/8f69ea3a-4b87-427e-a9a9-195ceab6786c.png"
              ],
              "market_price": 2680,
              "name": "Parfum 巴黎帕芬 小蒼蘭香氛精油洗髮精600ml+贈香水髮油10mlX3(小蒼蘭(蓬鬆健髮))",
              "price": 519
            }
          ]
        }
      ]
    }
  }
`

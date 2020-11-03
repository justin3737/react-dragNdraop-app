import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid/v4';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
`;

/** replace the first child of Array*/
const replace = (source, destination, droppableSource) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];
    destClone.splice(0, 1, { ...item, id: uuid() });
    return destClone;
};

const Content = styled.div`
    margin-right: 50%;
`;

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
    border: 1px ${(props) => (props.isDragging ? 'dashed #000' : 'solid #ddd')};
`;

const Clone = styled(Item)`
    + div {
        display: none !important;
    }
`;

const List = styled.div`
    border: 1px
        ${(props) => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')};
    background: #fff;
    padding: 0.5rem 0.5rem 0;
    border-radius: 3px;
    flex: 0 0 150px;
    font-family: sans-serif;
    min-height: 56px;
`;

const Kiosk = styled(List)`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 50%;
`;

const Container = styled(List)`
    margin: 0.5rem;
`;

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
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    margin: 0.5rem;
    padding: 0.5rem;
    color: #000;
    border: 1px solid #ddd;
    background: #fff;
    border-radius: 3px;
    font-size: 1rem;
    cursor: pointer;
`;

const ButtonText = styled.div`
    margin: 0 1rem;
`;

const ITEMS = [
    {
        id: uuid(),
        content: 'id'
    },
    {
        id: uuid(),
        content: 'title'
    },
    {
        id: uuid(),
        content: 'desc'
    },
    {
        id: uuid(),
        content: 'price'
    },
    {
        id: uuid(),
        content: 'oriprice'
    },
    {
        id: uuid(),
        content: 'discount'
    }
];

export default class App extends Component {
    state = {
        [uuid()]: []
    };
    onDragEnd = (result) => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        this.setState({
            [destination.droppableId]: replace(
                ITEMS,
                this.state[destination.droppableId],
                source
            )
        });
    };

    addList = (e) => {
        this.setState({ [uuid()]: [] });
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable
                    droppableId="ITEMS"
                    isDropDisabled={true}
                    isCombineEnabled={true}>
                    {(provided, snapshot) => (
                        <Kiosk
                            innerRef={provided.innerRef}
                            isDraggingOver={snapshot.isDraggingOver}>
                            {ITEMS.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <React.Fragment>
                                            <Item
                                                innerRef={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                isDragging={snapshot.isDragging}
                                                style={
                                                    provided.draggableProps
                                                        .style
                                                }>
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
                <Content>
                    <Button onClick={this.addList}>
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                            />
                        </svg>
                        <ButtonText>Add List</ButtonText>
                    </Button>
                    {Object.keys(this.state).map((list, i) => (
                        <Droppable key={list} droppableId={list}>
                            {(provided, snapshot) => (
                                <Container
                                    innerRef={provided.innerRef}
                                    isDraggingOver={snapshot.isDraggingOver}>
                                    {this.state[list].length
                                        ? this.state[
                                              list
                                          ].map((item, index) => (
                                              <Item key={index}>
                                                  {item.content}
                                              </Item>
                                          ))
                                        : !provided.placeholder && (
                                              <Notice>Drop items here</Notice>
                                          )}
                                </Container>
                            )}
                        </Droppable>
                    ))}
                </Content>
            </DragDropContext>
        );
    }
}


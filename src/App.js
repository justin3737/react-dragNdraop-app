import React, { Component } from 'react'
import uuid from 'uuid/v4'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

/*只抓取陣列第一層 */
const GET_ARRAY_LEVEL_0 = true
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

const ListStyle = styled.div`
  border: 1px ${props => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')};
  background: #fff;
  padding: 0.5rem 0.5rem 0;
  border-radius: 3px;
  flex: 0 0 150px;
  font-family: sans-serif;
  min-height: 56px;
`

const KioskContainer = styled(ListStyle)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 50%;
`

const Kiosk = styled(ListStyle)`
  position: relative;
  border: 0px;
`

const Container = styled(ListStyle)`
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

const data2 = [
  {
    Key: 'type',
    Mandatory: 'Y',
    Value: '4',
  },
]

const data1 = [
  {
    campaign_special: '',
    cash_amount_maximum: 198,
    cathay_point_minimum: 0,
    cathay_point_usetype: 'general',
    id: 12,
    img_url: [
      'https://at-ut-static.orca-vec-dev.com/vec_at_ut/static/media/products/12/e467f747-c4f5-473b-8e1b-ea8fd4383db0.png',
    ],
    market_price: 799,
    name: '去污清潔組(白)-測試結帳最後失敗狀態',
    price: 198,
  },
]

const mydata = {
  items: [
    {
      id: 15,
      name: '可惡的可可6',
      products: [
        {
          campaign_special: '',
          cash_amount_maximum: 949,
          cathay_point_minimum: 0,
          cathay_point_usetype: 'general',
          id: 25,
          img_url: [
            'https://at-ut-static.orca-vec-dev.com/vec_at_ut/static/media/products/25/5494e5fe-9ad2-4339-bc35-a0f8f1de70d9.png',
          ],
          market_price: 3980,
          name: '【情定巴黎】100%萊賽爾親膚天絲枕套床包組(里歐-雙人)',
          price: 949,
        },
      ],
    },
  ],
}

const setData = (source, destination, droppableSource) => {
  const sourceClone = Object.assign({}, source)
  const destClone = Array.from(destination)
  const itemObj = Object.assign({}, sourceClone[droppableSource.droppableId][0])
  const item = Object.keys(itemObj)[droppableSource.index]
  destClone.splice(0, 1, { item, id: uuid() })
  return destClone
}

class ListItem extends Component {
  render() {
    const { children } = this.props
    console.log('children: ', children)
    return <li className="li-item">{children}</li>
  }
}

class DragAbleItem extends Component {
  render() {
    const { children } = this.props
    if (typeof children === 'string') return <li className="li">{children}</li>
    return children.map(item => {
      return Object.keys(item).map((content, _idx) => {
        const id = uuid()
        return (
          <Draggable key={id} draggableId={id} index={_idx}>
            {(provided, snapshot) => (
              <React.Fragment>
                <Item
                  key={id}
                  className="li-item"
                  innerRef={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  isDragging={snapshot.isDragging}
                  style={provided.draggableProps.style}>
                  {content}
                </Item>
                {snapshot.isDragging && <Clone>{content}</Clone>}
              </React.Fragment>
            )}
          </Draggable>
        )
      })
    })
  }
}

class DroppableArea extends Component {
  render() {
    const { itm, children } = this.props
    return (
      <Droppable
        key={uuid()}
        droppableId={itm}
        isDropDisabled={true}
        isCombineEnabled={true}>
        {(provided, snapshot) => (
          <Kiosk
            className="ul-kiosk"
            innerRef={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}>
            <DragAbleItem>{children}</DragAbleItem>
          </Kiosk>
        )}
      </Droppable>
    )
  }
}

// class _DragGroups extends Component {
//   render() {
//     const { data } = this.props
//     return (
//       <KioskContainer>
//         {Object.keys(data).map((itm, idx) => {
//           return !Array.isArray(data[itm]) ? (
//             <li className="li-">{data[itm]}</li>
//           ) : (
//             <React.Fragment key={idx}>
//               <li className="li-title">{itm}</li>
//               <DroppableArea data={data} itm={itm} idx={idx} />
//             </React.Fragment>
//           )
//         })}
//       </KioskContainer>
//     )
//   }
// }

// class DragGroups extends Component {
//   list(items) {
//     const children = l => l
//     // const children = items => {
//     //   return <DroppableArea>{this.list(items)}</DroppableArea>
//     // }
//     if (Array.isArray(items)) {
//       if (GET_ARRAY_LEVEL_0) {
//         return this.list(items[0])
//       } else {
//         return items.map(item => this.list(item))
//       }
//     } else if (typeof items === 'object' && items !== null) {
//       return Object.keys(items).map((itm, idx) => {
//         return (
//           <li>
//             <div>{itm}</div>
//             <DroppableArea itm={itm} idx={idx}>
//               {children(items[itm])}
//             </DroppableArea>
//           </li>
//         )
//       })
//     }
//   }

class DragGroups extends Component {
  list(items) {
    const children = l => l
    if (Array.isArray(items)) {
      if (GET_ARRAY_LEVEL_0) {
        return this.list(items[0])
      } else {
        return items.map(item => this.list(item))
      }
    } else if (typeof items === 'object' && items !== null) {
      return Object.keys(items).map((itm, idx) => {
        return <li>
          <div>{itm}</div>
          <DroppableArea itm={itm} idx={idx}>
            {children(items[itm])}
          </DroppableArea>
        </li>
      })
    }
  }
  render() {
    const { data } = this.props
    return <KioskContainer>{this.list(data)}</KioskContainer>
  }
}
// class DragGroups extends Component {
//   list(items) {
//     //const children = l => l
//     const children = (items, itm) => {
//       return <DroppableArea itm={itm}>{this.list(items)}</DroppableArea>
//     }
//     if (Array.isArray(items)) {
//       if (GET_ARRAY_LEVEL_0) {
//         return this.list(items[0])
//       } else {
//         return items.map(item => this.list(item))
//       }
//     } else if (typeof items === 'object' && items !== null) {
//       return Object.keys(items).map((itm, idx) => {
//         return <ListItem key={idx}>{children(items[itm], itm)}</ListItem>
//       })
//     }
//   }
//   render() {
//     const { data } = this.props
//     return <KioskContainer>{this.list(data)}</KioskContainer>
//   }
// }

// class Drag_Group extends React.Component {
//   list(items) {
//     const children = items => {
//       return <DroppableArea>{this.list(items)}</DroppableArea>
//       //return <ul className="ul-kiosk">{this.list(items)}</ul>;
//     }

//     if (Array.isArray(items)) {
//       if (GET_ARRAY_LEVEL_0) {
//         return this.list(items[0])
//       } else {
//         return items.map(item => this.list(item))
//       }
//     } else if (typeof items === 'object' && items !== null) {
//       return Object.keys(items).map((item, idx) => (
//         <Item key={idx} name={item}>
//           {items[item]}
//         </Item>
//       ))
//     }
//   }
//   render() {
//     const { data } = this.props
//     return <KioskContainer>{this.list(data)}</KioskContainer>
//   }
// }

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
                    ? this.state[list].map((item, index) => {
                        return <Item key={index}>{item.item}</Item>
                      })
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

const mrdata = {
  Response: {
    StatusCode: 'SUCCESS',
    Value: {
      Elements: [
        {
          Extension: {
            App: [
              {
                Key: 'type',
                Mandatory: 'Y',
                Value: '4',
              },
            ],
            Attribute: {},
            Custom: [
              {
                Key: 'tracking_id',
                Mandatory: 'Y',
                Value: '',
              },
            ],
            Metadata: {
              ShortId: 'INLINE',
            },
          },
          Icon:
            'https://at-uat-static.oopocket-dev.com/store/inline.1599207472695.gif',
          Label: '餐廳預約',
          Page: {
            Component: 'THIRD_PARTY_SERVICE',
            TargetUrl:
              'https://at-uat.oopocket-dev.com/app/19593305-5b0f-4743-ae99-2fb0acb6b523/platform/f4e13d0e-5c45-44a6-9111-57c9b6fa751b/view',
          },
        },
        {
          Extension: {
            App: [
              {
                Key: 'type',
                Mandatory: 'Y',
                Value: '4',
              },
            ],
            Attribute: {},
            Custom: [],
            Metadata: {
              ShortId: 'VECpreprod',
            },
          },
          Icon:
            'https://at-uat-static.oopocket-dev.com/store/icShopping60Multi02@3x.1595489378491.png',
          Label: '購物封測',
          Page: {
            Component: 'THIRD_PARTY_SERVICE',
            TargetUrl: 'https://www.preprod.orca-vec.com',
          },
        },
        {
          Extension: {
            App: [
              {
                Key: 'type',
                Mandatory: 'Y',
                Value: '4',
              },
            ],
            Attribute: {},
            Custom: [],
            Metadata: {
              ShortId: 'KLOOK',
            },
          },
          Icon:
            'https://at-uat-static.oopocket-dev.com/store/travel.1599207537389.gif',
          Label: '旅遊體驗',
          Page: {
            Component: 'THIRD_PARTY_SERVICE',
            TargetUrl:
              'https://at-uat.oopocket-dev.com/app/e0e10e17-0c02-47f3-a232-c8ba1a1bc5df/platform/f4e13d0e-5c45-44a6-9111-57c9b6fa751b/view',
          },
        },
        {
          Extension: {
            App: [
              {
                Key: 'type',
                Mandatory: 'Y',
                Value: '4',
              },
            ],
            Attribute: {},
            Custom: [
              {
                Key: 'tracking_id',
                Mandatory: 'N',
                Value: '',
              },
            ],
            Metadata: {
              ShortId: 'FUNNOW',
            },
          },
          Icon:
            'https://at-uat-static.oopocket-dev.com/store/funnow.1599207453325.gif',
          Label: '娛樂舒壓',
          Page: {
            Component: 'THIRD_PARTY_SERVICE',
            TargetUrl:
              'https://at-uat.oopocket-dev.com/app/d90a0d55-30e3-47d2-ab0b-6433bf238719/platform/f4e13d0e-5c45-44a6-9111-57c9b6fa751b/view',
          },
        },
        {
          Extension: {
            App: [
              {
                Key: 'type',
                Mandatory: 'Y',
                Value: '6',
              },
            ],
            Attribute: {},
            Custom: [
              {
                Key: 'tracking_id',
                Mandatory: 'Y',
                Value: '',
              },
            ],
            Metadata: {
              ShortId: 'AUTOPASS',
            },
          },
          Icon:
            'https://at-uat-static.oopocket-dev.com/store/parking.1599207518568.gif',
          Label: '加油停車',
          Page: {
            Component: 'THIRD_PARTY_SERVICE',
            TargetUrl:
              'https://at-uat.oopocket-dev.com/app/2a43e0d2-a5da-4dc1-9533-04ab1800bbf1/platform/f4e13d0e-5c45-44a6-9111-57c9b6fa751b/view',
          },
        },
        {
          Extension: {
            App: [
              {
                Key: 'type',
                Mandatory: 'Y',
                Value: '4',
              },
            ],
            Attribute: {},
            Custom: [],
            Metadata: {
              ShortId: 'EZDING',
            },
          },
          Icon:
            'https://at-uat-static.oopocket-dev.com/store/ezding.1599811926590.gif',
          Label: '看電影',
          Page: {
            Component: 'THIRD_PARTY_SERVICE',
            TargetUrl:
              'https://at-uat.oopocket-dev.com/app/16da7799-b904-4ec1-83bd-de61c94f1209/platform/f4e13d0e-5c45-44a6-9111-57c9b6fa751b/view',
          },
        },
        {
          Extension: {
            App: [
              {
                Key: 'type',
                Mandatory: 'Y',
                Value: '4',
              },
            ],
            Attribute: {},
            Custom: [],
            Metadata: {
              ShortId: 'TREEMALL',
            },
          },
          Icon:
            'https://at-uat-static.oopocket-dev.com/store/vec.1599207557500.gif',
          Label: '新閃購',
          Page: {
            Component: 'VERTICAL_EC',
            TargetUrl: 'https://www-at-uat.orca-vec-dev.com/',
          },
        },
        {
          Extension: {
            App: [
              {
                Key: 'type',
                Mandatory: 'Y',
                Value: '6',
              },
            ],
            Attribute: {},
            Custom: [
              {
                Key: 'tracking_id',
                Mandatory: 'N',
                Value: '',
              },
            ],
            Metadata: {
              ShortId: 'EZTABLE',
            },
          },
          Icon:
            'https://at-uat-static.oopocket-dev.com/store/eztable.1599207434243.gif',
          Label: '餐廳預付',
          Page: {
            Component: 'THIRD_PARTY_SERVICE',
            TargetUrl:
              'https://at-uat.oopocket-dev.com/app/b1a475e4-bf92-4725-9310-dc3fc48ae960/platform/f4e13d0e-5c45-44a6-9111-57c9b6fa751b/view',
          },
        },
        {
          Extension: {
            App: [
              {
                Key: 'type',
                Mandatory: 'Y',
                Value: '6',
              },
            ],
            Attribute: {},
            Custom: [
              {
                Key: 'tracking_id',
                Mandatory: 'Y',
                Value: '',
              },
            ],
            Metadata: {
              ShortId: 'CUTAWAY',
            },
          },
          Icon:
            'https://at-uat-static.oopocket-dev.com/store/cutaway.1599207406861.gif',
          Label: '美食外送',
          Page: {
            Component: 'THIRD_PARTY_SERVICE',
            TargetUrl:
              'https://at-uat.oopocket-dev.com/app/99fb7dca-f1cd-4223-9f54-1c8429c19c4f/platform/f4e13d0e-5c45-44a6-9111-57c9b6fa751b/view',
          },
        },
      ],
    },
  },
}

const _data = {
  data1,
}

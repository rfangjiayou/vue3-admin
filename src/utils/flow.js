import { createApp } from 'vue'
import go from 'gojs'

const $make = go.GraphObject.make

const install = (app, options) => {
  app.config.globalProperties.$go = go
  app.config.globalProperties.$make = go.GraphObject.make
}

// const templateMap = new go.Map()
// const simpletemplate =
//     $make(go.Node, 'Auto',
//       $make(go.Shape, 'Ellipse',
//         new go.Binding('fill', 'color')
//       ),
//       $make(go.TextBlock,
//         new go.Binding('text', 'key')
//       )
//     )

// function nodeStyle() {
//   return [
//     // 绑定节点坐标Node.location为Node.data.loc的值,Model对象可以通过Node.data.loc 获取和设置Node.location（修改节点坐标）
//     new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify), {
//       locationSpot: go.Spot.Center,
//       // isShadowed: true,
//       // shadowColor: "#888",
//       mouseEnter: function(e, obj) { showPorts(obj.part, true) },
//       mouseLeave: function(e, obj) { showPorts(obj.part, false) }
//     }
//   ]
// }

// function showPorts(node, show) {
//   var diagram = node.diagram
//   if (!diagram || diagram.isReadOnly || !diagram.allowLink) return
//   node.ports.each(function(port) {
//     port.stroke = (show ? 'white' : null)
//   })
// }

/* 连线模板 */
export const linkTemplate =
  $make(go.Link,
    { routing: go.Link.Normal },
    new go.Binding('routing'),
    new go.Binding('fromSpot'),
    new go.Binding('toSpot'),

    // 线段模板
    $make(go.Shape,
      { strokeDashArray: [10, 20] },
      new go.Binding('stroke'),
      new go.Binding('strokeWidth')),

    // 箭头模板
    $make(go.Shape,
      { stroke: 'transparent', strokeWidth: 0 },
      new go.Binding('fromArrow'),
      new go.Binding('toArrow'),
      new go.Binding('scale', 'arrowScale'),
      new go.Binding('fill', 'arrowfill')),

    // 文字块
    $make(go.Panel, go.Panel.Auto,
      new go.Binding('alignmentFocus', 'textPos'),
      $make(go.Shape, { fill: 'transparent' }, new go.Binding('stroke')),
      $make(go.TextBlock,
        { margin: 10 },
        new go.Binding('stroke'),
        new go.Binding('text'))
    )
  )

/* 节点装饰器模板 */
export const nodeSelectionAdornmentTemplate =
  $make(go.Adornment, go.Panel.Auto,
    $make(go.Shape, {
      fill: null,
      stroke: null
      // strokeWidth: 1
      // strokeDashArray: [6, 6, 2, 2]
    }),
    // { width: 500, height: 200 }
    $make(go.Placeholder) // 装饰器自适应节点的大小;
  )

/* 调整节点大小的装饰器 */
const makeNodeResizeShapeOption = (cursor, alignment) => ({
  cursor,
  alignment,
  desiredSize: new go.Size(4, 4),
  fill: 'red',
  stroke: 'red'
})

export const nodeResizeAdornmentTemplate =
  $make(go.Adornment, go.Panel.Spot,
    $make(go.Placeholder),
    $make(go.Shape, makeNodeResizeShapeOption('nw-resize', go.Spot.TopLeft)),
    $make(go.Shape, makeNodeResizeShapeOption('ne-resize', go.Spot.TopRight)),
    $make(go.Shape, makeNodeResizeShapeOption('se-resize', go.Spot.BottomLeft)),
    $make(go.Shape, makeNodeResizeShapeOption('sw-resize', go.Spot.BottomRight))
  )

/* 连线功能 */
const makePort = (portId, spot) => (
  $make(go.Shape, {
    cursor: 'pointer',
    fill: 'red',
    width: 4,
    height: 4,
    alignment: spot,
    portId,
    fromLinkable: true,
    toLinkable: true
  })
)

/* 节点模板 */
export const nodeTemplate =
  $make(go.Node, 'Auto',
    {
      cursor: 'pointer',
      selectable: true,
      selectionAdornmentTemplate: nodeSelectionAdornmentTemplate,
      resizable: true,
      resizeAdornmentTemplate: nodeResizeAdornmentTemplate
    },
    // nodeStyle(),
    // $make(go.Panel, 'Auto',
    $make(go.Shape,
      new go.Binding('figure', 'fig'),
      new go.Binding('fill', 'color')
    ),
    $make(go.TextBlock,
      { margin: 15 },
      new go.Binding('text', 'key')
    ),
    makePort('T', go.Spot.Top),
    makePort('B', go.Spot.Bottom),
    makePort('L', go.Spot.Left),
    makePort('R', go.Spot.Right)
    // )
  )

const VUEAPP = createApp({})
VUEAPP.use(install)

export default install

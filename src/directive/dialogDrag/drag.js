export default {
  mounted(el) {
    const dragDom = document.querySelector('.el-dialog')
    const dialogHeaderEl = document.querySelector('.el-dialog .el-dialog__header')
    dialogHeaderEl.style.cssText += ';cursor:move;'

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const getStyle = (function() {
      if (window.document.currentStyle) {
        return (dom, attr) => dom.currentStyle[attr]
      } else {
        return (dom, attr) => getComputedStyle(dom, false)[attr]
      }
    })()

    dialogHeaderEl.onmousedown = (e) => {
      dragDom.style.cssText += ';transition:none;'
      // 当前元素距离可视区的距离
      const disX = e.clientX
      const disY = e.clientY

      const dragDomWidth = dragDom.offsetWidth
      const dragDomHeight = dragDom.offsetHeight

      const screenWidth = document.body.clientWidth
      const screenHeight = document.body.clientHeight

      const minDragLeft = dragDom.offsetLeft
      const maxDragLeft = screenWidth - dragDomWidth - dragDom.offsetLeft
      const minDragTop = dragDom.offsetTop
      const maxDragTop = screenHeight - dragDomHeight - dragDom.offsetTop

      // 获取dialog的样式位置
      let dragDomStyleLeft = getStyle(dragDom, 'left')
      let dragDomStyleTop = getStyle(dragDom, 'top')
      if (dragDomStyleLeft.includes('%')) {
        dragDomStyleLeft = screenWidth * (+dragDomStyleLeft.replace(/%/g, '') / 100)
      } else {
        dragDomStyleLeft = +dragDomStyleLeft.replace(/\px/g, '')
      }
      if (dragDomStyleTop.includes('%')) {
        dragDomStyleTop = screenHeight * (+dragDomStyleTop.replace(/%/g, '') / 100)
      } else {
        dragDomStyleTop = +dragDomStyleTop.replace(/\px/g, '')
      }

      document.onmousemove = (e) => {
        let left = e.clientX - disX
        let top = e.clientY - disY

        if (-left > minDragLeft) {
          left = -minDragLeft
        } else if (left > maxDragLeft) {
          left = maxDragLeft
        }

        if (-top > minDragTop) {
          top = -minDragTop
        } else if (top > maxDragTop) {
          top = maxDragTop
        }

        dragDom.style.cssText += `;top:${top + dragDomStyleTop}px;left:${left + dragDomStyleLeft}px;`
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}

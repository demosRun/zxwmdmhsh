function scrollIntoView () {
  window.scrollTo(0, 0)
}

// 阻止微信拖动
document.body.addEventListener('touchmove', function (e) {
  e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
}, {passive: false})

setTimeout(() => {
  autoScale({
    deviseW: 1508,
    deviseH: 750,
    center: 'middle',
    scroll: false,
    type: 'rotateH5',
    box: '.scale-box'
  })
  var screenScale = window.innerWidth / window.innerHeight
  // alert(document.querySelector('#container canvas'))
  if (screenScale < 1) {
    setTimeout(() => {
      document.querySelector('#container canvas').style.transform = 'rotate(90deg)'
      document.querySelector('#container canvas').style.left = -(window.innerHeight - window.innerWidth) / 2 + 'px'
      document.querySelector('#container canvas').style.top = -(window.innerWidth - window.innerHeight) / 2 + 'px'
    }, 100);
  }
}, 100);
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
}, 100);
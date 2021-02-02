function scrollIntoView () {
  window.scrollTo(0, 0)
}

// 阻止微信拖动
document.body.addEventListener('touchmove', function (e) {
  e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
}, {passive: false})

setTimeout(() => {
  getSC()
}, 100);

function getSC () {
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
    document.body.classList.add('phone-r')
    setTimeout(() => {
      document.querySelector('#container canvas').style.transform = 'rotate(90deg)'
      document.querySelector('#container canvas').style.left = -(window.innerHeight - window.innerWidth) / 2 + 'px'
      document.querySelector('#container canvas').style.top = -(window.innerWidth - window.innerHeight) / 2 + 'px'

      document.querySelector('.blinker-box-2').style.transform = 'rotate(90deg)'
      document.querySelector('.blinker-box-2').style.left = -(window.innerHeight - window.innerWidth) / 2 + 'px'
      document.querySelector('.blinker-box-2').style.top = (window.innerHeight - window.innerWidth) / 2 + 'px'
      document.querySelector('.blinker-box-2').style.width = window.innerHeight + 'px'
      document.querySelector('.blinker-box-2').style.height = window.innerWidth + 'px'
    }, 800);
  }
}

var checkSC = false
var mql = window.matchMedia('(orientation: portrait)');
function handleOrientationChange(mql) {
  if (checkSC) {
    location.reload();
  }
  // location.reload();
}
// 输出当前屏幕模式
handleOrientationChange(mql);
// 监听屏幕模式变化
mql.addListener(handleOrientationChange);
setTimeout(() => {
  checkSC = true
}, 500);


function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
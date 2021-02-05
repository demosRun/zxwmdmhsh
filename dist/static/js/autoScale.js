autoScaleInfo = {}

function getScale () {
  console.log('计算屏幕缩放比例!')
  setTimeout(function () {
    document.body.style.opacity = 1
  }, 0);
  document.body.style.opacity = 0
  var boxList = document.querySelectorAll(autoScaleInfo.box)
  
  autoScaleInfo.innerWidth = window.innerWidth
  autoScaleInfo.innerHeight = window.innerHeight
  switch (autoScaleInfo.type) {
    case 'scale': {
      // 没有设置缩放中心默认为中间
      if (!autoScaleInfo.center) autoScaleInfo.center = 'middle'
      for (var index = 0; index < boxList.length; index++) {
        var scaleBox = boxList[index];
        // 判断是否被嵌入到iframe中
        // if (window.frames.length != parent.frames.length) {
        //   var scale = window.innerWidth / autoScaleInfo.deviseW
        //   scaleBox.style.width = autoScaleInfo.deviseW + 'px'
        //   autoScaleInfo.scale = scale
        //   scaleBox.style.transform = 'scale(' + scale + ', ' + scale + ')';
        //   // console.log(document.height)
        //   scaleBox.style.transformOrigin = '0px 0px 0px'
        //   // document.body.style.height = scaleBox.offsetHeight * autoScaleInfo.scale + 'px'
        //   // document.style.height = document.body.scrollHeight * scale + 'px'
        //   scaleBox.style.height = document.body.scrollHeight * scale + 'px'
        //   continue
        // }
        if ((autoScaleInfo.innerWidth / autoScaleInfo.innerHeight) < 1) {
          var scale = autoScaleInfo.innerWidth / autoScaleInfo.deviseW
          autoScaleInfo.scale = scale
          scaleBox.style.width = autoScaleInfo.deviseW + 'px'
          if (autoScaleInfo.scroll) {
            scaleBox.style.height = autoScaleInfo.innerHeight / autoScaleInfo.scale + 'px'
            scaleBox.style.overflow = 'auto'
            
          } else {
            scaleBox.style.height = autoScaleInfo.deviseH + 'px'
          }
          
          autoScaleInfo.hideHeight = (autoScaleInfo.innerHeight - autoScaleInfo.deviseH * scale) / 2 /scale
          // 判断缩放中心
          if (autoScaleInfo.center === 'middle') {
            scaleBox.style.transform = 'scale(' + scale + ', ' + scale + ') translate(0, ' + autoScaleInfo.hideHeight + 'px)';
          } else {
            scaleBox.style.transform = 'scale(' + scale + ', ' + scale + ')';
          }
          
          scaleBox.style.transformOrigin = '0px 0px 0px'
          autoScaleInfo.showHeight = autoScaleInfo.innerHeight / autoScaleInfo.scale
          autoScaleInfo.showWidth = autoScaleInfo.innerWidth / autoScaleInfo.scale
        } else {
          document.body.classList.add('pc')
          var scale = (autoScaleInfo.innerHeight / autoScaleInfo.deviseH).toFixed(2)
          scaleBox.style.width = autoScaleInfo.deviseW + 'px'
          scaleBox.style.height = autoScaleInfo.deviseH + 'px'
          scaleBox.style.overflow = 'hidden'
          scaleBox.style.transform = 'scale(' + scale + ', ' + scale + ') translate(' + (autoScaleInfo.innerWidth - autoScaleInfo.deviseW * scale) / 2 / scale + 'px, 0)'
          scaleBox.style.transformOrigin = '0 0 0'
          if (autoScaleInfo.scroll) {
            scaleBox.style.overflow = 'auto'
          }
        }
      }
      // 只对宽屏生效
      if (autoScaleInfo.scalePc && (autoScaleInfo.innerWidth / autoScaleInfo.innerHeight) > 1) {
        // 缩放PC
        var scaleListPC = document.querySelectorAll(autoScaleInfo.scalePc)
        for (var index = 0; index < scaleListPC.length; index++) {
          var scaleBox = scaleListPC[index];
          var screenScale = window.innerWidth / window.innerHeight
          var deviseScale = autoScaleInfo.deviseW / autoScaleInfo.deviseH
          var scale = screenScale < deviseScale ? window.innerWidth / autoScaleInfo.deviseW : window.innerHeight / autoScaleInfo.deviseH
          scaleBox.style.width = autoScaleInfo.deviseW + 'px'
          scaleBox.style.height = autoScaleInfo.deviseH + 'px'
          autoScaleInfo.zoom = scale
          // 判断使用zoom还是transform
          if (navigator.userAgent.indexOf("Edge") > -1) {
            scaleBox.style.transform = 'scale(' + autoScaleInfo.zoom + ', ' + autoScaleInfo.zoom + ') translate(0, 0)'
          } else {
            scaleBox.style.zoom = autoScaleInfo.zoom
          }
          scaleBox.style.transformOrigin = 'center'
          scaleBox.style.position = 'absolute'
          scaleBox.style.left = "-50%"
          scaleBox.style.right = "-50%"
          scaleBox.style.top = "-50%"
          scaleBox.style.bottom = "-50%"
          scaleBox.style.margin = "auto"
        }
      }
      break
    }
    case 'roll': {
      for (var index = 0; index < boxList.length; index++) {
        var scaleBox = boxList[index];
        var scale = window.innerWidth / autoScaleInfo.deviseW
        scaleBox.style.width = autoScaleInfo.deviseW + 'px'
        // scaleBox.style.height = autoScaleInfo.deviseH + 'px'
        autoScaleInfo.zoom = scale
        // 判断使用zoom还是transform
        if (navigator.userAgent.indexOf("Edge") > -1) {
          scaleBox.style.transform = 'scale(' + autoScaleInfo.zoom + ', ' + autoScaleInfo.zoom + ') translate(0, 0)'
        } else {
          scaleBox.style.zoom = autoScaleInfo.zoom
        }
        scaleBox.style.transformOrigin = 'center'
        scaleBox.style.margin = "0 auto"
      }
      break
    }
    // 横屏滚动
    case 'rollH5': {
      for (var index = 0; index < boxList.length; index++) {
        var scaleBox = boxList[index];
        var scale = window.isRotate ? window.innerWidth / autoScaleInfo.deviseW : window.innerHeight / autoScaleInfo.deviseW
        scaleBox.style.height = autoScaleInfo.deviseW + 'px'
        // scaleBox.style.height = autoScaleInfo.deviseH + 'px'
        autoScaleInfo.zoom = scale
        // 判断使用zoom还是transform
        if (navigator.userAgent.indexOf("Edge") > -1) {
          scaleBox.style.transform = 'scale(' + autoScaleInfo.zoom + ', ' + autoScaleInfo.zoom + ') translate(0, 0)'
        } else {
          scaleBox.style.zoom = autoScaleInfo.zoom
        }
        scaleBox.style.transformOrigin = 'left top'
        scaleBox.style.margin = "0 auto"
      }
      break
    }
    // 旋转
    case 'rotate': {
      for (var index = 0; index < boxList.length; index++) {
        var rotateBox = boxList[index];
        if ((autoScaleInfo.innerWidth / autoScaleInfo.innerHeight) < 1) {
          rotateBox.style.transform = 'rotate(90deg) translate(0, ' + -autoScaleInfo.innerWidth + 'px)'
          rotateBox.style.height = autoScaleInfo.innerWidth + 'px'
          rotateBox.style.width = autoScaleInfo.innerHeight + 'px'
          window.isRotate = true
          rotateBox.style.transformOrigin = '0px 0px 0px'
        } else {
          rotateBox.style.height = '100%'
          rotateBox.style.width = '100%'
        }
      }
      break
    }
    // 横屏H5
    case 'rotateH5': {
      for (var index = 0; index < boxList.length; index++) {
        var rotateBox = boxList[index];
        var screenScale = window.innerWidth / window.innerHeight
        if ((autoScaleInfo.innerWidth / autoScaleInfo.innerHeight) < 1) {
          var deviseScale = autoScaleInfo.deviseW / autoScaleInfo.deviseH
          var scale = screenScale < deviseScale ? window.innerHeight / autoScaleInfo.deviseW : window.innerWidth / autoScaleInfo.deviseH
          autoScaleInfo.hideHeight = (autoScaleInfo.innerWidth - autoScaleInfo.deviseH * scale) / 2 /scale
          autoScaleInfo.zoom = scale
          rotateBox.style.transform = 'scale(' + autoScaleInfo.zoom + ', ' + autoScaleInfo.zoom + ') rotate(90deg) translate(0, ' + -(autoScaleInfo.innerWidth / scale - autoScaleInfo.hideHeight) + 'px)'
          rotateBox.style.height = autoScaleInfo.deviseH + 'px'
          rotateBox.style.width = autoScaleInfo.deviseW + 'px'
          window.isRotate = true
          rotateBox.style.transformOrigin = '0px 0px 0px'
        } else {
          
          var deviseScale = autoScaleInfo.deviseW / autoScaleInfo.deviseH
          var scale = screenScale < deviseScale ? window.innerWidth / autoScaleInfo.deviseW : window.innerHeight / autoScaleInfo.deviseH
          autoScaleInfo.hideHeight = (autoScaleInfo.innerHeight - autoScaleInfo.deviseH * scale) / 2 /scale
          autoScaleInfo.hideWidth = (autoScaleInfo.innerWidth - autoScaleInfo.deviseW * scale) / 2 /scale
          autoScaleInfo.zoom = scale
          
          rotateBox.style.transform = 'scale(' + autoScaleInfo.zoom + ', ' + autoScaleInfo.zoom + ') translate(' + autoScaleInfo.hideWidth + 'px , ' + autoScaleInfo.hideHeight + 'px)'
          rotateBox.style.height = autoScaleInfo.deviseH + 'px'
          rotateBox.style.width = autoScaleInfo.deviseW + 'px'
          window.isRotate = false
          rotateBox.style.transformOrigin = '0px 0px 0px'
        }
      }
      break
    }
  }
  // 执行回调
  if (autoScaleInfo.callBack) {
    autoScaleInfo.callBack(autoScaleInfo)
  }
}


function autoScale(config) {
  // 注册窗口改变事件
  var timer = null
  function refreshGetScale () {
    console.log("重新计算")
    window.clearTimeout(timer)
    timer = setTimeout(function () {
      autoScaleInfo = config
      getScale()
    }, 300)
  }
  
  if (window.addEventListener) {
    // 延迟一会再注册事件监听以防止页面初始化的时候刷新两次
    setTimeout(function () {
      window.addEventListener('resize', refreshGetScale)
  
      // 微信返回自动重新排版布局
      window.addEventListener('pageshow', refreshGetScale)
    }, 100);
  }
  if (!config) {
    console.error('没有设置配置参数!')
    config = {
      // 设计宽度
      deviseW: 750,
      // 设计高度
      deviseH: 1508,
      // 缩放中心 目前只支持 middle 和 top
      center: 'middle',
      // 是否是Y轴滚动模式
      scroll: false,
      // 可选 scale, scalePC, roll, rotate
      type: 'scale',
      box: '.rotate-box'
    }
  }
  autoScaleInfo = config
  getScale()
}
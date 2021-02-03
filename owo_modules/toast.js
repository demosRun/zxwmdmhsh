/**
 * 显示toast提示 不支持ie8
 * @param  {number} text       显示的文字
 * @param  {number} fontSize   字体大小
 * @param  {number} time       显示时长
 * @param  {number} container  显示容器
 */

owo.tool.toast = function (text, config) {
  if (!config) config = {}
  time = config.time || 2000
  fontSize = config.fontSize || 14
  container = config.container || document.body
  if (window.owo.state.toastClock) {
    clearTimeout(window.owo.state.toastClock)
    hideToast()
  }
  var toast = document.createElement("div")
  toast.setAttribute("id", "toast")
  toast.setAttribute("class", "toast")
  // 设置样式
  toast.style.cssText = `position: fixed;
  z-index: 1999;
  background-color: rgba(0, 0, 0, 0.8);
  bottom: 4%;
  border-radius: 10px;
  left: 50%;
  transform: translateX(-50%) translate3d(0px, 0px, 0px);
  margin: 0px auto;
  text-align: center;
  color: white;
  max-width: 60%;
  padding: 12px 27px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 36px;`

  toast.innerHTML = text
  container.appendChild(toast)
  function hideToast() {
    document.getElementById('toast').outerHTML = ''
    window.owo.state.toastClock = null
  }
  window.owo.state.toastClock = setTimeout(hideToast, time)
}
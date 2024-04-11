let count = 0;  
let timer = null;  
  
const onProgress = (event) => {  
  const progressBar = event.target.querySelector('.progress-bar');  
  const updatingBar = event.target.querySelector('.update-bar');  
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;  
  
  if (event.detail.totalProgress === 1) {  
    if (count === 0) {  
      // 在第一次totalProgress为1时不移除监听器，并设置定时器  
      timer = setInterval(() => {  
        const currentWidth = parseFloat(updatingBar.style.width);  
        if (currentWidth <= event.detail.totalProgress * 100) {  
          updatingBar.style.width = `${event.detail.totalProgress * 100}%`;  
        } else {  
          updatingBar.style.width = `${(currentWidth - 1) + event.detail.totalProgress * 100}%`;  
        }  
      }, 100); // 每100毫秒更新一次  
      count++; // 增加计数器  
    } else {  
      // 在这里处理第二次totalProgress为1的情况，并清除定时器  
      clearInterval(timer);  
      progressBar.classList.add('hide'); // 隐藏进度条  
      event.target.removeEventListener('progress', onProgress);  
      // 这里可以添加其他处理代码  
    }  
  } else {  
    if (count === 0) {  
      progressBar.classList.remove('hide'); // 显示进度条  
    }  
  }  
};  
  
document.querySelector('model-viewer').addEventListener('progress', onProgress);
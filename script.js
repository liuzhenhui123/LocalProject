let count = 0;  
let timer = null;  
  
const onProgress = (event) => {  
  const progressBar = event.target.querySelector('.progress-bar');  
  const updatingBar = event.target.querySelector('.update-bar');  
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;  
  
  if (event.detail.totalProgress === 1) {  
    if (count === 0) {  
      // �ڵ�һ��totalProgressΪ1ʱ���Ƴ��������������ö�ʱ��  
      timer = setInterval(() => {  
        const currentWidth = parseFloat(updatingBar.style.width);  
        if (currentWidth <= event.detail.totalProgress * 100) {  
          updatingBar.style.width = `${event.detail.totalProgress * 100}%`;  
        } else {  
          updatingBar.style.width = `${(currentWidth - 1) + event.detail.totalProgress * 100}%`;  
        }  
      }, 100); // ÿ100�������һ��  
      count++; // ���Ӽ�����  
    } else {  
      // �����ﴦ��ڶ���totalProgressΪ1��������������ʱ��  
      clearInterval(timer);  
      progressBar.classList.add('hide'); // ���ؽ�����  
      event.target.removeEventListener('progress', onProgress);  
      // ���������������������  
    }  
  } else {  
    if (count === 0) {  
      progressBar.classList.remove('hide'); // ��ʾ������  
    }  
  }  
};  
  
document.querySelector('model-viewer').addEventListener('progress', onProgress);
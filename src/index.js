import lampix from '@lampix/core';

const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.font = '16px Arial';
ctx.textAlign = 'right';
ctx.textBaseline = 'middle';

const drawLabelFactory = object => {
  ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  ctx.fillText(object.metadata, 200, 200);
};

const initialize = async () => {
  const { params, watcherName } = await lampix.getAppConfig();
  const drawLabel = drawLabelFactory;

  const w = {
    name: watcherName,
    shape: lampix.helpers.rectangle(0, 0, window.innerWidth, window.innerHeight),
    onClassification: (recognizedObjects) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      recognizedObjects.forEach(element => {
        drawLabel(element);
      });
    },
    params
  };

  const closeBtn = document.getElementById('close-btn');
  const closeBtnBounds = closeBtn.getBoundingClientRect();

  const closeBtnWatcher = lampix.presets.button(
    closeBtnBounds.left,
    closeBtnBounds.top,
    lampix.exit,
    {
      width: closeBtnBounds.width,
      height: closeBtnBounds.height
    }
  );

  await lampix.watchers.add(w, closeBtnWatcher);
};

initialize();

'use strict';

(function () {

  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var SHADOW_SHIFT = 10;
  var PADDING = 20;
  var FONT_SIZE = 16;
  var LINE_HEIGHT = 20;
  var MESSAGE_STRINGS = ['Ура вы победили!', 'Список результатов:'];
  var BAR_WIDTH = 40;
  var BAR_MAX_HEIGHT = 140; // Поменял на 140, потому что при 150 остается слишком маленький паддинг снизу, ну и по пропорции из скрина в задании выходит 140.
  var BAR_GAP = 50;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var renderMultitext = function (ctx, strings, x, y, lineheight) {
    for (var i = 0; i < strings.length; i++) {
      ctx.fillText(strings[i], x, y + lineheight * i);
    }
  };

  var renderBar = function (ctx, x, y, name, time, maxTime, barMaxHeight, lineHeight) {
    var barHeight = Math.floor(time / maxTime * barMaxHeight);

    ctx.fillStyle = '#000000';
    ctx.textBaseline = 'top';
    ctx.fillText(Math.floor(time), x, y + barMaxHeight - barHeight);
    ctx.fillText(name, x, y + lineHeight * 1.2 + barMaxHeight);

    if (name === 'Вы') {
      ctx.fillStyle = 'rgb(255, 0, 0)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + (Math.random() * 100) + '%, 50%)';
    }
    ctx.fillRect(x, y + lineHeight + barMaxHeight - barHeight, BAR_WIDTH, barHeight);
  };

  window.renderStatistics = function (ctx, names, times) {
    var maxTime = Math.max.apply(null, times);
    var chartX = CLOUD_X + PADDING * 2;
    var chartY = CLOUD_Y + PADDING + (MESSAGE_STRINGS.length + 0.5) * LINE_HEIGHT;

    renderCloud(ctx, CLOUD_X + SHADOW_SHIFT, CLOUD_Y + SHADOW_SHIFT, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

    ctx.fillStyle = '#000000';
    ctx.font = FONT_SIZE + 'px \'PT Mono\'';
    ctx.textBaseline = 'top';
    renderMultitext(ctx, MESSAGE_STRINGS, CLOUD_X + PADDING, CLOUD_Y + PADDING, LINE_HEIGHT);

    for (var i = 0; i < names.length; i++) {
      renderBar(ctx, chartX + (BAR_WIDTH + BAR_GAP) * i, chartY, names[i], times[i], maxTime, BAR_MAX_HEIGHT, LINE_HEIGHT);
    }
  };

})();

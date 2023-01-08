function random(from = 0, to = 1) {
  return Math.random() * (to - from) + from;
}

function drawBlob(context, { x, y }, size, color) {
  context.fillStyle = color;
  context.beginPath();

  // Circle:
  // context.arc(x, y, size, 0, 2 * Math.PI, false);

  // Blob:
  const N = 5;

  let points = [];

  for (var i = 0; i < N; i++) {
    var r = size - Math.random() * (size / 2);
    var x = Math.cos((i / N) * (2 * Math.PI)) * r + x;
    var y = Math.sin((i / N) * (2 * Math.PI)) * r + y;
    points.push([x, y]);
  }

  let xc1 = (points[0][0] + points[N - 1][0]) / 2;
  let yc1 = (points[0][1] + points[N - 1][1]) / 2;
  context.moveTo(xc1, yc1);

  for (var i = 0; i < N - 1; i++) {
    var xc = (points[i][0] + points[i + 1][0]) / 2;
    var yc = (points[i][1] + points[i + 1][1]) / 2;
    context.quadraticCurveTo(points[i][0], points[i][1], xc, yc);
  }
  context.quadraticCurveTo(points[N - 1][0], points[N - 1][1], xc1, yc1);

  context.closePath();
  context.fill();
}

class BlobPainter {
  static inputProperties = ['--blob-count', '--blob-colors'];

  paint(context, { width, height }, parameters) {
    console.dir(parameters);
    const count = parameters.get('--blob-count').value;
    const colors = parameters
      .getAll('--blob-colors')
      .map((color) => color.toString());

    for (let i = 0; i < count; i++) {
      drawBlob(
        context,
        { x: random(0, width), y: random(0, height) },
        random(100, 500),
        colors[Math.floor(random(0, colors.length))],
      );
    }
  }
}

registerPaint('blobs', BlobPainter);

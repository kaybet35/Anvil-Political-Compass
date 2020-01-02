(function () {
    var canvas = document.getElementById('chart');
    var context = canvas.getContext('2d');
    var textHeight = 0;

    function setup() {
        var height = canvas.height = canvas.parentNode.clientWidth; // use width for square aspect ratio
        var width = canvas.width = canvas.parentNode.clientWidth;
        var padding = 0;
        context.clearRect(0, 0, width, height);
        context.font = '16px sans-serif';
        textHeight = context.measureText('M').width;

        context.save();
        context.fillStyle = '#F9BABA';
        context.fillRect(0, 0, width / 2, height / 2);

        context.fillStyle = '#92D9F8';
        context.fillRect(width / 2, 0, width / 2, height / 2);

        context.fillStyle = '#C8E4BC';
        context.fillRect(0, height / 2, width / 2, height / 2);

        context.fillStyle = '#D5D587';
        context.fillRect(width / 2, height / 2, width / 2, height / 2);

        context.restore();

        drawGrid(width, height, 40, padding, '#eee', 1);
        drawGrid(width, height, 10, padding, '#eee', 2);

        var labels = [
            { text: 'Shitposting Loyalist', horizontal: 'left', vertical: 'top', x: 0, y: 0 },
            { text: 'Tryhard Noot', horizontal: 'right', vertical: 'bottom', x: width, y: height },
            { text: 'Tryhard Loyalist', horizontal: 'right', vertical: 'top', x: width, y: 0 },
            { text: 'Shitposting Noot', horizontal: 'left', vertical: 'bottom', x: 0, y: height },

        /*{ text: 'Authoritarianism', horizontal: 'center', vertical: 'top', x: width / 2, y: 0 },
        { text: 'Socialism', horizontal: 'left', vertical: 'middle', x: 0, y: height / 2 },
        { text: 'Centerism', horizontal: 'center', vertical: 'middle', x: width / 2, y: height / 2 },
        { text: 'Capitalism', horizontal: 'right', vertical: 'middle', x: width, y: height / 2 },
        { text: 'Libertarianism', horizontal: 'center', vertical: 'bottom', x: width / 2, y: height },*/
        ];

        document.profiles.forEach(function (p) {
            drawProfile(p);
        });

        labels.forEach(function (label) {
            drawText(label, 15);
        });


    }

    function drawProfile(item) {

        var height = canvas.parentNode.clientHeight;
        var width = canvas.parentNode.clientWidth;


        context.save();
        context.translate(width * (item.x + 1) / 2, height - height * (item.y + 1) / 2);
        context.fillStyle = '#454545';
        // add on hover
        // draw a marker or dot

        var radius = parseInt((width / 200).toFixed());
        if (radius < 1)
            radius = 1;

        // boy I did a bad job writing this ugly piece of code, it's just left/right justification
        if (item.image != undefined) {
            if (item.x < 0) {
                context.textAlign = 'left';
                context.fillText(item.player, 32 + 2 + radius + 2, 6);
                var image = new Image;
                image.src = item.image;
                var x = parseFloat(width * (item.x + 1) / 2 + radius + 2).toFixed();
                var y = parseFloat(height - height * (item.y + 1) / 2 - 16).toFixed();
                image.onload = () => {
                    context.drawImage(image, x, y, 32, 32);
                };
            }
            else {
                context.textAlign = 'right';
                context.fillText(item.player, -32 - 2 - radius - 2, 6);
                var image = new Image;
                image.src = item.image;
                var x = parseFloat(width * (item.x + 1) / 2 - radius - 2 - 32 - 2).toFixed();
                var y = parseFloat(height - height * (item.y + 1) / 2 - 16).toFixed();
                image.onload = () => {
                    context.drawImage(image, x, y, 32, 32);
                };
            }
        }
        else {
            if (item.x < 0) {
                context.textAlign = 'left';
                context.fillText(item.player, radius + 2, 6);
            }
            else {
                context.textAlign = 'right';
                context.fillText(item.player, -radius - 2, 6);
            }


        }

        context.beginPath();
        context.arc(0, 0, radius, 0, 2 * Math.PI);
        context.fill();

        context.restore();
    }

    function drawGrid(bw, bh, lines, pad, color, lineWidth) {
        var gap = (bw - (pad * 2)) / lines;
        context.beginPath();
        context.lineWidth = lineWidth;
        context.strokeStyle = color;
        for (var x = pad; x <= bw - pad; x += gap) {
            context.moveTo(x, pad);
            context.lineTo(x, bh - pad);
        }
        for (var y = pad; y <= bh - pad; y += gap) {
            context.moveTo(pad, y);
            context.lineTo(bw - pad, y);
        }
        context.stroke();
        context.closePath();
    }

    function drawLine(start, end) {
        context.beginPath();
        context.strokeStyle = '#333';
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.stroke();
        context.closePath();
    }

    function drawText(item, pad) {
        context.save();
        context.textAlign = 'center';
        if (item.vertical === 'top') {
            item.y += pad;
            context.textBaseline = 'top';
            if (item.horizontal == 'left') {
                item.r = -45;
                item.x += pad * 4;
                item.y += pad * 3;
            }
            if (item.horizontal == 'right') {
                item.r = 45;
                item.x -= pad * 4;
                item.y += pad * 3;
            }
        }
        if (item.vertical === 'middle') {
            context.textBaseline = 'top';
            if (item.horizontal == 'left') {
                item.r = -90;
                item.x += pad;
            }
            if (item.horizontal == 'right') {
                item.r = 90;
                item.x -= pad;
            }
        }
        if (item.vertical === 'bottom') {
            item.y -= pad;
            context.textBaseline = 'bottom';
            if (item.horizontal == 'left') {
                item.r = 45;
                item.x += pad * 4;
                item.y -= pad * 3;
            }
            if (item.horizontal == 'right') {
                item.r = -45;
                item.x -= pad * 4;
                item.y -= pad * 3;
            }
        }
        context.translate(item.x, item.y);
        context.rotate(item.r * Math.PI / 180);
        context.fillStyle = '#454545';
        context.fillText(item.text, 0, 0);
        context.restore();
    }

    window.addEventListener('resize', function () {
        setup();
    });

    setup();
}());

/*
 * by:Jingks
 * date:2017/9/7
 */

 var Draw = 
 {
    //初始化函数
 	init: function(selector)
 	{
        //用于返回的draw对象	
        var canvas = document.querySelector(selector);
        var draw = canvas.getContext('2d');
        
        //用于初始化画布的宽高
        draw.width = canvas.width;
        draw.height = canvas.height;

        //画布的填充色 边框色 线宽 透明度
    	draw.fillStyle = '#000';
    	draw.strokeStyle = '#000';
        draw.lineWidth = 1;
        draw.globalAlpha = 1;
        draw.lineCap = 'round';


        //当前画面位置
        draw.position = 0;
        //用于保存draw存储画面数组
        draw.arr = [];

        //清除画布上所有元素
        draw.clear = function()
        {
            draw.clearRect(0, 0, draw.width, draw.height);
        }

        //获取画布上的画面 并存入画面数组
        draw.get = function()
        {
            var index = draw.position;
            draw.arr.splice(index, 1, draw.getImageData(0, 0, draw.width, draw.height)); 
            draw.position++;
        }

        //从画面数组中获取最后画面 并放到画面上
        draw.put = function()
        {
            var index = draw.position - 1;
            draw.putImageData(draw.arr[index], 0, 0);
        }

        //获取当前画面之前的画面
        draw.prev = function()
        {   var index = draw.position - 2;
            if(index >= 0 && index < draw.arr.length)
            {
                draw.putImageData(draw.arr[index], 0, 0);
                draw.position--;
            }
        }

        //获取当前画面之后的画面
        draw.after = function()
        {
            var index = draw.position;
            if(index >= 0 && index < draw.arr.length)
            {
                draw.putImageData(draw.arr[index], 0, 0);
                draw.position++;
            }
        }
    	
        //直线以及画笔
        draw.pen = function(x, y, x1, y1)
        {
            draw.beginPath();
            draw.moveTo(x, y);
            draw.lineTo(x1, y1);
            draw.stroke();
        }

        //矩形
    	draw.rect = function(x, y, w, h, type = 1)//1.stroke 2.fill 3.stroke&fill
    	{
            if(type == 1)
            {
                draw.strokeRect(x, y, w, h);
            }
            else if(type == 2)
            {
                draw.fillRect(x, y, w, h);
            }
            else
            {
                draw.strokeRect(x, y, w, h);
                draw.fillRect(x, y, w, h);
            }
    	}

        //圆
        draw.circle = function(x, y, x1, y1, type = 1)
        {
            var r = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
            draw.beginPath();
            draw.arc(x, y, r, 0, 2 * Math.PI, true);
            if(type == 1)
            {
                draw.stroke();
            }
            else if(type == 2)
            {
                draw.fill();
            }
            else
            {
                draw.stroke();
                draw.fill();
            }
        }

        //多边形
        draw.poly = function(x, y, x1, y1, n, type = 1)
        {
            draw.save();
            var r = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
            draw.translate(x, y);
            draw.rotate(Math.PI / 2);
            var nx = r * Math.cos(Math.PI / n);
            var ny = r * Math.sin(Math.PI / n);
            draw.beginPath();
            draw.moveTo(nx, ny);

            for(var i = 0; i <= n; i++)
            {
                draw.rotate(Math.PI * 2 / n);
                draw.lineTo(nx, -ny);
            }

            if(type == 1)
            {
                draw.stroke();
            }
            else if(type == 2)
            {
                draw.fill();
            }
            else
            {
                draw.stroke();
                draw.fill();
            }
            draw.restore();
        }
    	
        //旋转
        draw.spin = function(x, y, deg)
        {
            draw.translate(x, y);
            draw.rotate(deg);
            draw.translate(-x, -y);
        }

        //橡皮擦
        draw.eraser = function(x, y, size = 1)
        {
            var area = size / 2 * 5 + 2.5;
            draw.clearRect(x - area, y - area, 2 * area, 2 * area);
        }

        /*//剪切
        draw.cut = function()
        {

        }*/

        //填充
        draw.filling = function()
        {
            draw.fillRect(0, 0, draw.width, draw.height);
        }

        //重置
        draw.reset = function()
        {
            draw.clearRect(0, 0, draw.width, draw.height);
            draw.arr = [];
            draw.position = 0;
            draw.arr.push(draw.getImageData(0, 0, draw.width, draw.height));
            draw.position++;

          /*draw.fillColor = '#000';
            draw.strokeColor = '#000';
            draw.lineWidth = '1px';
            draw.globalAlpha = 1;
            draw.lineCap = 'round';*/
        }

    	return draw;
 	}
 }
var random = function (min, max) {k = Math.floor(Math.random() * (max - min) + min);
	return (Math.round( k / size) * size);}

var newApple = function () {
	a = [random(0, 900),random(0, 900)];
	}

var	newB = function () {
	sBody = [{x: 3 * size,y: 3 * size}, {x: 4 * size, y: 3 * size}, {x: 5 * size,y: 3 * size}];
	}

var gP = document.getElementById('gP'), //Достаем canvas
	g = gP.getContext('2d'), //Получаем "контакс" (методы для рисования в canvas) //Сохраняем для удобства
	sBody = null, //Начально тело змейки - два элемента
	direction = 'right'
	a = null, //Яблоко, массив, 0 элемент - x, 1 элемнт - y
	size = 25; newB(); newApple(); //Создаем змейку

gP.width = 900; //Сохранем четкость изображения, выставив полную ширину экрана
gP.height = 900;

setInterval(function(){
	if (a[0] + size >= gP.width || a[1] + size >= gP.height){
		newApple();
	}
	g.fillStyle = "white" 
	g.fillRect(0,0,gP.width,gP.height);
	g.fillStyle = "red";
	g.fillRect(...a, size, size);
	g.fillStyle = "#000"; //цвет змеи

	sBody.forEach(function(el, i){
		if (el.x == sBody[sBody.length - 1].x && el.y == sBody[sBody.length - 1].y && i < sBody.length - 1){
			sBody.splice(0,sBody.length-1), sBody = [{x: 3 * size,y: 3 * size}, {x: 4 * size, y: 3 * size}, {x: 5 * size,y: 3 * size}], direction = 'right'; //Проверка на столкновение	
		} 
	});

	var head = sBody[0], newhead = {x: head.x, y: head.y}, tail = sBody[sBody.length - 1]; // сохраняем хвост и голову змейки
	if (direction == 'right'){
		newhead.x = tail.x + size, newhead.y = Math.round(tail.y / size) * size; //right
	}
	if (direction == 'down'){
		newhead.y = tail.y + size, newhead.x = Math.round(tail.x / size) * size; // down
	}
	if (direction == 'left'){
		newhead.x = tail.x - size, newhead.y = Math.round(tail.y / size) * size; // left
	}
	if (direction == 'up'){
		newhead.y = tail.y - size, newhead.x = Math.round(tail.x / size) * size; // up
	} 
	sBody.push(newhead); //Добавляем хвост после головы с новыми координатами
	sBody.splice(0,1); //Удаляем хвост
	//Отрисовываем каждый элемент змейки
	sBody.forEach(function(pob, i){
		if (direction == 'right' && pob.x > (Math.round(gP.width / size) - 1) * size){
			pob.x = 0;
		}
		if (direction == 'down' && pob.y > (Math.round(gP.height / size) - 1) * size){
			pob.y = 0;
		}
		if (direction == 'left' && pob.x < 0){
			pob.x = (Math.round(gP.width / size) - 1) * size;
		}
		if (direction == 'up' && pob.y < 0){
			pob.y = (Math.round(gP.height / size) - 1) * size; 
		} 
		if (pob.x == a[0] && pob.y == a[1]) newApple(), sBody.unshift({x: newhead.x - size, y:tail.y})
		g.fillRect(pob.x, pob.y, size, size);		
		// size - это ширина и высота нашего "квадрата"
	});
}, 1000/20);

onkeydown = function (e) {
		var k = e.keyCode;
		if ([38,39,40,37].indexOf(k) >= 0) 
			e.preventDefault();
		if (k == 39 && direction != 3 && sBody[sBody.length - 2].x+size != sBody[sBody.length - 1].x && sBody[sBody.length - 2].y != sBody[sBody.length - 1].y) direction = 'right'; 
		if (k == 40 && direction != 4 && sBody[sBody.length - 2].x != sBody[sBody.length - 1].x && sBody[sBody.length - 2].y-size != sBody[sBody.length - 1].y) direction = 'down'; 
		if (k == 37 && direction != 1 && sBody[sBody.length - 2].x-size != sBody[sBody.length - 1].x && sBody[sBody.length - 2].y != sBody[sBody.length - 1].y) direction = 'left'; 
		if (k == 38 && direction != 2 && sBody[sBody.length - 2].x != sBody[sBody.length - 1].x && sBody[sBody.length - 2].y+size != sBody[sBody.length - 1].y) direction = 'up'; 
	};
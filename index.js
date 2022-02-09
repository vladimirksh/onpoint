//слайдер
const conteiner = document.querySelector('.slider-container');//окно просмотра слайдов
const track = document.querySelector('.slider-track');//линейка со слайдов
const items = document.querySelectorAll('.slider-item');

const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const end = document.querySelector('.end');
const start = document.querySelector('.start');


let position = 0; //это значение будем переопределять когда будем скролить
const slidesToShow = 1; //показываем желаемое кол-во элементов
const slidesToScroll = 1;//кол-во эдементов которые будем скролить

const itemWidth = conteiner.offsetWidth / slidesToShow; //просчитываем размеры для каждого айтема в треке
const itemsCount = items.length;//получаем кол-во наших элементов

const movePosition = slidesToScroll * itemWidth;//переменная для скрола трека

//функция изменения позиции
function setPosition () {
    track.style.transform = `translateX(${position}px)`
};
//функция проверки кнопок
function checkBtn () {
    start.disabled = position === 0;
    prev.disabled = position === 0;
    next.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
    end.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
}

//задаем ширину для каждого айтема 
items.forEach((item) => {
    item.style.minWidth = `${itemWidth}px`;
});

//нажатие на кнопки
start.addEventListener('click', () => {
  const itemsLeft = Math.abs(position) / itemWidth;
  const moveTostart = itemsLeft * itemWidth;

  position += itemsLeft >= slidesToScroll ? moveTostart : itemsLeft * itemWidth;
  setPosition();
  checkBtn();
});

prev.addEventListener('click', () => {
    const itemsLeft = Math.abs(position) / itemWidth;
    position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
    setPosition();
    checkBtn();
});

next.addEventListener('click', () => {
    const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
    position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
    setPosition();
    checkBtn();
});

end.addEventListener('click', () => {
  const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
  const moveToEnd = itemsLeft * itemWidth;

  position -= itemsLeft >= slidesToScroll ? moveToEnd : itemsLeft * itemWidth;
  setPosition();
  checkBtn();
})

checkBtn();
//слайдер

//свайп

conteiner.addEventListener("touchstart", handleTouchStart);
conteiner.addEventListener("touchmove", handleTouchMove);

    const result = document.getElementById('result')

    // Здесь будем хранить координаты прикосновения
    const touchCoords = {
      x: 0,
      y: 0
    };

    function handleTouchStart(event) {
      const firstTouch = event.touches[0];
      // Сохраняем начальные координаты когда прикоснулись
      touchCoords.x = firstTouch.clientX;
      touchCoords.y = firstTouch.clientY;
    }

    const DETECT_TRESHHOLD = 100;

    function handleTouchMove(event) {
      if (!touchCoords.x || !touchCoords.y) {
        return;
      }

      const { x, y } = touchCoords;

      // Сохраняем текущие координаты
      const xUp = event.touches[0].clientX;
      const yUp = event.touches[0].clientY;

      // Вычисляем разницу
      const xDiff = x - xUp;
      const yDiff = y - yUp;

      // Определяем в какую сторону было больше движения
      const isHorizontal = Math.abs(xDiff) > Math.abs(yDiff);

      if (isHorizontal) {
        // Реагируем только если движение было существенным
        if (Math.abs(xDiff) > DETECT_TRESHHOLD) {
          if (xDiff > 0) {
            const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
            position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
            setPosition();
            checkBtn();

          } else {
            const itemsLeft = Math.abs(position) / itemWidth;
            position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
            setPosition();
            checkBtn();
          }
        }
      } 
    }
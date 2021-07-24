function timer(endDiscountDate) {

      function getTimeRemaining(DiscountDate) {
          const tDisc = Date.parse(DiscountDate);
          const tNow = new Date().getTime();
          let tDelta = tDisc - tNow; //в м/с
          let days, hours, minutes, seconds;
          if (tDelta >= 0) {
              days = Math.floor(tDelta / (1000 * 60 * 60 * 24));
              hours = Math.floor((tDelta / (1000 * 60 * 60)) % 24);
              minutes = Math.floor((tDelta / 1000 / 60) % 60);
              seconds = Math.floor((tDelta / 1000) % 60);
          } else {
              tDelta = 0;
              days = 0;
              hours = 0;
              minutes = 0;
              seconds = 0;
          }
  
          return {
              'total': tDisc,
              'days': days,
              'hours': hours,
              'minutes': minutes,
              'seconds': seconds
          };
      }
  
      function getZero(num) {
          if (num >= 0 && num < 10) {
              return `0${num}`;
          } else {
              return num;
          }
      }
  
      function setClock() {
          const days = document.querySelector('#days');
          const hours = document.querySelector('#hours');
          const minutes = document.querySelector('#minutes');
          const seconds = document.querySelector('#seconds');
          const timeInterval = setInterval(updateClock, 1000);
  
          updateClock();
  
          function updateClock() {
  
              const t = getTimeRemaining(endDiscountDate);
              days.textContent = getZero(t.days);
              hours.textContent = getZero(t.hours);
              minutes.textContent = getZero(t.minutes);
              seconds.textContent = getZero(t.seconds);
  
              if (t.total <= 0) {
                  clearInterval(timeInterval);
              }
          }
      }
      setClock();
}

export default timer;
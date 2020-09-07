function timer(id, deadline) {

    // ==================== Discount timer ========================
    // ============================================================

    function addZerro(num) {
        return (num <= 9) ? ('0' + num) : num;
    }

    function countTime(endTime) {
        const total = Date.parse(endTime) - Date.parse(new Date()),
              days = addZerro(Math.floor(total / (1000 * 60 * 60 * 24))),
              hours = addZerro(Math.floor(total / (1000 * 60 * 60) % 24)),
              minutes = addZerro(Math.floor(total / (1000 * 60) % 60)),
              seconds = addZerro(Math.floor(total / 1000 % 60));
               
        return {
            'total': total,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function setTimer(endTime, parent) {
        const days = document.querySelector('#days'),
              hours = document.querySelector('#hours'),
              minutes = document.querySelector('#minutes'),
              seconds = document.querySelector('#seconds'),
              timeInterval = setInterval(updateTimer, 1000);
        
        updateTimer();

        function updateTimer() {
            const total = countTime(endTime);

            days.innerHTML = total.days;
            hours.innerHTML = total.hours;
            minutes.innerHTML = total.minutes;
            seconds.innerHTML = total.seconds;

            if (total.total <= 0) {
                clearInterval(total);
            }
        }
    }

    setTimer(deadline, id);

}

export default timer;
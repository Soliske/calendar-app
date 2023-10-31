const localSettings = {};

dayjs.locale(localSettings);

// main function, everything goes inside this function //
$(function () {
  // retrieves current hour of the day from dayjs library. //
  const currentHour = dayjs().format('H');

// changes the color of each time block based on whether it's in the "past, present, or future" vs the current hour //
  function hourlyColor() {
    $('.time-block').each(function() {
      const blockHour = parseInt(this.id);
      $(this).toggleClass('past', blockHour < currentHour);
      $(this).toggleClass('present', blockHour === currentHour);
      $(this).toggleClass('future', blockHour > currentHour);
    });
  }
// this will save the user's input in a textarea to localStorage - only when the corresponding save btn has been clicked //
  function textEntry() {
    $('.saveBtn').on('click', function() {
      const key = $(this).parent().attr('id');
      const value = $(this).siblings('.description').val();
      localStorage.setItem(key, value);
    });
  }
 // this will change the color of each time block relative to the current time //
  function refreshColor() {
    $('.time-block').each(function() {
      const blockHour = parseInt(this.id);
      if (blockHour == currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else if (blockHour < currentHour) {
        $(this).removeClass('future present').addClass('past');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }
  // this will 'getItem' the user input from the localStorage and 'setItem' textarea values for each time block.
  $('.time-block').each(function() {
    const key = $(this).attr('id');
    const value = localStorage.getItem(key);
    $(this).children('.description').val(value);
  });

  // this is the time being refreshed every second //
  function updateTime() {
    const dateElement = $('#date');
    const timeElement = $('#time');
    const currentDate = dayjs().format('dddd, MMMM D, YYYY');
    const currentTime = dayjs().format('hh:mm:ss A');
    dateElement.text(currentDate);
    timeElement.text(currentTime);
  }
  // now we call main functions onto the page //
  hourlyColor();
  textEntry();                
  refreshColor();
  
// updates page every 1000 ms //
  setInterval(updateTime, 1000);
});

export function clickOnDay(day) {
    const calendar = document.querySelector('.item-form[data-id="open-calendar"]');
    // все активные дни
    const allDays = [...calendar.querySelectorAll('.enabled')];
    // все выбранные дни
    const allChoosedDays = [...calendar.querySelectorAll('.enabled[data-choosed="true"]')];
    // индекс дня
    let index = allDays.indexOf(day);
    // индекс первого выбранного дня
    const firstChoosedDay = allDays.indexOf(allChoosedDays[0]);

    // минимум из индекса выбранного дня и первого выбронного дня
    const minDay = Math.min(index, firstChoosedDay);
    // максимум из индекса выбранного дня и первого выбронного дня
    const maxDay = Math.max(index, firstChoosedDay);

    // если не выбран выбираем 
    if (day.dataset.choosed != 'true') {
        day.dataset.choosed = 'true';

        /* если уже есть выбранный день при следущем клике на не выбранный день
        создаем диапазон выбранных дней от первого выбранного дня до 
        последнего (вне зависимости от напавления (т.е. увивание визрастание)) */
        if (allChoosedDays.length) {
            let i = minDay;
            while (i >= minDay && i <= maxDay) {
                allDays[i].dataset.choosed = 'true';
                i++;
            }
        }
    }

    // если уже есть выбранные дни
    else {

        // индекс выбранного деня 
        const activeIndex = allChoosedDays.indexOf(day);
        if (allChoosedDays.length) {

            // работает только в большую сторону
            /*  перебираем значения от индекса текущего деня до всей длины диапазона
                убираем все выбранные дни из диапазона
                если длина диапазона больше 1 текущий день оставляем выбранным
            */
            for (let i = activeIndex; i < allChoosedDays.length; i++) {
                allChoosedDays[i].dataset.choosed = 'false';
                if (allChoosedDays.length > 1) {
                    allChoosedDays[activeIndex].dataset.choosed = 'true';
                }
            }
        }
    }
}
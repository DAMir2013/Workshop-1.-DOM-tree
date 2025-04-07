
// Задание 3.
// 1. Вы создаете веб-страницу для отображения списка статей. Каждая статья состоит из заголовка и
// текста. 
// 2. элементы:
// a. Заголовок статьи (<h2>)
// b. Текст статьи (<p>)
// c. Кнопки "Добавить статью", "Удалить" и "Редактировать".
// 3. Создайте начальный список статей, который будет загружаться при загрузке страницы. Используйте
// JSON-данные для определения заголовков и текстов статей.
// 4. Позвольте пользователю добавлять новые статьи. При нажатии на кнопку "Добавить статью" должна
// появиться новая статья с заголовком "Новая статья" и текстом "Введите содержание статьи...".
// 5. Реализуйте функциональность удаления статей. При нажатии на кнопку "Удалить" соответствующая
// статья должна быть удалена из списка.
// 6. Реализуйте функциональность редактирования статей. При нажатии на кнопку "Редактировать"
// пользователь должен иметь возможность изменить заголовок и текст статьи. Используйте
// всплывающее окно или prompt для ввода новых данных.
// 7. Все изменения (добавление, удаление, редактирование) должны быть сохранены в локальное
// хранилище браузера, чтобы они сохранялись после перезагрузки страницы.
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// Можно раскоментировать чтобы сохранить изначальный список статей с 22 по 40 строку и после сохранения в localStorage массива статей, обратно закоменировать и работать с localStorage.
// const articlesData = [
//     {
//         title: 'Заголовок статьи 1',
//         content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error aut deleniti voluptates aliquam magni in, animi delectus minima esse aliquid repellat atque numquam. Eum, corrupti.'
//     },
//     {
//         title: 'Заголовок статьи 2',
//         content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error aut deleniti voluptates aliquam magni in, animi delectus minima esse aliquid repellat atque numquam. Eum, corrupti.'
//     },
//     {
//         title: 'Заголовок статьи 3',
//         content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error aut deleniti voluptates aliquam magni in, animi delectus minima esse aliquid repellat atque numquam. Eum, corrupti.'
//     }
// ];

// localStorage.setItem('articlesData', JSON.stringify(articlesData));


// localStorage.getItem('articlesData')
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&7





//получаю кнопку добавить статью
const addArticle = document.querySelector('.addArticle');

// получаю массив статей 
function updateData() {
    const data = JSON.parse(localStorage.getItem('articlesData'));
    return data;
}
// получаю элемент div  в котором будут показываться статьи
const containerArticles = document.querySelector('.container-articles');

// функция обновления нужна чтобы показывать актуальные статьи(либо изначально либо после определенных изменений-редактированияб удаления или добавления) 
function updateContent() {
    //Получаю в перерменную актуальный массив объектов 
    const data = updateData();
    // Пробегаю по массиву, полученному из LocalStorage
    data.forEach((item, index) => {
        //Для каждой статьи создаю свой div
        const divItem = document.createElement('div');
        // Присваиваю класс в котором будет храниться индекс статьи
        divItem.classList.add(`number${index}`);
        //Создаю заголовок статьи
        const titleH2 = document.createElement('h2');
        titleH2.innerHTML = `${item.title}`;
        //создаю саму статью
        const contentParagraph = document.createElement('p');
        contentParagraph.textContent = `${item.content}`;
        // создаю кнопки 'Удалить' и 'Редактировать'
        const buttonDelete = document.createElement('button');
        buttonDelete.classList.add('deleteBtn');
        buttonDelete.textContent = 'Удалить';
        const buttonChange = document.createElement('button');
        buttonChange.classList.add('changeBtn');
        buttonChange.textContent = 'Редактировать';

        // добавляю созданные элементы на страницу
        containerArticles.appendChild(divItem);
        divItem.appendChild(titleH2);
        divItem.appendChild(contentParagraph);
        divItem.appendChild(buttonChange);
        divItem.appendChild(buttonDelete);


        // вешаю обработчики событий на все созданные кнопки, чтобы для каждой не делать id или класс и потом по отдельности не искать и не устанавливать 
        buttonDelete.addEventListener('click', (e) => {
            // получаю класс родителя кнопки на котрой произошло событиеб из него извлекаю часть в которой храниться номер позиции в массиве data, привожу его к числу
            const positionDeleteElem = Number(e.target.closest('div').classList.value.slice(6));
            // по номеру позиции удаляю этот элемент из массива
            data.splice(positionDeleteElem, 1);
            // новый массив без удаленного элемента по ключу сохраняю в localStorage
            localStorage.setItem('articlesData', JSON.stringify(data));
            // обнуляю выводимый на страницу контент 
            containerArticles.innerHTML = '';
            // обновляю контент на странице
            updateContent();
        })

        buttonChange.addEventListener('click', (e) => {
            // получаю класс родителя кнопки на котрой произошло событиеб из него извлекаю часть в которой храниться номер позиции в массиве data, привожу его к числу
            const positionDeleteElem = Number(e.target.closest('div').classList.value.slice(6));
            // получаю и сохраняю новый заголовок для статьи
            const titleNewValue = prompt("Введите  заголовок для новой статьи");
            // получаю и сохраняю новый текст статьи
            const articleNewValue = prompt("Введите  содержание новой статьи");

            //сохраняю эти значения в массиве 
            data[positionDeleteElem].title = titleNewValue;
            data[positionDeleteElem].content = articleNewValue;
            // обновляю значение в localStorage
            localStorage.setItem('articlesData', JSON.stringify(data));
            // обнуляю выводимый на страницу контент 
            containerArticles.innerHTML = '';
            // обновляю контент на странице
            updateContent();
        })
    })
}
// изначально вывожу статьи которые хранятся в localStorage
updateContent();

addArticle.addEventListener('click', () => {
    const data = updateData();
    // создаю новый элемент массива - объект и сохраняю в массиве
    data.push({
        title: "Новая статья",
        content: "Введите содержание статьи"
    });
    // обнуляю выводимый на страницу контент
    containerArticles.innerHTML = '';

    // обновляю значение в localStorage
    localStorage.setItem('articlesData', JSON.stringify(data));
    // обновляю контент на странице
    updateContent();
})












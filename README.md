# Collect contents

Assemble the contents of the text from the headings h1-h6

***

Скрипт собирает все заголовки h1-h6 текста и добавляет их содержимое в оглавление **для создания якорей**. Для самих тегов h1-h6 добавляется атрибут id. Название id состоит из первых двух слов заголовка и порядковой цифры.

Для пользования надо скачать файлы и открыть "main.html" в браузере.
Введите текст с уже расставленными тегами в окно ввода слева. В правом поле появится текст с собранным оглавлением.

***

Советы:

➢ В готовом оглавлении проверьте в тегах ```html <a href="#"> ``` наличие запятых и иных недопустимых символов. Если они есть, то для корректной работы якорей их надо удалить вручную.

➢ Если вы расставляете неразрывные пробелы (```html &nbsp; ```) в тексте, то рекомендуется сначала собрать оглавление во избежание появления лишних символов.

***

* В текущей версии в оглавлении заголовки не вкладываются друг в друга.
** Первая строка ```html <p><strong>Оглавление:</strong></p> ``` автоматом всегда появляется в результате.

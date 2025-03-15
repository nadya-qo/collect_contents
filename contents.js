document.addEventListener('DOMContentLoaded', function () {
    const inputWindow = document.querySelector('.input__window');
    const eductionWindow = document.querySelector('.eduction__window');
    const checkP = document.getElementById('check-title');

    if (!inputWindow || !eductionWindow || !checkP) {
        console.error("Один из элементов не найден в DOM");
        return;
    }

    inputWindow.addEventListener('input', function () {
        generateTableOfContents(inputWindow.value);
    });

    checkP.addEventListener('change', function () { 
        generateTableOfContents(inputWindow.value);
    });

    function generateTableOfContents(text) {
        const headings = text.match(/<h[1-6][^>]*>.*?<\/h[1-6]>/gi) || [];
        const tableOfContents = document.createElement('ul');

        headings.forEach(function (heading, index) {
            const normalizedHeading = heading.replace(/&nbsp;/g, ' ');
            const id = generateId(normalizedHeading, index);
            const listItem = document.createElement('li');
            const link = document.createElement('a');

            link.textContent = normalizedHeading.replace(/<\/?[^>]+(>|$)/g, '');
            link.href = `#${id}`;
            listItem.appendChild(link);

            // добавляется li с новой строки
            tableOfContents.innerHTML += `\n<li>${link.outerHTML}</li>\n`;

            // добавляется id
            text = text.replace(heading, `<h${heading.charAt(2)} id="${id}">${normalizedHeading.replace(/<\/?[^>]+(>|$)/g, '')}</h${heading.charAt(2)}>`); 
        });

        // Проверка - включен ли чекбокс для параграфа "Оглавление"
        const pContents = checkP.checked ? '<p><strong>Оглавление:</strong></p>\n\n' : '';

        eductionWindow.value = pContents + tableOfContents.outerHTML + '\n\n' + text;
    }

    function generateId(heading, index) {
        const words = heading.replace(/<\/?[^>]+(>|$)/g, '').split(' ').slice(0, 2);
        const transliteratedWords = words.map(word => transliterate(word));
        return `${transliteratedWords.join('_').toLowerCase()}_${index + 1}`;
    }

    function transliterate(word) {
        const translitMap = {
            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
            'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
            'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts',
            'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu',
            'я': 'ya', 'А': 'a', 'Б': 'b', 'В': 'v', 'Г': 'g', 'Д': 'd', 'Е': 'e', 'Ё': 'yo',
            'Ж': 'zh', 'З': 'z', 'И': 'i', 'Й': 'y', 'К': 'k', 'Л': 'l', 'М': 'm', 'Н': 'n',
            'О': 'o', 'П': 'p', 'Р': 'r', 'С': 's', 'Т': 't', 'У': 'u', 'Ф': 'f', 'Х': 'kh',
            'Ц': 'ts', 'Ч': 'ch', 'Ш': 'sh', 'Щ': 'shch', 'Ъ': '', 'Ы': 'y', 'Ь': '', 'Э': 'e',
            'Ю': 'yu', 'Я': 'ya', 'ь': 'b', '.': '_', ':': '_', '?': '_', 'ъ': '_', '[': '_',
            ']': '_', '»':'_', '«': '_', '/': '_'
        };
        return word.split('').map(char => translitMap[char] || char).join('');
    }
});

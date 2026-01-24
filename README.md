# Project "Drones - e-shop with drones and thermal imagers - Frontend" | Проєкт "Drones - онлайн магазин з дронами та тепловізорами - Frontend." 

## Навігація | Navigation on README:
- [Структура | Structure of the project](#структура--structure-of-the-project)
- [Стиль написання коду | Code writing style](#стиль-написання-коду--code-writing-style)
- [Деталі роботи у команді | Details of teamwork](#деталі-роботи-у-команді--details-of-teamwork)
- [Опис сторінок | Pages description](#опис-сторінок--pages-description)
- [Як встановити та запустити проєкт? | How to install and run the project?](#як-встановити-та-запустити-проєкт--how-to-install-and-run-the-project)
- [Висновок | Conclusion](#висновок--conclusion)

## Структура | Structure of the project

* ![](images_for_readme/figma.svg) [Фігджем структура проєкту](https://www.figma.com/board/guK0cWERy3vRj89YMRhd3C/Drones--Frontend---Structure-of-the-project?node-id=0-1&p=f&t=cty2A4mgxxkPm1xP-0)

___


* ![](images_for_readme/figma.svg) [FigJam structure of the project](https://www.figma.com/board/guK0cWERy3vRj89YMRhd3C/Drones--Frontend---Structure-of-the-project?node-id=0-1&p=f&t=cty2A4mgxxkPm1xP-0)

___

## Стиль написання коду | Code writing style

1. Код розподіляється за логічними шарами:

![Entry points](https://img.shields.io/badge/Entry-points-informational) ![assets](https://img.shields.io/badge/assets-brightgreen) ![components](https://img.shields.io/badge/components-yellow)  ![pages](https://img.shields.io/badge/HTML-teal) ![shared](https://img.shields.io/badge/shared-ff69b4) 


- **Entry points** — файли, з яких починається виконання застосунку.
- **assets** — статичні ресурси (зображення, іконки, шрифти, звуки тощо).
- **components** — UI-компоненти, що використовуються для побудови сторінок.
- **pages** — сторінки застосунку.
- **shared** — перевикористовувані ресурси (UI-компоненти, хуки, типи).


1. Найменування файлів
- Імена файлів формуються **через крапку**, відповідно до їх призначення:
  - `component.tsx`
  - `page.tsx`
  - `layout.tsx`
  - `styles.module.css`

1. Стилізація
- Для стилів використовується **CSS**.
- Назви класів мають бути зрозумілими.
- Класи застосовуються через обʼєкт `styles`:

```sh
    <div className = {styles['logo-container']}></div>
```

4. Для відступів використовується один Tab (4 пробіли).


## Деталі роботи у команді | Details of teamwork

__Відсутні.__

___

## Опис сторінок | Pages description


<details>
    <summary><strong>Головна сторінка | Main Page</strong></summary>

____

Головна сторінка проєкту. На сторінці представлені нові та популярні товари магазину, за допомогою яких користувач може швидко та зручно дізнатися про вміст.

____

The project's home page. The page presents new and popular store products, allowing the user to quickly and conveniently learn about the content.


</details>

___

<details>
    <summary><strong>Сторінка Каталогу | Catalog Page</strong></summary>

</details>

___

<details>
    <summary><strong>Сторінка контактів магазину | Shop Contacts Page</strong></summary>

</details>

___

<details>
    <summary><strong>Сторінка "Про нас" | About Us Page</strong></summary>

___

- Сторінка описує команду магазину. | The page describes the store's team.
___

```sh
    Ми — команда фахівців, що з 2022 року постачає дрони й тепловізори для професійного, цивільного та волонтерського використання. Працюємо з перевіреною технікою, консультуємо з власного досвіду та підтримуємо клієнтів на кожному етапі — від вибору до застосування.
```

</details>

___

<details>
    <summary><strong>Сторінка товару | Product Page</strong></summary>

</details>

___

<details>
    <summary><strong>Сторінка замовлення | Order Page</strong></summary>

</details>

___

<details>
    <summary><strong>Сторінка Кабінету | Account Page</strong></summary>
</details>

___

<details>
    <summary><strong>Сторінка Not Found | Not Found Page</strong></summary>
    
___

Сторінку не знайдено. Можливо, вона була видалена, переміщена або ви перейшли за неправильним посиланням. Перевірте адресу або поверніться на головну сторінку, щоб продовжити роботу з сайтом

___

Page not found. Possibly, it was removed, moved, or you went for the wrong order. Flip the address or turn to the main page to continue using the site

</details>

___

<details>
    <summary><strong>Сторінка реєстрації | Registration Page</strong></summary>
</details>

___

<details>
    <summary><strong>Сторінка аутентифікації | Login Page</strong></summary>
</details>

___


## Як встановити та запустити проєкт? | How to install and run the project?

<details>
  <summary><strong>

  ![](images_for_readme/windows.svg)
  ![](images_for_readme/macos.svg) For any OS</strong></summary>


1. Перед початком переконайтесь, що на вашому компʼютері встановлено:

- **Node.js** (рекомендовано LTS-версію)
  - Перевірка:
    ```bash
    node -v
    ```
- **Git**
  - Перевірка:
    ```bash
    git --version
    ```
  
2. Склонуйте [репозиторій](https://github.com/JuliaOvcharenko/DronesFront) з GitHub. 
  | Clone the [repository](https://github.com/JuliaOvcharenko/DronesFront) from GitHub:

    ```sh
    git clone https://github.com/JuliaOvcharenko/DronesFront
    ```

2. Перейдіть в папку проєкту | Go to the project folder:.
  
    ```sh
    cd DronesFront
    ```

2. Встановіть залежності. | Install dependencies.
   
    ```sh
    npm i
    ```

3. Запуск проєкту | Start the project:
    ```sh
      npm start
    ```
  
4. Вітаємо! Ви локально запустили проєкт!
    ___
    Done!
    You have successfully run the project locally.

</details>

___

## Висновок | Conclusion





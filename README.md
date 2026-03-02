# Project "Drones - e-shop with drones and thermal imagers - Frontend" | Проєкт "Drones - онлайн магазин з дронами та тепловізорами - Frontend." 

![React](https://img.shields.io/badge/React-turquoise) ![NodeJs](https://img.shields.io/badge/Node_js-brightgreen) ![SPA](https://img.shields.io/badge/SPA-yellow)  ![Frontend](https://img.shields.io/badge/Frontend-orange) ![architecture_fed](https://img.shields.io/badge/architecture_fed-purple)

_____


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

    ![Entry points](https://img.shields.io/badge/Entrypoints-informational) ![assets](https://img.shields.io/badge/assets-brightgreen) ![components](https://img.shields.io/badge/components-yellow)  ![pages](https://img.shields.io/badge/HTML-teal) ![shared](https://img.shields.io/badge/shared-ff69b4) 


- **Entry points** — файли, з яких починається виконання застосунку.
- **assets** — статичні ресурси (зображення, іконки, шрифти, звуки тощо).
- **components** — UI-компоненти, що використовуються для побудови сторінок.
- **pages** — сторінки застосунку.
- **shared** — перевикористовувані ресурси (UI-компоненти, хуки, типи).


2. Найменування файлів
- Імена файлів формуються **через крапку**, відповідно до їх призначення:
  - `component.tsx`
  - `page.tsx`
  - `layout.tsx`
  - `styles.module.css`

3. Стилізація
- Для стилів використовується **CSS**.
- Назви класів мають бути зрозумілими.
- Класи застосовуються через обʼєкт `styles`:

```sh
    <div className = {styles['logo-container']}></div>
```

4. Для відступів використовується один Tab (4 пробіли).


## Деталі роботи у команді | Details of teamwork


Проєкт виконувався у складі команди з двох осіб. Співпраця була побудована на взаємодопомозі та спільному пошуку рішень.

Ключові аспекти роботи:

1. Розподіл задач відбувався природньо, відповідно до поточних потреб проєкту та взаємних домовленостей.

2. Ми спільно обговорювали архітектуру, планували реалізацію та узгоджували підходи до написання коду, щоб уникнути конфліктів та забезпечити цілісність проєкту.

___

Незважаючи на складні умови та обмежений час, обидва учасники активно працювали над кодом, вели проєкт від початку до кінця. Завдяки спільним зусиллям, комунікації та взаємодопомозі вдалося успішно закрити дедлайн та отримати робочий результат.

___

Ключові навички, застосовані в командній роботі:

1. Планування та декомпозиція задач.

2. Контроль версій (Git) та вирішення конфліктів.

3. Взаємодія в парі (pair programming elements).

4. Дотримання дедлайнів.

___

The project was carried out as part of a two-person team. Our collaboration was built on mutual assistance and joint problem-solving.

Key aspects of the work:

1.  Task distribution occurred naturally, according to the project's current needs and our mutual agreements.
2.  We jointly discussed the architecture, planned the implementation, and agreed on coding approaches to avoid conflicts and ensure the project's integrity.

___

Despite challenging conditions and limited time, both team members actively worked on the code, steering the project from start to finish. Thanks to our joint efforts, communication, and mutual support, we successfully met the deadline and achieved a working result.

___

Key skills applied in the teamwork:

1.  Planning and task decomposition.
2.  Version control (Git) and conflict resolution.
3.  Pair interaction (pair programming elements).
4.  Meeting deadlines.

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
    <summary><strong>Сторінка Каталогу товарів. | Catalog Page</strong></summary>

___

Сторінка каталогу товарів.
Тут користувач може переглянути список доступних товарів і їхні ціни. За бажанням він може додати товар до кошика або натиснути на картку та перейти на сторінку товару.

___

Here the user can see the list of available products and their prices. If they want, they can add a product to the cart or click on the card to go to the product page.


</details>

___

<details>
    <summary><strong>Сторінка контактів магазину | Shop Contacts Page</strong></summary>

___

На цій сторінці користувач може переглянути контактні дані магазину та, за бажанням, надіслати листа на електронну пошту.

___

On this page, the user can see the store’s contact information and, if they want, send an email message.


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

На цій сторінці представлена повна характеристика конкретного товару. Користувач можете додати продукт до кошика.

___

On this page, the full description of a specific product is presented. The user can add the product to the cart.


</details>

___

<details>
    <summary><strong>Сторінка замовлення | Order Page</strong></summary>

___

На цій сторінці користувач оформлює замовлення через кошик. Є можливість вибору різних видів доставки і оплати.

___

On this page, the user places an order through the cart. There is an option to choose different delivery and payment methods.

</details>

___

<details>
    <summary><strong>Сторінка Кабінету | Account Page</strong></summary>

___

Сторінка кабінету користувача. Тут у користувача є можливість переглянути на редагувати власні дані, змінювати кастомні адреса та переглядати замовлення. 

____

Here the user can view and edit their personal information, change saved addresses, and see their orders.

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

___

Тут користувач може зареєструватися, вказавши ім’я, електронну пошту та пароль.

____

Here the user can register by entering their name, email, and password.

</details>

___

<details>
    <summary><strong>Сторінка аутентифікації | Login Page</strong></summary>

___

Тут користувач може увійти до свого акаунта або скинути пароль через електронну пошту, на яку зареєстрований обліковий запис.

___

Here the user can log in to their account or reset the password via the email that was used for registration.


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

Робота над цим проєктом стала першим досвідом створення односторінкового застосунку (SPA) з використанням бібліотеки React. Обидва учасники команди успішно опанували ключові концепції React, такі як компонентний підхід, маршрутизація, робота з хуками та управління станом на стороні клієнта.

Незважаючи на стислі терміни та виклики, пов'язані з першим знайомством з технологією, нам вдалося розробити повністю функціональний застосунок з чіткою структурою та зрозумілим інтерфейсом. Спільне проєктування архітектури, розподіл задач та постійна комунікація дозволили уникнути типових помилок новачків, таких як конфлікти в коді або порушення цілісності проєкту.

Особливу увагу було приділено організації коду: логічне розділення на шари (компоненти, сторінки, ресурси), зрозуміла система іменування файлів, використання модульних стилів. Це заклало основу для підтримуваності та масштабованості проєкту в майбутньому.

Ключовим результатом стало не лише створення робочого продукту, а й здобуття практичних навичок командної роботи в умовах реального проєкту. Ми навчилися домовлятися про єдині стандарти коду, ефективно використовувати Git для спільної роботи, вирішувати конфлікти та допомагати одне одному знаходити оптимальні рішення. Цей досвід став міцним фундаментом для подальшого професійного розвитку кожного з учасників.

____


Working on this project was our first experience developing a single-page application (SPA) using the React library. Both team members successfully mastered key React concepts, such as the component-based approach, routing, working with hooks, and client-side state management.

Despite the tight deadlines and the challenges associated with first getting acquainted with the technology, we managed to develop a fully functional application with a clear structure and an understandable interface. Collaborative architecture design, task distribution, and constant communication allowed us to avoid common beginner mistakes, such as code conflicts or compromising the project's integrity.

Special attention was paid to code organization: logical separation into layers (components, pages, assets), a clear file naming system, and the use of modular styles. This laid the foundation for the project's maintainability and scalability in the future.

The key outcome was not only the creation of a working product but also gaining practical teamwork skills in a real project environment. We learned to agree on unified coding standards, use Git effectively for collaboration, resolve conflicts, and help each other find optimal solutions. This experience has become a solid foundation for the future professional development of each team member.
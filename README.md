ТЗ:

Сделать next проект с двумя страницами.
Список элементов и карточка элемента по id.

1. Список элементов с фильтрацией и постраничным разбиением.
   Возможные фильтры можно забрать из апи https://test.taxivoshod.ru/api/test/?w=catalog-filter
   Там описаны 3 выпадающий списка с маркой, моделью и тарифом. В каждом списке одновременно могут быть выбраны несколько элементов

Список моделей сгруппирован по марке. При выборе марки список моделей сокращается, в нем остаются только модели выбранных марок.

2. Сам список запрашивается в апи https://test.taxivoshod.ru/api/test/?w=catalog-cars
   В списке элементов нужно выводить все поля, которые есть в апи. Картинку, бренд, модель, регистрационный номер, цену и тариф.

При фильтрации к урлу апи добавляются выбранные параметры в виде массива
https://test.taxivoshod.ru/api/test/?w=catalog-cars&brand[]=BMW&brand[]=Chery
Страница выбирается параметром page
https://test.taxivoshod.ru/api/test/?w=catalog-cars&brand[]=BMW&brand[]=Chery&page=2

3. При клике на элемент попадаем в карточку
   https://test.taxivoshod.ru/api/test/?w=catalog-car&id=1524
   Поля там те же, что и в списке, но картинки это массив. Нужно сделать любой стандартный слайдер картинок.

Сделать кнопку "назад", возвращающую в список в том же состоянии, в котором он был, т.е. с сохранением фильтров и страницы

Стек технологий - любой. Дизайн любой, что то простое и аккуратное. Можно использовать bootstrap.

Использовать TS

К результату нужно указать сколько времени ушло на задачу, и с какими сложностями пришлось столкнутся, кратко.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

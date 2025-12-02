"use client";

import Head from "next/head";
import Link from "next/link";

import Container from "@/components/Container";

export default function MenuPage() {
  return (
    <>
      <Head>
        <title>Меню ресторану «В.О.Л.Я.»</title>
        <meta
          content="Ознайомтеся з меню нашого ресторану — широкий вибір страв для справжніх гурманів."
          name="description"
        />
      </Head>

      <div className="relative h-[400px] w-full bg-[url(https://ukrainski-stravy.com.ua/wp-content/uploads/2019/04/%D1%8C%D1%83%D1%82%D0%B3.png)] bg-cover overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="mb-4 text-5xl font-bold">Меню ресторану</h1>
            <p className="text-xl">
              Відкрийте для себе вишукані смаки нашої кухні
            </p>
          </div>
        </div>
      </div>

      <Container className="py-12">
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">Наше меню</h2>
            <p className="text-base leading-relaxed text-gray-700">
              Ми пишаємось нашою авторською кухнею, яка поєднує традиційні
              українські страви з сучасними кулінарними тенденціями. Всі страви
              готуються з найсвіжіших місцевих продуктів.
            </p>
          </div>

          {/* Список позиций меню */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Деруни зі сметаною",
                imgLink:
                  "https://vibagliviyhlop.com.ua/wp-content/uploads/2023/02/%D0%94%D0%B5%D1%80%D1%83%D0%BD%D0%B8-%D0%B7-%D1%81%D0%BC%D0%B5%D1%82%D0%B0%D0%BD%D0%BE%D1%8E-1.jpg://images-ext-1.discordapp.net/external/6FCiTd9q3_vEeSPq-AGFqzx-JoyDIA3but6E5vAbtKU/https/today.uahttps://fommi-foods.com/images/stories/virtuemart/product/deruny-smetana.jpg/wp-content/uploads/2020/04/salo-1.jpg?format=webp&width=1280&height=960",
                desc: "ПримТрадиційні деруни з тертої картоплі, обсмажені до золотистої скоринки та подані зі свіжою домашньою сметаною. Ситна страва з вираженим українським смаком, що ідеально підходить для теплого обіду",
                price: "250 грн",
              },
              {
                title: "Бульйон курячий з перепелиними яйцями",
                imgLink: "https://img.postershop.me/11876/Products/3204100_1683110436.3421_original.jpg",
                desc: "Ніжний ароматний бульйон на основі домашньої курки, поданий із м’ясом, овочами та перепелиними яйцями. Легкий, поживний та зігріваючий суп, що смакує у будь-яку пору дня.",
                price: "300 грн",
              },
              {
                title: "Борщ український в домашньому хлібі",
                imgLink: "https://cdn.abo.media/upload/article/yyds5rt93u6vjz5s5vfj.jpg",
                desc: "Класичний український борщ на м’ясному бульйоні, з ароматними овочами та прянощами, поданий у теплому домашньому хлібі замість тарілки. Насичений смак та оригінальна подача створюють справжній гастрономічний досвід.",
                price: "400 грн",
              },
              {
                title: "Десерт “Наполеон Люкс”",
                imgLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMz4V5Du6ufVBn94JuMLBEsyeThBikJbKVSQ&s",
                desc: "Ніжний листковий десерт з делікатним кремом, що тане в роті. Поєднання хрустких шарів та кремової текстури створює вишуканий смак, а легка солодкість робить його ідеальним завершенням трапези.",
                price: "150 грн",
              },
              {
                title: "Десерт “П’яна вишня”",
                imgLink: "https://shuba.life/static/content/thumbs/1824x912/a/35/xweevz---c2x1x50px50p-up--0bcf22b642026d5a3639526f1fef935a.jpg",
                desc: "Ніжний шоколадний десерт з ароматними вишнями, настояними у лікері, що надає вишукану солодко-ягідну нотку з легкою алкогольною пікантністю. Ідеальний баланс смаку для справжніх гурманів.",
                price: "200 грн",
              },
              {
                title: "Млинці з сиром",
                imgLink: "https://easy-food.com.ua/image/cache/catalog/foto-min/blinchik-tvorog-min-800x800.png",
                desc: "Тонкі домашні млинці з ніжною сирною начинкою, злегка підсолодженою та збалансованою за смаком. Подаються теплими, з вершковими нотками та м’якою текстурою.",
                price: "220 грн",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-lg border shadow-md"
              >
                <div className="relative h-64 bg-gray-200">
                  {/* Изображение */}
                  <div
                    className="flex h-full items-center justify-center bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.imgLink})` }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-xl font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="mb-3 text-sm text-gray-600">
                    
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Меню */}
          <div className="rounded-lg bg-gray-50 p-8">
            <h3 className="mb-6 text-center text-2xl font-semibold text-gray-800">
              Наше меню
            </h3>
            <p className="mb-6 text-center text-gray-700">
              Ознайомтеся з повним меню нашого ресторану
            </p>

            {/* Заглушки меню */}
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  title: "Основне меню",
                  icon: "ri-restaurant-line",
                  menuLink:
                    "https://ukrainski-stravy.com.ua/wp-content/uploads/2025/03/soups.pdf",
                },
                {
                  title: "Напої",
                  icon: "ri-goblet-line",
                  menuLink:
                    "https://ukrainski-stravy.com.ua/wp-content/uploads/2025/03/cold-drinks.pdf",
                },
                {
                  title: "Десерти",
                  icon: "ri-cake-3-line",
                  menuLink:
                    "https://ukrainski-stravy.com.ua/wp-content/uploads/2025/03/desserts-ice.pdf",
                },
                {
                  title: "Сніданки",
                  icon: "ri-sun-line",
                  menuLink:
                    "https://ukrainski-stravy.com.ua/wp-content/uploads/2025/03/breakfasts.pdf",
                },
              ].map((category) => (
                <div
                  key={category.title}
                  className="overflow-hidden rounded-lg border bg-white shadow-md"
                >
                  <Link
                    className="flex h-48 items-center justify-center bg-gray-100"
                    href={category.menuLink}
                    target="_blank"
                  >
                    <div className="text-center">
                      <i
                        className={`${category.icon} mb-2 text-6xl text-gray-400`}
                      />
                      <p className="text-lg font-semibold text-gray-600">
                        {category.title}
                      </p>
                    </div>
                  </Link>
                  <div className="p-4">
                    <p className="text-center text-sm text-gray-600">
                      Зателефонуйте для ознайомлення з повним меню
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-lg bg-primary/10 p-6 text-center">
            <h3 className="mb-2 text-2xl font-semibold text-gray-800">
              Бажаєте дізнатися більше?
            </h3>
            <p className="mb-4 text-gray-700">
              Зателефонуйте нам, і ми з радістю розповімо про всі наші страви та
              спеціальні пропозиції
            </p>
            <a
              className="inline-flex items-center gap-2 text-xl font-semibold text-primary hover:underline"
              href="tel:+380661927167"
            >
              <i className="ri-phone-line" />
              +380 (66) 192-71-67
            </a>
          </div>
        </div>
      </Container>
    </>
  );
}

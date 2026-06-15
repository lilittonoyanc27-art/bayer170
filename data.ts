export interface StudyQuestion {
  id: number;
  questionEs: string;
  questionAm: string;
  answerEs: string;
  answerAm: string;
  category: string;
}

export const STUDY_QUESTIONS: StudyQuestion[] = [
  {
    id: 1,
    questionEs: "¿A qué hora empieza la clase de español?",
    questionAm: "Իսպաներենի դասը ժամը քանիսի՞ն է սկսվում։",
    answerEs: "Empieza a las nueve.",
    answerAm: "Սկսվում է ժամը իննին։",
    category: "Ժամանակ և Դասեր (Time & Classes)"
  },
  {
    id: 2,
    questionEs: "¿Qué vas a hacer el próximo fin de semana?",
    questionAm: "Ի՞նչ ես պատրաստվում անել հաջորդ հանգստյան օրերին։",
    answerEs: "Voy a estudiar, trabajar en el jardín, salir con mis amigas…",
    answerAm: "Ես պատրաստվում եմ սովորել, աշխատել այգում, դուրս գալ ընկերուհիներիս հետ…",
    category: "Ծրագրեր և Ապագա (Plans & Future)"
  },
  {
    id: 3,
    questionEs: "¿Cómo eres físicamente?",
    questionAm: "Արտաքինով ինչպիսի՞ն ես։",
    answerEs: "Soy baja / delgada, tengo el pelo largo y soy morena, tengo los ojos marrones.",
    answerAm: "Ես ցածրահասակ եմ / նիհար եմ, երկար մազեր ունեմ, սևահեր եմ, աչքերս շագանակագույն են։",
    category: "Արտաքին Տեսք (Appearance)"
  },
  {
    id: 4,
    questionEs: "¿Qué ropa llevas hoy?",
    questionAm: "Այսօր ի՞նչ հագուստ ես կրում։",
    answerEs: "Llevo deportivas blancas, vaqueros, calcetines azules, mis gafas, una camiseta.",
    answerAm: "Ես կրում եմ սպիտակ սպորտային կոշիկներ, ջինս, կապույտ գուլպաներ, իմ ակնոցը և շապիկ։",
    category: "Հագուստ (Clothing)"
  },
  {
    id: 5,
    questionEs: "¿Cuáles son los doce meses del año?",
    questionAm: "Որո՞նք են տարվա տասներկու ամիսները։",
    answerEs: "Los doce meses del año son enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre.",
    answerAm: "Տարվա տասներկու ամիսներն են՝ հունվար, փետրվար, մարտ, ապրիլ, մայիս, հունիս, հուլիս, օգոստոս, սեպտեմբեր, հոկտեմբեր, նոյեմբեր, դեկտեմբեր։",
    category: "Օրացույց և Ամիսներ (Calendar & Months)"
  },
  {
    id: 6,
    questionEs: "¿A qué hora sueles cenar?",
    questionAm: "Սովորաբար ժամը քանիսի՞ն ես ընթրում։",
    answerEs: "Suelo cenar a las siete y media.",
    answerAm: "Սովորաբար ընթրում եմ ժամը յոթն անց կեսին։",
    category: "Օրակարգ և Սնունդ (Routine & Dining)"
  },
  {
    id: 7,
    questionEs: "¿Tienes hermanos? ¿A qué se dedica?",
    questionAm: "Քույր կամ եղբայր ունե՞ս։ Ինչո՞վ է զբաղվում։",
    answerEs: "Sí, tengo un hermano y es estudiante.",
    answerAm: "Այո, ես եղբայր ունեմ, և նա ուսանող է։",
    category: "Ընտանիք (Family)"
  },
  {
    id: 8,
    questionEs: "¿Quién es el hijo de tu tía?",
    questionAm: "Քո մորաքրոջ / հորաքրոջ որդին ո՞վ է։",
    answerEs: "Es mi primo.",
    answerAm: "Նա իմ զարմիկն է։",
    category: "Ընտանիք (Family)"
  },
  {
    id: 9,
    questionEs: "¿Qué hay en el salón?",
    questionAm: "Ի՞նչ կա հյուրասենյակում։",
    answerEs: "Hay una mesa baja, un sillón/sillones, un sofá, una tele, un armario, una lámpara.",
    answerAm: "Կա ցածր սեղան, բազկաթոռ / բազկաթոռներ, բազմոց, հեռուստացույց, պահարան, լամպ։",
    category: "Տուն և Կահույք (Home & Furniture)"
  },
  {
    id: 10,
    questionEs: "¿A qué día estamos hoy? ¿Y la fecha?",
    questionAm: "Այսօր շաբաթվա ո՞ր օրն է։ Իսկ ամսաթիվը ո՞րն է։",
    answerEs: "Hoy estamos a … y la fecha es el … de … de 2026.",
    answerAm: "Այսօր … է, իսկ ամսաթիվը 2026 թվականի …-ի …-ն է։",
    category: "Օրացույց և Ամիսներ (Calendar & Months)"
  },
  {
    id: 11,
    questionEs: "¿Cuánto es 53 097?",
    questionAm: "Ինչպե՞ս է կարդացվում 53 097 թիվը։",
    answerEs: "Cincuenta y tres mil noventa y siete.",
    answerAm: "Հիսուներեք հազար իննսունյոթ։",
    category: "Թվեր (Numbers)"
  },
  {
    id: 12,
    questionEs: "¿Has ido ya a España?",
    questionAm: "Դու արդեն գնացե՞լ ես Իսպանիա։",
    answerEs: "Nunca he ido a España.",
    answerAm: "Ես երբեք չեմ եղել Իսպանիայում։",
    category: "Փորձ և Ճամփորդություն (Experience & Travel)"
  },
  {
    id: 13,
    questionEs: "¿Cuáles son las profesiones que conoces?",
    questionAm: "Ի՞նչ մասնագիտություններ գիտես։",
    answerEs: "Conozco el abogado, el fontanero, el peluquero, el camarero, el amo de casa, el enfermero, el médico, el mecánico, el empresario, el periodista, el ingeniero, la azafata.",
    answerAm: "Ես գիտեմ՝ փաստաբան, սանտեխնիկ, վարսավիր, մատուցող, տնային տնտես, բուժեղբայր, բժիշկ, մեխանիկ, գործարար, լրագրող, ինժեներ, բորտուղեկցորդուհի։",
    category: "Մասնագիտություններ (Professions)"
  },
  {
    id: 14,
    questionEs: "¿Tienes el carnet de conducir? ¿Desde cuándo?",
    questionAm: "Վարորդական իրավունք ունե՞ս։ Երբվանի՞ց։",
    answerEs: "Sí, tengo el carnet de conducir, desde hace tres años.",
    answerAm: "Այո, վարորդական իրավունք ունեմ արդեն երեք տարի։",
    category: "Փորձ և Ճամփորդություն (Experience & Travel)"
  },
  {
    id: 15,
    questionEs: "¿Qué haces en el cuarto de baño?",
    questionAm: "Ի՞նչ ես անում լոգարանում։",
    answerEs: "Me ducho y me seco con una toalla, me lavo las manos, me cepillo los dientes.",
    answerAm: "Ես լոգանք եմ ընդունում և սրբիչով չորանում եմ, լվանում եմ ձեռքերս, մաքրում եմ ատամներս։",
    category: "Օրակարգ և Սնունդ (Routine & Dining)"
  },
  {
    id: 16,
    questionEs: "¿Te llevas bien con tus padres?",
    questionAm: "Դու ծնողներիդ հետ լավ հարաբերություններ ունե՞ս։",
    answerEs: "Sí, muy bien.",
    answerAm: "Այո, շատ լավ։",
    category: "Ընտանիք (Family)"
  },
  {
    id: 17,
    questionEs: "¿Por la mañana coges el tren?",
    questionAm: "Առավոտյան գնացքո՞վ ես գնում։",
    answerEs: "A veces cojo el tren y a veces cojo el bus.",
    answerAm: "Երբեմն գնացք եմ նստում, երբեմն՝ ավտոբուս։",
    category: "Տրանսպորտ (Transportation)"
  },
  {
    id: 18,
    questionEs: "¿Cómo se escribe tu nombre?",
    questionAm: "Ինչպե՞ս է գրվում քո անունը։",
    answerEs: "Se deletrea el nombre.",
    answerAm: "Անունը տառ առ տառ ասում են / հեգում են։",
    category: "Անձնական Տվյալներ (Personal Info)"
  },
  {
    id: 19,
    questionEs: "¿En qué países viven los norteamericanos? ¿Y los ingleses?",
    questionAm: "Ո՞ր երկրներում են ապրում հյուսիսամերիկացիները։ Իսկ անգլիացինե՞րը։",
    answerEs: "Los estadounidenses viven en los Estados Unidos, el Canadá y México. Los ingleses viven en Inglaterra.",
    answerAm: "Ամերիկացիները ապրում են ԱՄՆ-ում, Կանադայում և Մեքսիկայում։ Անգլիացիները ապրում են Անգլիայում։",
    category: "Երկրներ և Աշխարհագրություն (Countries & Geography)"
  },
  {
    id: 20,
    questionEs: "¿Qué tiempo hace hoy? ¿Cuántos grados?",
    questionAm: "Այսօր ի՞նչ եղանակ է։ Քանի՞ աստիճան է։",
    answerEs: "Hace frío / calor. Llueve. Está nublado.",
    answerAm: "Ցուրտ է / շոգ է։ Անձրև է գալիս։ Ամպամած է։",
    category: "Եղանակ (Weather)"
  },
  {
    id: 21,
    questionEs: "¿Tienes todavía tus cuatro abuelos? ¿Y cuántos años tienen?",
    questionAm: "Դեռ ունե՞ս քո չորս տատիկ-պապիկներին։ Քանի՞ տարեկան են։",
    answerEs: "No, solo tengo una abuela y tiene ochenta.",
    answerAm: "Ոչ, միայն մեկ տատիկ ունեմ, և նա ութսուն տարեկան է։",
    category: "Ընտանիք (Family)"
  },
  {
    id: 22,
    questionEs: "¿Qué hay en el DNI?",
    questionAm: "Ի՞նչ կա անձը հաստատող փաստաթղթում։",
    answerEs: "Hay el nombre y apellido, la fecha de nacimiento / tu cumpleaños, pero no hay la dirección.",
    answerAm: "Կա անունը և ազգանունը, ծննդյան ամսաթիվը / ծննդյան օրը, բայց հասցեն չկա։",
    category: "Փաստաթղթեր (Documents)"
  },
  {
    id: 23,
    questionEs: "¿Qué haces en el salón de tu casa?",
    questionAm: "Ի՞նչ ես անում քո տան հյուրասենյակում։",
    answerEs: "Leo un libro, veo la tele, charlo con mi familia, duermo.",
    answerAm: "Գիրք եմ կարդում, հեռուստացույց եմ դիտում, ընտանիքիս հետ զրուցում եմ, քնում եմ։",
    category: "Օրակարգ և Սնունդ (Routine & Dining)"
  },
  {
    id: 24,
    questionEs: "¿Dónde podemos esperar el autobús?",
    questionAm: "Որտե՞ղ կարող ենք սպասել ավտոբուսին։",
    answerEs: "Podemos esperar en la estación de autobús o en la calle a una parada de autobús.",
    answerAm: "Մենք կարող ենք սպասել ավտոբուսի կայարանում կամ փողոցում՝ ավտոբուսի կանգառում։",
    category: "Տրանսպորտ (Transportation)"
  },
  {
    id: 25,
    questionEs: "¿Cuánto es 503 815?",
    questionAm: "Ինչպե՞ս է կարդացվում 503 815 թիվը։",
    answerEs: "Quinientos tres mil ochocientos quince.",
    answerAm: "Հինգ հարյուր երեք հազար ութ հարյուր տասնհինգ։",
    category: "Թվեր (Numbers)"
  },
  {
    id: 26,
    questionEs: "¿Cómo es tu casa o tu piso?",
    questionAm: "Ինչպիսի՞ն է քո տունը կամ բնակարանը։",
    answerEs: "En la planta baja hay el salón, la cocina y el cuarto de baño. En el primer piso hay tres dormitorios.",
    answerAm: "Առաջին հարկում կա հյուրասենյակ, խոհանոց և լոգարան։ Երկրորդ հարկում կա երեք ննջասենյակ։",
    category: "Տուն և Կահույք (Home & Furniture)"
  },
  {
    id: 27,
    questionEs: "¿Cuál es el contrario de menor? ¿Y mejor?",
    questionAm: "Ո՞րն է «menor»-ի հակառակը։ Իսկ «mejor»-ի՞նը։",
    answerEs: "Mayor. Peor.",
    answerAm: "Ավելի մեծ։ Ավելի վատ։",
    category: "Բառապաշար և Հականիշներ (Vocabulary & Antonyms)"
  },
  {
    id: 28,
    questionEs: "¿Qué haces con tu teléfono?",
    questionAm: "Ի՞նչ ես անում հեռախոսով։",
    answerEs: "Chateo con mis amigos y familia, veo videos, juego, escucho música, llamo a mis amigos, navego en internet, estoy en las redes sociales.",
    answerAm: "Ես չաթով գրում եմ ընկերներիս և ընտանիքիս հետ, տեսանյութեր եմ դիտում, խաղում եմ, երաժշտություն եմ լսում, զանգում եմ ընկերներիս, ինտերնետում եմ շրջում, սոցիալական ցանցերում եմ։",
    category: "Գործողություններ և Տեխնիկա (Activities & Tech)"
  },
  {
    id: 29,
    questionEs: "¿Qué necesitas para viajar?",
    questionAm: "Ի՞նչ է քեզ պետք ճանապարհորդելու համար։",
    answerEs: "Necesito mucha ropa, mi documentación, DNI o pasaporte, la protección solar, una gorra, el neceser.",
    answerAm: "Ինձ պետք է շատ հագուստ, իմ փաստաթղթերը, անձը հաստատող փաստաթուղթ կամ անձնագիր, արևապաշտպան միջոց, գլխարկ, հիգիենայի պայուսակ։",
    category: "Փորձ և Ճամփորդություն (Experience & Travel)"
  },
  {
    id: 30,
    questionEs: "¿Cuáles son los países que conoces?",
    questionAm: "Ո՞ր երկրներն ես ճանաչում / գիտես։",
    answerEs: "Conozco a Bélgica, Francia, Alemania, Suiza, Inglaterra, Canadá, Chile, Estados Unidos, Marruecos, España, Portugal.",
    answerAm: "Ես գիտեմ Բելգիան, Ֆրանսիան, Գերմանիան, Շվեյցարիան, Անգլիան, Կանադան, Չիլին, ԱՄՆ-ը, Մարոկկոն, Իսպանիան, Պորտուգալիան։",
    category: "Երկրներ և Աշխարհագրություն (Countries & Geography)"
  },
  {
    id: 31,
    questionEs: "¿Cuáles son los colores que conoces?",
    questionAm: "Ի՞նչ գույներ գիտես։",
    answerEs: "Hay azul, amarillo, marrón, blanco, negro, gris, rosa, verde, rojo, naranja, morado.",
    answerAm: "Կան կապույտ, դեղին, շագանակագույն, սպիտակ, սև, մոխրագույն, վարդագույն, կանաչ, կարմիր, նարնջագույն, մանուշակագույն։",
    category: "Գույներ (Colors)"
  },
  {
    id: 32,
    questionEs: "¿Qué ropa se lleva en verano?",
    questionAm: "Ի՞նչ հագուստ են կրում ամռանը։",
    answerEs: "Se puede llevar pantalones cortos, una camiseta, un vestido, una falda, deportivas.",
    answerAm: "Կարելի է կրել կարճ տաբատ, շապիկ, զգեստ, կիսաշրջազգեստ, սպորտային կոշիկներ։",
    category: "Հագուստ (Clothing)"
  },
  {
    id: 33,
    questionEs: "¿Cuáles son las partes del cuerpo que conoces?",
    questionAm: "Մարմնի ի՞նչ մասեր գիտես։",
    answerEs: "Conozco la mano, la pierna, el pie, la cabeza, el corazón, la boca, los ojos, el brazo, la lengua.",
    answerAm: "Ես գիտեմ ձեռքը, ոտքը, ոտնաթաթը, գլուխը, սիրտը, բերանը, աչքերը, թևը, լեզուն։",
    category: "Մարմնի Մասեր (Anatomy)"
  },
  {
    id: 34,
    questionEs: "¿Cuáles son los deportes que conoces?",
    questionAm: "Ի՞նչ սպորտաձևեր գիտես։",
    answerEs: "El baile, ir al gimnasio, el baloncesto, el boxeo, correr, las artes marciales, el fútbol, la gimnasia, el tenis, montar a caballo, nadar, el voleibol.",
    answerAm: "Պար, մարզասրահ գնալ, բասկետբոլ, բռնցքամարտ, վազք, մարտարվեստներ, ֆուտբոլ, մարմնամարզություն, թենիս, ձիավարություն, լող, վոլեյբոլ։",
    category: "Սպորտ (Sports)"
  },
  {
    id: 35,
    questionEs: "¿Cuáles son las verduras que conoces?",
    questionAm: "Ի՞նչ բանջարեղեն գիտես։",
    answerEs: "El pepino, la cebolla, las zanahorias, las espinacas, la lechuga, las patatas.",
    answerAm: "Վարունգ, սոխ, գազար, սպանախ, հազար, կարտոֆիլ։",
    category: "Սնունդ և Բաղադրիչներ (Food & Ingredients)"
  },
  {
    id: 36,
    questionEs: "¿Cuáles son las cuatro comidas del día?",
    questionAm: "Որո՞նք են օրվա չորս սննդի ժամերը։",
    answerEs: "El desayuno, la comida, la merienda y la cena.",
    answerAm: "Նախաճաշ, ճաշ, հետճաշիկ և ընթրիք։",
    category: "Օրակարգ և Սնունդ (Routine & Dining)"
  },
  {
    id: 37,
    questionEs: "¿Cuáles son las frutas que conoces?",
    questionAm: "Ի՞նչ մրգեր գիտես։",
    answerEs: "El melocotón, la fresa, la manzana, la naranja, el tomate, el plátano, las uvas, la pera, el limón.",
    answerAm: "Դեղձ, ելակ, խնձոր, նարինջ, լոլիկ, բանան, խաղող, տանձ, կիտրոն։",
    category: "Սնունդ և Բաղադրիչներ (Food & Ingredients)"
  },
  {
    id: 38,
    questionEs: "¿Cuáles son los animales que conoces?",
    questionAm: "Ի՞նչ կենդանիներ գիտես։",
    answerEs: "El gato, el perro, el caballo, el pez, el ratón, el toro, la mosca.",
    answerAm: "Կատու, շուն, ձի, ձուկ, մուկ, ցուլ, ճանճ։",
    category: "Կենդանիներ (Animals)"
  },
  {
    id: 39,
    questionEs: "¿Cuáles son las tareas de la casa que conoces?",
    questionAm: "Ի՞նչ տնային գործեր գիտես։",
    answerEs: "Fregar los platos, sacar la basura, poner la mesa, ordenar.",
    answerAm: "Ամանները լվանալ, աղբը հանել, սեղանը գցել, դասավորել։",
    category: "Տնային Գործեր (Chores)"
  },
  {
    id: 40,
    questionEs: "¿Qué hay en un dormitorio?",
    questionAm: "Ի՞նչ կա ննջասենյակում։",
    answerEs: "Hay una cama, un escritorio con una silla, un armario, una lámpara.",
    answerAm: "Կա մահճակալ, գրասեղան՝ աթոռով, պահարան, լամպ։",
    category: "Տուն և Կահույք (Home & Furniture)"
  },
  {
    id: 41,
    questionEs: "¿Quién es la madre de tu padre?",
    questionAm: "Քո հոր մայրը ո՞վ է։",
    answerEs: "Es mi abuela.",
    answerAm: "Նա իմ տատիկն է։",
    category: "Ընտանիք (Family)"
  }
];

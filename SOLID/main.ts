/* 
  SOLID
  Если защифровать это слово получиться 
  S - Single responsibility principle (Принцип единственной ответственности) стр-12
  O - Open-closed principle (Принцип открытости/закрытости) стр-224
  L - Liskov Substitution principle (Принцип подстановки Барбары Лисков) стр-432
  I - Interface segregation principle (Принцип разделения интерфейса) стр-516
  D - Dependency inversion principle (Принцип инверсии зависимости) стр-616

  
  S
  Single responsibility principle (Принцип единственной ответственности) - что это значит?
  Определение
    Это означает что 1 класс отвечает за 1-ну задачу (единая зона ответственности). Но по факту это не только относится классам, это применимо функциональном программировании. 1 сущность = 1 задача.

  Если в одном классе кучо методов который решают разные задачи, этот класс называется godObject(класс Бога). Менять или что-то добавлять в такие объекты, это сложно и проблемно. 
  Поэтому и есть декомпозиция, который будет каждый функционал отдельным классом создать. И когда придется изменить мы будем менять определенный функционал а не вес класс, или будем добавлять новый класс. Это удобно, и не будет все ломаться.

  Примеры:
 
  class User {
    get(url: string) {};
    post() {};
    put() {};
    delete() {};

    getUser(id: number) {
      this.get('http://localjost:5000/' + id);
    }

    getRequisites(id: number) {
      this.get('http://localjost:5000/requisites' + id);
    }

    getClients() {
      this.get('http://localjost:5000/clients'\);
    }
  }

  В этом классе мы выполняем разные задачи. А могли бы просто делить эти задачи на отдельние классы.
  Пример как можно было бы улучшить этот код:

  class User {
    get(url: string) {};
    post() {};
    put() {};
    delete() {};
  }
  
  class UserService {
    client: User;
  
    constructor(client) {
      this.client = client;
    }
  
    getOneUser(id: number) {
      this.client.get('http://localjost:5000/' + id);
    }
  
    getAllUsers() {};
  }
  
  class RequisitesService {
    createRequisites() {};
    getRequisites() {};
    updateRequisites() {};
  }

  таким образом мы создали корневой класс, и создали разные сервисы которые будет заниматься, пользователями и реквизитами. И с помощью Агрегаций добавили корневой класс на сервисы. В таких условиях у нас будет разные классы для разных задач. И мы легко можем создать еще классы для других задач.

  Еще один пример на Фронт-энде

  const Requisites = () => {

    // И нам говорят надо сделать для формы валидацию, и чтобы зарубежные реквизиты и местные реквизиты былы отдельно валидированы. Мы создаем эти методы до return задачи.

    const RequsitesValidate = ({isForeign}) => {
      const validateINN = () => {};
      const validateBIK = () => {};
      const validateBankName = () => {};

      const validateForeignINN = () => {};
      const validateForeignBIK = () => {};
      const validateForeignBankName = () => {};

      const validateForm = () => {
        if(isForeign) {
          validateForeignINN();
          validateForeignBIK();
          validateForeignBankName();
        } else {
          validateINN();
          validateBIK();
          validateBankName();
        }
      }
    }

    const saveRequisites = () => {
      // Отправляем реквизиты по HTTP
    }
    
    const resetForm = () => {
      // логика по обнулению полей
    }

    return (
      <form>                                                   // Это обычная форма который сохраняет реквизитов, и на нем пока 2 метода
        <h1>Сохранение реквизитов</h1> 
        <input type="text" placeholder="ИНН"/>
        <input type="text" placeholder="БИК"/>
        <input type="text" placeholder="НАЗВАНИЕ БАНКА"/>
        <input type="text" placeholder="НОМЕР СЧЕТА"/>
        <button onclick=(resetForm)>Сбросить форму</button>
        <button onclick=(saveRequisites)>Сохранить</button>
      </form>
    )

    // И нам еще говорят, что, надо смотреть над обновлениеми реквизитов и еще что-то. И здесь у нас функция Requisites растет в размерах. И с каждым разом нам стоновится труднее меняьт, или добавлять что-то ф эту функцию.
  }

  // Как правильно писать этот код, чтобы не было таких турднестей?

  interface RequisitesProps {                                             // Создаем interface для TS
    onSave: (obj) => void;
    onReset: () => void;
    title: string;
  }
  
  const Requsites = (props: RequisitesProps) => {                         // Создаем саму форму и добавляем нужные методы
    const {
      onSave,
      onReset,
      title
    } = props;
  
    return (
      <form>
        <h1>Сохранение реквизитов</h1> 
        <input type="text" placeholder="ИНН"/>
        <input type="text" placeholder="БИК"/>
        <input type="text" placeholder="НАЗВАНИЕ БАНКА"/>
        <input type="text" placeholder="НОМЕР СЧЕТА"/>
        <button onclick={onReset}>Сбросить форму</button>
        <button onclick={onSave}>Сохранить</button>
      </form>
    )
  }
  
  const ForeignRequisites = (props: RequisitesProps) => {                    // Создаем отдельную валидацию для иностранный реквизитов
    const validateForeignForm = () => {
      // правила валидации
    }
  
    const saveHandler = () => {
      validateForeignForm()
      props.onSave({});
    }
  
    return <Requsites onSave={saveHandler} onReset={props.onReset} title={props.title}/>
  }
  
  const ThisRequisites = (props: RequisitesProps) => {                          // Создаем отдельную валидацию для местных реквизитов
    const validateThisForm = () => {
      // правила валидации
    }
  
    const saveHandler = () => {
      validateThisForm()
      props.onSave({});
    }
  
    return <Requsites onSave={saveHandler} onReset={props.onReset} title={props.title}/>
  }
  
  const createRequisitesForm = ({isForeign}) => {                                 // Создаем метод для сохранение реквизитов
    const createRequisites = () => {};
    const resetRequisites = () => {};
  
    if(isForeign) {                                                               // Проводим проверку, иностранный или местный реквизит
      return <ForeignRequisites
        onSave={createRequisites}
        onReset={resetRequisites}
        title={'Сохранение реквизитов'}
      />
    }
    return <ThisRequisites
      onSave={createRequisites}
      onReset={resetRequisites}
      title={'Сохранение реквизитов'}
    />
  }
  
  const updateRequisitesForm = ({isForeign}) => {                                 // Создаем метод для обновлений реквизитов
    const updateRequisites = () => {};
    const resetRequisites = () => {};
  
    if(isForeign) {                                                               // Проводим проверку, иностранный или местный реквизит
      return <ForeignRequisites
        onSave={updateRequisites}
        onReset={resetRequisites}
        title={'Обновление реквизитов'}
      />
    }
    return <ThisRequisites
      onSave={updateRequisites}
      onReset={resetRequisites}
      title={'Обновление реквизитов'}
    />
  }

  // Таким образом у нас получилось отдельный методы для разных задач, и мы не будем выращивать одну и ту же функцию до тысячи строк.
  В итоге:
    1) Появились модули (декомпозиция), читабельность выросла
    2) Вносить изменения стало проще
    3) Избавились от антипаттерна GodObject
    4) Класс инкапсулирует решение одной задачи
*/


/*
  O
  Open-closed principle (Принцип открытости/закрытости)
  Определение:
    Программные сущности (классы, функций, компоненты, модули) должны быть открыти для расширение, но закрыт для изминение

  Представим случае что у нас уже есть готовый функционал, который нужно что-то добавлять. На нам нельзя существуеший код менять потому что он уже протестирован, и если мы будем что-то менять может все рухнуть. Поэтому надо стараться добавлять новый функцтонал, не за счет изминение существуеших сущностей, а добавляя новую сущность (с помощью композиций, наследование) в этот функционал.

  Пример:
*/
// Есть класс оружие у него 3 поля (тип, урон дистанция)
// class Weapon {
//   type: string;
//   damage: number;
//   range: number;

//   constructor (type: string, damage: number, range: number) {
//     this.type = type;
//     this.damage = damage;
//     this.range = range;
//   }

//   // attack() {
//   //   console.log(`Удар мечом с уроном ${this.damage}`)
//   // }

//   attack() {                                                          // для того чтобы добавить какой-то функционал, мы меняем существующий код (это не правильно)
//     if(this.type === 'sword') {
//       console.log(`Удар мечом с уроном ${this.damage}`)
//     }
//     if(this.type === 'crossbow') {
//       console.log(`Выстрел из арбалета с уроном ${this.damage}`)
//     }
//   }
// }

// // И есть класс персонаж, который может принимать эту оружую
// class Character {
//   name: string;
//   weapon: Weapon;

//   constructor(name: string, weapon: Weapon) {
//     this.name = name;
//     this.weapon = weapon;
//   }

//   chaneCharacter(newWeapon: Weapon) {                   // Новое оружие
//     this.weapon = newWeapon
//   }

//   attack() {                                            // Делегируем от класса оружие
//     this.weapon.attack()
//   }
// }

// const sword = new Weapon('sword', 15, 2);
// const character = new Character('Warrior', sword);
// character.attack()
// const crossbow = new Weapon('crossbow', 40, 100);          // Создаем еще одну оружию
// character.chaneCharacter(crossbow);
// character.attack()                                        // И получаем результат Удар мечом с уроном 15; Удар мечом с уроном 40


// Как правильно писать чтобы не менять существующий код а добавить каждый раз новый
// interface Attacker {
//   attack: () => void;
// }

// class Weapon implements Attacker {
//   damage: number;
//   range: number;

//   constructor (damage: number, range: number) {
//     this.damage = damage;
//     this.range = range;
//   }

//   attack() {};
// }

// class Character {
//   name: string;
//   weapon: Weapon;

//   constructor(name: string, weapon: Weapon) {
//     this.name = name;
//     this.weapon = weapon;
//   }

//   chaneCharacter(newWeapon: Weapon) {
//     this.weapon = newWeapon
//   }

//   attack() {
//     this.weapon.attack()
//   }
// }

// class Sword extends Weapon {
//   attack(): void {
//       console.log(`Удар мечом с уроном ${this.damage}`);
//   }
// }

// class Crossbow extends Weapon {
//   attack(): void {
//       console.log(`Выстрел из арбалета с уроном ${this.damage}`);
//   }
// }

// const sword = new Sword(15, 2);
// const crossbow = new Crossbow(40, 100);
// const character = new Character('Warrior', sword);
// character.attack();
// character.chaneCharacter(crossbow);                                     // Ответ один и тот же, код стал более читабельним и менять легко
// character.attack();                                                     // И чтобы добавить еще одну оружию мне не надо мнеять вес код можно просто добавить еще один класс


// Еще один пример для этого принципа 
// class Person {
//   name: string;

//   constructor(name: string) {
//     this.name = name;
//   }
// }

// class PersonList {
//   persons: Person[];

//   constructor(persons: Person[]) {
//     this.persons = persons;
//   }

//   // sort() {                                                                        // нам говорят нужно сортировать массив по количеству с разными вариантами
//   //   if(this.persons.length < 10) {                                                // Если нам придется добваить или убирать один из вариантов сортировки, нам придется менять этот код
//   //     return BubbleSort.sort(this.persons);
//   //   } else if(this.persons.length < 1000) {
//   //     return MergeSort.sort(this.persons);
//   //   } else {
//   //     return QuickSort.sort(this.persons);
//   //   }
//   // }

//   sort() {                                                                            // Теперь при извинений мы ничего не меняем тут
//     SortClient.sort(this.persons);
//   }
// }
// // И у нас есть разные види сортировки
// // class BubbleSort {
// //   public static sort(array: any[]): any[] {
// //     return array
// //   }
// // }

// // class QuickSort {
// //   public static sort(array: any[]): any[] {
// //     return array
// //   }
// // }
// // class MergeSort {
// //   public static sort(array: any[]): any[] {
// //     return array
// //   }
// // }


// // Как сделать так чтобы вообще не менять исходный код, в этом случае
// class Sort { 
//   public static sort(array: any[]): any[] {return []}
// }

// class BubbleSort extends Sort{
//   public static sort(array: any[]): any[] {
//     return array
//   }
// }

// class QuickSort extends Sort{
//   public static sort(array: any[]): any[] {
//     return array
//   }
// }

// class MergeSort extends Sort{
//   public static sort(array: any[]): any[] {
//     return array
//   }
// }

// class SortClient extends Sort {
//   public static sort(array) {
//     if(array.length < 10) {
//       return BubbleSort.sort(array);
//     } else if(array.length < 1000) {
//       return MergeSort.sort(array);
//     } else {
//       return QuickSort.sort(array);
//     }
//   }
// }

/*
  В итоге:
    1) Нет необходимость регрессии (Проверки старого кода, мы уже знаем что ничего там не сломали)
    2) Меньше вероятноять ошибок
*/


/*
  L
  Liskov Substitution Principle (Принцип подстановки Барбары Лисков)
  Определение
    Функций, сущности который используемые родительским типом, должны так же работать с дочерними классами. При этом ничего не должно ломаться в логике программы, и оно не должно нарушаться

  Например у нас есть класс Database и у него есть свойства connect, read, write который относится всем видам базы данных
  class Database {
    connect() {};
    read() {};
    write() {};
    joinTables() {};                           // Мы будем пользоваться базой MySql который принимает себе таьлицф
  }
  
  class SQLDatabase extends Database {
    connect() {};
    read() {};
    write() {};
    joinTables() {};
  }
  
  class MongoDatabase extends Database {            // И нам говорят надо менять базу на Монго который не принимает таблицы
    connect() {};
    read() {};
    write() {};
    joinTables() {
      throw new Error('Монго не принмает таблицы');               // Если мы так отправить ошибку, у нас код будет не правильным
    };
  }

  Чтобы избежать от таких ошибок, мы делаем следущий код
*/
// class Database {
//   connect() {};
//   read() {};
//   write() {};
// }

// class ForSQLDatabase extends Database {
//   connect() {};
//   read() {};
//   write() {};
//   joinTables() {};
// }

// class ForNoSQLDatabase extends Database {
//   connect() {};
//   read() {};
//   write() {};
//   createIndex() {};                                                     // Здесь уже место метода обединение таблиц, есть метод создать ин 
// }
// // Потом уже создаем себе все базыданных
// class SQLDatabase extends ForSQLDatabase {
//   connect(): void {
//     // Code
//   }
//   read(): void {
//     // Code
//   }
//   write(): void {
//     // Code
//   }
//   joinTables(): void {
//     // Code
//   }
// }

// class MongoDatabase extends ForNoSQLDatabase {
//   connect(): void {
//     // Code
//   }
//   read(): void {
//     // Code
//   }
//   write(): void {
//     // Code
//   }
//   createIndex(): void {
//     // Code
//   }
//   mergeDocuments() {}
// }


/*
  Interface segregation principle (Принцип разделения интерфейса)
  Определение:
    Программные сущности не должны зависить от методов, которые они не используют

  Например, скажем что у нас есть interface с 3-мя свойствами
  interface Routing{
    createStore: () => void;
    parseUrl: () => void;
    Navigate: () => void;
  }
  // Нам говорят создать класс который будет возвращать все данный Router
  class RouterData implements Routing {
    createStore(): void {};
    parseUrl(): void {};
    Navigate(): void {};
  }
  // У нас еще один класс renderHtmlPage для клиента, который меняет страницу и парсит ссылку. Так как нам нужны только функций из интерфейса мы берем ее.
  class renderHtmlPage implements Routing {
    createStore(): void {
      throw new Error('Мы не будем создать даннай в базе')                // И возвращаем тут ошибку, так как мы им не будем пользоваться (Этот принцип похож на принцип подстановки)
    };
    parseUrl(): void {};
    Navigate(): void {};
  }
  // И еще один метод для Серверного часта. Тут тоже самое случае
  class renderServer implements Routing {
    createStore(): void {};
    parseUrl(): void {};
    Navigate(): void {
      throw new Error('Мы не будем менять старницу')  
    };
  }
  // Получается мы сами возвращаем ошибку и портим свой же код
*/
// Чтобы избежать от таких проблем. Мы пользуемся принципом Единственной ответственности и принципом Подстановки
  // Создаем интерфейс который будет пользоваться все классы
// interface Router{
//   parseUrl: () => void;
// }
//   // И Создаем для каждого класса отдельный интерфейс, сделав корневой интерфейс тот который будет все пользоваться
// interface ClientRouter extends Router {
//   navgation: () => void;
// }
// interface ServerRouter extends Router {
//   createStore: () => void;
// }
// class renderHtmlPage implements ClientRouter {
//   parseUrl() {};
//   navgation() {};
// }
// class renderServer implements ServerRouter {
//   parseUrl() {};
//   createStore() {};
// }
// У нас теперь нет классов зависимые от методов которые они не нуждаются

// Еще один пример по этому пинципу
// interface HttpRequest {
//   get: () => void;
//   post: () => void;
//   put: () => void;
//   delete: () => void;
// }

// // И нам говорят в клиенте надо еще отправить запрос на токени. Мы создаем новый интерфейс для этого случае
// interface TokenStorage {
//   addToken: () => void;
//   getToken: () => void;
// }

// // Внутри используем axios или http module
// class ServerHttp implements HttpRequest {
//   delete() {};
//   post() {};
//   put() {};
//   get() {};
// }

// // Внутри используем fetch запрос
// class ClientHttp implements HttpRequest, TokenStorage {
//   delete() {};
//   post() {};
//   put() {};
//   get() {};

//   // И просто ставим тут не меняя корневой интерфейс
//   addToken() {};
//   getToken() {};
// }

/*
  В итоге:
    1) Избовляем программные сущности от методов, которые они не используют
    2) Получаем более предсказуемую работу
    3) Код становится менее связанным
*/


/*
  D
  Dependency inversion principle (Принцип инверсии зависимости)
  Определение
    Модули высокого уровня, не должны зависить от модулей более низкого уровня, все они должны зависит от абстракций. А абстракций в это время не должны зависить от деталей, свою очередь детали должны зависить от абстракций
  
  Пример:
  // Скажем у нас есть музыкальное приложение
  // И мы решаем получить музыку от Yandex
  // class YandexMusicApi {
  //   get() {};
  // }
  
  // // И мы решаем получить музыку от Vk
  // class VkMusicApi {
  //   getAll() {};
  // }
  
  // // Музыкальное приложение
  // const MusicApp = () => {
  //   // const Api = new YandexMusicApi()
  //   const Api = new VkMusicApi()                                      // Мы меняем главныймодуль
  
  //   // Api.get()
  //   Api.getAll()                                                      // Потом меняем запрос, здес мы нарушаем закон инверсии (главный модуль зависит от низкого модуля)
  // }
*/
// Как решить проблему ?
// interface MusicApi {                                                    // Создаем интерфейс
//   getMusic: () => void;
// }

// class VkMusicApi implements MusicApi {                                  // Создаем клиентов которые будем получать музыку, имплементируя от интерфейса
//   getMusic() {};
// }

// class YandexMusicApi implements MusicApi {
//   getMusic() {};
// }

// class MusicClient implements MusicApi {                                 // Создаем главный модуль, имплементируя от интерфейса
//   clientApi: MusicApi;                                                  // И как свойства добавляем, класс который будем брать музыку, но класс мы будем принимать с абстракций

//   constructor(clienApi: MusicApi) {
//     this.clientApi = clienApi;
//   }

//   getMusic() {                                                          // Зовем метод от этого класса
//     this.clientApi.getMusic();
//   }
// }

// const MusicApi = () => {                                                // Создаем абстракцию
//   const API = new MusicClient(new YandexMusicApi())                     // Вызываем главный модуль, с нужном классом

//   API.getMusic()                                                        // И вызываем метод этого класса
// }

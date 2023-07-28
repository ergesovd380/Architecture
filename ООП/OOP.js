/*
Объектно-ориентированное прораммирование
  ООП всегда используется class-ы, в классе создается свойства, и чтобы работать с этими свойствами, или изменить их, создается методы. Например:
    Человек
      Свойства:   |   Методы:
      Имя         |   Ходить
      Фамилия     |   Писать код
      Возраст     |   Рисовать
      Вес         |   Говорить
      Рост        |
    И каждое свойтсва имеет какое-то значение например
      Имя = Вася;
      Фамилия = Пупкин;
      Возраст = 27;
      Вес = 70;
      Рост = 180;
    
  Посмотрим на нижнем примере:
*/
// class Rectangle {
//   width;                                          // Свойства
//   height;                                         // Свойства
//   constructor (w, h) {                            // В каждом class должен быть constructor, на нем мы прикрепляем значение этим свойствам
//     this.height = h;
//     this.width = w;
//   };
//   calcArea() {                                    // Методы чтобы работать с этими свойствами
//     return this.width * this.height;
//   };
//   calcPerimetr() {
//     return (this.width + this.height) * 2;
//   };
// };
// const rect = new Rectangle(5, 10)                 // Здесь мы значение прикрепляем на constructor, а constructor на свойства, как показона на функции (w: 5, h: 10)
// const rect1 = new Rectangle(26, 8)
// console.log(rect.calcArea())                      // 50
// console.log(rect1.calcPerimetr())                 // 68 


/*
ООП построен на 3 основных концепция
  Инкапсуляция
  Наследование
  Полиморфизм
*/

/*
Инкапсуляция - его суть заключается в том что, сам class является капсулой, который содержит себе свойства и методы, для работы с этими свойствами. Например:
         Свойства:   |   Методы:
  public Имя         |   public Ходить
  public Фамилия     |   public Писать код
  public Возраст     |   public Рисовать
  public Вес         |   public Говорить
  public Рост        |

  У каждого человека есть публичные данные, они не для кого не секрет, и мы можем с ними работать. И такие публичные данные пишется как public (Если писать без ничего как наверху, это будет public).

  Но кроме этого и есть скритая часть, который мы не можем повлеять. Например:
         Свойства:   |   Методы:
  public Имя         |   private качать кровь
  public Фамилия     |   private Переваривать пищу
  public Возраст     |   private Обрабатывать информацию
  public Вес         |
  public Рост        |

  На эти вещи мы из вне мы повлеять не можем. И такие свойства начинаются с префикса _ и (private).

  Посмотрим на нижних примерах:
*/
// Пример - 1
// class Rectangle {
//   private _height;                                           // private
//   private _width;                                            // private
//   constructor(w, h) {
//     this._width = w;
//     this._height = h;
//   };
//   public get width() {                                      // Чтобы получить private свойства создается get(), это public, поэтому им можно достучиться из вне
//     return this._width;
//   };
//   public set width(value) {                                 // Чтобы изменить private свойства создается set(), это public, поэтому им можно достучиться из вне
//     if(value <= 0) {
//       this._width = 1;
//     } else {
//       this._width = value;
//     }
//   };
// };
// const rect = new Rectangle(5, 10);
// rect.width = -2                                      // Здесь обрабатывает set()
// console.log(rect)

// Пример - 2
// class CoffeeMachine {
//   private _power;
//   constructor(power) {
//     this._power = power;
//   }
//   public get power() {
//     return this._power;
//   }
// }
// // создаём кофеварку
// let coffeeMachine = new CoffeeMachine(100);
// console.log(`Мощность: ${coffeeMachine.power}W`); // Мощность: 100W
// coffeeMachine.power = 25; // Error (no setter)

// Пример - 3
// class User {
//   private _user;
//   private _password;
//   private _id;
//   constructor(user, password) {
//     if(user.length < 3) {
//       this._user = 'Please write real name';
//     } else {
//       this._user = user;
//     };
//     this._password = password;
//     this._id = this.getRandomId();
//   };
//   getRandomId() {
//     return Math.floor(Math.random() * 100);
//   };
//   public get password() {
//     return this._password;
//   };
//   public set password(value) {
//     if(value.length < 3) {
//       this._password = 'Password must to be longer then 3 symbols';
//     } else {
//       this._password = value;
//     }
//   };
//   public get id() {
//     return this._id;
//   };
// }
// const users = new User('Do', '13230206')
// console.log(users.id)
// console.log(users)

// Пример - 4
// class Database{
//   private _url;
//   private _port;
//   private _username;
//   private _password;
//   private _table;
//   constructor(url, port, username, password) {
//     this._url = url;
//     this._port = port;
//     this._username = username;
//     this._password = password;
//     this._table = [];
//   };
//   public createNewTable(table) {
//     this._table.push(...table);
//   };
//   public get table() {
//     return this._table;
//   };
// }
// const database = new Database(1, 2, 3, 4);
// database.createNewTable(['hello', 'bye', 'chmo']);
// console.log(database.table)

/*
  Наследование - это например у нас есть class Человек, в котором имеются свойстви name, surname, age. Еще и есть class - работник, у него кроме свойств класса - Человек еще и есть свойстви СНИЛС, ИНН, Номер. Получается класс - работник наследовался от класса - Человек, еще и добавил не хватающие свойства.
  Получается в ООП классы должны создаться так, чтобы потом их можно было модернизировать

  Посмотрим на нижних примерах:
*/
// class Person{
//   private _name;
//   private _surname;
//   private _age;
//   constructor(name, surname, age) {
//     this._name = name;
//     this._surname = surname;
//     this._age = age;
//   };
//   get name() {
//     return this._name;
//   };
//   get surname() {
//     return this._surname;
//   };
//   get age() {
//     return this._age;
//   };
//   set age(val) {
//     if(val < 0) {
//       this._age = 1;
//     } else {
//       this._age = val;
//     };
//   };
//   public get fulName() {
//     return `${this._name} ${this._surname}`
//   }
// };
// const person = new Person('Bego', 'Ronaldo', 12)
// console.log(person.name, person.surname, person.age)

// class Employe extends Person {
//   private _snils;
//   private _inn;
//   private _number;
//   constructor(name, surname, age, snils, inn, number) {
//     super(name, surname, age);
//     this._snils = snils;
//     this._inn = inn;
//     this._number = number;
//   };
//   get snils() {
//     return this._snils;
//   };
//   get inn() {
//     return this._inn;
//   };
//   get number() {
//     return this._number;
//   };
// }
// const employe = new Employe('Muha', 'Messi', 18, 16, 28, 606469)
// console.log(`
//   Имя: ${employe.name}
//   Фамилия: ${employe.surname}
//   Возраст: ${employe.age}
//   SNILS: ${employe.snils}
//   INN: ${employe.inn}
//   Серия номер: ${employe.number}
// `)

// class Developer extends Employe {
//   private _lang
//   private _level
//   constructor(name, surname, age, snils, inn, number, lang, level) {
//     super(name, surname, age, snils, inn, number);
//     this._lang = lang;
//     this._level = level;
//   }
// }
// const developer = new Developer('Dovlet', 'Ergeshov', 22, 23, 18, 569113, 'VueJs', 'Junior')
// console.log(developer.name) // Dovlet
// console.log(developer.level) // undefined (Потому что наверху мы возвращаем имя а Level нет)
// console.log(developer.fulName) // Dovlet Ergeshov (Мы наверху создали getter который возвращает имя, фамилию)

/*
  Полиморфизм делится на 2 части, они:
    Параметрический (Истинный) (более часто исползуемый)
    ad-hoc (Мнимый)
  
  Полиморфизм - это в концепце ООП, принцип который позволяет одному и тому же фрагменту кода, работать с разнымы типами данных
*/
// Ad-hoc полиморфизм
// class Calculator {
//   add(a, b) {
//     return a + b;
//   };
// };
// const calc = new Calculator()
// console.log(calc.add(5, 5))             // (10) Если мы вызовим с чиломи тогда получим, результат суммы этиж чисел
// console.log(calc.add('5', '5'))         // (55) Если вызовим с строками, тогда мы получим конкатинацию
// Получается один метод работает с двумя типами данных. Это происходит за счет перегрузки типов. Такой пориморфизм называется - мнимым

/*
  Параметрический полиморфизм
    Представим ситуацию в кабинете человек, работник и разработчик, и они должни все с друг другом поздаровиться. Как мы будем это исполнять
*/
// class Person{
//   private _name;
//   private _surname;
//   private _age;
//   constructor(name, surname, age) {
//     this._name = name;
//     this._surname = surname;
//     this._age = age;
//   };
//   get name() {                                                            // На основани этого другие классы тоде возврошают this.name
//     return this._name;
//   };
//   greeting() {
//     console.log(`Привет я человек, меня зовут ${this.name}`)
//   };
// };

// class Employe extends Person {
//   private _snils;
//   private _inn;
//   private _number;
//   constructor(name, surname, age, snils, inn, number) {
//     super(name, surname, age);
//     this._snils = snils;
//     this._inn = inn;
//     this._number = number;
//   };
//   greeting() {
//     console.log(`Привет я работник, меня зовут ${this.name}`)
//   };
// }

// class Developer extends Employe {
//   private _lang
//   private _level
//   constructor(name, surname, age, snils, inn, number, lang, level) {
//     super(name, surname, age, snils, inn, number);
//     this._lang = lang;
//     this._level = level;
//   }
//   greeting() {
//     console.log(`Привет я разработчик, меня зовут ${this.name}`)
//   };
// }

// const person = new Person('Bego', 'Ronaldo', 12)
// const employe = new Employe('Muha', 'Messi', 18, 16, 28, 606469)
// const developer = new Developer('Dovlet', 'Ergeshov', 22, 23, 18, 569113, 'VueJs', 'Junior')
// const personList: Person[] = [person, employe, developer];
// function greetingEveryOne(persons: Person[]) {
//   for(let i = 0; i < persons.length; i++) {
//     const person = persons[i];
//     person.greeting()
//   }
// }
// greetingEveryOne(personList)


/*
  Взаимодействие между классами
    Компазиция
    Агрегация

      Композиция, представим что есть class - автомобиль, внутри class автомобиль, есть еще класс двигатель и 4 класс колеса. Суть композиций в том что, класс двигатель и колеса, не могут существовать без класса автомобиль.

      Агрегация, представим точно такой же класс автомобиль, и зависимые классы двигатель и колеса. Еще есть класс елочка освежитель который можно повесить в автомобиль. Этот класс не зависит от автомобиля потому что он может весить в дома, в наулице и в автомобиле. Он передается откуда-то из вне. Этот принцип и называется Агрецация.
*/

// Композиция и Агрегация
// class Engine {
//   drive() {
//     console.log('Двигатель работает');
//   };
// };

// class Wheel {
//   drive() {
//     console.log('Колеса едут');
//   };
// };

// class Freshener {
//   drive() {
//     console.log('Fresh air in your car')
//   }
// };

// class Car {
//   engine: Engine;
//   wheels: Wheel[];
//   freshener: Freshener;
//   constructor (freshener) {
//     // Композиция
//     this.engine = new Engine();
//     this.wheels.push(new Wheel());
//     this.wheels.push(new Wheel());
//     this.wheels.push(new Wheel());
//     this.wheels.push(new Wheel());
//     // Агрегация
//     this.freshener = freshener;
//   };
//   // Делегирование
//   drive() {
//     this.engine.drive();
//     for(let i = 0; i < this.wheels.length; i++) {
//       this.wheels[i].drive();
//     };
//     this.freshener.drive()
//   };
// };

// const fresh = new Freshener()
// const bmw = new Car(fresh)
// bmw.drive()


/*
  Абстрактные классы и интерфейсы
*/
// class Car {
//   carname: string;
//   year: number;
//   constructor (car, year) {
//     this.carname = car;
//     this.year = year;
//   }
// }

// interface Repository<T> {
//   create: (obj: T) => T;
// }

// class CarRepo implements Repository<Car> {
//   create(obj: Car): any {
//     console.log(`Car name ${obj.carname}; Car year ${obj.year}`)
//   }
// }

// const cars = new Car('BMW', 2016)
// const carRepo = new CarRepo()
// carRepo.create(cars)


/*
  Пример с interface
*/
// class User {
//   username: string;
//   age: number;
// }

// interface UserRepo{
//   getUsers: () => User[];
// }

// class UserMongoDb implements UserRepo {
//   getUsers(): User[] {
//     console.log('Используем подключение к Mongo и получаем пользователей')
//     return [{age: 15, username: 'Пользователь из Mongo DB'}]
//   }
// }

// class UserMySqlDb implements UserRepo {
//   getUsers(): User[] {
//     console.log('Используем подключение к MySql и получаем пользователей')
//     return [{age: 15, username: 'Пользователь из MySql DB'}]
//   }
// }

// class UserService {
//   userRepo: UserRepo;
//   constructor(userRepo: UserRepo) {
//     this.userRepo = userRepo;
//   }
//   filterByAge(age: number) {
//     const users = this.userRepo.getUsers()
//     console.log(users)
//   }
// }

// const userService = new UserService(new UserMongoDb())
// userService.filterByAge(15)


/*
 Как избежать от повторного создание одного и того же класса
*/
// class Database {                              // создаем класс Database
//   url: number;
//   constructor () {
//     this.url = Math.random();
//   }
// }

// const db1 = new Database();                   // Ответы отличаются, и получается мы создали 2 раза класс Database. Это может в некоторых случиях испортить вам проект
// const db2 = new Database();
// console.log(db1);
// console.log(db2);


// var DatabaseAlone = /** @class */ (function () {
//     function DatabaseAlone() {
//         if (DatabaseAlone.instance) { // Так как мы свойству instance ничего не добавили и его значение null, проверяем его. Если у есть какое-то значение
//             return DatabaseAlone.instance; // Тогда возвращаем ту значению
//         }
//         this.url = Math.random(); // Если instance ровняется null, тогда в свйоству url добавляем значение
//         DatabaseAlone.instance = this; // И instance добавляем ту значению из url
//     }
//     return DatabaseAlone;
// }());
// var dba1 = new DatabaseAlone(); // Таким образом не смотря, сколько раз вы создали класс, везде будет одинаковые значение.
// var dba2 = new DatabaseAlone();
// console.log(dba1);
// console.log(dba2);

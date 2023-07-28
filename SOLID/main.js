/*
  SOLID
  
  S
  Single responsibility principle (Принцип единственной ответственности) - что это значит?

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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Weapon = /** @class */ (function () {
    function Weapon(damage, range) {
        this.damage = damage;
        this.range = range;
    }
    Weapon.prototype.attack = function () { };
    ;
    return Weapon;
}());
var Character = /** @class */ (function () {
    function Character(name, weapon) {
        this.name = name;
        this.weapon = weapon;
    }
    Character.prototype.chaneCharacter = function (newWeapon) {
        this.weapon = newWeapon;
    };
    Character.prototype.attack = function () {
        this.weapon.attack();
    };
    return Character;
}());
var Sword = /** @class */ (function (_super) {
    __extends(Sword, _super);
    function Sword() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sword.prototype.attack = function () {
        console.log("\u0423\u0434\u0430\u0440 \u043C\u0435\u0447\u043E\u043C \u0441 \u0443\u0440\u043E\u043D\u043E\u043C ".concat(this.damage));
    };
    return Sword;
}(Weapon));
var Crossbow = /** @class */ (function (_super) {
    __extends(Crossbow, _super);
    function Crossbow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Crossbow.prototype.attack = function () {
        console.log("\u0412\u044B\u0441\u0442\u0440\u0435\u043B \u0438\u0437 \u0430\u0440\u0431\u0430\u043B\u0435\u0442\u0430 \u0441 \u0443\u0440\u043E\u043D\u043E\u043C ".concat(this.damage));
    };
    return Crossbow;
}(Weapon));
var sword = new Sword(15, 2);
var crossbow = new Crossbow(40, 100);
var character = new Character('Warrior', sword);
character.attack();
character.chaneCharacter(crossbow);
character.attack(); // Ответ один и тот же, код стал более читабельним и менять легко

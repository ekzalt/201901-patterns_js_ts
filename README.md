# Design Patterns

## Development rules

Основные правила разработки на JavaScript / TypeScript:

1. Используйте именованные функции-обработчики для Callback и Promise.
    - это сделает код проще
    - уменьшит расход памяти т.к. объявленная 1 раз именованная функция ест меньше памяти, чем много раз объявляемые анонимные. В этом случае, каждый раз JavaScript создает новый объект, и выделяет под него память.

```js
// BAD
readFile((err, data) => {
  if (err) return console.log(err);
  // do some with data
});

// GOOD
readFile(handler);
```

2. Используйте ранний выход из функции с помощью *throw* или *return*
    - это сделает код проще
    - уменьшит вложенность и количество *if* блоков. В идеале вложенности не должно быть вообще.

```js
// BAD
const notify = messages => {
  if (messages && messages.length) {
    for (const message of messages) console.log(message);
  }
};

// GOOD
const notify = messages => {
  if (!messages || !messages.length) return;

  for (const message of messages) console.log(message);
};
```

3. Не злоупотребляйте замыканиями. Это увеличивает расход памяти т.к. возвращаемая функция тянет за собой весь родительский скоуп, и может приводить к утечкам памяти, особенно при работе со ссылочными типами данных. Ссылочные типы данных в замыканиях мешают *Сборщику мусора* очистить память.
    - это сделает код проще
    - уменьшит расход памяти

```js
// BAD
const check = (validator, results) => data => {
  const result = validator.verify(data);

  if (result.valid) results.push(result); // mutation here
};

// GOOD
check(data) { // method
  return this.validator.verify(data);
}
```

4. Не давайте одинаковых имен переменным и аргументам во вложенных замыканиях - это вызывает путанницу и может приводить в неожиданным сайд-эфектам.
    - это сделает код проще
    - это сделает код более предсказуемым

```js
// BAD
const processOrder = data => {
  return getOrder(data)
    .then(data => {
      return verifyOrder(data)
        .then(data => {
          if (data) {
            // what do you think? which data will be used?
          }
        }).catch(err => rejectOrder(err));
    }).catch(err => rejectOrder(err));
};

// GOOD
const processOrder = data => {
  return getOrder(data)
    .then(loaded => verifyOrder(loaded))
    .then(verified => {
      // do some with vadid data
    }).catch(rejectOrder);
};
```

5. Копируйте, а не мутируйте ссылочные типы данных: объект, массив и т.д. Мутация ссылочных типов данных вызывает сайд-эфекты, которые потом сложно дебажить и исправлять. Также мутация может приводить к утечкам памяти.
    - это сделает код проще
    - это сделает код более предсказуемым

```js
// BAD
const updateUser = user => {
  user.updated = new Date();
  return user;
};

// GOOD
const updateUser = user => ({ ...user, updated: new Date() });
```

6. Старайтесь изолировать ваши сложные структуры данных (ссылочные типы) внутри классов, в приватных свойствах и методах. Старайтесь не использовать сложные структуры данных в аргументах публичных методов. Публичные методы должны принимать примитивы, плоские обекты (flat object) или вызываться без аргументов вообще.
    - это сделает код проще
    - пользоваться вашими классами станет легко, просто, понятно, ожидаемо

```js
// BAD
await messenger.sendMessage({
  users: [{ /* ... */ }, { /* ... */ }, { /* ... */ }],
  message: { title, text },
  attachments: [ /* ... */ ],
  // and many other fields
});

// GOOD
await messenger.notifyUsers(await storage.getUsers());
```

7. Помните, что функции - для *Функционального стиля*, а классы - для *ООП*. Не путать! Это значит что функции, в т.ч. замыкания, не должны хранить состояние. То есть, вы не должны агрегировать данные где-то во внешнем скоупе. Это приводит к расходу памяти и утечкам. Для этого предназначены классы. Если вам нужно где-то агрегировать данные и хранить состояние - храните их в приватных свойствах класса. Контролировать свойсва класса намного легче, чем переменные замыкания. Примечание: *Функциональный стиль* - это когда результат вызова одной функции передается на вход в аргументах другой, без какого-либо промежуточного хранилища, и данные в этой системе *имутабельны*.
    - это сделает код проще
    - это сделает код более предсказуемым
    - уменьшит расход памяти

```js
// BAD
const handlers = [];
const addHandler = handler => handlers.push(handler);
const executeHandlers = () => {
  for (const handler of handlers) handler();
};
// WORST - after that you can't control all links to handlers array
const getHandlers = () => handlers;

// GOOD
class Executor {
  constructor() {
    this._handlers = [];
  }
  addHandler(handler) {
    return this._handlers.push(handler);
  }
  executeHandlers() {
    for (const handler of this._handlers) handler();
  }
}

// GOOD
const tryAsyncCall = async (callable, ...args) => {
  const result = {};
  try {
    result.data = await callable(...args);
  } catch (error) {
    result.error = error;
  } finally {
    return result;
  }
};
```

8. Помогите *Сборщику мусора* - используйте WeakMap, WeakSet и ручную очистку переменных и свойств, где хранятся временные и агрегированные данные, если они уже не нужны. Также не забывайте отписываться от ивентов!
    - уменьшит расход памяти

9. Если аргументов более трех, сгрупируйте их в плоский объект, можете даже разбить их по типам, создав несколько плоских объектов (props, params, options).
    - это сделает код проще
    - вам не нужно следить на четкой последовательностью большого списка агрументов

```js
// BAD
messenger.sendEmail(sender, receiver, title, text, attachments, true);

// GOOD
messenger.sendEmail({
  sender,
  receiver,
  title,
  text,
  attachments,
}, { deliveryConfirmation: true });
```

10. Используйте принципы *Программирования по контракту* - перед вашей логикой валидируйте пред-условия т.е. входящие данные, а после вашей логики валидируйте пост-условия т.е. ваши исходящие данные. Для *node.js back-end* это вообще *must have*!
    - это сделает код более предсказуемым и надежным

```js
// BAD
async findByName(name) { // method
  return await this._storage.find({ name });
}

// GOOD
async findByName(name) { // method
  if (!name) throw new Error('Invalid name'); // precondition

  return await this._storage.find({ name });
}

// BEST
async findByName(name) { // method
  if (!name) throw new ArgumentsError('Invalid name'); // precondition
  
  const result = await this._storage.find({ name });

  if (!result) throw new NotFoundError('Not found'); // postcondition

  return result;
}
```

11. Используйте схемы и валидаторы, чтобы валидировать ваши данные, особенно сложные структуры данных. Например, [Sequelize](http://docs.sequelizejs.com/), [Mongoose](https://mongoosejs.com/), [Ajv](https://ajv.js.org/), [Joi](https://github.com/hapijs/joi). Даже если вы пишете на TypeScript - используйте валидаторы т.к. после транспиляции вашего кода, в рантайме исполняется обычный JavaScript.
    - это сделает код более предсказуемым и надежным

```js
// BAD
async saveOrder(order) { // method
  return await this._storage.saveOrder(order);
}

// GOOD
async saveOrder(order) { // method
  const validated = this._validator.validateOrder(order); // precondition

  if (validated.error) throw validated.error;

  return await this._storage.saveOrder(order);
}
```

12. Возвращайте из функций и методов консистентные данные. Недопустима ситуация, когда, например, в одном кейсе функция возвращает *boolean*, а в другом она же возвращает *string*.
    - это сделает код более предсказуемым и надежным

```js
// BAD - the method returns 3 types: undefined, string, boolean
getMessageById(id) { // method
  if (!id) return;

  return this._messages[id] || false;
}

// GOOD
getMessageById(id) { // method
  if (!id) throw new ArgumentsError('Invalid id');

  return this._messages[id] || '';
}
```

13. Не используйте динамическое генерирование названий полей. Это сложно понять, типизировать, валидировать, обращаться к полям глубокой вложенности, итерироваться. А если в копиях таких объектов нужно что-то менять... Вам понадобиться сложная рекурсивная логика для обхода объекта по полям, которые называются как угодно, хранят что угодно, и имеют любой уровень вложенности.
    - отказ от динамического генерирования названий полей сделает ваш код проще

```js
// BAD
const mappings = {
  '123': 'abc',
  '456': 'def',
};

// WORST
const wildData = [{
  '111': [{'123': 'abc'}, {'456': 'def'}],
  '222': [{'123': 'abc'}, {'456': 'def'}],
}, {
  '333': [{'123': 'abc'}, {'456': 'def'}],
  '444': [{'123': 'abc'}, {'456': 'def'}],
}];

// GOOD
const mappings = [{
  oldId: '123',
  newId: 'abc',
}, {
  oldId: '456',
  newId: 'def',
}];
```

14. Реализуйте свои кастомные классы ошибок от *Error* в соответсвии с вашими негативными сценариями. Например, *ArgumentsError*, *NetworkError*, *DatabaseError*. Таким образом вы легко можете проверить в коде какого типа произошла ошибка и как поступить в данном случае - *error.constructor.name*. Ведь ошибка базы данных, это совсем не то же самое, что неверный аргумент. И еще, не ленитесь, пишите понятные сообщения в об ошибках в *error.message* т.к. стандартные сообщения часто бывают непонятные. Также реализуйте симпатичную страницу ошибки, не только для 404, со ссылкими на главную, страницу помощи и др.. А также симпатичные модалки-нотификации: операция успешна, запрос в процессе обработки, неудалась, повторите ваш запрос и др.. Очень плохо, если в случае клиентской или серверной ошибки, контент вдруг пропадет.
    - ошибки и ситуации, в которых они происходят, станут понятней
    - вы сможете охватить и корректно обработать больше негативных сценариев
    - user experience не пострадает

```js
// BAD
const errorHandler = (err, req, res, next) => {
  res.status(500).json({ message: 'Oops, something bad has happened' });
};

// GOOD
const errorHandler = (err, req, res, next) => {
  switch(err.constructor.name) {
    case 'ArgumentsError':
      return res.status(400).json({
        status: 400,
        message: isDevEnv() ? err.message : 'Bad Request',
      });
    case 'ValidationError':
      return res.status(422).json({
        status: 422,
        message: isDevEnv() ? err.message : 'Unprocessable Entity',
      });
    default:
      return res.status(500).json({
        status: 500,
        message: isDevEnv() ? err.message : 'Internal Server Error',
      });
  }
};
```

15. Когда разрабатываете код, постоянно помните о негативных сценариях, о том, что может пойти не так, где может произойти ошибка. О том, что данные могут прийти совсем не в том формате, который ожидается. О том, что злоумышленник может попытаться найти уязвимость в вашем коде, и системе вцелом, и атаковать... Код, который был написан тольно под идеальный позитивный сценарий - очень хрупкий, его легко сломать, к тому же такой код имеет массу уязвимостей. Код, написанный под негативные сценарии - железобетонный!
    - это сделает код более предсказуемым и надежным

```js
// BAD
const articleHandrer = (req, res, next) => {
  const article = req.body; // contains malicious javascript
  return await this._storage.saveArticle(article);
}

// GOOD
const checkInjectionMiddleware = (req, res, next) => {
  const validated = this._validator.validateBody(req.body);

  if (validated.error) return next(validated.error);

  next();
}
```

16. Продумайте и реализуйте хорошую систему логгирования. Это позволит вам наблюдать и понять, как ваш код работает изнутри в рантайме, к тому же часто это единственный способ поручить информацию о работе серверной части. Пишите понятные сообщения в логах с указанием файла, метода, аргументов и другой полезной информации. Обычно используется 3 уровня логгирования:
- *info* - все сообщения: информационные (важные и неважные), предупреждения и некритичные ошибки, критичные ошибки
- *warn* - только важные информационные сообщения, предупреждения и некритичные ошибки, критичные ошибки
- *error* - только важные информационные сообщения и критичные ошибки
    - это позволит вам отслеживать, как ваш код выполняется на самом деле, какие данные ходят в вашей системе, сколько требуется времени для выполнения разных операций и т.д.
    - отследить неожиданные или неподдерживаемые ситуации
    - вовремя устранить ошибки
    - вы можете сохранять логи в файлы и анализировать работу кода отдельно от его реального запуска и работы

17. Документируйте и типизируйте ваш код. Не ленитесь сделать хорошую доку или интерфейс! Используйте [JSDoc](http://usejsdoc.org/) для JavaScript и интерфейсы с типами для TypeScript. Ваша IDE будет вам подсказывать типы входящих и исходящих данных, и даже проверять их в случае TypeScript. Такие подсказки помогут вам разобраться в коде гораздо легче и сэкономят вам кучу времени, а кастомеру кучу денег.
    - это сделает код проще
    - это сделает код более предсказуемым и надежным

```js
// BAD
const sum = (a, b) => a + b;

// GOOD
/**
 * ### sumRating title here
 * sumRating decription here (optional)
 * @param {Number} prevRating
 * @param {Number} lastGame
 * @returns {Number}
 */
const sumRating = (prevRating, lastGame) => {
  if (!isNumber(prevRating) || !isNumber(lastGame)) {
    throw new ArgumentsError('Invalid arguments');
  }

  return prevRating + lastGame;
};
```

```ts
// BEST (typescript)
const sumRating = (prevRating: number, lastGame: number): number => {
  if (!isNumber(prevRating) || !isNumber(lastGame)) {
    throw new ArgumentsError('Invalid arguments');
  }

  return prevRating + lastGame;
};
```

18. Используйте линтеры для проверки вашего кода во время разработки. ESLint для JavaScript, TSLint для TypeScript. Помимо стиля они проверяют неиспользуемые переменные, уровень блочной вложенности, консистентность возвращаемых типов и т.д. В общем делают ваш код лучше.
    - это сделает код проще

19. Используйте *Dependency injection*, жестко заданнные свойства класса, где хранятся ваши сервисы, утилиты и хелперы - это зло! *Dependency injection* позволит вам уменьшить связность кода, использовать *Design Patterns*, менять сервисы, как плагины, в т.ч. в рантайме, и внедрять фейковые сервисы для тестирования.
    - это уменьшит связность в вашем коде
    - сделает код более мобильным
    - сделает код легко тестируемым

```js
// BAD
class Order {
  constructor() {
    this._storage = new Storage();
    this._validator = new Validator();
  }
}

// GOOD
class Order {
  constructor(params = {}) {
    this._storage = params.storage || new Storage();
    this._validator = params.validator || new Validator();
  }
}

const testOder = new Order({
  storage: new MockStorage(),
  validator: new MockValidator(),
});
```

20. Тестируйте ваш код. Используйте *Dependency injection* для внедрения фейковых зависимостей. Пишите unit-тесты, integration, back-end E2E, front-end / back-end E2E, performance, penetration и т.д. Используйте хорошие фреймворки и библиотеки для тестирования.
    - это повысит качество вашего кода, хороший код - это тестируемый код.
    - это ускорит разработку т.к. вам не нужно будет вручную монотонно тестировать всю функциональность, ведь на это могут уйти часы, и вы все равно что-то упустите. Оставьте эту рутинную работу автотестам.
    - это упростит разработку т.к. вы не будете бояться что-то сломать. Так, что это останется незамеченным, и позже проявит себя, как обычно, в самый неподходящий момент. Ведь тесты вовремя предупредят вас о сбое в системе.
    - тесты повышают надежность системы.
    - метрики собираемые тестами, помогут вам тюнинговать вашу систему, чтобы повысить ее устойчивость и производительность.

```js
// BAD
// no tests here

// GOOD
describe('Order class tests', async () => {
  describe('getOrder() method test', async () => {
    it('should return object', async () => {
      assert.equal(current, expected, 'Custom error message here');
    });
  });
});
```

## Design Patterns in JavaScript and TypeScript

### Adapter

Adapter Pattern `./patterns/adapter`

*Адаптер* преобразует один интерфейс класса к другому интерфейсу, на который расчитывает клиент. Адаптер обеспечивает совместную работу классов, невозможную в обычных условиях из-за несовместимости интерфейсов.

### Reactor

Reactor Pattern `./patterns/reactor`

Oсновные идеи данного шаблона:
- однопоточная архитектура
- неблокирующие операции ввода/вывода.

Реализуется разными способами посредством использования *Event Loop* - с помошью Callback, Observer, Promise, Async/Await.

### Revealing Module

Revealing Module Pattern `./patterns/module`

Одной из основных проблем языка JavaScript является отсутствие пространств имен. Популярным методом решения этой проблемы является шаблон *Revealing Module* (Открытый модуль). Для создания приватных свойств и методов используется ограниченная область видимости внутри функции и замыкания. Модульность платформы *Node.js* активно поощряет следование *принципу единственной ответственности* (Single Responsibility Principle, SRP): каждый модуль должен отвечать только за одну функциональную возможность, и эта ответственность должна быть
полностью реализована этим модулем.

### Substack

Экспортируйте основные функциональные возможности модуля в виде единственной функции. Экспортированная функция используется как пространство имен для прочих вспомогательных возможностей. Экспорт Конструктора / Класса, Фабричной функции - это частные случаи этого общего шаблона.

### Factory

Factory Pattern `./patterns/factory`

Представлены 3 варианта шаблона (отличаются от классического трактования в силу особенностей JavaScript):

- фабричный метод, принадлежит самому классу, обычно используется для создания экземпляра `Singleton`
- фабричная функция, простая функция создающая экземпляр, для поддержки `Dependency Injection` нужно создать замыкание
- фабрика / фабричный класс - классическая реализация, поддерживающая `Dependency Injection`

Главное предназначение Фабрики - инкапсулировать создание экзепляра вместе со всей логикой его создания в одном месте кода (DRY).

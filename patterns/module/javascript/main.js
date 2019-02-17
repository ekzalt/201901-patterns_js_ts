const UserModule = require('./user-module');

const userModule = UserModule();

userModule.save({ name: 'Vasya', age: 30 });
userModule.greet('Vasya');

console.log(userModule.getCalls());

/*
// substack design template
const app = express();
app.use( ... );
*/

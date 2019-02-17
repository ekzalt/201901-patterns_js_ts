import { IStorage } from './interfaces';

// Module creates from function and uses javascript closures

const UserModule = (params: { service?: IStorage } = {}) => {
  const privateService: IStorage = params.service ||
    { save: function(data: Object) {
        console.log(`saving data: ${JSON.stringify(data)}`);
      }
    };

  const privateMethod = (name = 'user') => console.log(`Hello ${name}`);
  let privateValue = 0;

  return {
    save: function(data: Object) {
      privateValue++;
      privateService.save(data);
    },

    greet: function(name: string) {
      privateValue++;
      privateMethod(name);
    },

    getCalls: function() {
      // be care, don't return linked types (Object, Array, Function, etc.)
      // or return copy of linked types
      return privateValue;
    }
  };
};

// substack design template
export default UserModule;

// Module creates from function and uses javascript closures

const UserModule = (params = {}) => {
  const privateService = params.service || { save: function(data) { console.log(`saving data: ${JSON.stringify(data)}`) } };
  const privateMethod = (name = 'user') => console.log(`Hello ${name}`);
  let privateValue = 0;

  return {
    save: function(data) {
      privateValue++;
      privateService.save(data);
    },

    /**
     * @method greet
     * @param {string} name 
     */
    greet: function(name) {
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
module.exports = UserModule;

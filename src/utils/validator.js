export class FormError {
    form = null;
    #schema = {};
    constructor(cForm, schema = {}) {
      this.form = cForm
      this.#schema = schema
    }

    async display(propName, schema = this.#schema) {
      const { [propName]: hooks = [] } = schema
      const afterHooks = await FormError.#invokeHooks(hooks)
      await this.form.validateField([propName])
      return FormError.#invokeHooks(afterHooks)
    }

    static #invokeHooks = async hooks => {
      if (!Array.isArray(hooks)) {
        return
      }
      return Promise.all(
        hooks.map(hook => {
          if (typeof hook === 'function') {
            return Promise.resolve(hook())
          }
        })
      )
    };
}

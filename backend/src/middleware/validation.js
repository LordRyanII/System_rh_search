const { HttpStatusCode } = require("axios");
const { ZodSchema } = require("zod");

const schemas = {
  query: ZodSchema,
  body: ZodSchema,
  params: ZodSchema
}
/**
 * Middleware de validação
 * @param {schemas} schemas - Objeto com as chaves query, body e params que recebe um schema do zod
 */
exports.validation = (schemas) => {
  return async (req, res, next) => {
    const errorsResult = {}

    Object.entries(schemas).forEach(([key, schema]) => {
      try {
        const newValue = schema.parse(req[key])

        req[key] = newValue
      } catch (error) {
        console.log('deu error');
        const errors = {};

        error.issues.forEach((err) => {
          errors[err.path[0]] = err.message;
        });
        errorsResult[key] = errors;

      }
    })

    console.log('error result', errorsResult);

    if(Object.keys(errorsResult).length === 0) {
      return next()
    }

    return res.status(HttpStatusCode.BadRequest).json({errors: errorsResult})
  }

}
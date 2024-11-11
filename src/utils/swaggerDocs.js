import __dirname from "./index.js";
import {dirname} from 'path'
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentacion de app para adoptar mascotas',
            description: 'Esta es una descripcion de la documentacion de adoptame'
        }
    },
    apis: [`${dirname(__dirname)}/docs/**/*.yaml`]
}

export default swaggerOptions;
const {
    deepEqual,
    ok
} = require('assert');

const DEFAULT_ITEM_CADASTRA =  {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}

const database = require('./database');

describe('Suite de manipulação de Herois', () => {
    before( async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRA)
    })
    
    it('Deve pesquisar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRA
        const [resultado] = await database.listar(expected.id)

        deepEqual(resultado, expected)
    })
    
    it('Deve cadastrar um heroi, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRA
        const resultado = database.cadastrar(DEFAULT_ITEM_CADASTRA)
        const [actual] = await database.listar(DEFAULT_ITEM_CADASTRA.id);

        deepEqual(actual, expected)
    })

    it('Deve remover um heroi por id', async () => {
        const expected = true;
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRA.id)

        deepEqual(resultado, expected);
    })
})
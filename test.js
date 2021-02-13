const { deepEqual, ok } = require("assert");

const DEFAULT_ITEM_CADASTRAR = {
  id: 1,
  nome: "Flash",
  poder: "Speed",
};

const DEFAULT_ITEM_ATUALIZAR = {
  nome: "Lanterna Verde",
  poder: "Energia do anel",
  id: 2,
};

const database = require("./database");

describe("Suite de manipulação de Herois", () => {
  before(async () => {
    const cadastro = await database.listar(DEFAULT_ITEM_CADASTRAR.id);
    const atualização = await database.listar(DEFAULT_ITEM_ATUALIZAR.id);
    if (!cadastro) await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
    if (!atualização) await database.cadastrar(DEFAULT_ITEM_ATUALIZAR);
  });

  it("Deve pesquisar um heroi usando arquivos", async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    const resultado = await database.listar(expected.id, expected);

    deepEqual(resultado, expected);
  });

    it("Deve cadastrar um heroi, usando arquivos", async () => {
      const expected = DEFAULT_ITEM_CADASTRAR;
      const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
      const actual = await database.listar(DEFAULT_ITEM_CADASTRAR.id);

      deepEqual(actual, expected);
    });

    it("Deve remover um heroi por id", async () => {
      const expected = true;
      const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id);

      deepEqual(resultado, expected);
    });

    it("Deve atualizar um heroi pelo id", async () => {
      const expected = {
        ...DEFAULT_ITEM_ATUALIZAR,
        nome: "Batman",
        poder: "Dinheiro",
      };
      const novoDado = {
        nome: "Batman",
        poder: "Dinheiro",
      };
      await database.atualizar(expected.id, novoDado);
      const resultado = await database.listar(expected.id);

      deepEqual(resultado, expected);
    });
});

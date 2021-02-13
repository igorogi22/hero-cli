const Commander = require("commander");

const database = require("./database");
const Heroi = require("./heroi");

(async () => {
  Commander.version("v1")
    .option("-n, --nome [value]", "Nome do heroi")
    .option("-p, --poder [value]", "Poder do heroi")
    .option("-i, --id [value]", "ID do heroi")
    .option("-c, --cadastrar", "Cadastrar um heroi")
    .option("-l, --listar", "Listar um heroi")
    .option("-r, --remover", "Remove um heroi")
    .option("-a, --atualizar [value]", "Atualizar um heroi")
    .parse(process.argv);

  const options = Commander.opts();
  const heroi = new Heroi(options);

  try {
    if (options.cadastrar) {
      delete heroi.id;
      const resultado = await database.cadastrar(heroi);
      if (!resultado) {
        console.error("Heroi não foi cadastrado");
        returnn;
      }
      console.log("Heroi cadastrado com sucesso!!");
      return;
    }

    if (options.listar) {
      const resultado = await database.listar(parseInt(heroi.id));
      console.log(resultado);
      return;
    }

    if (options.remover) {
      const resultado = await database.remover(options.id);
      if (!resultado) {
        console.error("Não foi possivel remover o heroi");
      }
      console.log("Heroi removido com sucesso!!");
      return;
    }

    if (options.atualizar) {
        const dado = JSON.stringify(heroi);
        const heroiAtualizar = JSON.parse(dado);
        const resultado = await database.atualizar(parseInt(options.atualizar), heroiAtualizar);
      if (!resultado) {
        console.error("Não foi possivel atualizar o heroi");
        return;
      }
      console.log("Heroi atualizado com sucesso!!");
      return;
    }
  } catch (error) {
    console.error("Houve algo inesperado", error);
  }
})();

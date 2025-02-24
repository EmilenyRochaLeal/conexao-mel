import { PrismaClient, Roledemel } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Criando usuários (vendedores e compradores) se ainda não existirem
  const vendedores = await prisma.user.createMany({
    data: [
      { name: "Diego Ferreira", email: "diego@email.com", password: "segredo123", role: "VENDEDOR" },
      { name: "Eliana Rocha", email: "eliana@email.com", password: "segredo123", role: "VENDEDOR" },
      { name: "Fernando Lima", email: "fernando@email.com", password: "segredo123", role: "VENDEDOR" },
    ],
    skipDuplicates: true, // Evita erro caso o usuário já exista
  });

  const compradores = await prisma.user.createMany({
    data: [
      { name: "Alice Silva", email: "alice@email.com", password: "senha456", role: "COMPRADOR" },
      { name: "Bruno Souza", email: "bruno@email.com", password: "senha456", role: "COMPRADOR" },
      { name: "Carla Mendes", email: "carla@email.com", password: "senha456", role: "COMPRADOR" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Vendedores e compradores inseridos com sucesso!");

  // Buscar vendedores e compradores após a inserção
  const listaVendedores = await prisma.user.findMany({ where: { role: "VENDEDOR" } });
  const listaCompradores = await prisma.user.findMany({ where: { role: "COMPRADOR" } });

  if (listaVendedores.length < 1 || listaCompradores.length < 1) {
    console.error("❌ Erro: É necessário pelo menos um vendedor e um comprador cadastrados.");
    process.exit(1);
  }

  // Criando produtos com estoque inicial
  const produtos = await prisma.produto.createMany({
    data: [
      {
        name: "Mel de Eucalipto",
        preco: 25.50,
        descricao: "Mel puro de eucalipto, excelente para a saúde respiratória.",
        role: Roledemel.Eucalipto,
        vendedorId: listaVendedores[0].id,
        estoque: 100.0,
      },
      {
        name: "Mel de Laranjeira",
        preco: 30.00,
        descricao: "Sabor suave e cítrico, ótimo para adoçar chás.",
        role: Roledemel.Laranjeira,
        vendedorId: listaVendedores[1].id,
        estoque: 150.0,
      },
      {
        name: "Mel Silvestre",
        preco: 28.90,
        descricao: "Mel extraído de diversas flores silvestres, sabor único.",
        role: Roledemel.Silvestre,
        vendedorId: listaVendedores[2].id,
        estoque: 200.0,
      },
    ],
  });

  console.log("✅ Produtos inseridos com sucesso!");

  // Buscar produtos recém-criados
  const produtosCadastrados = await prisma.produto.findMany();

  // Criando pedidos e reduzindo o estoque
  for (const comprador of listaCompradores) {
    const produtoEscolhido = produtosCadastrados[Math.floor(Math.random() * produtosCadastrados.length)];
    const quantidadeCompra = 10.0; // Exemplo: o comprador quer comprar 10 litros

    if (produtoEscolhido.estoque >= quantidadeCompra) {
      await prisma.pedido.create({
        data: {
          compradorId: comprador.id,
          estado: "ANDAMENTO",
          totalPrice: produtoEscolhido.preco * quantidadeCompra,
          produtoId: produtoEscolhido.id,
          quantidade: quantidadeCompra,
        },
      });

      // Atualizando o estoque do produto
      await prisma.produto.update({
        where: { id: produtoEscolhido.id },
        data: { estoque: { decrement: quantidadeCompra } },
      });

      console.log(`✅ Pedido criado para ${comprador.email} - ${quantidadeCompra} litros de ${produtoEscolhido.name}`);
    } else {
      console.log(`❌ Estoque insuficiente para ${produtoEscolhido.name}`);
    }
  }

  // Criando avaliações de produtos
  await prisma.avaliacao.createMany({
    data: [
      {
        produtoId: produtosCadastrados[0].id,
        compradorId: listaCompradores[0].id,
        avaliacao: 5,
        descricao: "Mel excelente! Sabor incrível e ótima qualidade.",
      },
      {
        produtoId: produtosCadastrados[1].id,
        compradorId: listaCompradores[1].id,
        avaliacao: 4,
        descricao: "Gostei muito, mas esperava um sabor um pouco mais forte.",
      },
      {
        produtoId: produtosCadastrados[2].id,
        compradorId: listaCompradores[2].id,
        avaliacao: 5,
        descricao: "Ótimo produto! Vale muito a pena.",
      },
    ],
  });

  console.log("✅ Avaliações inseridas com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

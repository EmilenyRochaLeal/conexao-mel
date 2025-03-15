import { PrismaClient, Roledemel, UserType, PedidoEstado } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  await prisma.user.createMany({
    data: [
      { name: "Diego Ferreira", email: "diego@email.com", password: "Segredo@123", telefone: "8998101122",  role: UserType.VENDEDOR },
      { name: "Eliana Rocha", email: "eliana@email.com", password: "Segredo12@3", telefone: "8998103345",role: UserType.VENDEDOR },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Vendedores e compradores inseridos com sucesso!");


  const listaVendedores = await prisma.user.findMany({ where: { role: UserType.VENDEDOR } });
  const listaCompradores = await prisma.user.findMany({ where: { role: UserType.COMPRADOR } });

  if (listaVendedores.length < 1 || listaCompradores.length < 1) {
    console.error("❌ Erro: É necessário pelo menos um vendedor e um comprador cadastrados.");
    process.exit(1);
  }

 
  await prisma.produto.createMany({
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
    skipDuplicates: true,
  });

  console.log("✅ Produtos inseridos com sucesso!");

  
  const produtosCadastrados = await prisma.produto.findMany();

 
  for (const comprador of listaCompradores) {
    const produtoEscolhido = produtosCadastrados[Math.floor(Math.random() * produtosCadastrados.length)];
    const quantidadeCompra = 10.0; 
  
    if (produtoEscolhido.estoque.toNumber() >= quantidadeCompra) {
      await prisma.pedido.create({
        data: {
          compradorId: comprador.id, 
          estado: PedidoEstado.ANDAMENTO,
          totalPrice: produtoEscolhido.preco.toNumber() * quantidadeCompra, // Convertendo para evitar erro
          produtoId: produtoEscolhido.id, 
          quantidade: quantidadeCompra,
        },
      });
  
      // Atualizando o estoque do produto
      await prisma.produto.update({
        where: { id: produtoEscolhido.id },
        data: { estoque: { decrement: quantidadeCompra } },
      });
  
      console.log(`Pedido criado para ${comprador.email} - ${quantidadeCompra} litros de ${produtoEscolhido.name}`);
    } else {
      console.log(`Estoque insuficiente para ${produtoEscolhido.name}`);
    }
  }
  

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
    skipDuplicates: true,
  });

  console.log("Avaliações inseridas com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

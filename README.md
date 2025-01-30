# conexao-mel
Repositorio da startup Conexão Mel

# criar branch 
1. git switch -c nome branch
2. git branch # em qual branch está 
3. git checkout nome branch # para mudar de branch 

# Cadastro 
<h3>controller</h3>
 1. Criar dentro do controller uma pasta user, depois criar o arquivo CreateUserController.ts;
 2. O controller terá um método async handle que cuidará da Request e Response;
 3. O controller repassa para o service as requisições;
 4. Intânciar o services;
 5. Acessar o método execute com await para aguardar o tempo de resposta;

<h3>routes.ts</h3>
 1. No arquivo das routes primeiro fazer a importação do CreateControllerUser
 2. Criar uma rota post
 2. Instanciar o controller e chamar o método handle

 <h3>services</h3>
 1. Desenvolver a lógica 
 2. Criar uma interface chamada UserRequest com os campos name, email e password
 3. Criar uma class CreateUserService
 4. Criar o método execute com async e com os parametros name, email e password do tipo UserRequest
 <h4>Cadastrar no banco de dados</h4> </br>
 1. Em services importa o prismaClient sem chaves, pois é export default </br>
 2. Fazer as verificações dos campos como se há um email ou se o email digitado já existe com prismaClient.user.findFirt </br>
 3. Cadastrar os dados no banco com prismaClient.user.create
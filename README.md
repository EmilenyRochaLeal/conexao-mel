# conexao-mel
Repositorio da startup Conexão Mel

# criar branch 
1. git switch -c nome branch</br>
2. git branch # em qual branch está </br>
3. git checkout nome branch # para mudar de branch </br>

# Cadastro 
<h3>controller</h3>
 1. Criar dentro do controller uma pasta user, depois criar o arquivo CreateUserController.ts; </br>
 2. O controller terá um método async handle que cuidará da Request e Response;</br>
 3. O controller repassa para o service as requisições;</br>
 4. Intânciar o services;</br>
 5. Acessar o método execute com await para aguardar o tempo de resposta;</br>

<h3>routes.ts</h3>
 1. No arquivo das routes primeiro fazer a importação do CreateControllerUser</br>
 2. Criar uma rota post</br>
 2. Instanciar o controller e chamar o método handle</br>

 <h3>services</h3>
 1. Desenvolver a lógica </br>
 2. Criar uma interface chamada UserRequest com os campos name, email e password</br>
 3. Criar uma class CreateUserService</br>
 4. Criar o método execute com async e com os parametros name, email e password do tipo UserRequest
 <h4>Cadastrar no banco de dados</h4> </br>
 1. Em services importa o prismaClient sem chaves, pois é export default </br>
 2. Fazer as verificações dos campos como se há um email ou se o email digitado já existe com prismaClient.user.findFirt </br>
 3. Cadastrar os dados no banco com prismaClient.user.create

 # Criptografia da senha 
 [Entenda a bcryptjs](https://dev.to/mr_walkr/password-hashing-in-nodejs-using-bcryptjs-library-3j56)
1. Instalar as dependências 
Usando yarn 
```bash 
    yarn add bcryptjs
    yarn add @types/bryptjs -D
```
2. import em services e usar o hash para criptografar o password com 8 salt rounds

# Autenticação 
1. criar um service # AuthUserService
2. criar um controller # AuthUserController
3. criar a rota 
4. fazer as verificações 

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
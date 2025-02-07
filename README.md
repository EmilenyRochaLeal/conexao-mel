# conexao-mel
Repositorio da startup Conexão Mel

##  Configuração do Banco de Dados online (Neon PostgreSQL)
### Rodando as Migrações do Banco
Após configurar o .env, aplique as migrações para garantir que a estrutura do banco está correta:

``` npx prisma migrate deploy ```

Caso queira rodar localmente as migrações para desenvolvimento:

``` npx prisma migrate dev ```

### Executando o Prisma Studio
Para visualizar os dados do banco diretamente em uma interface gráfica:

``` npx prisma studio ```

Isso abrirá uma interface no navegador (localhost:5555) onde você pode visualizar e modificar registros.

### Iniciando o Servidor
Após a configuração, inicie o servidor Express:

``` npm run dev ```
Se estiver usando yarn:

``` yarn dev ```


### Possíveis Erros e Soluções
🔴 Erro P1001: Can't reach database server
Isso acontece quando o banco no Neon está suspenso.
✅ Solução:
Acesse o Neon Console e ative o banco.
Depois, tente novamente:

``` npx prisma migrate deploy ```

🔴 Erro Prisma Studio: "Unable to run script"
Isso indica que o Prisma Client precisa ser atualizado. 
✅ Solução:

``` npx prisma generate ``` 
E tente novamente:

``` npx prisma studio ``` 

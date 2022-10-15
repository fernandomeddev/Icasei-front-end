Realize o download do projeto
git clone [link do repositorio]

instalar as dependencias via NPM ou YARN.
npm install OU yarn install

criar as variaveis de ambiente, para acesso ao MongoDB e Secret JWT, no arquivo .env (segue .env-example para facilitar em caso de duvidas).

Para inicializar o projeto!

npm start

Acesse http://localhost:3333/ e os EndPoints estarão disponiveis

Documentação das API`s estão disponiveis em http://localhost:3333/api-docs

API POST/auth/register Criar um usuário admin para criar as contas e efetuar operações restritas aos admins conforme documentação.
# locadora de carros

# Modelo de requesitos

**RF** => requesitos funcionais
Funções
**RNF** => requesitos não funcionais
Especificações e configurações
**RN** => regras de negócio
Padrões e regras a ser seguidas(limitações necessárias do sistema)

# Cadastro de carros
**RF**
Deve ser possível cadastrar um novo carro.

**RN**
Não deve ser possível cadastrar carros com mesma placa.
Não deve ser possível alterar a placa de carros criados.
O carro deve ser cadastrado com disponibilidade por padrão.
*Permite apenas cadastro por usuário admin.

# Listagem do carro
**RF**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**
Usuário não precisa estar logado.

# Cadastro de especificação no carro
**RF**
Deve ser possível cadastrar uma especificação para um carro.


**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
Permite apenas cadastro por usuário admin.


# Cadastro de imagens do carro
**RF**
Deve ser possível cadastrar a imagem do carro.

**RNF**
Utilizar o multer para upload dos arquivos

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
Permite apenas cadastro por usuário admin.

# Aluguel de carro
**RF**
Deve ser possível cadastrar um aluguel

**RN**
O aluguel deve ter duração mínima de 24 hora.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
O usuário deve estar logado na aplicação.
Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.

# Devolução de carro
**RF**
Deve ser possível realizar a devolução de um carro

**RN**
Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do aluguel.
Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
Caso haja multa, deverá ser somado ao total do aluguel.
O usuário deve estar logado na aplicação.

# Listagem de Alugueis para usuário
**RF**
Deve ser possível realizar a busca de todos os alugueis para o usuário

**RN**
O usuário deve estar logado na aplicação

# Recuperar Senha
**RF**
Deve ser possível para o usuário recuperar a senha informando o email
O usuário deve receber um email com o passo a passo para a recuperação da senha
O usuário deve conseguir inserir uma nova senha

**RN**
O usuário precisa informar uma nova senha
O link enviado para a recuperação deve expirar em 3 horas

# Lista dos principais erros encontrados e com solução

**Erro:** API faz todo processo de criação e retorna o registro sem erro, mas não salva no banco.
**Solução:** Adicionar a seguinte linha no arquivo ../repositories/...Repository
'await this.repository.save(rental);'
**Frequencia** 2 vezes

**Erro:** Durante execução do yarn test, erros de referência na importação é encontrado.
**Solução:** Remover @ e substituir pelo caminho real. O atalho de dependência automatica está com conflito com o test.
**Frequencia** Mais de 10 vezes

**Erro** Internal server error - TypeInfo not known for \"ResetPasswordUserUseCase\"
**Solução:** Adicionar ou corrigir o '@injectable()' no UseCase
**Frequencia** 3 vezes

**Erro** se erro can't read property '' of undefined.
**Solução:** o que vem antes do metodo retorna nulo, vazio ou não instanciada.
erro no devolution 

**Erro** link da imagem está com undefined
**Solução** debugar para ver a solução
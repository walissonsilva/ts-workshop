# Workshop de TypeScript

## 00:00 - 00:05 | Introdução

- Apresentação do objetivo do workshop
- O que é o TypeScript?
  [JavaScript With Syntax For Types.](https://www.typescriptlang.org/)
- Por que estudar o TypeScript?
  - Há um crescimento enorme da utilização dela nos últimos anos
    [The top programming languages](https://octoverse.github.com/2022/top-programming-languages)
- As vantagens do TypeScript
  - Types
  - Utilização de um JS mais recente (compilado para funcionar em browsers mais antigos)
  - Adiciona novos recursos, que não existem no JS (ex.: Interfaces e Generics)
  - Muitas opções de configurações
  - Melhores sugestões de código em IDEs que têm um suporte melhorado ao TS
- Motivação: por que a tipagem forte melhora o backend
  - Previne bugs antes da execução
  - Facilita a leitura e manutenção do código
  - Melhora a testabilidade
  - Incentiva ao design orientado a dados
  - Melhora a *developer experience (*DX*)*
  - Permite refatorações mais seguras
  - Reduz testes manuais e _edge cases_ esquecidos
- Frase provocadora: “TypeScript é um contrato, não só uma anotação.”

  - Explicação
    Essa frase — **“TypeScript é um contrato, não só uma anotação”** — resume uma mentalidade essencial para tirar o máximo proveito do TypeScript, especialmente no backend. Vamos destrinchar o que ela quer dizer:

    ***

    ### 🧾 **Anotação vs. Contrato**

    - **Anotação** é apenas um comentário formalizado, algo que _parece_ útil, mas que pode ser ignorado ou quebrado sem maiores consequências.
      - Ex: em linguagens dinamicamente tipadas, um comentário pode dizer "isso é um `string`", mas nada impede de você passar um número.
    - **Contrato**, por outro lado, é um acordo **formal, válido e exigível**:
      > “Se você me der isso, eu devolvo aquilo. Mas se você violar o contrato, o compilador não vai deixar passar.”

    ***

    ### ✅ Por que enxergar os tipos como contratos muda o jogo?

    1. **Responsabilidades ficam claras**

       Cada função, classe ou módulo deixa explícito o que aceita e o que retorna. Isso **evita mal-entendidos** e **documenta o sistema por si só**.

    2. **Impedem mau uso do código**

       Um contrato forte (tipo bem definido) **impede que partes do sistema usem a função de maneira incorreta**.

    3. **Facilitam a refatoração com confiança**

       Quando tipos mudam, o contrato quebra e o TypeScript aponta onde é preciso ajustar, **reduzindo efeitos colaterais inesperados**.

    4. **Permite programar por intenção**

       Você escreve menos _como_ algo será feito e mais _o que_ deve ser feito — quem consome a função **não precisa saber da lógica interna, só do contrato**.

    ***

    ### 📌 Exemplo rápido:

    ```
    // Um contrato bem definido
    type CreateUserDto = {
      name: string;
      email: string;
      password: string;
    };

    // Função com contrato de entrada e saída
    function createUser(data: CreateUserDto): Promise<User> {
      // ...
    }

    ```

    - Aqui, o contrato `CreateUserDto` deixa claro o que é obrigatório.
    - Se alguém tentar passar `{ name: 'Ana' }`, o compilador **rejeita a requisição** — o contrato foi quebrado.

    ***

    ### 🎯 Conclusão:

    > Pensar em TypeScript como um sistema de contratos rigorosos entre partes do código muda a forma como você projeta, testa e mantém uma aplicação.
    > Você gostaria de incluir esse conceito com analogias visuais (como contrato jurídico ou contrato entre microserviços) no seu workshop? Posso montar um slide com isso também.

## 00:05-00:15 | Revisão Breve: Tipagem Básica

> Objetivo: nivelar rapidamente os tipos primitivos e composições básicas.

- string, number, boolean, any, unknown
- type vs interface
  - Tipagem de funções
- União e Interseção (|, &)
- Inferência vs anotação explícita
- `as` vs `satisfies`

Exemplo contextualizado: DTOs simples no Nest.js

```tsx
export type CreateUserDto = {
  name: string;
  email: string;
  age?: number;
};
```

Atividade Rápida (em dupla): Transformar 3 objetos JS soltos em type e interface.

- Exemplos

  ### 📦 Tipagens Básicas com TypeScript (contexto backend)

  ***

  ### 🔹 1. **Tipos Primitivos**

  ```tsx
  const id: number = 123;
  const nome: string = "Walisson";
  const ativo: boolean = true;
  const dataCriacao: Date = new Date();
  ```

  ***

  ### 🔹 2. **Inferência vs. Anotação Explícita**

  ```tsx
  // Inferência: TS entende que é string
  const status = "pendente";

  // Anotação explícita
  let prioridade: "alta" | "média" | "baixa";
  prioridade = "alta"; // OK
  // prioridade = "urgente"; // ❌ Erro: não faz parte do tipo
  ```

  ***

  ### 🔹 3. **Type vs Interface**

  ### 🟦 `type` (mais flexível, ótimo para composição)

  ```tsx
  type Usuario = {
    id: number;
    nome: string;
    email: string;
  };
  ```

  ### 🟩 `interface` (excelente para OOP e Nest.js)

  ```tsx
  interface Produto {
    id: number;
    nome: string;
    preco: number;
  }
  ```

  ### 🔁 Ambos podem ser estendidos:

  ```tsx
  type Admin = Usuario & { permissao: string };
  interface ProdutoComEstoque extends Produto {
    estoque: number;
  }
  ```

  ***

  ### 🔹 4. **Tipos de União e Interseção**

  ### `|` união: **um ou outro**

  ```tsx
  type MetodoPagamento = "boleto" | "pix" | "cartao";

  function processarPagamento(metodo: MetodoPagamento) {
    console.log(`Processando via ${metodo}`);
  }
  ```

  ### `&` interseção: **junção de dois contratos**

  ```tsx
  type Base = { id: number };
  type ComTimestamps = { criadoEm: Date; atualizadoEm: Date };

  type EntidadeCompleta = Base & ComTimestamps;

  const cliente: EntidadeCompleta = {
    id: 1,
    criadoEm: new Date(),
    atualizadoEm: new Date(),
  };
  ```

  ***

  ### 🔹 5. **Tipos Literais e Enumeração Simples**

  ```tsx
  type Status = "ativo" | "inativo" | "pendente";

  function atualizarStatus(usuarioId: number, novoStatus: Status) {
    // lógica...
  }
  ```

  > 📝 Alternativa com enum (se preferir algo mais verboso e clássico):

  ```tsx
  enum StatusUsuario {
    ATIVO = "ativo",
    INATIVO = "inativo",
    PENDENTE = "pendente",
  }
  ```

  ***

  ### 🔹 6. **Tipo Optional com `?`**

  ```tsx
  type CriarProdutoDTO = {
    nome: string;
    preco: number;
    descricao?: string; // opcional
  };
  ```

  ***

  ## 🆚 `as` vs `satisfies`

  - Explicação

    ### 🔸 `as`: **Type Assertion (afirmação de tipo)**

    > Você diz ao TypeScript: “confie em mim, esse valor tem esse tipo.”

    ```
    const usuario = {
      nome: "Ana",
      idade: 30,
    } as { nome: string; idade: number };

    ```

    - ✅ **Aceita o tipo, mesmo se incompleto ou com propriedades extras.**
    - ❌ **Não valida nada de verdade** — é como dizer "eu prometo que isso tá certo", e o TS apenas confia.
    - 🧨 Pode mascarar erros graves, especialmente em objetos grandes ou dinâmicos.

    ***

    ### 🔸 `satisfies`: **Validação de tipo sem perder inferência**

    > Você diz: “esse valor deve satisfazer esse tipo” — e o TypeScript verifica completude e consistência.

    ```
    const usuario = {
      nome: "Ana",
      idade: 30,
      admin: false,
    } satisfies { nome: string; idade: number };
    // ❌ Erro: propriedade extra 'admin' não é esperada

    ```

    - ✅ Garante que o objeto **realmente atende ao contrato**.
    - ✅ **Preserva a inferência** das chaves e tipos.
    - ✅ Aponta erros se faltar algo ou tiver algo a mais (dependendo do tipo).
    - 🔄 Mais seguro para tipagem de objetos e uso em validações, schemas, etc.

    ***

    ## 🧪 Exemplo comparativo prático:

    Imagine que temos um contrato de tipo:

    ```
    type Config = {
      ambiente: "dev" | "prod";
      porta: number;
    };

    ```

    ### Com `as`:

    ```
    const config = {
      ambiente: "dev",
    } as Config; // ❌ Não aponta erro (mas está incompleto!)

    ```

    ### Com `satisfies`:

    ```
    const config = {
      ambiente: "dev",
    } satisfies Config; // ✅ Aponta erro: está faltando `porta`

    ```

    ***

    ## 🤔 Então... Qual é melhor?

    | Critério            | `as`                                                       | `satisfies`                                                          |
    | ------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------- |
    | Confirmação de tipo | **Forçada**                                                | **Validada**                                                         |
    | Preserva inferência | ❌ Não                                                     | ✅ Sim                                                               |
    | Pode ocultar erro   | ✅ Sim                                                     | ❌ Não                                                               |
    | Uso recomendado     | Quando você **tem certeza absoluta** do tipo e quer forçar | Quando quer validar objetos **sem perder autocompletes e segurança** |

    ***

    ### ✅ **Recomendação geral:**

    > Prefira satisfies sempre que possível, especialmente ao declarar objetos que devem seguir contratos específicos.

    ***

    Se quiser, posso preparar exemplos no contexto do seu workshop — como `CreateUserDto` ou configurações de ambiente — usando ambos para ilustrar erros que `as` não detecta e `satisfies` detecta. Deseja isso?

## 00:15 - 00:30 | Tipos de Funções e Retornos

> Objetivo: reforçar assinatura de funções e boas práticas para testabilidade.

### 🟦 **1. Tipagem de parâmetros e retorno**

```
function soma(a: number, b: number): number {
  return a + b;
}

function saudacao(nome: string): string {
  return `Olá, ${nome}`;
}

```

---

### 🟨 **2. Funções como tipo**

```
type Operacao = (a: number, b: number) => number;

const multiplicar: Operacao = (a, b) => a * b;

```

---

### 🟩 **3. Função que retorna `void` (sem retorno útil)**

```
function logMensagem(msg: string): void {
  console.log(`[LOG]: ${msg}`);
}

```

---

### 🟥 **4. Função que retorna `never` (nunca retorna com sucesso)**

```
function erroFatal(mensagem: string): never {
  throw new Error(mensagem);
}

```

> Usado em validações críticas ou guard clauses que interrompem a execução.

---

### 🟦 **5. Função assíncrona com tipo de retorno**

```tsx
async function buscarUsuarioPorId(id: number): Promise<Usuario | null> {
  // Simula chamada ao banco
  return { id, nome: "Maiully", email: "maiully@email.com" };
}
```

---

### 🟪 **6. Exemplo com função como parâmetro (callback tipado)**

```tsx
function processarLista<T>(lista: T[], callback: (item: T) => void): void {
  for (const item of lista) {
    callback(item);
  }
}

processarLista(["A", "B", "C"], (item) => console.log(item));
```

---

## 00:30 - 00:45 | Trabalhando com Objetos Complexos e Utility Types

> Objetivo: mostrar como tipar objetos aninhados e usar tipos utilitários

### 🟦 **1. Objetos aninhados**

> Objetos com estruturas internas — muito comum em payloads de APIs.

```tsx
type Endereco = {
  rua: string;
  cidade: string;
  cep: string;
};

type Usuario = {
  id: number;
  nome: string;
  email: string;
  endereco: Endereco;
};

const usuario: Usuario = {
  id: 1,
  nome: "Maiully",
  email: "maiully@email.com",
  endereco: {
    rua: "Rua das Flores",
    cidade: "São Paulo",
    cep: "01010-000",
  },
};
```

---

### 🟨 **2. `Partial<T>` – Torna tudo opcional**

> Útil para atualizações (ex: UpdateUserDto).

---

```tsx
type UpdateUsuarioDto = Partial<Usuario>;

const atualizacaoParcial: UpdateUsuarioDto = {
  email: "novo@email.com",
};
```

### 🟩 **3. `Required<T>` – Torna tudo obrigatório**

> Às vezes útil para garantir consistência total no uso interno, mesmo que o input permita campos opcionais.

```tsx
type UsuarioCompleto = Required<UpdateUsuarioDto>;
// todas as propriedades agora são obrigatórias
```

---

### 🟫 **4. `Omit<T, K>` – Remove propriedades do tipo**

> Ideal para esconder campos sensíveis em retornos de API (ex: senhas).

```tsx
type UsuarioComSenha = Usuario & { senha: string };

type UsuarioPublico = Omit<UsuarioComSenha, "senha">;

const retornoPublico: UsuarioPublico = {
  id: 1,
  nome: "Maiully",
  email: "maiully@email.com",
  endereco: {
    rua: "Rua das Flores",
    cidade: "São Paulo",
    cep: "01010-000",
  },
};
```

---

### 🟦 **5. `Pick<T, K>` – Escolhe apenas algumas propriedades**

> Muito útil para DTOs enxutos ou identificadores.

```tsx
type IdentificadorUsuario = Pick<Usuario, "id" | "email">;

const idUsuario: IdentificadorUsuario = {
  id: 1,
  email: "maiully@email.com",
};
```

---

### 🟧 **6. `Readonly<T>` – Imutabilidade**

> Bom para proteger configurações, constantes, ou dados sensíveis.

```tsx
type Configuracoes = {
  ambiente: "dev" | "prod";
  porta: number;
};

const config: Readonly<Configuracoes> = {
  ambiente: "prod",
  porta: 3000,
};

// config.porta = 4000; // ❌ Erro: propriedade é somente leitura
```

---

## 00:45 - 01:00 | Generics na prática

### 🟦 **1. Função genérica básica**

> Pode receber e retornar qualquer tipo, mantendo a consistência.

```
function primeiroElemento<T>(lista: T[]): T | undefined {
  return lista[0];
}

const nomes = ["Ana", "Bruno", "Carlos"];
const primeiroNome = primeiroElemento(nomes); // tipo inferido: string

const ids = [1, 2, 3];
const primeiroId = primeiroElemento(ids); // tipo inferido: number

```

---

### 🟨 **2. Função com múltiplos tipos genéricos**

```
function combinar<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}

const resultado = combinar("id", 123); // tipo: [string, number]

```

---

### 🟩 **3. Função genérica com restrição (`extends`)**

> Garante que o tipo tenha certas chaves.

```
function buscarPorId<T extends { id: number }>(lista: T[], id: number): T | undefined {
  return lista.find(item => item.id === id);
}

const usuarios = [
  { id: 1, nome: "Maiully" },
  { id: 2, nome: "Iris" },
];

const usuario = buscarPorId(usuarios, 2); // OK

```

---

### 🟪 **4. Repositório genérico (padrão backend)**

```
type BaseEntity = { id: number };

class Repository<T extends BaseEntity> {
  private data: T[] = [];

  create(item: T): T {
    this.data.push(item);
    return item;
  }

  findAll(): T[] {
    return this.data;
  }

  findById(id: number): T | undefined {
    return this.data.find(item => item.id === id);
  }
}

// Usando com `Usuario`
type Usuario = { id: number; nome: string };

const repoUsuario = new Repository<Usuario>();
repoUsuario.create({ id: 1, nome: "Maiully" });

const todos = repoUsuario.findAll(); // Tipo: Usuario[]

```

---

### 🟥 **5. Serviço genérico com retorno customizado**

> Exemplo de aplicação para validações ou transformação de dados

```
function mapear<T, R>(lista: T[], transformador: (item: T) => R): R[] {
  return lista.map(transformador);
}

const emails = mapear(
  [{ nome: "Ana", email: "ana@email.com" }],
  (u) => u.email
); // Tipo: string[]

```

---

### 🟫 **6. Utility type com `keyof` e generics**

> Filtrar uma lista com base em um campo dinamicamente tipado

```
function filtrarPorCampo<T, K extends keyof T>(lista: T[], campo: K, valor: T[K]): T[] {
  return lista.filter(item => item[campo] === valor);
}

const tarefas = [
  { id: 1, status: "pendente" },
  { id: 2, status: "concluída" },
];

const pendentes = filtrarPorCampo(tarefas, "status", "pendente"); // OK

```

---

### 💡 Atividade sugerida

> Entregue um type Pedido = { id: number; status: string; clienteId: number }, e peça:

1. Criar uma `Repository<Pedido>`
2. Criar uma função `buscarPorClienteId` usando generic com filtro por campo
3. Criar uma função `transformarPedido` com generic `map<T, R>`

---

Se quiser, posso converter isso em desafios interativos (ex: playground, slide com código incompleto, ou PDF com explicações) para uso no workshop. Deseja isso?

const soma = (num1: number, num2: number) => {
  return num1 + num2
}

const resultado = soma(20, 10)
console.log(resultado)

// Vamos considerar o contrato de uma mensagem de outbound (objeto)

// messageId
// tenantId
// contactId
// central
// messageType
// content
// supplierSession: objeto que contém o id do atendimento, a data de abertura do atendimento, e os dados do gerente (nome e email) dentro de outro objeto

// Como podemos fazer a tipagem desse objeto

type MessageType = "TEXT" | "ACTIVE_MESSAGE";

enum MessageTypeEnum {
  TEXT = "TEXT",
  ACTIVE_MESSAGE = "ACTIVE_MESSAGE"
}

interface MessageBase {
  messageId: string;
  tenantId: string;
  contactId: string;
  central: string;
  messageType: MessageType;
  supplierSession: {
    sessionId: string;
    sessionStart: string;
    manager: {
      name: string;
      email: string;
    };
  };
}

interface TextMessage extends MessageBase {
  messageType: "TEXT";
  text: string;
}

interface ActiveMessage extends MessageBase {
  messageType: "ACTIVE_MESSAGE";
  intentionId: string;
  params: string[];
}

// Alternativa para a tipagem do MessageType
type MessageTypeAlternative = MessageBase["messageType"];

const textMessage: TextMessage = {
  messageId: "msg123",
  tenantId: "tenant456",
  contactId: "contact789",
  central: "centralABC",
  messageType: "TEXT",
  supplierSession: {
    sessionId: "session001",
    sessionStart: "2023-10-01T12:00:00Z",
    manager: {
      name: "John Doe",
      email: "email@email.com"
    }
  },
  text: "Hello, this is a text message."
};

const activeMessage: ActiveMessage = {
  messageId: "msg456",
  tenantId: "tenant789",
  contactId: "contact012",
  central: "centralXYZ",
  messageType: "ACTIVE_MESSAGE",
  supplierSession: {
    sessionId: "session002",
    sessionStart: "2023-10-02T12:00:00Z",
    manager: {
      name: "Jane Smith",
      email: "email@email.com"
    }
  },
  intentionId: "intention123",
  params: ["param1", "param2"]
};

const imcompleteTextMessage = {
  messageId: "msg789",
} satisfies Partial<TextMessage>;


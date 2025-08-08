function getArrayFirstElement<T>(array: T[]): T | undefined {
  return array[0];
}

const firstElement = getArrayFirstElement(["banana", "2", "3"]);

console.log(firstElement);

class Box<T> {
  constructor(private content: T[]) {}

  getContent(): T[] {
    return this.content;
  }
}

interface Magazine {
  name: string;
  producer: string;
  numberOfPages: number;
}

const magazineBox = new Box<Magazine>([
  { name: "Nome 1", producer: "Isto É", numberOfPages: 146 },
  { name: "Nome 2", producer: "Abril", numberOfPages: 157 },
]);

console.log(magazineBox.getContent());

interface Fruit {
  color: string;
  name: string;
  weight: number;
}

const fruitBox = new Box<Fruit>([]);

// *
import axios from "axios";

interface Address {
  cep: string;
  logradouro: string;
  bairro: string;
}

async function getAddress(cep: string) {
  if (cep.includes("-"))
    throw new Error(`CEP parameter must contain numbers only`);

  try {
    const response = await axios.get<Address>(
      `https://viacep.com.br/ws/${cep}/json/`
    );

    console.log(response.data);
  } catch (err) {
    throw new Error(`${err}`);
  }
}

getAddress("05590130");

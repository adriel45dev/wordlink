export default async function Api() {
  const res = await fetch(
    "https://api.hgbrasil.com/finance/taxes?key=17c59ce5"
  );
  const data = await res.json();

  const [{ cdi }] = data.results;

  return <div>CDI: ${cdi}</div>;
}

// https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL

//const [cdi, setCdi] = useState<number>(0);
// useEffect(() => {
//   // atualizar o estado como necessario
// }, [cdi]);

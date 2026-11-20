import { useState } from 'react';
import './App.css';

function App() {
  type Product = {
    id: number;
    name: string;
    stock: boolean;
  };

  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'りんご', stock: true },
    { id: 2, name: 'みかん', stock: false },
    { id: 3, name: 'ぶどう', stock: true },
  ]);

  const stockProducts = products.filter((product) => product.stock).length;

  function toggleStock(id: number) {
    setProducts((prev) =>
      prev.map((product) => {
        if (id === product.id) {
          return {
            ...product,
            stock: !product.stock,
          };
        }
        return product;
      })
    );
  }

  function addStock() {
    setProducts((prev) => {
      const newId = Math.max(...prev.map((product) => product.id), 0) + 1;
      return [
        ...prev,
        {
          id: newId,
          name: 'バナナ',
          stock: true,
        },
      ];
    });
  }

  function deleteStock() {
    setProducts((prev) => prev.filter((product) => product.stock));
  }

  return (
    <>
      <section id="center">
        <ul>
          {products.map((product) => (
            <li
              key={product.id}
              onClick={() => {
                toggleStock(product.id);
              }}
            >
              {product.stock
                ? `🟢 ${product.id}：${product.name}（在庫あり）`
                : `⚪️ ${product.id}：${product.name}（在庫なし）`}
            </li>
          ))}
        </ul>
        <p>在庫あり：{stockProducts}件</p>
        <button onClick={addStock}>商品追加</button>
        <button onClick={deleteStock}>在庫なしを削除</button>
      </section>
    </>
  );
}

export default App;

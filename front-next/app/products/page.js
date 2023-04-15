import { API_URL } from '../utils/constans';

async function getProducts(){
    let products = await fetch(API_URL + `products`);
    return products.json();
}
export default async function ProductList() {
    const {products}= await getProducts()
    console.log(products)
  return (
    <div>
        {products.map((product,index)=>(
            <p key={product.id}>{product.nama_produk}</p>
        ))}
      Produck
    </div>
  )
}

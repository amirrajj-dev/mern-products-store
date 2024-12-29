import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import ProductCard from '../components/ProductCard';
const Homepage = () => {
  const products = useSelector(state=>state.products)
  
  return (
    <div className="mt-20">
      <h2 className="bg-gradient-to-r from-gray-800 to-gray-700  dark:bg-gradient-to-r text-center capitalize bg-clip-text text-transparent dark:from-cyan-400 dark:to-blue-500 text-2xl sm:text-4xl font-bold">
        current products 🚀
      </h2> 
      <div className="mt-14">
        {products.length > 0 ? (
         <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2  gap-4">
           {products.map(product=>(
            <ProductCard key={product._id} {...product}/>
          ))}
         </div>
        ) : (
          <h4 className='capitalize text-lg sm:text-xl font-bold text-center mt-14'><span className='text-gray-600'>no products found 🥲</span> <Link to={'/create'} className="capitalize bg-gradient-to-r bg-clip-text text-transparent from-cyan-400 to-blue-500 font-bold">create a product</Link></h4>
        )}
      </div>
    </div>
  )
}

export default Homepage
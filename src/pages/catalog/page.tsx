import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getAllProducts, Product } from '../../api/allProducts'
import styles from './page.module.css'
import { ProductMiniCard } from '../../components/Product/ProductMiniCard'


export function CatalogPage() {
    useEffect(() => {
        document.body.className = 'white'
        
        return () => {
            document.body.className = ''
        }
    }, [])

    const params = useParams()
    const pageFromUrl = params.page
    const navigate = useNavigate()

    const PRODUCTS_PER_PAGE = 16
    const startPage = Number(pageFromUrl) || 1

    const [products, setProducts] = useState<Product[]>([])
    const [totalProducts, setTotalProducts] = useState(0)
    const [currentPage, setCurrentPage] = useState(startPage)
    const [isLoading, setIsLoading] = useState(false)

    const loadProducts = async (pageNumber: number) => {
        if (isLoading) {
            return
        }
        
        setIsLoading(true)
        
        try {
            const result = await getAllProducts({ 
                page: pageNumber, 
                limit: PRODUCTS_PER_PAGE 
            })
            
            setProducts(result.products)
            setTotalProducts(result.total)
            setCurrentPage(pageNumber)
            navigate(`/catalog/${pageNumber}`, { replace: true })

        } catch (error) {
            console.error(error)
        }
        
        setIsLoading(false)
    }

    useEffect(() => {
        const page = Number(pageFromUrl) || 1
        setCurrentPage(page)
        loadProducts(page)
    }, [pageFromUrl])

    const createPageButtons = () => {
        if (totalProducts === 0) return null
        
        const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE)
        
        const maxVisiblePages = 5
        let startPage = 1
        let endPage = totalPages
        
        if (totalPages > maxVisiblePages) {
            const half = Math.floor(maxVisiblePages / 2)
            startPage = Math.max(currentPage - half, 1)
            endPage = startPage + maxVisiblePages - 1
            
            if (endPage > totalPages) {
                endPage = totalPages
                startPage = endPage - maxVisiblePages + 1
            }
        }
        
        const pageNumbers = []
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i)
        }
        
        return (<div>
                {startPage > 1 && (
                    <div>
                        <button className={styles['page-button']} onClick={() => loadProducts(1)} disabled={isLoading}>
                            1
                        </button>
                        {startPage > 2 && <span className={styles['page-dots']}>...</span>}
                    </div>
                )}
                
                {pageNumbers.map(pageNumber => {
                    const isActive = pageNumber === currentPage
                    const buttonClass = isActive 
                        ? styles['active-page-button'] 
                        : styles['page-button']
                    
                    return (
                        <button 
                            key={pageNumber} 
                            className={buttonClass} 
                            onClick={() => loadProducts(pageNumber)} 
                            disabled={isLoading}>
                            {pageNumber}
                        </button>
                    )
                })}
                
                {endPage < totalPages && (
                    <div>
                        {endPage < totalPages - 1 && <span className={styles['page-dots']}>...</span>}
                        <button 
                            className={styles['page-button']}
                            onClick={() => loadProducts(totalPages)}
                            disabled={isLoading} >
                            {totalPages}
                        </button>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className={styles['catalog-container']}>
            <p className={styles['catalog-p']}>КАТАЛОГ</p>

            <div className={styles['filter-container']}>
                <button className={styles['filter-button']}>Всі</button>
                <button className={styles['filter-button']}>
                    <img src="icon.png" alt="Иконка" />
                </button>
                <button className={styles['filter-button']}>
                    <img src="icon.png" alt="Иконка" />
                </button>
            </div>

            <div className={styles['products-container']}>

                {(isLoading || products.length === 0) && (
                    <div className={styles['found-contain']}>
                        {isLoading && (
                            <p className={styles['p-down']}>
                                Завантаження товарів...
                            </p>
                        )}

                        {!isLoading && products.length === 0 && (
                            <p className={styles['p-not-found']}>
                                Не вдалося завантажити каталог
                            </p>
                        )}
                    </div>
                )}

                {!isLoading && products.map(product => (
                    <ProductMiniCard key={product.id} product={product} />
                ))}
            </div>


            {totalProducts > 0 && (
                <div className={styles['pagination-container']}>
                    {createPageButtons()}
                </div>
            )}
        </div>
    )
}
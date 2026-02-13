import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getAllProducts, Product } from '../../api/allProducts'
import { Category, getAllCategories, getFilteredProducts } from '../../api/productFiltration'
import styles from './page.module.css'
import { ProductMiniCard } from '../../components/Product/ProductMiniCard'

export function CatalogPage() {
    document.body.className = 'white'
    const params = useParams()
    const pageFromUrl = params.page
    const navigate = useNavigate()

    const PRODUCTS_PER_PAGE = 16
    const startPage = Number(pageFromUrl) || 1

    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [totalProducts, setTotalProducts] = useState(0)
    const [currentPage, setCurrentPage] = useState(startPage)
    const [isLoading, setIsLoading] = useState(false)
    const [activeCategory, setActiveCategory] = useState<string | null>(null)

    useEffect(() => {
        getAllCategories().then(setCategories)
    }, [])

    const loadProducts = async (pageNumber: number, categoryName: string | null = activeCategory) => {

        const isSameCategory = categoryName === activeCategory;
        const isSamePage = pageNumber === currentPage;


        if (isSamePage && isSameCategory && products.length > 0 && !isLoading) return;
        if (isLoading) return
        setIsLoading(true)

        try {
            let result

            if (categoryName === null) {
                result = await getAllProducts({
                    page: pageNumber,
                    limit: PRODUCTS_PER_PAGE
                })
            } else {
                result = await getFilteredProducts(categoryName, pageNumber, PRODUCTS_PER_PAGE)
            }

            setProducts(result.products)

            if (pageNumber === 1 || totalProducts === 0) {
                setTotalProducts(result.total)
            } else {
                if (result.total > totalProducts) {
                    setTotalProducts(result.total)
                }
            }

            setCurrentPage(pageNumber)

            if (pageNumber !== Number(pageFromUrl)) {
                navigate(`/catalog/${pageNumber}`, { replace: true })
            }

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })

        const page = Number(pageFromUrl) || 1
        setCurrentPage(page)
        loadProducts(page, activeCategory)
    }, [pageFromUrl])

    const handleCategoryClick = (categoryName: string | null) => {
        setActiveCategory(categoryName)
        setTotalProducts(0)
        navigate('/catalog/1')
        loadProducts(1, categoryName)
    }

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

        return (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                    className={styles['page-button']}
                    onClick={() => loadProducts(currentPage - 1)}
                    disabled={currentPage === 1 || isLoading}
                    style={{ fontWeight: 'bold', fontSize: '18px', paddingBottom: '3px' }}
                >
                    &lt;
                </button>

                {startPage > 1 && (
                    <>
                        <button className={styles['page-button']} onClick={() => loadProducts(1)} disabled={isLoading}>1</button>
                        {startPage > 2 && <span className={styles['page-dots']}>...</span>}
                    </>
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
                    <>
                        {endPage < totalPages - 1 && <span className={styles['page-dots']}>...</span>}
                        <button className={styles['page-button']} onClick={() => loadProducts(totalPages)} disabled={isLoading}>
                            {totalPages}
                        </button>
                    </>
                )}

                <button
                    className={styles['page-button']}
                    onClick={() => loadProducts(currentPage + 1)}
                    disabled={currentPage === totalPages || isLoading}
                    style={{ fontWeight: 'bold', fontSize: '18px', paddingBottom: '3px' }}
                >
                    &gt;
                </button>
            </div>
        )
    }

    return (
        <div className={styles['catalog-container']}>
            <p className={styles['catalog-p']}>КАТАЛОГ</p>

            <div className={styles['filter-container']}>
                <button
                    className={`${styles['filter-button']} ${activeCategory === null ? styles['active'] : ''}`}
                    onClick={() => handleCategoryClick(null)}
                >
                    Всі
                </button>

                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        className={`${styles['filter-button']} ${activeCategory === cat.name ? styles['active'] : ''}`}
                        onClick={() => handleCategoryClick(cat.name)}
                        title={cat.name}
                    >
                        {cat.image && (
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className={styles['filter-icon']}
                                onError={(e) => e.currentTarget.style.display = 'none'}
                            />
                        )}
                    </button>
                ))}
            </div>

            <div className={styles['products-container']}>

                {isLoading && (
                    <div className={styles['found-contain']}>
                        <p className={styles['p-down']}>Завантаження...</p>
                    </div>
                )}

                {!isLoading && products.length === 0 && (
                    <div className={styles['found-contain']}>
                        <p className={styles['p-not-found']}>Товарів не знайдено</p>
                    </div>
                )}

                {!isLoading && products.length > 0 && (
                    <>
                        {products.map(product => (
                            <div key={product.id} className={styles['fade-in']}>
                                <ProductMiniCard product={product} />
                            </div>
                        ))}
                    </>
                )}
            </div>

            {totalProducts > 0 && (
                <div className={styles['pagination-container']}>
                    {createPageButtons()}
                </div>
            )}
        </div>
    )
}
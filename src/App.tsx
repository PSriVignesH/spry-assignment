import ErrorBoundary from './components/ErrorBoundary'
import FilterSidebar from './components/FilterSidebar'
import Navbar from './components/Navbar'
import Pagination from './components/Pagination'
import ProductsList from './components/ProductsList'

const App = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <ErrorBoundary>
        <Navbar />
      </ErrorBoundary>
      <div className="flex min-h-0 flex-1 items-start">
        <ErrorBoundary>
          <FilterSidebar />
        </ErrorBoundary>
        <div className="min-w-0 flex-1">
          <ErrorBoundary>
            <ProductsList />
          </ErrorBoundary>
        </div>
      </div>
      <ErrorBoundary>
        <Pagination />
      </ErrorBoundary>
    </div>
  )
}

export default App
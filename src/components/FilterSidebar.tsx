import FilterSidebarContent from './FilterSidebarContent'

const FilterSidebar = () => {
  return (
    <aside className="sticky top-16 z-10 hidden min-h-[calc(100dvh-4rem)] w-[264px] shrink-0 flex-col self-start overflow-y-auto border-r border-gray-200  lg:flex p-4">
      <FilterSidebarContent />
    </aside>
  )
}

export default FilterSidebar

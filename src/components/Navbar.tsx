import { Menu } from "lucide-react"
import { FavouriteButton } from "./FavouriteButton"
import FilterSidebarContent from "./FilterSidebarContent"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet"

const Navbar = () => {
  return (
    <div className="sticky top-0 z-20 flex h-16 w-full shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 py-2">
      <div className='flex items-center justify-start '>
        <img src="https://www.freepnglogos.com/uploads/logo-3d-png/3d-company-logos-design-logo-online-2.png" alt='logo' className='w-10 h-10 object-contain cursor-pointer' />
         <p className='text-2xl font-bold text-blue-800 cursor-pointer'>Lorum</p>
      </div>
      <div className="flex items-center gap-2">
        <FavouriteButton />
        <Sheet>
          <SheetTrigger className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md hover:bg-gray-100 lg:hidden">
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] overflow-y-auto">
            <SheetTitle className="sr-only">Filters</SheetTitle>
            <FilterSidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default Navbar
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useQueryStates } from "nuqs"
import { productSearchParams } from "@/lib/searchParams"
import { SORT_OPTIONS } from "@/constants"


const Sort = () => {
  const [{ sort }, setParams] = useQueryStates(productSearchParams)

  return (
    <Select
      value={sort || "default"}
      onValueChange={(v) =>
        setParams({ sort: v === "default" ? "" : v, page: 1 })
      }
    >
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort by Price</SelectLabel>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default Sort
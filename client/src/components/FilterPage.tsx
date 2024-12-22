import React from 'react'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { useRestaurantStore } from '@/store/useRestaurant'

export interface FlterOptionState{
    id : string,
    label : string
}

const filterOption:FlterOptionState[] = [
    { id :"burger", label : "Burger"},
    { id :"thali", label : "Thali"},
    { id :"biryani", label : "Biryani"},
    { id :"momos", label : "Momos"},
    { id :"pizza", label : "Pizza"},
    { id :"chiken", label : "Chiken"},
]

function FilterPage() {
    const {setAppliedFilter, appliedFilter, setReseliedFilter} = useRestaurantStore()
    const appliedFilterHandler = (value:string) =>{
      setAppliedFilter(value)
    }
  return (
    <div className='md:w-72'>
      <div className='flex items-center justify-between'>
        <h1 className='font-medium text-lg'>Filter By cuisinse</h1>
        <Button variant={'link'} onClick={setReseliedFilter}>Reset</Button>
      </div>
      {
        filterOption.map((option)=>(
            <div key={option.id} className='flex items-center space-x-2 my-5'>
                <Checkbox
                    id={option.id}
                    checked={appliedFilter.includes(option.label)}
                    onClick={()=>appliedFilterHandler(option.label)}
                />
                <Label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-75' >{option.label}</Label>
            </div>
        ))
      }
    </div>
  )
}

export default FilterPage

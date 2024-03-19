import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'

export const Searchjob = () => {
  return (
    <div className="flex w-full max-w-[700px] p-5 flex-col">
        <div className="w-full flex items-center relative mb-3">
            <Input
              placeholder="Enter Job title"
              className="pl-4 py-6"
            />
            <Button className="absolute right-2 top-1">
              Search
            </Button>
        </div>
        <div className="w-full flex gap-2">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Experience</SelectLabel>
                  <SelectItem value="apple">Less than 1 year</SelectItem>
                  <SelectItem value="banana">1 to 3 years</SelectItem>
                  <SelectItem value="blueberry">4 to 6 years</SelectItem>
                  <SelectItem value="grapes">7 to 10 years</SelectItem>
                  <SelectItem value="pineapple">More than 10 years</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              className="w-full max-w-44"
              placeholder="Location"
            />
        </div>
    </div>
  )
}

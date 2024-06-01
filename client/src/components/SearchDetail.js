import React, { memo } from 'react'
import icons from '../ultils/icon'
import DatePicked from './DatePicked'
import SearchOfPeople from './SearchOfPeople'

const { CiSearch, LuCalendarSearch, IoPeopleOutline } = icons

const SearchDetail = ({ nameHotel, startDate, endDate, setStartDate, setEndDate }) => {
    return (
        <div className='bg-[#8a9bde] w-full h-[70px] flex items-center justify-center sticky top-0'>
            <div className='w-full justify-center flex gap-2 '>
                <div className='bg-white w-[361px]  flex gap-3 rounded-lg items-center px-3 cursor-pointer '>
                    <CiSearch size='30' />
                    <span className='text-xl text-ellipsis whitespace-nowrap overflow-hidden'>{nameHotel}</span>
                </div>
                <DatePicked startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate} />
                <SearchOfPeople />
                <button className='bg-blue-500 w-[130px] rounded-md hover:bg-blue-400'>
                    <span className='font-medium text-white'>CẬP NHẬT</span>
                </button>
            </div>
        </div>
    )
}

export default memo(SearchDetail)

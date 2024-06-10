import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ItemHome } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions'
import { apiGetHomesByCityName } from '../../services/Home';
import { secondsToHours } from 'date-fns';



const ListHome = () => {
    const { cities, homesByCity } = useSelector(state => state.home) // lấy danh sách thành phố , khách sạn của thành phố đó 

    const location = useLocation();
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0); // State để theo dõi nút nào đang được chọn
    const [cityActive, setCityActive] = useState(null)


    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(actions.getAllCities())
    }, [])

    useEffect(() => {
        if (cities.length > 0 && cityActive === null) {
            setCityActive(cities[0]);
        }
    }, [cities]);

    useEffect(() => {
        if (isFirstRender) {
            console.log('Trang vừa được tải lại');
            // Thực hiện các hành động cần thiết khi trang được tải lại
            setIsFirstRender(false); // Đánh dấu là đã xử lý xong lần render đầu tiên
        }
    }, [isFirstRender]);

    useEffect(() => {
        dispatch(actions.getHomesByCityName(cityActive))
    }, [cityActive])


    const handleButtonActive = async (item, index) => {
        setActiveIndex(index); // Cập nhật state để chỉ định nút đang được chọn
        // dispatch(actions.getHomesByCityName(item))
        // setCityActive((await apiGetHomesByCityName(item)).data)
        setCityActive(item)
    }


    return (
        <div className='w-full flex flex-col items-center justify-around p-8'>
            <h3 className='font-semibold text-2xl pt-8'>Những chỗ nghỉ nổi bật được đề xuất cho quý khách:</h3>
            <div className='pt-5 flex  justify-around gap-5 border-b border-gray-300'>
                {cities.map((item, index) => {
                    return (
                        <button
                            key={index}
                            onClick={() => handleButtonActive(item, index)}
                            className={`flex py-2 ${activeIndex === index ? 'border-b border-blue-400' : ''}`}>
                            {item}
                        </button>
                    )
                })}
            </div>
            <div className="mt-5 max-w-[1020px] w-full flex flex-wrap justify-between pb-7" >
                {cities.map((item, index) => (
                    activeIndex === index ? homesByCity.map((e, i) => {
                        return (
                            <div key={i}>
                                <ItemHome name={e.name}
                                    city={e.city}
                                    price={e.price}
                                    image={e?.photo}
                                    id={e.id}
                                    star={e?.rating}
                                />
                            </div>
                        )
                    }) : null
                ))}
            </div>
            <button className='bg-blue-500 shadow-md rounded-lg hover:bg-blue-300  w-[277px] h-[45px]'>
                {cities.map((item, index) => (
                    activeIndex === index ?
                        <span key={index} className='text-white'>{`Xem thêm các chỗ nghỉ (${item})`}</span>
                        : null
                ))}
            </button>
        </div>
    )
}

export default ListHome;

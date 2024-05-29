import React, { useEffect, useState } from 'react';
import icons from '../ultils/icon';
import { FaAirbnb, FaSmoking } from 'react-icons/fa';
import Room from './Room';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions'
import { apiGetRoomsByIdHotelAndTypeRoom } from '../services/Room';
import { GiNextButton } from 'react-icons/gi';

const { TbResize, GiShower, IoLogoNoSmoking,
    BiFridge, LuAirVent, TbListDetails, GrCaretPrevious, GrCaretNext } = icons


const ListRoomEmpty = ({ nameType, id, nameHotel }) => {
    const dispatch = useDispatch()
    // const { roomsByIdHotel } = useSelector(state => state.room)
    const [roomsByIdHotel, setRoomsByIdHotel] = useState(null);
    const [listImage, setListImage] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiGetRoomsByIdHotelAndTypeRoom(id, nameType);
                setRoomsByIdHotel(response.data); // Lưu dữ liệu vào state typeRoom
            } catch (error) {
                console.error("Failed to fetch room type:", error);
            }
        };

        fetchData();
    }, [id, nameType]);

    useEffect(() => {   // lấy danh sách ảnh của tất cả các phòng
        if (roomsByIdHotel) {
            const images = roomsByIdHotel.map(room => room.photo);
            setListImage(images);
        }
    }, [roomsByIdHotel]);


    // let i = 0;
    // useEffect(() => {
    //     dispatch(actions.getRoomsByIdHotelAndTypeRoom(id, nameType))
    // }, [dispatch])

    // console.log(i, nameType, id, roomsByIdHotel)

    return (
        <div className='rounded-md bg-white shadow-lg p-5 flex flex-col gap-4' style={{
            backgroundImage: "url('https://ik.imagekit.io/tvlk/image/imageResource/2023/12/22/1703230740804-7c3d1c3e64557331e6f5f66d7a28e262.svg?tr=h-420,q-75,w-467')",
            backgroundSize: 'cover', // Hình ảnh sẽ được co giãn hoặc thu nhỏ để phủ đầy phần tử
            backgroundPosition: 'center', // Đảm bảo hình ảnh được căn giữa phần tử
            backgroundRepeat: 'no-repeat' // Ngăn hình ảnh nền lặp lại
        }}>
            <span className='font-semibold text-xl'>{nameType}</span>
            <div className='flex'>
                <div className='w-1/3 flex flex-col gap-5 items-center'>
                    <img src={listImage[0] ? `data:image/png;base64,${listImage[0]}` : null}
                        alt='anh'
                        className='w-[299px] h-[222px] rounded-xl'
                    />
                    <div className='w-[299px] flex flex-wrap '>
                        <div className='flex gap-2 w-1/2 p-2 '>
                            <TbResize size='24' />
                            <p>32.0 m2</p>
                        </div>
                        <div className='flex gap-2 w-1/2 p-2'>
                            <IoLogoNoSmoking size='24' />
                            <p>Không hút thuốc</p>
                        </div>
                        <div className='flex gap-2 w-1/2 p-2'>
                            <GiShower size='24' />
                            <p>Vòi tắm đứng</p>
                        </div>
                        <div className='flex gap-2 w-1/2 p-2'>
                            <LuAirVent size='24' />
                            <p>Máy lạnh</p>
                        </div>
                        <div className='flex gap-2 w-1/2 p-2'>
                            <BiFridge size='24' />
                            <p>Tủ lạnh</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2 mt-2 cursor-pointer '>
                        <TbListDetails size='22' color='blue' />
                        <p className='text-blue-700 font-semibold hover:text-blue-400'>Chi tiết phòng</p>
                    </div>
                </div>
                <div className='w-2/3 flex flex-col'>
                    <div className='flex w-[704px] bg-gray-200'>
                        <div className='w-[310px] border border-gray-300 p-2 text-center'>Lựa chọn phòng</div>
                        <div className='w-[80px] border border-gray-300 p-2 text-center'>Khách</div>
                        <div className='w-[178px] border border-gray-300 p-2 text-center'>Tổng giá</div>
                        <div className='w-[136px] border border-gray-300 p-2 text-center'></div>
                    </div>
                    {
                        roomsByIdHotel?.map(item => {
                            // if (item?.roomType === nameType) {
                            //     return <Room name={item?.roomType} price={item?.roomPrice} id={id} key={item.id} />;
                            // } else {
                            //     return null; // Hoặc bạn có thể sử dụng <> </> nếu cần trả về một phần tử rỗng
                            // }
                            // console.log(item, 1)
                            return <Room nameType={item?.roomType}
                                price={item?.roomPrice}
                                idHotel={id} key={item.id}
                                nameHotel={nameHotel}
                                idRoom={item?.id}
                            />;
                        })
                    }
                </div>
            </div >
        </div >
    );
};

export default ListRoomEmpty;

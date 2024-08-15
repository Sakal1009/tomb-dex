import { useState } from 'react';
import { Button, Dropdown, Space } from 'antd';
import { ArrowDownOutlined, DownOutlined } from '@ant-design/icons';

// const items = [
//     {
//         label: 'Clicking me will not close the menu.',
//         key: '1',
//     },
//     {
//         label: 'Clicking me will not close the menu also.',
//         key: '2',
//     },
//     {
//         label: 'Clicking me will close the menu.',
//         key: '3',
//     },
// ];

const SwapTab = () => {
    const [active, setActive] = useState('swap');
    const [swapWETH, setSwapWETH] = useState(true);
    const [valueA, setValueA] = useState(0);
    const [valueB, setValueB] = useState(0);

    // const [open, setOpen] = useState(false);
    // const handleOpenChange = (nextOpen, info) => {
    //     if (info.source === 'trigger' || nextOpen) {
    //         setOpen(nextOpen);
    //     }
    // };

    // const handleMenuClick = (e) => {
    //     if (e.key === '3') {
    //         setOpen(false);
    //     }
    // };

    const swap = () => {
        console.log('swap');
    };

    return (
        <div className="flex flex-row items-center h-full mt-20">
            <div className="flex flex-row justify-center basis-1/2">
                <img src="ether_mark_1.jpg" alt="" className="w-[500px] h-[500px] rounded-[80px] hover:transition  hover:ease-in-out hover:w-[510px] hover:h-[510px] duration-200" />
            </div>
            <div className="flex flex-row justify-start h-full basis-1/2">
                <div className="flex flex-col w-5/6 h-full">
                    <div className="flex flex-row pb-5 basis-1/6">
                        <div className="flex flex-row justify-between basis-3/4 felx-row">
                            <Button
                                className={`${active === "swap" ? 'text-white' : 'text-gray-400'} text-[28px] rounded-[25px] bg-[#1d1d1d] px-8 py-5 hover:text-gray-600`}
                                onClick={() => { setActive('swap'); }}
                            >
                                Swap
                            </Button>
                            <Button
                                className={`${active === "limit" ? 'text-white' : 'text-gray-400'} text-[28px] rounded-[25px] bg-[#1d1d1d] px-8 py-5 hover:text-gray-600`}
                                onClick={() => { setActive('limit'); }}
                            >
                                Limit
                            </Button>
                            <Button
                                className={`${active === "send" ? 'text-white' : 'text-gray-400'} text-[28px] rounded-[25px] bg-[#1d1d1d] px-8 py-5 hover:text-gray-600`}
                                onClick={() => { setActive('send'); }}
                            >Send</Button>
                            <Button
                                className={`${active === "buy" ? 'text-white' : 'text-gray-400'} text-[28px] rounded-[25px] bg-[#1d1d1d] px-8 py-5 hover:text-gray-600`}
                                onClick={() => { setActive('buy'); }}
                            >
                                Buy
                            </Button>
                        </div>
                        <div className="flex justify-end basis-1/4 felx-row">
                            <Button type='link'>
                                <img src="setting.png" alt="" />
                            </Button>
                        </div>
                    </div>
                    {
                        active === 'swap' && (
                            <div>
                                <div className="basis-2/6 p-[16px] rounded-[20px] bg-[#1b1b1b]">
                                    <div className='flex flex-row justify-start'>
                                        <span className='text-[20px] text-[#5e5e5e]'>
                                            Sell
                                        </span>
                                    </div>
                                    <div className='flex flex-row items-center justify-between w-full'>
                                        <span className='text-[#5e5e5e] text-[34px] w-full mr-3'>
                                            <input
                                                className="bg-[#1b1b1b] border-none text-[#5e5e5e] text-[32px] focus-visible:outline-0 w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0"
                                                value={valueA}
                                                type="number"
                                                onChange={(e) => { setValueA(+e.target.value) }}
                                            />
                                        </span>
                                        <div className=''>
                                            {swapWETH ? (
                                                <div className='flex flex-row items-center'>
                                                    <img src="ether.png" alt="" className='w-[25px] h-[25px] mr-1' />
                                                    <span className="text-white text-[32px]">ETH</span>
                                                </div>
                                            ) : (
                                                <div className='flex flex-row items-center'>
                                                    <div className='w-[23px] h-[23px] bg-[#2fba61] text-[9px] mr-1 rounded-[20px] flex justify-center items-center'>WET</div>
                                                    <span className="text-white text-[32px]">WETH</span>
                                                </div>
                                            )}
                                            {/* <span className="text-white text-[32px]">ETH</span> */}
                                            {/* <Dropdown
                                                menu={{
                                                    items,
                                                    onClick: handleMenuClick,
                                                }}
                                                onOpenChange={handleOpenChange}
                                                open={open}
                                            >
                                                <Button type="link" className='text-white text-[25px]' onClick={(e) => e.preventDefault()}>
                                                    <Space>
                                                        Select Token
                                                        <DownOutlined />
                                                    </Space>
                                                </Button>
                                            </Dropdown> */}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-row justify-center w-full mt-[-20px] mb-[-20px]'>
                                    <div
                                        className='flex flex-row justify-center rounded-[15px] bg-[#1b1b1b] w-[40px] h-[40px] outline outline-4 outline-[#131313] hover:bg-[#1a1919] hover:text-[#a8a6a6] hover:scale-125'
                                        onClick={() => { setSwapWETH(!swapWETH); }}
                                    >
                                        <ArrowDownOutlined />
                                    </div>
                                </div>
                                <div className="basis-2/6 p-[16px] rounded-[20px] bg-[#1b1b1b] mt-1">
                                    <div className='flex flex-row justify-start'>
                                        <span className='text-[20px] text-[#5e5e5e]'>
                                            Buy
                                        </span>
                                    </div>
                                    <div className='flex flex-row items-center justify-between'>
                                        <span className='text-[#5e5e5e] text-[34px] w-full mr-3'>
                                            <input
                                                className="bg-[#1b1b1b] border-none text-[#5e5e5e] text-[32px] focus-visible:outline-0 w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0"
                                                value={valueB}
                                                type="number"
                                                onChange={(e) => { setValueB(+e.target.value) }}
                                            />
                                        </span>
                                        <div className=''>
                                            {!swapWETH ? (
                                                <div className='flex flex-row items-center'>
                                                    <img src="ether.png" alt="" className='w-[25px] h-[25px] mr-1' />
                                                    <span className="text-white text-[32px]">ETH</span>
                                                </div>
                                            ) : (
                                                <div className='flex flex-row items-center'>
                                                    <div className='w-[23px] h-[23px] bg-[#2fba61] text-[9px] mr-1 rounded-[20px] flex justify-center items-center'>WET</div>
                                                    <span className="text-white text-[32px]">WETH</span>
                                                </div>
                                            )}
                                            {/* <Dropdown
                                                menu={{
                                                    items,
                                                    // onClick: handleMenuClick,
                                                }}
                                                onOpenChange={handleOpenChange}
                                                open={open}
                                            >
                                                <Button type="link" className='text-white text-[25px]' onClick={(e) => e.preventDefault()}>
                                                    <Space>
                                                        Select Token
                                                        <DownOutlined />
                                                    </Space>
                                                </Button>
                                            </Dropdown> */}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className='flex flex-row justify-center basis-1/6 p-[16px] rounded-[20px] bg-[#39273c] mt-2 w-full text-[#f476fa] text-[32px] hover:bg-[#58405c]'
                                    onClick={() => { swap(); }}
                                >
                                    Swap
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default SwapTab;
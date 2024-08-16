import { useState, useEffect } from 'react';
import { Button, Dropdown, Space } from 'antd';
import { ArrowDownOutlined, DownOutlined, LoadingOutlined } from '@ant-design/icons';
import { Token, Fetcher, Route } from '@uniswap/sdk-core';
import { ethers } from 'ethers';
import config from '../config';
import { ROUTER_ABI, FACTORY_ABI, DFT_ABI, PAIR_ABI } from '../constant';

const SwapTab = () => {
    const [active, setActive] = useState('swap');
    const [pairAddress, setPairAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [swapForDFT, setSwapForDFT] = useState(true);
    const [valueA, setValueA] = useState(0);
    const [valueB, setValueB] = useState(0);
    const [reserveA, setReserveA] = useState(0);
    const [reserveB, setReserveB] = useState(0);
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');

    useEffect(() => {
        const signer = provider.getSigner();
        const factoryContract = new ethers.Contract(config.local.FACTORY_ADDRESS, FACTORY_ABI, signer);
        const tx = factoryContract.getPair(config.local.DFT_ADDRESS, config.local.WETH_ADDRESS);
        tx.then(ret => {
            if (ret === ethers.constants.AddressZero)
                setPairAddress(null);
            else
                setPairAddress(ret);
        })
            .catch(err => {
                setPairAddress(null);
            });
    }, []);

    useEffect(() => {
        if (pairAddress)
            getLiquidityInfo();
    }, [pairAddress]);

    const getLiquidityInfo = async () => {
        if (pairAddress && pairAddress !== ethers.constants.AddressZero) {
            try {
                setLoading(true);
                const pairContract = new ethers.Contract(pairAddress, PAIR_ABI, provider);
                const [_reserve0, _reserve1] = await pairContract.getReserves();
                if (_reserve0 && _reserve1) {
                    setReserveA(parseFloat(_reserve0.toNumber() / Math.pow(10, 18)));
                    setReserveB(parseFloat(_reserve1.toNumber() / Math.pow(10, 18)));
                }
                setLoading(false);
            } catch (err) {
                setLoading(false);
                alert(err);
                console.error('getLiquidityInfo error:', err);
            }
        }
    };

    const onChangeValueA = (e) => {
        setValueA(+e.target.value);
        if (swapForDFT)
            setValueB(reserveB / reserveA * +e.target.value);
        else
            setValueB(reserveA / reserveB * +e.target.value);
    };

    const onChangeValueB = (e) => {
        setValueB(+e.target.value);
        if (swapForDFT)
            setValueA(reserveA / reserveB * +e.target.value);
        else
            setValueA(reserveB / reserveA * +e.target.value);
    };

    const onClickSwapBtn = async () => {
        try {
            const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
            const signer = provider.getSigner();
            const uniswapRouter = new ethers.Contract(config.local.UNISWAP_V2_ROUTER, ROUTER_ABI, signer);
            setLoading(true);
            if (swapForDFT) {
                const tx = await uniswapRouter.swapExactETHForTokens(0, [config.local.WETH_ADDRESS, config.local.DFT_ADDRESS], await signer.getAddress(), deadline, { value: ethers.utils.parseEther(String(valueA)) });
                await tx.wait();
            }
            else {
                const tx = await uniswapRouter.swapExactTokensForETH(ethers.utils.parseEther(String(valueA)), 0, [config.local.DFT_ADDRESS, config.local.WETH_ADDRESS], await signer.getAddress(), deadline);
                await tx.wait();
            }
            console.log('success swap');
            alert('swap is success!');
            setLoading(false);
            getLiquidityInfo();
        } catch (err) {
            setLoading(false);
            alert(err);
            console.error('Error swap:', err);
        }
    };

    return (
        <div className="flex flex-row items-center h-full mt-20">
            <div className="flex flex-row justify-center basis-1/2">
                <img src="ether_mark_1.jpg" alt="" className="w-[500px] h-[500px] rounded-[80px] hover:transition  hover:ease-in-out hover:w-[510px] hover:h-[510px] duration-200" />
            </div>
            <div className="flex flex-row justify-start h-full basis-1/2">
                <div className="flex flex-col w-5/6 h-full">
                    {/* <div className="flex flex-row pb-5 basis-1/6">
                        <div className="flex flex-row justify-between basis-3/4">
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
                    </div> */}
                    {
                        active === 'swap' && (
                            <div>
                                <div className='flex flex-row justify-center mb-3'>
                                    <span className='text-[32px] text-white'>
                                        Current Price of DFT: {reserveA / reserveB}WETH
                                    </span>
                                </div>
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
                                                onChange={e => { onChangeValueA(e); }}
                                            />
                                        </span>
                                        <div className=''>
                                            {swapForDFT ? (
                                                <div className='flex flex-row items-center'>
                                                    <div className='w-[23px] h-[23px] bg-[#2fba61] text-[9px] mr-1 rounded-[20px] flex justify-center items-center'>WET</div>
                                                    <span className="text-white text-[32px]">WETH</span>
                                                </div>
                                            ) : (
                                                <div className='flex flex-row items-center'>
                                                    <div className='w-[23px] h-[23px] bg-[#823fce] text-[9px] mr-1 rounded-[20px] flex justify-center items-center'>DFT</div>
                                                    <span className="text-white text-[32px]">DFT</span>
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
                                        className='flex flex-row justify-center rounded-[15px] bg-[#1b1b1b] w-[40px] h-[40px] outline outline-4 outline-[#131313] hover:bg-[#1a1919] hover:text-[#a8a6a6] hover:scale-125 cursor-pointer'
                                        onClick={() => { setSwapForDFT(!swapForDFT); }}
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
                                                onChange={(e) => { onChangeValueB(e) }}
                                            />
                                        </span>
                                        <div className=''>
                                            {!swapForDFT ? (
                                                <div className='flex flex-row items-center'>
                                                    <div className='w-[23px] h-[23px] bg-[#2fba61] text-[9px] mr-1 rounded-[20px] flex justify-center items-center'>WET</div>
                                                    <span className="text-white text-[32px]">WETH</span>
                                                </div>
                                            ) : (
                                                <div className='flex flex-row items-center'>
                                                    <div className='w-[23px] h-[23px] bg-[#823fce] text-[9px] mr-1 rounded-[20px] flex justify-center items-center'>DFT</div>
                                                    <span className="text-white text-[32px]">DFT</span>
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
                                    className='flex flex-row justify-center basis-1/6 p-[16px] rounded-[20px] bg-[#39273c] mt-2 w-full text-[#f476fa] text-[32px] hover:bg-[#58405c] cursor-pointer'
                                    onClick={() => { onClickSwapBtn(); }}
                                >
                                    {loading && <LoadingOutlined />}
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
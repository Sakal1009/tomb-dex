import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Button } from 'antd';
import styled from 'styled-components';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Pool } from '@uniswap/v3-sdk';
import { Token } from '@uniswap/sdk-core';
import { ROUTER_ABI, FACTORY_ABI } from '../constant';
import config from '../config';
import create from '@ant-design/icons/lib/components/IconFont';

const StyledButton = styled(Button)`
    &:hover {
        background-color: #110606;
    }
`;

const LiquidityTab = () => {
    const [loading, setLoading] = useState(false);
    const [pairAddress, setPairAddress] = useState(null);
    const [buttonLabel, setButtonLabel] = useState('Create a Pair');
    const [valueA, setValueA] = useState(0);
    const [valueB, setValueB] = useState(0);
    const provider = new ethers.BrowserProvider(window.ethereum);

    useEffect(() => {
        const signer = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, provider);
        const factoryContract = new ethers.Contract(config.local.FACTORY_ADDRESS, FACTORY_ABI, signer);
        const tx = factoryContract.getPair(config.local.DFT_ADDRESS, config.local.WETH_ADDRESS);
        tx.then(ret => {

            if (ret === ethers.ZeroAddress)
                setPairAddress(null);
            else
                setPairAddress(ret);
        })
            .catch(err => {
                setPairAddress(null);
            });
    }, []);

    useEffect(() => {
        if (!pairAddress) setButtonLabel('Create a Pair');
        else setButtonLabel('Add liquidity');
    }, [pairAddress]);

    const addLiquidity = async () => {
        try {
            setLoading(true);
            const signer = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, provider);
            const uniswapRouter = new ethers.Contract(config.local.UNISWAP_V2_ROUTER, ROUTER_ABI, signer);

            const factoryContract = new ethers.Contract(config.local.FACTORY_ADDRESS, FACTORY_ABI, signer);
            const tx = await factoryContract.getPair(config.local.DFT_ADDRESS, config.local.WETH_ADDRESS);
            if (tx === ethers.ZeroAddress)
                console.log('ddddd')
            // const amountUSDCDesired = ethers.parseUnits('0.0001', 18);
            // const amountWETHDesired = ethers.parseUnits('0.00001', 18);
            // const amountUSDCMin = ethers.parseUnits('0.0001', 18);
            // const amountWETHMin = ethers.parseUnits('0.0001', 18);
            // const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
            // const to = await signer.address;
            // const tx = await uniswapRouter.addLiquidity(
            //     config.local.USDC_ADDRESS, config.local.WETH_ADDRESS, amountUSDCDesired, amountWETHDesired, amountUSDCMin, amountWETHMin, to, deadline
            // );
            // await tx.wait();
            // console.log('Liquidity added successfully');
            // setLoading(false);
            // alert('A new Liquidity Pool is added.');
        } catch (err) {
            setLoading(false);
            alert(err);
            console.error('Error adding liquidity pool:', err);
        }
    };

    const createPair = async () => {
        try {
            setLoading(true);
            const signer = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, provider);
            const factoryContract = new ethers.Contract(config.local.FACTORY_ADDRESS, FACTORY_ABI, signer);
            const tx = await factoryContract.createPair(config.local.DFT_ADDRESS, config.local.WETH_ADDRESS);
            await tx.wait();
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    return (
        <div className='flex flex-row justify-center w-full'>
            <div className='w-1/3 bg-[#131313] outline outline-2 outline-[#ffffff12] rounded-[18px]'>
                <div className='flex flex-row items-center justify-center'>
                    <span className='text-white text-[32px]'>
                        Liquidity Pool
                    </span>
                </div>
                <div className="h-[1px] bg-[#ffffff12] mx-5 my-1" />
                {
                    pairAddress ? (
                        <div className='m-2'>
                            PairAddress: {pairAddress}
                        </div>
                    ) : (
                        <div className='m-2'>
                            There is not token pair. Please create a new pair.
                        </div>
                    )
                }
                <div className="flex flex-row items-center">
                    <div className='flex flex-row items-center m-2 W-1/2 rounded-[18px] bg-[#1b1b1b] w-full'>
                        <div className='w-[23px] h-[23px] bg-[#2fba61] text-[9px] mr-1 rounded-[20px] flex justify-center items-center'>WET</div>
                        <span className="text-white text-[25px]">WETH</span>
                    </div>
                    <div className='flex flex-row items-center m-2 W-1/2 rounded-[18px] bg-[#1b1b1b] w-full'>
                        <div className='w-[23px] h-[23px] bg-[#823fce] text-[9px] mr-1 rounded-[20px] flex justify-center items-center'>DFT</div>
                        <span className="text-white text-[25px]">DFT</span>
                    </div>
                </div>
                <div className='flex flex-row items-center justify-between px-2 '>
                    <span className='text-[#5e5e5e] text-[34px] w-full mr-2'>
                        <input
                            className="bg-[#1b1b1b] border-none text-[#5e5e5e] text-[32px] focus-visible:outline-0 w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0"
                            value={valueA}
                            type="number"
                            onChange={(e) => { setValueA(+e.target.value) }}
                        />
                    </span>
                    <div className='flex flex-row items-center'>
                        <div className='w-[23px] h-[23px] bg-[#2fba61] text-[9px] mr-1 rounded-[20px] flex justify-center items-center'>WET</div>
                    </div>
                </div>
                <div className='flex flex-row items-center justify-between px-2 '>
                    <span className='text-[#5e5e5e] text-[34px] w-full mr-2'>
                        <input
                            className="bg-[#1b1b1b] border-none text-[#5e5e5e] text-[32px] focus-visible:outline-0 w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0"
                            value={valueB}
                            type="number"
                            onChange={(e) => { setValueB(+e.target.value) }}
                        />
                    </span>
                    <div className='flex flex-row items-center'>
                        <div className='w-[23px] h-[23px] bg-[#823fce] text-[9px] mr-1 rounded-[20px] flex justify-center items-center'>DFT</div>
                    </div>
                </div>
                <div className='m-2'>
                    <StyledButton
                        className='w-full rounnded-[18px] h-[40px] text-white text-[28px] bg-[#494545] enabled:hover:text-[white] enabled:hover:border-gray-200'
                        icon={loading ? <LoadingOutlined /> : <PlusOutlined />}
                        onClick={pairAddress ? addLiquidity : createPair}
                    >
                        {buttonLabel}
                    </StyledButton>
                </div>
            </div>
        </div>
    );
};

export default LiquidityTab;
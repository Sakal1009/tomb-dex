import { useEffect, useState } from 'react';
import { ChainId, Token } from '@uniswap/sdk-core';
import { Pair } from '@uniswap/v2-sdk';
import { ethers } from 'ethers';
import config from '../config';
import { FACTORY_ABI } from '../constant';

const InfoTab = () => {

    const pairABI = [
        'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)'
    ];

    const fetchPairData = async (tokenA, tokenB) => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, provider);
        const factoryContract = new ethers.Contract(config.production.FACTORY_ADDRESS, FACTORY_ABI, signer);
        const pairAddress = await factoryContract.getPair(tokenA, tokenB);
        console.log('create pairAddress');
        if (pairAddress === ethers.ZeroAddress) {
            throw new Error('Pair not found');
        }

        const pairContract = new ethers.Contract(pairAddress, pairABI, provider);
        const reserves = await pairContract.getReserves();
        return reserves;
    };

    fetchPairData(config.production.USDC_ADDRESS, config.production.WETH_ADDRESS).then(reserves => {
        console.log('reserves:', reserves);
    }).catch(err => {
        console.log('err', err);
    });

    return (
        <div>
            sss
        </div>
    );
};

export default InfoTab;

import { Layout } from 'antd';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Tabs } from 'antd';
import LiquidityTab from '../components/LiquidityTab';
import SwapTab from '../components/SwapTab';
import InfoTab from '../components/InfoTab';

const { Header, Content } = Layout;

const tabItems = [
    // {
    //     key: '1',
    //     label: <span className='text-[32px] text-white hover:text-blue-500'>Information</span>,
    //     children: <InfoTab />,
    // },
    {
        key: '2',
        label: <span className='text-[32px] text-white hover:text-blue-500'>Liquidity Pool</span>,
        children: <LiquidityTab />,
    },
    {
        key: '3',
        label: <span className='text-[32px] text-white hover:text-blue-500'>Swap</span>,
        children: <SwapTab />,
    },
];

const MainLayout = () => {
    return (
        <Layout className='bg-[#131313]'>
            <Header className="bg-[#131313] h-[80px] flex flex-row justify-between items-center mt-5">
                <div className='flex flex-row items-center justify-start'>
                    <img src="uniswap.png" alt="" className='w-20 h-20' />
                    <span className="text-[50px] font-extrabold text-[#fc72ff] font-mono italic hover:text-blue-700 hover:scale-150 hover:cursor-pointer">
                        Uniswap v2
                    </span>
                </div>
                <ConnectButton />
            </Header>
            <Content className='bg-[#131313] text-white p-10'>
                <Tabs defaultActiveKey="2" items={tabItems} className='text-white' centered hideAdd />
            </Content>
        </Layout>
    );
};

export default MainLayout;
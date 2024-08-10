
import { Layout } from 'antd';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const { Header, Content } = Layout;

const MainLayout = () => {
    return (
        <Layout>
            <Header className="bg-slate-400 h-[80px] flex flex-row justify-between items-center">
                <span className="text-[50px] font-extrabold text-green-700 font-mono italic hover:text-blue-700 hover:scale-150 hover:cursor-pointer">
                    Uniswap v2
                </span>
                <ConnectButton />
            </Header>
            <Content className='bg-none'>

            </Content>
        </Layout>
    );
};

export default MainLayout;
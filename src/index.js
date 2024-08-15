import React from 'react';
import ReactDOM from 'react-dom/client';
import { createConfig, WagmiProvider } from 'wagmi';
import { http } from '@wagmi/core';
import { mainnet, sepolia } from 'wagmi/chains';
import { RainbowKitProvider, darkTheme, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const wagmiConfig = createConfig({
  autoConnect: true,
  chains: [mainnet, sepolia],
  provider: http(),
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http()
  }
});

const rainbowConfig = getDefaultConfig({
  appName: 'TombDEX',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, sepolia]
});

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider config={rainbowConfig} theme={darkTheme()} modalSize="compact">
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

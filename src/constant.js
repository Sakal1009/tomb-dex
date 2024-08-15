export const ROUTER_ABI = [
    "function WETH() external pure returns (address)",
    "function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)",
    "function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
    "function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)",
    "function addLiquidity(address tokenA, address tokenB, uint amountADesired, uint amountBDesired, uint amountAMin, uint amountBMin, address to, uint deadline)",
];

export const ERC20_ABI = [
    "function approve(address spender, uint256 amount) public returns (bool)",
    "function allowance(address owner, address spender) public view returns (uint256)",
];

export const FACTORY_ABI = [
    "function getGasPriceQueryKey(address tokenA, address tokenB) external view returns (address pair)",
    "function allPairs(uint) external view returns (address pair)",
    "function allPairsLength() external view returns (uint)",
    "function createPair(address tokenA, address tokenB) external returns(address pair)",
    "function getPair(address tokenA, address tokenB) external view returns (address pair)"
];

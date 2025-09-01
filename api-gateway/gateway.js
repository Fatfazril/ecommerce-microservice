const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');


const app = express();


// Routing ke Auth Service
app.use('/auth', createProxyMiddleware({
target: 'http://localhost:4001',
changeOrigin: true
}));


// Routing ke Product Service
app.use('/products', createProxyMiddleware({
target: 'http://localhost:4002',
changeOrigin: true
}));


// Routing ke Order Service
app.use('/orders', createProxyMiddleware({
target: 'http://localhost:4003',
changeOrigin: true
}));


// Routing ke Payment Service
app.use('/payments', createProxyMiddleware({
target: 'http://localhost:4004',
changeOrigin: true
}));


app.listen(4000, () => console.log('API Gateway running on port 4000'));
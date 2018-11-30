"use strict";

var log = console.log;

var Web3 = require("./web3.js");
var etrue3 = {};

// 初始化web3连接节点 默认使用 infura
var web3 = new Web3(
  new Web3.providers.HttpProvider("https://mainnet.infura.io/")
);
etrue3.web3 = web3;
etrue3.ether ={};

// 指定 provider
etrue3.ether.use_provider = function(x) {
  etrue3.web3 = new Web3(new Web3.providers.HttpProvider(x));
};

// 以太坊当前gas费价格 (单位wei)
etrue3.ether.gas_price = "";
function update_gas_price() {
  etrue3.web3.eth.getGasPrice().then(function(x) {
    etrue3.ether.gas_price = x;
  });
}

// 生成钱包账户 (包括地址，私钥,keystore)
etrue3.gen_account = function(pwd){
  if(!pwd){ pwd=='';}
  var account = web3.eth.accounts.create();
  var address = account.address;
  var privatekey = account.privateKey;
  var keystore = web3.eth.accounts.encrypt(privatekey, pwd);
  keystore = JSON.stringify(keystore);
  return {
    address:address,
    privatekey:privatekey,
    keystore:keystore
  };
}


module.exports = etrue3;
import Web3 from 'web3';
export const web3Helper =()=> {
    try {
        
   
    if(window.ethereum){
        provider = window.ethereum;
     
    let provider = window.ethereum
    let web3 = new Web3(provider);
   // console.log(web3);
    return {
        provider,web3,error:false
    }
    }
    else{
       return {
              provider:null,web3:null,error:true
       }
    }
} catch (error) {
    console.log(error,'error in web3');
    return {
        provider:null,web3:null,error:true
 }  
}
   
}
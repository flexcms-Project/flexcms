require('dotenv').config();

const checkRedis = () => {
    if(process.env.REDIS_STATUS == "available"){
        console.log("redis option are activated, make sure your redis server are on");
    }else{
        console.log("redis option are not activated, the server will not use redis");
    }
}

checkRedis();



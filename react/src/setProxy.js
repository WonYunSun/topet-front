import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app) {
  app.use(
    "/api", //이제 프론트엔드에서 '/api'로 요청을 보내면, 백엔드인 808포트(=target)로 요청이 도착하게 됩니다.
    createProxyMiddleware({
      target: 
      "http://localhost:8081/",
      //"http://175.45.202.131:8081/", //# 서버 URL or localhost:설정한포트번호
      
      changeOrigin: true,
    })
  );
};

// src/main/frontend/src/setProxy.js
//https://velog.io/@u-nij/Spring-Boot-React.js-%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD-%EC%84%B8%ED%8C%85
/*
기본적으로 React 프로젝트는 3000번 포트에서 작동되기 때문에 CORS 관련한 오류를 방지하기 위해서 Proxy를 설정해주어야 한다.
*/

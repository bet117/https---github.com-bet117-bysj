import Cookies from "js-cookie";

const Cookie={
  getCookies:function(key){
    return Cookies.get(key);
  },
  setCookies:function(key, value, expiresTime){
    let seconds = expiresTime;

  let expires = new Date(new Date() * 1 + seconds * 1000);

  return Cookies.set(key, value, { expires: expires });
  },
  removeCookies:function(key){
    return Cookies.remove(key);
  },
}
export default Cookie;
